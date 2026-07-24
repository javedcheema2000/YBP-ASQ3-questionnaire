import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/SubmissionView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="flex bg-blue-600 text-white mb-6 print:mb-2 p-4 print:p-2 items-center rounded-sm">[\s\S]*?Score: \{sectionTotal\}\s*<\/span>\s*<\/div>\s*\)\}/;

const replacement = `<div className="flex border-4 border-blue-600 bg-white mb-6 print:mb-2 p-4 print:p-2 items-center rounded-sm">
                            <h3 className="text-base print:text-sm font-extrabold text-blue-600 uppercase tracking-wide flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold print:hidden">
                                {Object.keys(currentData).indexOf(sectionKey) + 1}
                              </span>
                              {sectionTitles[sectionKey]}
                            </h3>
                            {!isOverall && scoreRow && (
                              <div className="ml-4 flex items-center">
                                <span className={\`px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-wider rounded border-2 \${
                                  sectionEdited ? 'bg-admin-edited border-purple-600 !text-purple-900' : 'border-transparent text-white'
                                } \${
                                  scoreRow.status === 'abnormal'
                                    ? 'bg-red-600'
                                    : scoreRow.status === 'borderline'
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-600'
                                }\`}>
                                  Score: {sectionTotal}
                                </span>
                              </div>
                            )}`;

content = content.replace(regex, replacement);

content = content.replace(
  /<div className="ml-auto hidden md:flex print:!flex gap-6 print:gap-4 text-xs print:text-\[10px\] font-bold text-blue-100 uppercase tracking-wider print:text-black">/g,
  '<div className="ml-auto hidden md:flex print:!flex gap-6 print:gap-4 text-xs print:text-[10px] font-black text-blue-600 uppercase tracking-wider print:text-black">'
);

fs.writeFileSync(filePath, content);
console.log('Updated SubmissionView');
