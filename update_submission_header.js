import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/SubmissionView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `                      const scoreRow = scoresAndStatus.scores.find(s => s.key === scoreKey);

                      const isSectionEdited = () => {
                        if (!originalAnswers) return false;
                        for (let i = 1; i <= 6; i++) {
                          const qId = \`\${selectedSubmission.month}_\${scoreKey}_\${i}\`;
                          if ((answers[qId] || '') !== (originalAnswers[qId] || '')) return true;
                        }
                        return false;
                      };
                      const sectionEdited = !isOverall && isSectionEdited();

                      return (
                        <div key={sectionKey} id={\`section-\${sectionKey}\`} className="mb-12 print:mb-4 print:break-inside-avoid scroll-mt-20">
                          <div className="flex bg-blue-600 text-white mb-6 print:mb-2 p-4 print:p-2 items-center rounded-sm">
                            <h3 className="text-base print:text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
                              <span className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs font-bold print:hidden">
                                {Object.keys(currentData).indexOf(sectionKey) + 1}
                              </span>
                              {sectionTitles[sectionKey]}
                            </h3>
                            {!isOverall && scoreRow && (
                              <div className="ml-4 flex items-center">
                                <span className={\`px-2 py-0.5 text-[10px] md:text-xs font-extrabold uppercase tracking-wider rounded border \${
                                  sectionEdited ? 'border-purple-300 text-purple-900 bg-admin-edited' : 'border-white text-white'
                                } \${
                                  scoreRow.status === 'abnormal'
                                    ? sectionEdited ? 'bg-rose-200' : 'bg-red-600'
                                    : scoreRow.status === 'borderline'
                                    ? sectionEdited ? 'bg-amber-200' : 'bg-amber-500'
                                    : sectionEdited ? 'bg-emerald-200' : 'bg-emerald-600'
                                }\`}>
                                  Score: {sectionTotal}
                                </span>
                              </div>
                            )}`;

content = content.replace(
  /const scoreRow = scoresAndStatus\.scores\.find\(s => s\.key === scoreKey\);\s*return \(\s*<div key={sectionKey}[^>]*>\s*<div className="flex bg-blue-600[^>]*>\s*<h3[^>]*>[\s\S]*?<\/h3>\s*\{\!isOverall && scoreRow && \(\s*<div className="ml-4 flex items-center">\s*<span className=\{\`px-2 py-0\.5 text-\[10px\] md:text-xs font-extrabold uppercase tracking-wider rounded border border-white text-white \$\{\s*scoreRow\.status === 'abnormal'\s*\?\s*'bg-red-600'\s*:\s*scoreRow\.status === 'borderline'\s*\?\s*'bg-amber-500'\s*:\s*'bg-emerald-600'\s*\}\`\}>\s*Score: \{sectionTotal\}\s*<\/span>\s*<\/div>\s*\)\}/,
  replacement
);

fs.writeFileSync(filePath, content);
console.log('Updated SubmissionView header');
