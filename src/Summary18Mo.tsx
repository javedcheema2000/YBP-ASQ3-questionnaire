import React, { useState } from 'react';
import { Submission, updateSubmission } from './store';

const ASQ_18_MO_SCORING = [
  { key: 'c', label: 'Communication', cutoff: 13.06, black: 10, gray: 25 },
  { key: 'gm', label: 'Gross Motor', cutoff: 37.38, black: 35, gray: 40 },
  { key: 'fm', label: 'Fine Motor', cutoff: 34.32, black: 30, gray: 40 },
  { key: 'ps', label: 'Problem Solving', cutoff: 25.74, black: 25, gray: 35 },
  { key: 'pe', label: 'Personal Social', cutoff: 27.19, black: 25, gray: 35 },
];

const keyToSectionKey: Record<string, string> = {
  c: 'communication',
  gm: 'grossMotor',
  fm: 'fineMotor',
  ps: 'problemSolving',
  pe: 'personalSocial',
};

export function Summary18Mo({ submission, onSectionClick }: { submission: Submission; onSectionClick?: (sectionKey: string) => void }) {
  const { answers } = submission;
  const [adminAnswers, setAdminAnswers] = useState<Record<string, any>>(submission.adminAnswers || {});

  const updateAdmin = (key: string, val: any) => {
    let newAnswers = { ...adminAnswers, [key]: val };
    if (key === 'action_3_hearing' || key === 'action_3_vision' || key === 'action_3_behavioral') {
      const isAnyChecked = newAnswers['action_3_hearing'] === 'true' || 
                           newAnswers['action_3_vision'] === 'true' || 
                           newAnswers['action_3_behavioral'] === 'true';
      newAnswers['action_3'] = isAnyChecked ? 'true' : 'false';
    } else if (key === 'action_3' && val === 'false') {
      newAnswers['action_3_hearing'] = 'false';
      newAnswers['action_3_vision'] = 'false';
      newAnswers['action_3_behavioral'] = 'false';
    }
    setAdminAnswers(newAnswers);
    updateSubmission(submission.id, { adminAnswers: newAnswers });
  };

  const computeScore = (prefix: string) => {
    let sum = 0;
    let answered = 0;
    for (let i = 1; i <= 6; i++) {
      const val = answers[`18_${prefix}_${i}`];
      if (val === 'YES') { sum += 10; answered++; }
      else if (val === 'SOMETIMES') { sum += 5; answered++; }
      else if (val === 'NOT YET') { sum += 0; answered++; }
    }
    if (answered === 0) return 0;
    return Math.round((sum / answered) * 6);
  };

  const scores = ASQ_18_MO_SCORING.map(row => {
    return {
      ...row,
      score: computeScore(row.key)
    };
  });

  const getOverallVal = (id: string) => answers[id];

  const isSectionEdited = (prefix: string) => {
    const orig = submission.originalAnswers || submission.answers || {};
    for (let i = 1; i <= 6; i++) {
      const qId = `${submission.month}_${prefix}_${i}`;
      if ((answers[qId] || '') !== (orig[qId] || '')) {
        return true;
      }
    }
    return false;
  };

  const getOverallBadgeClass = (qId: string, optVal: string, isAbnormalVal: boolean) => {
    const isSelected = getOverallVal(qId) === optVal;
    if (!isSelected) return 'border-2 border-transparent text-slate-400';
    
    const orig = submission.originalAnswers || submission.answers || {};
    const isAnsEdited = (answers[qId] || '') !== (orig[qId] || '');
    
    if (isAnsEdited) {
      return 'border-2 border-purple-500 bg-purple-50 text-purple-700 font-bold rounded';
    }
    
    if (isAbnormalVal) {
      return 'border-2 border-red-500 bg-red-50 text-red-600 font-bold rounded';
    }
    
    return 'border-2 border-slate-600 bg-slate-100 text-slate-800 rounded font-semibold';
  };

  const getOverallExplainClass = (qId: string, isAbnormalVal: boolean) => {
    const orig = submission.originalAnswers || submission.answers || {};
    const isAnsEdited = (answers[qId] || '') !== (orig[qId] || '');
    
    if (isAnsEdited) {
      return 'bg-purple-50 border border-purple-200 text-purple-700 pl-5 text-xs print:text-[10px] whitespace-pre-wrap break-words mt-1 rounded p-1.5';
    }
    
    if (isAbnormalVal) {
      return 'bg-red-50 border border-red-200 text-red-700 pl-5 text-xs print:text-[10px] whitespace-pre-wrap break-words mt-1 rounded p-1.5';
    }
    
    return 'text-[#2563EB] bg-slate-50 border border-slate-100 pl-5 text-xs print:text-[10px] whitespace-pre-wrap break-words mt-1 rounded p-1.5';
  };

  return (
    <div className="font-sans text-black max-w-5xl mx-auto space-y-8 print:space-y-3 print:w-[800px] text-sm print:text-[11px] print:leading-snug">
      <header className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 print:gap-y-0.5 text-[13px] print:text-[10px] print:grid-cols-2">
        <div className="flex items-end border-b border-black pb-0.5">
          <span className="shrink-0 mr-2">Child's name:</span>
          <span className="font-bold flex-1"></span>
        </div>
        <div className="flex items-end border-b border-black pb-0.5">
          <span className="shrink-0 mr-2">Date ASQ completed:</span>
          <span className="font-bold flex-1">{new Date(submission.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-end border-b border-black pb-0.5">
          <span className="shrink-0 mr-2">Child's ID #:</span>
          <span className="font-bold flex-1">{submission.patientId}</span>
        </div>
        <div className="flex items-end border-b border-black pb-0.5">
          <span className="shrink-0 mr-2">Date of birth:</span>
          <span className="font-bold flex-1"></span>
        </div>
        <div className="flex items-end border-b border-black pb-0.5">
          <span className="shrink-0 mr-2">Administering program/provider:</span>
          <span className="font-bold flex-1"></span>
        </div>
        <div className="flex items-center gap-4 print:gap-2 border-b border-black pb-0.5 justify-between">
          <span className="shrink-0 text-xs print:text-[10px] leading-tight">Was age adjusted for prematurity<br/>when selecting questionnaire?</span>
          <div className="flex gap-4 print:gap-2">
            <label className="flex items-center gap-1 print:p-[2px] cursor-pointer">
              <div className={`w-4 h-4 rounded-full border border-black flex items-center justify-center`}>
                {adminAnswers['ageAdjusted'] === 'Yes' && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
              <input type="radio" className="sr-only" checked={adminAnswers['ageAdjusted'] === 'Yes'} onChange={() => updateAdmin('ageAdjusted', 'Yes')} />
              Yes
            </label>
            <label className="flex items-center gap-1 print:p-[2px] cursor-pointer">
              <div className={`w-4 h-4 rounded-full border border-black flex items-center justify-center`}>
                {adminAnswers['ageAdjusted'] === 'No' && <div className="w-2 h-2 bg-black rounded-full" />}
              </div>
              <input type="radio" className="sr-only" checked={adminAnswers['ageAdjusted'] === 'No'} onChange={() => updateAdmin('ageAdjusted', 'No')} />
              No
            </label>
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-bold text-base print:text-sm mb-2 print:mb-0.5 uppercase flex items-start print:leading-tight gap-2">
          <span>1.</span> 
          <span>SCORE AND TRANSFER TOTALS TO CHART BELOW: See ASQ-3 User's Guide for details, including how to adjust scores if item responses are missing. Score each item (YES = 10, SOMETIMES = 5, NOT YET = 0). Add item scores, and record each area total. In the chart below, transfer the total scores, and fill in the circles corresponding with the total scores.</span>
        </h2>
        
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin print:overflow-visible print:-mx-0 print:px-0">

        
          <table className="w-full min-w-[750px] md:min-w-0 border-collapse text-xs print:text-[10px] border border-black mt-4 print:mt-1 print:min-w-0">
          <thead>
            <tr>
              <th className="border border-black p-1 print:p-[2px] font-normal w-24 text-right">Area</th>
              <th className="border border-black p-1 print:p-[2px] font-bold w-12 text-center text-[10px]">Cutoff</th>
              <th className="border border-black p-1 print:p-[2px] font-bold w-12 text-center text-[10px]">Total<br/>Score</th>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(val => (
                <th key={val} className="border-0 p-1 print:p-[2px] font-normal text-center w-8">{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((row) => (
              <tr 
                key={row.key} 
                onClick={() => onSectionClick?.(keyToSectionKey[row.key])}
                title={`Click to view ${row.label} section`}
                className="border border-black cursor-pointer hover:bg-sky-50 transition-colors"
              >
                <td className="border border-black p-1 print:p-[2px] text-right">{row.label}</td>
                <td className="border border-black p-1 print:p-[2px] text-center">{row.cutoff}</td>
                {(() => {
                  const isBlack = row.score <= row.black;
                  const isGray = row.score > row.black && row.score <= row.gray;
                  const baseBg = isBlack ? 'bg-[#FECACA]' : isGray ? 'bg-[#FED7AA]' : 'bg-[#D1FAE5]';
                  const textClass = isSectionEdited(row.key)
                    ? '!text-purple-900 font-black border-[2px] border-purple-600 bg-admin-edited'
                    : isBlack 
                      ? 'text-[#7F1D1D] font-extrabold border-black'
                      : isGray
                        ? 'text-[#78350F] font-extrabold border-black'
                        : 'text-[#064E3B] font-extrabold border-black';
                  return (
                    <td className={`border p-1 print:p-[2px] text-center ${baseBg} ${textClass}`}>{row.score}</td>
                  );
                })()}
                <td colSpan={13} className="p-0 border border-black relative h-6">
                  <div className="absolute inset-0 flex">
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(val => {
                      const isBlack = val <= row.black;
                      const isGray = val > row.black && val <= row.gray;
                      const bg = isBlack ? 'bg-[#FECACA]' : isGray ? 'bg-[#FED7AA]' : 'bg-[#D1FAE5]';
                      
                      const closestScore = Math.round(row.score / 5) * 5;
                      const isFilled = closestScore === val;
                      
                      return (
                        <div key={val} className={`flex-1 flex items-center justify-center ${bg} border-l border-white/20`}>
                          <div className={`w-3.5 h-3.5 rounded-full border border-black flex items-center justify-center bg-white ${isFilled ? 'border-[3px]' : ''}`}>
                            {isFilled && (
                              <div className={`w-1.5 h-1.5 rounded-full ${isSectionEdited(row.key) ? 'bg-purple-600' : 'bg-black'}`} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-base print:text-sm mb-4 print:mb-1 uppercase flex items-start print:leading-tight gap-2">
          <span>2.</span> 
          <span>TRANSFER OVERALL RESPONSES: Bolded uppercase responses require follow-up. See ASQ-3 User's Guide, Chapter 6.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 print:gap-x-4 print:gap-y-0.5 print:grid-cols-2">
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>1.</span> Hears well?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_1', 'YES', false)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_1', 'NO', true)}`}>No</span>
              </span>
            </div>
            {answers['18_o_1_explain'] && (
            <div className={getOverallExplainClass('18_o_1', getOverallVal('18_o_1') === 'NO')}>
              {answers['18_o_1_explain']}
            </div>
          )}
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>6.</span> Concerns about vision?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_6', 'YES', true)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_6', 'NO', false)}`}>No</span>
              </span>
            </div>
            {answers['18_o_6_explain'] && (
            <div className={getOverallExplainClass('18_o_6', getOverallVal('18_o_6') === 'YES')}>
              {answers['18_o_6_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>2.</span> Talks like other toddlers his age?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_2', 'YES', false)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_2', 'NO', true)}`}>No</span>
              </span>
            </div>
            {answers['18_o_2_explain'] && (
            <div className={getOverallExplainClass('18_o_2', getOverallVal('18_o_2') === 'NO')}>
              {answers['18_o_2_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>7.</span> Any medical problems?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_7', 'YES', true)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_7', 'NO', false)}`}>No</span>
              </span>
            </div>
            {answers['18_o_7_explain'] && (
            <div className={getOverallExplainClass('18_o_7', getOverallVal('18_o_7') === 'YES')}>
              {answers['18_o_7_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>3.</span> Understand most of what your child says?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_3', 'YES', false)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_3', 'NO', true)}`}>No</span>
              </span>
            </div>
            {answers['18_o_3_explain'] && (
            <div className={getOverallExplainClass('18_o_3', getOverallVal('18_o_3') === 'NO')}>
              {answers['18_o_3_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>8.</span> Concerns about behavior?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_8', 'YES', true)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_8', 'NO', false)}`}>No</span>
              </span>
            </div>
            {answers['18_o_8_explain'] && (
            <div className={getOverallExplainClass('18_o_8', getOverallVal('18_o_8') === 'YES')}>
              {answers['18_o_8_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>4.</span> Walks, runs, and climbs like other toddlers?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_4', 'YES', false)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_4', 'NO', true)}`}>No</span>
              </span>
            </div>
            {answers['18_o_4_explain'] && (
            <div className={getOverallExplainClass('18_o_4', getOverallVal('18_o_4') === 'NO')}>
              {answers['18_o_4_explain']}
            </div>
          )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>9.</span> Other concerns?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_9', 'YES', true)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_9', 'NO', false)}`}>No</span>
              </span>
            </div>
            {answers['18_o_9_explain'] && (
            <div className={getOverallExplainClass('18_o_9', getOverallVal('18_o_9') === 'YES')}>
              {answers['18_o_9_explain']}
            </div>
          )}
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="flex gap-2"><span>5.</span> Family history of hearing impairment?</span>
              <span className="shrink-0 space-x-2 font-medium flex items-center">
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_5', 'YES', true)}`}>Yes</span>
                <span className={`px-1.5 py-0.5 ${getOverallBadgeClass('18_o_5', 'NO', false)}`}>No</span>
              </span>
            </div>
            {answers['18_o_5_explain'] && (
            <div className={getOverallExplainClass('18_o_5', getOverallVal('18_o_5') === 'YES')}>
              {answers['18_o_5_explain']}
            </div>
          )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-base print:text-sm mb-2 print:mb-0.5 uppercase flex items-start print:leading-tight gap-2">
          <span>3.</span> 
          <span>ASQ SCORE INTERPRETATION AND RECOMMENDATION FOR FOLLOW-UP: You must consider total area scores, overall responses, and other considerations, such as opportunities to practice skills, to determine appropriate follow-up.</span>
        </h2>
        <div className="pl-5 space-y-1">
          <div className="flex items-center gap-2">
            <span>If the child's total score is in the</span>
            <div className="w-6 h-3 border border-black bg-[#D1FAE5]"></div>
            <span>area, it is above the cutoff, and the child's development appears to be on schedule.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>If the child's total score is in the</span>
            <div className="w-6 h-3 border border-black bg-[#FED7AA]"></div>
            <span>area, it is close to the cutoff. Provide learning activities and monitor.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>If the child's total score is in the</span>
            <div className="w-6 h-3 border border-black bg-[#FECACA]"></div>
            <span>area, it is below the cutoff. Further assessment with a professional may be needed.</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4 print:grid-cols-2">
        <section>
          <h2 className="font-bold text-base print:text-sm mb-4 print:mb-1 uppercase flex items-start print:leading-tight gap-2">
            <span>4.</span> 
            <span>FOLLOW-UP ACTION TAKEN: Check all that apply.</span>
          </h2>
          <div className="space-y-3 print:space-y-1 pl-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_1'] === 'true'} onChange={(e) => updateAdmin('action_1', e.target.checked ? 'true' : 'false')} />
              <span>Provide activities and rescreen in</span>
              <input type="text" className="w-12 border border-gray-400 bg-[#FFF3D3] px-2 py-0.5 rounded text-center focus:ring-black" value={adminAnswers['action_1_val'] || ''} onChange={(e) => updateAdmin('action_1_val', e.target.value)} />
              <span>months.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_2'] === 'true'} onChange={(e) => updateAdmin('action_2', e.target.checked ? 'true' : 'false')} />
              <span>Share results with primary health care provider.</span>
            </label>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423] mt-1" checked={adminAnswers['action_3'] === 'true'} onChange={(e) => updateAdmin('action_3', e.target.checked ? 'true' : 'false')} />
              <div className="flex-1 flex flex-col gap-1 print:p-[2px]">
                <span>Refer for screenings:</span>
                <div className="flex items-center gap-4 print:gap-2 text-sm print:text-xs font-medium">
                  <label className="flex items-center gap-1 print:p-[2px].5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_3_hearing'] === 'true'} onChange={(e) => updateAdmin('action_3_hearing', e.target.checked ? 'true' : 'false')} />
                    <span>hearing</span>
                  </label>
                  <label className="flex items-center gap-1 print:p-[2px].5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_3_vision'] === 'true'} onChange={(e) => updateAdmin('action_3_vision', e.target.checked ? 'true' : 'false')} />
                    <span>vision</span>
                  </label>
                  <label className="flex items-center gap-1 print:p-[2px].5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_3_behavioral'] === 'true'} onChange={(e) => updateAdmin('action_3_behavioral', e.target.checked ? 'true' : 'false')} />
                    <span>behavioral</span>
                  </label>
                </div>
              </div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423] mt-1" checked={adminAnswers['action_4'] === 'true'} onChange={(e) => updateAdmin('action_4', e.target.checked ? 'true' : 'false')} />
              <span className="flex-1 leading-snug">
                Refer to primary health care provider or other community agency (specify reason): 
                <input type="text" className="w-full mt-1 border border-gray-400 bg-[#FFF3D3] px-2 py-0.5 rounded focus:ring-black" value={adminAnswers['action_4_val'] || ''} onChange={(e) => updateAdmin('action_4_val', e.target.value)} />
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_5'] === 'true'} onChange={(e) => updateAdmin('action_5', e.target.checked ? 'true' : 'false')} />
              <span>Refer to early intervention/early childhood special education.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_6'] === 'true'} onChange={(e) => updateAdmin('action_6', e.target.checked ? 'true' : 'false')} />
              <span>No further action taken at this time</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFC423] focus:ring-[#FFC423]" checked={adminAnswers['action_7'] === 'true'} onChange={(e) => updateAdmin('action_7', e.target.checked ? 'true' : 'false')} />
              <span>Other (specify):</span>
              <input type="text" className="flex-1 min-w-[150px] border border-gray-400 bg-[#FFF3D3] px-2 py-0.5 rounded focus:ring-black" value={adminAnswers['action_7_val'] || ''} onChange={(e) => updateAdmin('action_7_val', e.target.value)} />
            </label>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-base print:text-sm mb-2 print:mb-0.5 uppercase flex items-start print:leading-tight gap-2">
            <span>5.</span> 
            <span>OPTIONAL: Transfer item responses (Y = YES, S = SOMETIMES, N = NOT YET, X = response missing).</span>
          </h2>
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin print:overflow-visible print:-mx-0 print:px-0">

            <table className="w-full min-w-[450px] md:min-w-0 border-collapse border border-black text-center text-xs print:text-[10px] mt-4 print:mt-1 print:min-w-0">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-1 print:p-[2px]"></th>
                <th className="border-r border-black p-1 print:p-[2px]">1</th>
                <th className="border-r border-black p-1 print:p-[2px]">2</th>
                <th className="border-r border-black p-1 print:p-[2px]">3</th>
                <th className="border-r border-black p-1 print:p-[2px]">4</th>
                <th className="border-r border-black p-1 print:p-[2px]">5</th>
                <th className="p-1 print:p-[2px]">6</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(row => (
                <tr key={row.key} className="border-b border-black last:border-0">
                  <td className="border-r border-black p-1 print:p-[2px] text-right">{row.label}</td>
                  {[1, 2, 3, 4, 5, 6].map(i => {
                    const ans = answers[`18_${row.key}_${i}`];
                    const letter = ans === 'YES' ? 'Y' : ans === 'SOMETIMES' ? 'S' : ans === 'NOT YET' ? 'N' : 'X';
                    return <td key={i} className="border-r border-black p-1 print:p-[2px] last:border-0">{letter}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      </div>
    </div>
  );
}
