import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASQ_DATA, MonthData } from './data';
import { Printer, Info, Image as ImageIcon, ArrowLeft, CheckSquare } from 'lucide-react';
import { saveSubmission } from './store';

function QuestionImage({ q, alt, position = 'right' }: { q: any, alt: string, position?: 'right' | 'bottom' }) {
  const sectionMap: Record<string, string> = {
    c: 'Communication',
    gm: 'GrossMotor',
    fm: 'FineMotor',
    ps: 'ProbSolving',
    pe: 'PerSoc',
    o: 'Overall'
  };

  const sectionDashMap: Record<string, string> = {
    c: 'communication',
    gm: 'gross-motor',
    fm: 'fine-motor',
    ps: 'prob-solving',
    pe: 'personal-social',
    o: 'overall'
  };

  const dynamicUrls = useMemo(() => {
    const parts = q.id.split('_');
    if (parts.length !== 3) return [];
    const month = parts[0];
    const sec = sectionMap[parts[1]];
    const secDash = sectionDashMap[parts[1]];
    const secLower = sec ? sec.toLowerCase() : '';
    const num = parts[2];
    if (!sec) return [];
    
    const baseName = `${month}mo-${sec}-q${num}`;
    const baseNameLower = `${month}mo-${secLower}-q${num}`;
    const baseNameDash = `${month}mo-${secDash}-q${num}`;
    
    return [
      `/images/${baseNameDash}.svg`,
      `/images/${baseNameDash}.jpg`,
      `/images/${baseNameDash}.jpeg`,
      `/images/${baseNameDash}.png`,
      `/images/${baseName}.svg`,
      `/images/${baseName}.jpg`,
      `/images/${baseName}.jpeg`,
      `/images/${baseName}.png`,
      `/images/${baseNameLower}.svg`,
      `/images/${baseNameLower}.jpg`,
      `/images/${baseNameLower}.jpeg`,
      `/images/${baseNameLower}.png`,
    ];
  }, [q.id]);

  const customUrl = q.imageUrl;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const urlsToTry = useMemo(() => {
    const raw = customUrl ? [customUrl, ...dynamicUrls] : dynamicUrls;
    const result: string[] = [];
    raw.forEach(u => {
      if (u.startsWith('/')) {
        result.push(u);
        result.push(u.slice(1)); // relative path e.g. "images/..."
      } else {
        result.push('/' + u); // absolute path
        result.push(u);
      }
    });
    return Array.from(new Set(result));
  }, [customUrl, dynamicUrls, reloadTrigger]);

  if (failed || urlsToTry.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between gap-3 w-fit text-xs text-slate-500 print:bg-white print:border-slate-300 shadow-sm mt-3 clear-both">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 opacity-50 text-purple-600" />
          <span className="italic font-medium">{alt}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setCurrentIndex(0);
            setReloadTrigger(prev => prev + 1);
          }}
          className="text-purple-600 hover:text-purple-800 font-semibold underline text-[11px]"
        >
          Reload Image
        </button>
      </div>
    );
  }

  return (
    <div className={`${position === 'right' ? 'float-right ml-4 mb-2 w-20 h-20 md:w-28 md:h-28' : 'mt-4 block w-full max-w-[280px]'} shrink-0 overflow-hidden bg-slate-50 border border-slate-100 rounded p-1`}>
      <img
        src={urlsToTry[currentIndex]}
        alt={alt}
        className={`${position === 'right' ? 'w-full h-full' : 'w-full h-auto'} object-contain`}
        onError={() => {
          if (currentIndex < urlsToTry.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setFailed(true);
          }
        }}
      />
    </div>
  );
}

export function PatientForm() {
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [patientId, setPatientId] = useState('');
  const [fillerName, setFillerName] = useState('');
  const [relationship, setRelationship] = useState<'parent' | 'grandparent' | 'guardian' | 'other' | ''>('');
  const [selectedMonth, setSelectedMonth] = useState<'2' | '6' | '9' | '12' | '18' | '24' | '30' | '36' | '42' | '48' | '54' | '60'>('2');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId && fillerName.length >= 2 && fillerName.length <= 3 && relationship && selectedMonth) {
      setStep('form');
    }
  };

  const currentData = ASQ_DATA[selectedMonth];
  const sectionTitles: Record<keyof MonthData, string> = {
    communication: 'COMMUNICATION',
    grossMotor: 'GROSS MOTOR',
    fineMotor: 'FINE MOTOR',
    problemSolving: 'PROBLEM SOLVING',
    personalSocial: 'PERSONAL-SOCIAL',
    overall: 'OVERALL',
  };

  const isSuccess = step === 'success';

  // Calculate progress
  const { totalQuestions, answeredQuestions, progressPercentage } = useMemo(() => {
    if (!currentData) return { totalQuestions: 0, answeredQuestions: 0, progressPercentage: 0 };
    
    let total = 0;
    let answered = 0;

    Object.values(currentData).forEach((questions: any[]) => {
      questions.forEach(q => {
        total += 1;
        if (answers[q.id]) {
          answered += 1;
        }
      });
    });

    return {
      totalQuestions: total,
      answeredQuestions: answered,
      progressPercentage: total === 0 ? 0 : Math.round((answered / total) * 100)
    };
  }, [answers, currentData]);

  const missingExplanations = useMemo(() => {
    if (!currentData || !currentData.overall) return [];
    const missing: string[] = [];
    currentData.overall.forEach((q: any) => {
      const textLower = q.text.toLowerCase();
      const val = answers[q.id];
      const needsYesExplain = textLower.includes('if yes, explain') && val === 'YES';
      const needsNoExplain = textLower.includes('if no, explain') && val === 'NO';
      if (needsYesExplain || needsNoExplain) {
        const explanation = answers[`${q.id}_explain`]?.trim();
        if (!explanation) {
          missing.push(q.id);
        }
      }
    });
    return missing;
  }, [answers, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredQuestions < totalQuestions || missingExplanations.length > 0) {
      setShowErrors(true);
      return;
    }
    setStep('success');
    await saveSubmission({
      patientId,
      fillerName,
      relationship,
      month: selectedMonth,
      answers
    });
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => navigate('/admin')}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800"
          >
            Staff login
          </button>
        </div>
        <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">ASQ-3 Questionnaire</h1>
          <form onSubmit={handleStart} autoComplete="new-password" className="space-y-6">
            <div>
              <label htmlFor="patientId" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Patient ID
              </label>
              <input
                id="patientId"
                name="patientId"
                type="text"
                autoComplete="new-password"
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-slate-800"
                placeholder="Enter Patient ID"
              />
            </div>
            <div>
              <label htmlFor="fillerName" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                patient initials
              </label>
              <input
                id="fillerName"
                name="fillerName"
                type="text"
                autoComplete="new-password"
                required
                value={fillerName}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
                  setFillerName(val);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors uppercase tracking-wider text-slate-800"
                placeholder="ABC"
                maxLength={3}
              />
              {fillerName.length > 0 && fillerName.length < 2 && (
                <p className="text-amber-600 text-xs mt-1 font-semibold">Initials must be 2 or 3 letters</p>
              )}
            </div>
            <div>
              <label htmlFor="relationship" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Your Relationship to Patient
              </label>
              <select
                id="relationship"
                name="relationship"
                required
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-slate-800"
              >
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="grandparent">Grandparent</option>
                <option value="guardian">Guardian</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="selectedMonth" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Questionnaire Age
              </label>
              <select
                id="selectedMonth"
                name="selectedMonth"
                required
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-slate-800"
              >
                {['2', '6', '9', '12', '18', '24', '30', '36', '42', '48', '54', '60'].map((month) => (
                  <option 
                    key={month} 
                    value={month}
                    disabled={month === '42' || month === '54'}
                  >
                    {month} Months {month === '42' || month === '54' ? '(Unavailable)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold text-sm py-3 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Questionnaire
            </button>
          </form>
        </div>
      </div>
    );
  }

  const successMessage = (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Thank You!</h2>
        <p className="text-slate-600 mb-8">
          Your information has been securely submitted.
        </p>
        <button
          type="button"
          onClick={() => {
            window.close();
          }}
          className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-md text-sm font-bold transition-colors shadow-sm"
        >
          Close Window
        </button>
      </div>
    </div>
  );

  if (isSuccess) {
    return successMessage;
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-3 shadow-sm flex items-center justify-between">
        <button 
          onClick={() => setStep('intro')} 
          className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Back</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 italic font-normal">
            {answeredQuestions} of {totalQuestions} answered
          </span>
          <button
            type="submit"
            form="questionnaire-form"
            className={`px-6 py-2 font-bold text-sm rounded-md transition-colors shadow-sm text-white ${showErrors && answeredQuestions < totalQuestions ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1 w-full px-4 md:px-8 py-6">
        <div className="w-full bg-white flex flex-col">
          
          {/* Header */}
          <div className="bg-white border-b border-slate-200 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-800">ASQ-3 Questionnaire</h1>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{selectedMonth} Month Milestones</h2>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8 text-left md:text-right">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Patient ID</div>
                <div className="font-bold text-slate-800 text-sm">{patientId}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Patient Initials</div>
                <div className="font-bold text-slate-800 text-sm uppercase font-mono tracking-wider">{fillerName}</div>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form id="questionnaire-form" onSubmit={handleSubmit} noValidate autoComplete="new-password" className="py-8">
            <div className="mb-8">
              <div className="bg-slate-200 p-4 rounded-t-md text-sm text-slate-800 leading-relaxed mb-1">
                On the following pages are questions about activities babies may do. Your baby may have already done some of the activities described here, and there may be some your baby has not begun doing yet. For each item, please fill in the circle that indicates whether your baby is doing the activity regularly, sometimes, or not yet.
              </div>
              <div className="flex flex-col md:flex-row gap-8 border border-slate-200 p-4 rounded-b-md">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">Important Points to Remember:</h3>
                  <ul className="space-y-4 mt-4">
                    <li className="flex gap-4 text-sm text-slate-800 items-start">
                      <div className="relative shrink-0 w-4 h-4 mt-0.5 border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <svg className="absolute -top-2 -right-1.5 w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="font-medium text-base">Try each activity with your baby before marking a response.</span>
                    </li>
                    <li className="flex gap-4 text-sm text-slate-800 items-start">
                      <div className="relative shrink-0 w-4 h-4 mt-0.5 border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <svg className="absolute -top-2 -right-1.5 w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="font-medium text-base">Make completing this questionnaire a game that is fun for you and your baby.</span>
                    </li>
                    <li className="flex gap-4 text-sm text-slate-800 items-start">
                      <div className="relative shrink-0 w-4 h-4 mt-0.5 border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <svg className="absolute -top-2 -right-1.5 w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="font-medium text-base">Make sure your baby is rested and fed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {(Object.keys(currentData) as Array<keyof MonthData>).map((sectionKey) => {
              const isOverall = sectionKey === 'overall';
              const questions = currentData[sectionKey];

              return (
                <div key={sectionKey} className="mb-12 print:mb-8 print:break-inside-avoid">
                  <div className="flex bg-blue-600 text-white mb-6 p-4 items-center rounded-sm">
                    <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs font-bold print:hidden">{Object.keys(currentData).indexOf(sectionKey) + 1}</span>
                      {sectionTitles[sectionKey]}
                    </h3>
                    {!isOverall && (
                      <div className="ml-auto hidden md:flex gap-6 text-xs font-bold text-blue-100 uppercase tracking-wider">
                        <span className="w-12 text-center">Yes</span>
                        <span className="w-20 text-center">Sometimes</span>
                        <span className="w-16 text-center">Not Yet</span>
                      </div>
                    )}
                  </div>
                  {isOverall && (
                    <div className="text-sm italic text-slate-800 mb-6">
                      Parents and providers may use the space below for additional comments.
                    </div>
                  )}

                  <div className="space-y-6">
                    {questions.map((q: any, idx: number) => {
                      const number = idx + 1;
                      const hasError = showErrors && !answers[q.id];
                      
                      if (isOverall) {
                        const textLower = q.text.toLowerCase();
                        const val = answers[q.id];
                        const needsYesExplain = textLower.includes('if yes, explain') && val === 'YES';
                        const needsNoExplain = textLower.includes('if no, explain') && val === 'NO';
                        const needsExplain = needsYesExplain || needsNoExplain;
                        const missingExplain = needsExplain && !answers[`${q.id}_explain`]?.trim();
                        const isMissingAnswer = !val;
                        const hasQuestionError = showErrors && (isMissingAnswer || missingExplain);

                        return (
                          <div key={q.id} className={`mb-8 print:break-inside-avoid ${hasQuestionError ? 'bg-red-50 p-4 -mx-4 rounded-md border border-red-200 shadow-sm transition-colors' : ''}`}>
                            <div className="flex flex-col md:flex-row gap-4 items-start mb-3">
                              <div className="flex gap-4 flex-1 w-full">
                                <span className="font-bold text-slate-800 shrink-0">{number}.</span>
                                <div className="flex-1">
                                  <span dangerouslySetInnerHTML={{ __html: q.text }} className="text-sm text-slate-800 leading-relaxed" />
                                </div>
                              </div>
                              <div className="flex gap-6 shrink-0 mt-2 md:mt-0 pl-8 md:pl-0">
                                {['YES', 'NO'].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className="peer sr-only"
                                    required
                                  />
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-400 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-colors">
                                    <div className={`w-1.5 h-1.5 bg-white rounded-full ${answers[q.id] === opt ? 'opacity-100' : 'opacity-0'}`}></div>
                                  </div>
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{opt}</span>
                              </label>
                                ))}
                              </div>
                            </div>
                            {needsExplain && (
                              <div className="relative">
                                <textarea
                                  value={answers[`${q.id}_explain`] || ''}
                                  onChange={(e) => setAnswers(prev => ({ ...prev, [`${q.id}_explain`]: e.target.value }))}
                                  className={`w-full mt-2 h-24 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 resize-none shadow-sm transition-all ${showErrors && missingExplain ? 'border-red-400 bg-red-50 focus:ring-red-500 placeholder-red-300' : 'border-slate-200 bg-slate-50 focus:ring-blue-500'}`}
                                  placeholder="Please explain in detail (required)..."
                                />
                                {showErrors && missingExplain && (
                                  <div className="text-red-600 text-xs mt-1 font-semibold flex items-center gap-1">
                                    <span>⚠️</span> An explanation is required for this selection.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={q.id} className={`flex flex-col md:flex-row md:gap-6 items-start border-b pb-6 print:pb-4 print:border-slate-300 ${hasError ? 'bg-red-50 p-4 -mx-4 rounded-md border border-red-200' : 'border-slate-100'}`}>
                          <div className="flex gap-4 md:gap-6 flex-1 w-full mb-4 md:mb-0">
                            <span className="font-bold text-slate-800 shrink-0 mt-0.5">{number}.</span>
                            
                            <div className="flex-1 block">
                              {(q.imageUrl || q.imageAlt) && q.imagePosition !== 'bottom' && (
                                <QuestionImage q={q} alt={q.imageAlt || "Illustration"} position="right" />
                              )}
                              <span dangerouslySetInnerHTML={{ __html: q.text }} className="text-slate-800 text-sm leading-relaxed inline" />
                              {(q.imageUrl || q.imageAlt) && q.imagePosition === 'bottom' && (
                                <QuestionImage q={q} alt={q.imageAlt || "Illustration"} position="bottom" />
                              )}

                              {q.hasTextBox && (
                                <div className="mt-3 clear-both">
                                  {q.textBoxLabel && (
                                    <label className="block text-sm text-slate-600 mb-1">
                                      <span dangerouslySetInnerHTML={{ __html: q.textBoxLabel }} />
                                    </label>
                                  )}
                                  <textarea
                                    value={answers[`${q.id}_text`] || ''}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [`${q.id}_text`]: e.target.value }))}
                                    className="w-full h-20 px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                                    placeholder="Type response here..."
                                  />
                                </div>
                              )}

                              {q.multipleTextBoxes && (
                                <div className="mt-3 flex flex-col gap-4 clear-both">
                                  {q.multipleTextBoxes.map((label, idx) => (
                                    <div key={idx}>
                                      <label className="block text-sm text-slate-600 mb-1">
                                        <span dangerouslySetInnerHTML={{ __html: label }} />
                                      </label>
                                      <textarea
                                        value={answers[`${q.id}_multiple_${idx}`] || ''}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, [`${q.id}_multiple_${idx}`]: e.target.value }))}
                                        className="w-full h-16 px-3 py-2 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                                        placeholder="Type response here..."
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {q.inlineTextBoxes && (
                                <div className="mt-3 flex flex-col gap-3 clear-both">
                                  {q.inlineTextBoxes.map((label, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <span className="text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: label }} />
                                      <input
                                        type="text"
                                        autoComplete="new-password"
                                        value={answers[`${q.id}_inline_${idx}`] || ''}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, [`${q.id}_inline_${idx}`]: e.target.value }))}
                                        className="flex-1 min-w-[120px] px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {q.checkboxes && (
                                <div className="mt-3 grid grid-cols-2 gap-3 clear-both">
                                  {q.checkboxes.map((label, idx) => (
                                    <label key={idx} className="flex items-start gap-2 cursor-pointer group">
                                      <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 shrink-0 border border-slate-300 rounded bg-white group-hover:border-blue-500 transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={answers[`${q.id}_checkbox_${idx}`] === 'true'}
                                          onChange={(e) => setAnswers(prev => ({ ...prev, [`${q.id}_checkbox_${idx}`]: e.target.checked ? 'true' : 'false' }))}
                                          className="absolute opacity-0 w-full h-full cursor-pointer"
                                        />
                                        {answers[`${q.id}_checkbox_${idx}`] === 'true' && (
                                          <svg className="w-3.5 h-3.5 text-blue-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                          </svg>
                                        )}
                                      </div>
                                      <span className="text-sm text-slate-700 leading-snug select-none">{label}</span>
                                    </label>
                                  ))}
                                </div>
                              )}

                              {q.footerText && (
                                <div className="mt-4 text-sm text-slate-500 clear-both">
                                  <span dangerouslySetInnerHTML={{ __html: q.footerText }} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Answer Choices */}
                          <div className="flex justify-between md:justify-end md:gap-6 shrink-0 w-full md:w-auto mt-2 md:mt-1 pl-8 md:pl-0">
                            {[
                               { val: 'YES', label: 'Yes' },
                               { val: 'SOMETIMES', label: 'Sometimes' },
                               { val: 'NOT YET', label: 'Not Yet' }
                            ].map((opt) => (
                              <label key={opt.val} className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-center md:w-12 md:[&:nth-child(2)]:w-20 md:[&:nth-child(3)]:w-16 cursor-pointer group">
                                <span className="md:hidden text-[10px] font-bold text-slate-500 uppercase tracking-wider">{opt.label}</span>
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={opt.val}
                                    required
                                    checked={answers[q.id] === opt.val}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className="peer sr-only"
                                  />
                                  <div className="w-6 h-6 md:w-4 md:h-4 rounded-full border-2 border-slate-400 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-colors">
                                    <div className={`w-2.5 h-2.5 md:w-1.5 md:h-1.5 bg-white rounded-full ${answers[q.id] === opt.val ? 'opacity-100' : 'opacity-0'}`}></div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </form>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              form="questionnaire-form"
              className={`px-8 py-3 font-bold text-base rounded-md transition-colors shadow-sm text-white ${showErrors && answeredQuestions < totalQuestions ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Submit Questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
