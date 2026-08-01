import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

// 1. Update Summary*.tsx files
const summaryFiles = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));
for (const file of summaryFiles) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix scoring table: remove border-transparent and !text-purple-900, keep baseText and add border-black & bg-admin-edited
  const oldScoringBlock = /const textClass = isSectionEdited\(row\.key\)\s*\?\s*'!text-purple-900 font-black border-\[2px\] border-transparent bg-admin-edited'\s*:\s*isBlack\s*\?\s*'text-\[\#7F1D1D\] font-extrabold border-black'\s*:\s*isGray\s*\?\s*'text-\[\#713F12\] font-extrabold border-black'\s*:\s*'text-\[\#064E3B\] font-extrabold border-black';/g;
  
  const newScoringBlock = `const baseText = isBlack 
                    ? 'text-[#7F1D1D] font-extrabold border-black'
                    : isGray
                      ? 'text-[#713F12] font-extrabold border-black'
                      : 'text-[#064E3B] font-extrabold border-black';
                  const textClass = isSectionEdited(row.key)
                    ? \`\${baseText} font-black bg-admin-edited\`
                    : baseText;`;

  if (oldScoringBlock.test(content)) {
    content = content.replace(oldScoringBlock, newScoringBlock);
  } else {
    // Let's do fallback replacement in case whitespace slightly differs
    content = content.replace(
      /'!text-purple-900 font-black border-\[2px\] border-transparent bg-admin-edited'/g,
      "isBlack ? 'text-[#7F1D1D] font-black border-black bg-admin-edited' : isGray ? 'text-[#713F12] font-black border-black bg-admin-edited' : 'text-[#064E3B] font-black border-black bg-admin-edited'"
    );
  }

  // Fix circle dot in chart
  content = content.replace(/isSectionEdited\(row\.key\) \? 'bg-purple-600' : 'bg-black'/g, "'bg-black'");

  // Fix getAnswerClass
  content = content.replace(
    /return 'border-2 border-transparent bg-purple-50 text-purple-700 font-bold rounded';/g,
    "return isAbnormalVal ? 'border-2 border-red-500 bg-red-50 text-red-600 font-bold rounded bg-admin-edited' : 'border-2 border-slate-600 bg-slate-100 text-slate-800 rounded font-semibold bg-admin-edited';"
  );

  // Fix getOverallExplainClass
  content = content.replace(
    /return 'bg-purple-50 border border-transparent text-purple-700 pl-5 text-xs print:text-\[10px\] whitespace-pre-wrap break-words mt-1 rounded p-1\.5';/g,
    "return isAbnormalVal ? 'bg-red-50 border border-red-200 text-red-700 pl-5 text-xs print:text-[10px] whitespace-pre-wrap break-words mt-1 rounded p-1.5 bg-admin-edited' : 'text-[#2563EB] bg-slate-50 border border-slate-100 pl-5 text-xs print:text-[10px] whitespace-pre-wrap break-words mt-1 rounded p-1.5 bg-admin-edited';"
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}

// 2. Update Admin.tsx
const adminPath = path.join(srcDir, 'Admin.tsx');
let adminContent = fs.readFileSync(adminPath, 'utf8');
adminContent = adminContent.replace(/!text-purple-900 font-black shadow-sm/g, 'font-black shadow-sm');
fs.writeFileSync(adminPath, adminContent);
console.log('Updated Admin.tsx');

// 3. Update SubmissionView.tsx
const subPath = path.join(srcDir, 'SubmissionView.tsx');
let subContent = fs.readFileSync(subPath, 'utf8');

subContent = subContent.replace(/sectionEdited \? 'bg-admin-edited border-transparent !text-purple-900 shadow-sm' : 'border-transparent text-white'/g, "sectionEdited ? 'bg-admin-edited border-transparent shadow-sm' : 'border-transparent text-white'");
subContent = subContent.replace(/text-purple-600 bg-purple-50/g, 'text-slate-700 bg-slate-100');
subContent = subContent.replace(/borderBgClass = 'border-transparent bg-purple-600 print:bg-purple-600 print:border-transparent';/g, "borderBgClass = 'border-blue-600 bg-blue-600 print:bg-black print:border-black';");
subContent = subContent.replace(/\$\{isSelected && isAnsEdited \? 'text-purple-600 font-bold' : 'text-slate-700'\}/g, "${isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-700'}");
subContent = subContent.replace(/border-slate-300 bg-purple-50 focus:ring-slate-400 text-purple-700 font-semibold/g, 'border-slate-300 bg-slate-100 focus:ring-slate-400 text-slate-800 font-semibold bg-admin-edited');
subContent = subContent.replace(/<div className="text-xs text-purple-600 mt-1 font-medium">/g, '<div className="text-xs text-slate-500 mt-1 font-medium">');
subContent = subContent.replace(/<div className="text-xs text-purple-600 mt-1 pl-9 font-medium">/g, '<div className="text-xs text-slate-500 mt-1 pl-9 font-medium">');
subContent = subContent.replace(/border-transparent bg-purple-50\/50 text-purple-700 font-semibold/g, 'border-slate-200 bg-slate-100 text-slate-800 font-semibold bg-admin-edited');
subContent = subContent.replace(/\$\{isFieldEdited \? 'text-purple-600' : 'text-blue-600'\}/g, 'text-blue-600');
subContent = subContent.replace(/\$\{isFieldEdited \? 'text-purple-700 font-semibold' : 'text-slate-700'\}/g, "${isFieldEdited ? 'text-slate-900 font-semibold bg-admin-edited px-1 rounded' : 'text-slate-700'}");
subContent = subContent.replace(/text-purple-800 bg-purple-100 border-slate-400 font-extrabold shadow-sm bg-admin-edited/g, 'text-slate-800 bg-slate-100 border-slate-400 font-extrabold shadow-sm bg-admin-edited');

fs.writeFileSync(subPath, subContent);
console.log('Updated SubmissionView.tsx');
