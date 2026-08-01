import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmissions, Submission, updateSubmission, getSubmissionScoresAndStatus } from './store';
import { ASQ_DATA, MonthData } from './data';
import { Printer, ArrowLeft, Image as ImageIcon, Eye, Save, Edit2, RefreshCw, Check, X } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Summary9Mo } from './Summary9Mo';
import { Summary12Mo } from './Summary12Mo';
import { Summary18Mo } from './Summary18Mo';
import { Summary24Mo } from './Summary24Mo';
import { Summary30Mo } from './Summary30Mo';
import { Summary36Mo } from './Summary36Mo';
import { Summary48Mo } from './Summary48Mo';
import { Summary60Mo } from './Summary60Mo';

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

export function SubmissionView({ selectedSubmission, onBack }: { selectedSubmission: Submission, onBack: () => void }) {
  const navigate = useNavigate();

  const contentRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() => selectedSubmission.answers || {});
  const [originalAnswers, setOriginalAnswers] = useState<Record<string, string>>(() => selectedSubmission.originalAnswers || selectedSubmission.answers || {});
  const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>(() => selectedSubmission.answers || {});
  const [editedBy, setEditedBy] = useState<Record<string, string>>(() => selectedSubmission.editedBy || {});
  const [selectedFilters, setSelectedFilters] = useState<('normal' | 'borderline' | 'abnormal')[]>(['normal', 'borderline', 'abnormal']);
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const scoresAndStatus = useMemo(() => {
    return getSubmissionScoresAndStatus({
      month: selectedSubmission.month,
      answers: answers
    });
  }, [selectedSubmission.month, answers]);

  const liveSubmission = useMemo(() => {
    return {
      ...selectedSubmission,
      answers: answers,
      originalAnswers: originalAnswers
    };
  }, [selectedSubmission, answers, originalAnswers]);

  const sectionToScoringKey: Record<string, string> = useMemo(() => ({
    communication: 'c',
    grossMotor: 'gm',
    fineMotor: 'fm',
    problemSolving: 'ps',
    personalSocial: 'pe',
  }), []);

  const domainSections = useMemo(() => {
    if (!selectedSubmission) return [];
    const currentData = ASQ_DATA[selectedSubmission.month];
    if (!currentData) return [];
    return (Object.keys(currentData) as Array<keyof MonthData>).filter(key => key !== 'overall');
  }, [selectedSubmission.month]);

  const normalCount = useMemo(() => {
    return domainSections.filter(key => {
      const scoreKey = sectionToScoringKey[key];
      const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);
      return !scoreRow || scoreRow.status === 'normal';
    }).length;
  }, [domainSections, scoresAndStatus, sectionToScoringKey]);

  const borderlineCount = useMemo(() => {
    return domainSections.filter(key => {
      const scoreKey = sectionToScoringKey[key];
      const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);
      return scoreRow && scoreRow.status === 'borderline';
    }).length;
  }, [domainSections, scoresAndStatus, sectionToScoringKey]);

  const abnormalCount = useMemo(() => {
    return domainSections.filter(key => {
      const scoreKey = sectionToScoringKey[key];
      const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);
      return scoreRow && scoreRow.status === 'abnormal';
    }).length;
  }, [domainSections, scoresAndStatus, sectionToScoringKey]);

  const totalSectionsCount = domainSections.length;

  // Subscribe to real-time updates for this specific submission
  useEffect(() => {
    const docRef = doc(db, 'submissions', selectedSubmission.id);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Submission;
        setAnswers(data.answers || {});
        setOriginalAnswers(data.originalAnswers || data.answers || {});
        setSavedAnswers(data.answers || {});
      }
    }, (err) => {
      console.error("Error listening to submission document: ", err);
    });
    return () => unsubscribe();
  }, [selectedSubmission.id]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${selectedSubmission.patientId}_ASQ3_${selectedSubmission.month}Mo`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 100);
  };

  const handleSectionClick = (sectionKey: string) => {
    const scoreKey = sectionToScoringKey[sectionKey];
    const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);
    const status = scoreRow ? scoreRow.status : 'normal';

    if (!selectedFilters.includes(status)) {
      setSelectedFilters(prev => [...prev, status]);
      setTimeout(() => {
        const element = document.getElementById(`section-${sectionKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(`section-${sectionKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAnswerChange = (qId: string, value: string) => {
    setAnswers(prev => {
      const nextAnswers = { ...prev, [qId]: value };
      const baseOriginal = selectedSubmission.originalAnswers || selectedSubmission.answers || {};
      
      let changed = false;
      const allKeys = Array.from(new Set([...Object.keys(nextAnswers), ...Object.keys(baseOriginal)]));
      for (const k of allKeys) {
        if ((nextAnswers[k] || '') !== (baseOriginal[k] || '')) {
          changed = true;
          break;
        }
      }
      setHasChanges(changed);
      return nextAnswers;
    });

    if (auth.currentUser) {
      const name = auth.currentUser.displayName || auth.currentUser.email || 'Staff';
      setEditedBy(prev => ({ ...prev, [qId]: name }));
    }
  };

  const handleRescore = async () => {
    try {
      const baseOriginal = selectedSubmission.originalAnswers || selectedSubmission.answers || {};
      await updateSubmission(selectedSubmission.id, {
        answers: answers,
        originalAnswers: baseOriginal,
        editedBy: editedBy
      });
      setHasChanges(false);
      setIsEditing(false);
      setToastMessage({ text: 'Rescored & Saved', type: 'success' });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      console.error("Error rescoring submission:", error);
      setToastMessage({ text: 'Failed to rescore/save changes. Please try again.', type: 'error' });
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  if (selectedSubmission) {
    const currentData = ASQ_DATA[selectedSubmission.month];
    
    const sectionTitles: Record<keyof MonthData, string> = {
      communication: 'COMMUNICATION',
      grossMotor: 'GROSS MOTOR',
      fineMotor: 'FINE MOTOR',
      problemSolving: 'PROBLEM SOLVING',
      personalSocial: 'PERSONAL-SOCIAL',
      overall: 'OVERALL',
    };

    return (
      <div className="min-h-screen bg-white font-sans print:bg-white print:p-0">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8 py-3 shadow-sm flex items-center justify-between print:hidden">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1.5 px-2.5 md:px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back<span className="hidden sm:inline"> to List</span></span>
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => {
                if (isEditing) {
                  setAnswers(savedAnswers);
                  setEditedBy(selectedSubmission.editedBy || {});
                  setHasChanges(false);
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-sm ${
                isEditing 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-800 text-white'
              }`}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel edit' : 'Edit Questionnaire'}</span>
            </button>
            {(hasChanges || isEditing) && (
              <button 
                onClick={handleRescore}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-bold transition-colors shadow-sm ${hasChanges ? 'animate-pulse' : ''}`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Save & Rescore</span>
              </button>
            )}
            {!isEditing && (
              <button 
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            )}
          </div>
        </div>

        <div ref={contentRef} className="px-4 md:px-8 py-6 print:p-0 bg-white">
          <div className="w-full bg-white flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 print:bg-white print:pb-4 print:pt-0 print:border-none print:flex-row print:justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold text-slate-800 print:text-black">ASQ-3 Questionnaire</h1>
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider print:text-black">{selectedSubmission.month} Month Milestones</h2>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 md:gap-8 text-left md:text-right print:flex-row print:text-right print:gap-8">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1 print:text-black">Patient ID</div>
                  <div className="font-bold text-slate-800 text-sm print:text-black">{selectedSubmission.patientId}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1 print:text-black">Patient Initials</div>
                  <div className="font-bold text-slate-800 text-sm print:text-black font-mono uppercase tracking-wider">{selectedSubmission.fillerName}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1 print:text-black">Relationship</div>
                  <div className="font-bold text-slate-800 text-sm print:text-black capitalize">{selectedSubmission.relationship || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1 print:text-black">Date</div>
                  <div className="font-bold text-slate-800 text-sm print:text-black">{new Date(selectedSubmission.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {selectedSubmission.month === '9' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary9Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}
            
            {selectedSubmission.month === '12' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary12Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}
            
            {selectedSubmission.month === '18' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary18Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}
            
            {selectedSubmission.month === '24' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary24Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}
            
            {selectedSubmission.month === '30' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary30Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}

            {selectedSubmission.month === '36' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary36Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}

            {selectedSubmission.month === '48' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary48Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}

            {selectedSubmission.month === '60' && (
              <div className="mb-12 pb-12 border-b-4 border-slate-200 print:mb-0 print:pb-0 print:border-none print:break-after-page">
                <Summary60Mo submission={liveSubmission} onSectionClick={handleSectionClick} />
              </div>
            )}

            {/* Form Body */}
            <div className="py-8 print:p-0">
              {(() => {
                const filteredKeys = (Object.keys(currentData) as Array<keyof MonthData>).filter((sectionKey) => {
                  if (sectionKey === 'overall') {
                    return true;
                  }
                  
                  const scoreKey = sectionToScoringKey[sectionKey];
                  const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);
                  const sectionStatus = scoreRow ? scoreRow.status : 'normal';
                  
                  return selectedFilters.includes(sectionStatus);
                });

                const visibleDomainCount = filteredKeys.filter(k => k !== 'overall').length;

                const toggleFilter = (filter: 'normal' | 'borderline' | 'abnormal') => {
                  setSelectedFilters(prev => {
                    if (prev.includes(filter)) {
                      return prev.filter(f => f !== filter);
                    } else {
                      return [...prev, filter];
                    }
                  });
                };

                return (
                  <>
                    {/* Filter Controls */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 print:hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                            Filter Questionnaire Sections
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Toggle developmental milestone status categories to filter sections. Multiple selections are supported.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => toggleFilter('normal')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border flex items-center gap-1.5 ${
                              selectedFilters.includes('normal')
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedFilters.includes('normal') ? 'bg-white' : 'bg-emerald-500'}`}></span>
                            Normal ({normalCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFilter('borderline')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border flex items-center gap-1.5 ${
                              selectedFilters.includes('borderline')
                                ? 'bg-[#FEF08A] text-[#713F12] border-[#FEF08A] shadow-sm'
                                : 'bg-white text-[#713F12] border-yellow-200 hover:bg-yellow-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedFilters.includes('borderline') ? 'bg-[#713F12]' : 'bg-[#FEF08A]'}`}></span>
                            Borderline ({borderlineCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFilter('abnormal')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border flex items-center gap-1.5 ${
                              selectedFilters.includes('abnormal')
                                ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                : 'bg-white text-red-700 border-red-200 hover:bg-red-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedFilters.includes('abnormal') ? 'bg-white' : 'bg-red-500'}`}></span>
                            Abnormal ({abnormalCount})
                          </button>
                          {selectedFilters.length < 3 && (
                            <button
                              type="button"
                              onClick={() => setSelectedFilters(['normal', 'borderline', 'abnormal'])}
                              className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                            >
                              Show All
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Filter Empty State Alert */}
                    {visibleDomainCount === 0 && (
                      <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-lg py-12 px-4 mb-8 text-center bg-slate-50/50">
                        <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-3">
                          <Check className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm">No Sections Match Your Filter</h5>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                          Try selecting more developmental milestone categories (Normal, Borderline, or Abnormal) to display corresponding questionnaire sections.
                        </p>
                        <button 
                          type="button"
                          onClick={() => setSelectedFilters(['normal', 'borderline', 'abnormal'])}
                          className="mt-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors"
                        >
                          Show All Sections
                        </button>
                      </div>
                    )}

                    {filteredKeys.map((sectionKey) => {
                      const isOverall = sectionKey === 'overall';
                      const questions = currentData[sectionKey];
                      
                      let sectionTotal = 0;
                      let answeredCount = 0;
                      if (!isOverall) {
                        questions.forEach((q: any) => {
                          const val = answers[q.id];
                          if (val === 'YES') { sectionTotal += 10; answeredCount++; }
                          else if (val === 'SOMETIMES') { sectionTotal += 5; answeredCount++; }
                          else if (val === 'NOT YET') { answeredCount++; }
                        });
                        if (answeredCount > 0 && answeredCount < questions.length) {
                          sectionTotal = Math.round((sectionTotal / answeredCount) * questions.length);
                        }
                      }

                      const scoreKey = sectionToScoringKey[sectionKey];
                                            const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);

                      const isSectionEdited = () => {
                        if (!originalAnswers) return false;
                        for (let i = 1; i <= 6; i++) {
                          const qId = `${selectedSubmission.month}_${scoreKey}_${i}`;
                          if ((answers[qId] || '') !== (originalAnswers[qId] || '')) return true;
                        }
                        return false;
                      };
                      const sectionEdited = !isOverall && isSectionEdited();

                      return (
                        <div key={sectionKey} id={`section-${sectionKey}`} className="mb-12 print:mb-4 print:break-inside-avoid scroll-mt-20">
                          <div className="flex border-4 border-blue-600 bg-white mb-6 print:mb-2 p-4 print:p-2 items-center rounded-sm">
                            <h3 className="text-base print:text-sm font-extrabold text-blue-600 uppercase tracking-wide flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold print:hidden">
                                {Object.keys(currentData).indexOf(sectionKey) + 1}
                              </span>
                              {sectionTitles[sectionKey]}
                            </h3>
                            {!isOverall && scoreRow && (
                              <div className="ml-4 flex items-center">
                                <span className={`px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-wider rounded border-2 ${
                                  sectionEdited ? 'bg-admin-edited border-transparent shadow-sm' : 'border-transparent text-white'
                                } ${
                                  scoreRow.status === 'abnormal'
                                    ? 'bg-red-600'
                                    : scoreRow.status === 'borderline'
                                    ? 'bg-[#FEF08A] !text-[#713F12]'
                                    : 'bg-emerald-600'
                                }`}>
                                  Score: {sectionTotal}
                                </span>
                              </div>
                            )}
                            {!isOverall && (
                              <div className="ml-auto hidden md:flex print:!flex gap-6 print:gap-4 text-xs print:text-[10px] font-black text-blue-600 uppercase tracking-wider print:text-black">
                                <span className="w-12 text-center">Yes</span>
                                <span className="w-20 text-center">Sometimes</span>
                                <span className="w-16 text-center">Not Yet</span>
                                <span className="w-16 text-center">Score</span>
                              </div>
                            )}
                          </div>
                    {isOverall && (
                      <div className="text-sm italic text-slate-800 print:text-black mb-6">
                        Parents and providers may use the space below for additional comments.
                      </div>
                    )}

                    <div className="space-y-6 print:space-y-3">
                      {questions.map((q: any, idx: number) => {
                        const number = idx + 1;
                        
                        if (isOverall) {
                          const isAnsEdited = answers[q.id] !== originalAnswers[q.id];
                          const isAbnormal = q.text.toLowerCase().includes('if no, explain')
                            ? answers[q.id] === 'NO'
                            : q.text.toLowerCase().includes('if yes, explain')
                            ? answers[q.id] === 'YES'
                            : false;
                          return (
                            <div key={q.id} className="mb-8 print:mb-4 print:break-inside-avoid">
                              <div className="flex flex-col md:flex-row gap-4 print:gap-2 items-start mb-3 print:mb-1">
                                <div className="flex gap-4 print:gap-2 flex-1 w-full">
                                  <span className="font-bold text-slate-800 print:text-black shrink-0">{number}.</span>
                                  <div className="flex-1">
                                    <span dangerouslySetInnerHTML={{ __html: q.text }} className="text-sm print:text-xs text-slate-800 print:text-black leading-relaxed print:leading-snug" />
                                    {isAnsEdited && (
                                      <span className="ml-2 text-xs font-bold text-slate-700 bg-slate-100 border border-transparent px-1.5 py-0.5 rounded">
                                        Edited
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-6 print:gap-4 shrink-0 mt-2 md:mt-0 pl-8 md:pl-0">
                                  {['YES', 'NO'].map((opt) => {
                                    const isSelected = answers[q.id] === opt;
                                    let borderBgClass = 'border-slate-400';
                                    if (isSelected) {
                                      if (isAnsEdited) {
                                        borderBgClass = 'border-blue-600 bg-blue-600 print:bg-black print:border-black';
                                      } else {
                                        borderBgClass = 'border-blue-600 bg-blue-600 print:bg-black print:border-black';
                                      }
                                    }
                                    return (
                                      <div 
                                        key={opt} 
                                        onClick={() => isEditing && handleAnswerChange(q.id, opt)}
                                        className={`flex items-center gap-2 print:gap-1 ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                                      >
                                        <div className={`w-4 h-4 print:w-3.5 print:h-3.5 rounded-full border-2 flex items-center justify-center ${borderBgClass}`}>
                                          {isSelected && <div className="w-1.5 h-1.5 print:w-1 print:h-1 bg-white rounded-full"></div>}
                                        </div>
                                        <span className={`text-sm print:text-xs font-semibold print:text-black ${isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-700'}`}>{opt}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              {isAnsEdited && (
                                <div className="text-xs text-slate-400 mt-1 pl-8">
                                  Original intake: <span className="line-through font-semibold">{originalAnswers[q.id] || 'Not answered'}</span>{editedBy[q.id] && <span className="ml-2 text-[6px]">edited by: {editedBy[q.id]}</span>}
                                </div>
                              )}
                              
                              {isEditing ? (
                                <div className="mt-2 w-full pl-8">
                                  <textarea
                                    value={answers[`${q.id}_explain`] || ''}
                                    onChange={(e) => handleAnswerChange(`${q.id}_explain`, e.target.value)}
                                    placeholder="Explain..."
                                    className={`w-full min-h-[4rem] px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                                      answers[`${q.id}_explain`] !== originalAnswers[`${q.id}_explain`]
                                        ? 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited'
                                        : isAbnormal
                                        ? 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited'
                                        : 'border-slate-200 bg-white focus:ring-blue-500'
                                    }`}
                                  />
                                  {answers[`${q.id}_explain`] !== originalAnswers[`${q.id}_explain`] && (
                                    <div className="text-xs text-slate-500 mt-1 font-medium">
                                      Original intake explain: <span className="italic font-normal line-through">{originalAnswers[`${q.id}_explain`] || '(empty)'}</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {answers[`${q.id}_explain`] && (
                                    <div className={`w-full mt-2 min-h-[4rem] h-auto px-3 py-2 border rounded text-sm whitespace-pre-wrap break-words pl-8 ${
                                      answers[`${q.id}_explain`] !== originalAnswers[`${q.id}_explain`]
                                        ? 'border-slate-200 bg-slate-100 text-slate-800 font-semibold bg-admin-edited'
                                        : isAbnormal
                                        ? 'border-red-300 bg-red-100/50 text-red-700 font-bold shadow-sm'
                                        : 'border-slate-200 bg-slate-50 text-blue-600 font-medium'
                                    }`}>
                                      {answers[`${q.id}_explain`]}
                                    </div>
                                  )}
                                  {answers[`${q.id}_explain`] !== originalAnswers[`${q.id}_explain`] && (
                                    <div className="text-xs text-slate-500 mt-1 pl-9 font-medium">
                                      Original intake explain: <span className="italic font-normal line-through">{originalAnswers[`${q.id}_explain`] || '(empty)'}</span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div key={q.id} className="flex flex-col md:flex-row md:gap-6 print:gap-4 items-start border-b border-slate-100 pb-6 print:pb-2 print:border-slate-300">
                            <div className="flex gap-4 print:gap-2 md:gap-6 flex-1 w-full mb-4 md:mb-0 print:mb-0">
                              <span className="font-bold text-slate-800 print:text-black shrink-0 mt-0.5 print:text-sm">{number}.</span>
                              
                              <div className="flex-1 block">
                                {(q.imageUrl || q.imageAlt) && q.imagePosition !== 'bottom' && (
                                  <QuestionImage q={q} alt={q.imageAlt || "Illustration"} position="right" />
                                )}
                                <span dangerouslySetInnerHTML={{ __html: q.text }} className="text-slate-800 print:text-black text-sm print:text-xs leading-relaxed print:leading-snug inline" />
                                {(q.imageUrl || q.imageAlt) && q.imagePosition === 'bottom' && (
                                  <QuestionImage q={q} alt={q.imageAlt || "Illustration"} position="bottom" />
                                )}

                                {q.hasTextBox && (
                                  <div className="mt-3 print:mt-1 clear-both">
                                    {q.textBoxLabel && (
                                      <label className="block text-sm print:text-xs text-slate-600 print:text-slate-800 mb-1">
                                        <span dangerouslySetInnerHTML={{ __html: q.textBoxLabel }} />
                                      </label>
                                    )}
                                    {isEditing ? (
                                      <textarea
                                        value={answers[`${q.id}_text`] || ''}
                                        onChange={(e) => handleAnswerChange(`${q.id}_text`, e.target.value)}
                                        className={`w-full min-h-[3.5rem] px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                                          answers[`${q.id}_text`] !== originalAnswers[`${q.id}_text`]
                                            ? 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited'
                                            : 'border-slate-200 bg-white focus:ring-blue-500'
                                        }`}
                                      />
                                    ) : (
                                      <div className={`w-full min-h-[3.5rem] h-auto px-3 py-2 print:py-1 border rounded text-sm whitespace-pre-wrap break-words ${
                                        answers[`${q.id}_text`] !== originalAnswers[`${q.id}_text`]
                                          ? 'border-slate-200 bg-slate-100 text-slate-800 font-semibold bg-admin-edited'
                                          : 'border-slate-200 bg-slate-50 text-[#2563EB] font-medium'
                                      }`}>
                                        {answers[`${q.id}_text`] || ''}
                                      </div>
                                    )}
                                    {answers[`${q.id}_text`] !== originalAnswers[`${q.id}_text`] && (
                                      <div className="text-xs text-slate-400 mt-1">
                                        Original intake: <span className="italic font-normal line-through">{originalAnswers[`${q.id}_text`] || '(empty)'}</span>{editedBy[`${q.id}_text`] && <span className="ml-2 text-[6px]">edited by: {editedBy[`${q.id}_text`]}</span>}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {q.multipleTextBoxes && (
                                  <div className="mt-3 print:mt-1 flex flex-col gap-4 print:gap-1 clear-both">
                                    {q.multipleTextBoxes.map((label, idx) => {
                                      const key = `${q.id}_multiple_${idx}`;
                                      const isFieldEdited = answers[key] !== originalAnswers[key];
                                      return (
                                        <div key={idx}>
                                          <label className="block text-sm print:text-xs text-slate-600 print:text-slate-800 mb-1">
                                            <span dangerouslySetInnerHTML={{ __html: label }} />
                                          </label>
                                          {isEditing ? (
                                            <textarea
                                              value={answers[key] || ''}
                                              onChange={(e) => handleAnswerChange(key, e.target.value)}
                                              className={`w-full min-h-[2.5rem] px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                                                isFieldEdited
                                                  ? 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited'
                                                  : 'border-slate-200 bg-white focus:ring-blue-500'
                                              }`}
                                            />
                                          ) : (
                                            <div className={`w-full min-h-[2.5rem] h-auto px-3 py-2 print:py-1 border rounded text-sm whitespace-pre-wrap break-words ${
                                              isFieldEdited
                                                ? 'border-slate-200 bg-slate-100 text-slate-800 font-semibold bg-admin-edited'
                                                : 'border-slate-200 bg-slate-50 text-[#2563EB] font-medium'
                                            }`}>
                                              {answers[key] || ''}
                                            </div>
                                          )}
                                          {isFieldEdited && (
                                            <div className="text-xs text-slate-400 mt-1">
                                              Original intake: <span className="italic font-normal line-through">{originalAnswers[key] || '(empty)'}</span>{editedBy[key] && <span className="ml-2 text-[6px]">edited by: {editedBy[key]}</span>}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {q.inlineTextBoxes && (
                                  <div className="mt-3 print:mt-1 flex flex-col gap-3 print:gap-1 clear-both">
                                    {q.inlineTextBoxes.map((label, idx) => {
                                      const key = `${q.id}_inline_${idx}`;
                                      const isFieldEdited = answers[key] !== originalAnswers[key];
                                      return (
                                        <div key={idx} className="flex flex-col gap-1">
                                          <div className="flex items-center gap-2 print:gap-1">
                                            <span className="text-sm print:text-xs text-slate-800 print:text-black shrink-0" dangerouslySetInnerHTML={{ __html: label }} />
                                            {isEditing ? (
                                              <input
                                                type="text"
                                                value={answers[key] || ''}
                                                onChange={(e) => handleAnswerChange(key, e.target.value)}
                                                className={`flex-1 min-w-[120px] px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 ${
                                                  isFieldEdited
                                                    ? 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited'
                                                    : 'border-slate-200 bg-white focus:ring-blue-500'
                                                }`}
                                              />
                                            ) : (
                                              <div className={`flex-1 min-w-[120px] px-3 py-1.5 print:py-0.5 border rounded text-sm whitespace-pre-wrap break-words ${
                                                isFieldEdited
                                                  ? 'border-slate-200 bg-slate-100 text-slate-800 font-semibold bg-admin-edited'
                                                  : 'border-slate-200 bg-slate-50 text-[#2563EB] font-medium'
                                              }`}>
                                                {answers[key] || ''}
                                              </div>
                                            )}
                                          </div>
                                          {isFieldEdited && (
                                            <div className="text-xs text-slate-400 pl-4">
                                              Original intake: <span className="italic font-normal line-through">{originalAnswers[key] || '(empty)'}</span>{editedBy[key] && <span className="ml-2 text-[6px]">edited by: {editedBy[key]}</span>}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {q.checkboxes && (
                                  <div className="mt-3 print:mt-1 grid grid-cols-2 gap-3 print:gap-1 clear-both">
                                    {q.checkboxes.map((label, idx) => {
                                      const key = `${q.id}_checkbox_${idx}`;
                                      const isFieldEdited = answers[key] !== originalAnswers[key];
                                      const isChecked = answers[key] === 'true';
                                      return (
                                        <div key={idx} className="flex flex-col gap-0.5">
                                          <div 
                                            onClick={() => isEditing && handleAnswerChange(key, isChecked ? 'false' : 'true')}
                                            className={`flex items-start gap-2 print:gap-1 ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                                          >
                                            <div className={`flex items-center justify-center w-5 h-5 print:w-3.5 print:h-3.5 mt-0.5 shrink-0 border rounded bg-white print:bg-transparent ${
                                              isFieldEdited ? 'border-slate-400' : 'border-slate-400'
                                            }`}>
                                              {isChecked && (
                                                <svg className={`w-3.5 h-3.5 print:w-2.5 print:h-2.5 text-blue-600 print:text-black`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                              )}
                                            </div>
                                            <span className={`text-sm print:text-xs leading-snug ${isFieldEdited ? 'text-slate-900 font-semibold bg-admin-edited px-1 rounded' : 'text-slate-700'} print:text-black`}>{label}</span>
                                          </div>
                                          {isFieldEdited && (
                                            <div className="text-[10px] text-slate-400 pl-7">
                                              Original intake: <span className="italic font-normal line-through">{originalAnswers[key] === 'true' ? 'Checked' : 'Unchecked'}</span>{editedBy[key] && <span className="ml-2 text-[6px]">edited by: {editedBy[key]}</span>}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {q.footerText && (
                                  <div className="mt-4 print:mt-1 text-sm print:text-xs text-slate-500 print:text-slate-700 clear-both">
                                    <span dangerouslySetInnerHTML={{ __html: q.footerText }} />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Answer Choices */}
                            <div className="flex flex-col gap-1 items-end shrink-0 w-full md:w-auto mt-2 md:mt-1 print:mt-0 pl-8 md:pl-0 print:pl-0">
                              <div className="flex justify-between md:justify-end md:gap-6 print:gap-4 w-full md:w-auto">
                                {[
                                   { val: 'YES', label: 'Yes' },
                                   { val: 'SOMETIMES', label: 'Sometimes' },
                                   { val: 'NOT YET', label: 'Not Yet' }
                                ].map((opt) => {
                                  const isSelected = answers[q.id] === opt.val;
                                  const isAnsEdited = answers[q.id] !== originalAnswers[q.id];
                                  let borderBgClass = 'border-slate-300';
                                  if (isSelected) {
                                    if (isAnsEdited) {
                                      borderBgClass = 'border-blue-600 bg-blue-600 print:bg-black print:border-black';
                                    } else {
                                      borderBgClass = 'border-blue-600 bg-blue-600 print:bg-black print:border-black';
                                    }
                                  }
                                  return (
                                    <div 
                                      key={opt.val} 
                                      onClick={() => isEditing && handleAnswerChange(q.id, opt.val)}
                                      className={`flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-center md:w-12 md:[&:nth-child(2)]:w-20 md:[&:nth-child(3)]:w-16 ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                                    >
                                      <span className="md:hidden print:hidden text-[10px] font-bold text-slate-500 uppercase tracking-wider">{opt.label}</span>
                                      <div className={`w-4 h-4 print:w-3.5 print:h-3.5 rounded-full border-2 flex items-center justify-center ${borderBgClass}`}>
                                        {isSelected && <div className="w-1.5 h-1.5 print:w-1 print:h-1 bg-white rounded-full"></div>}
                                      </div>
                                    </div>
                                  );
                                })}
                                
                                {/* Line Score */}
                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-center md:w-16">
                                  <span className="md:hidden print:hidden text-[10px] font-bold text-slate-500 uppercase tracking-wider">Score</span>
                                  <div className={`w-8 print:w-6 border-2 text-center text-sm print:text-[10px] font-bold pb-0.5 rounded px-1 ${
                                    answers[q.id] !== originalAnswers[q.id]
                                      ? 'text-slate-800 bg-slate-100 border-slate-400 font-extrabold shadow-sm bg-admin-edited'
                                      : 'text-slate-800 bg-slate-100 border-slate-400'
                                  }`}>
                                    {(() => {
                                      const val = answers[q.id];
                                      if (val === 'YES') return '10';
                                      if (val === 'SOMETIMES') return '5';
                                      if (val === 'NOT YET') return '0';
                                      return '';
                                    })()}
                                  </div>
                                </div>
                              </div>
                              {answers[q.id] !== originalAnswers[q.id] && (
                                <div className="text-xs text-slate-400 mt-1 md:mr-16 font-medium">
                                  Original intake: <span className="line-through">{originalAnswers[q.id] || 'Not answered'}</span>{editedBy[q.id] && <span className="ml-2 text-[6px]">edited by: {editedBy[q.id]}</span>}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Section Total removed from bottom as requested */}
                    </div>
                  </div>
                );
              })}
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {toastMessage && (
          <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 transition-all ${toastMessage.type === 'success' ? 'bg-slate-800 text-white' : 'bg-red-500 text-white'}`}>
            {toastMessage.type === 'success' ? <Check className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5" />}
            {toastMessage.text}
          </div>
        )}
      </div>
    );
  }

  return null;
}
