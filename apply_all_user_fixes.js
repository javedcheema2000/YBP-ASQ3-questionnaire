import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

// 1. Update src/index.css (Task 2: Replace purple hatch with light gray)
const cssPath = path.join(srcDir, 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace(
  /\.bg-admin-edited \{ background-image: repeating-linear-gradient\(45deg, rgba\(168, 85, 247, 0\.35\), rgba\(168, 85, 247, 0\.35\) 4px, transparent 4px, transparent 8px\); \}/g,
  '.bg-admin-edited { background-image: repeating-linear-gradient(45deg, rgba(156, 163, 175, 0.45), rgba(156, 163, 175, 0.45) 4px, transparent 4px, transparent 8px); }'
);
fs.writeFileSync(cssPath, cssContent);
console.log('Updated index.css');

// 2. Update Admin.tsx (Task 1: Remove purple borders, Task 3: Yellow instead of orange)
const adminPath = path.join(srcDir, 'Admin.tsx');
let adminContent = fs.readFileSync(adminPath, 'utf8');
adminContent = adminContent.replace(/bg-\[\#FED7AA\] text-\[\#78350F\]/g, 'bg-[#FEF08A] text-[#713F12]');
adminContent = adminContent.replace(/border-\[2px\] border-purple-600/g, 'border-[2px] border-transparent');
fs.writeFileSync(adminPath, adminContent);
console.log('Updated Admin.tsx');

// 3. Update Summary*.tsx files (Task 1: Remove purple borders, Task 3: Yellow instead of orange)
const summaryFiles = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));
for (const file of summaryFiles) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace orange/amber with yellow
  content = content.replace(/bg-\[\#FED7AA\]/g, 'bg-[#FEF08A]');
  content = content.replace(/text-\[\#78350F\]/g, 'text-[#713F12]');
  
  // Remove purple borders
  content = content.replace(/border-2 border-purple-500/g, 'border-2 border-transparent');
  content = content.replace(/border border-purple-200/g, 'border border-transparent');
  content = content.replace(/border-\[2px\] border-purple-600/g, 'border-[2px] border-transparent');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}

// 4. Update SubmissionView.tsx (Task 1: Remove purple borders, Task 3: Yellow instead of orange)
const subPath = path.join(srcDir, 'SubmissionView.tsx');
let subContent = fs.readFileSync(subPath, 'utf8');

// Remove purple borders
subContent = subContent.replace(/border-purple-400 bg-purple-50 focus:ring-purple-500/g, 'border-slate-300 bg-purple-50 focus:ring-slate-400');
subContent = subContent.replace(/border-purple-600/g, 'border-transparent');
subContent = subContent.replace(/border-purple-500/g, 'border-transparent');
subContent = subContent.replace(/border-purple-400/g, 'border-slate-400');
subContent = subContent.replace(/border border-purple-200/g, 'border border-transparent');

// Borderline filter button and score row status
subContent = subContent.replace(/bg-amber-500 text-white border-amber-500 shadow-sm/g, 'bg-[#FEF08A] text-[#713F12] border-[#FEF08A] shadow-sm');
subContent = subContent.replace(/bg-white text-amber-700 border-amber-200 hover:bg-amber-50/g, 'bg-white text-[#713F12] border-yellow-200 hover:bg-yellow-50');
subContent = subContent.replace(/\? 'bg-white' : 'bg-amber-500'/g, "? 'bg-[#713F12]' : 'bg-[#FEF08A]'");
subContent = subContent.replace(/\? 'bg-amber-500'/g, "? 'bg-[#FEF08A] !text-[#713F12]'");

fs.writeFileSync(subPath, subContent);
console.log('Updated SubmissionView.tsx');

// 5. Update PatientForm.tsx (Task 4: Red submit button when incomplete after first attempt)
const formPath = path.join(srcDir, 'PatientForm.tsx');
let formContent = fs.readFileSync(formPath, 'utf8');
formContent = formContent.replace(
  /\$\{showErrors && answeredQuestions < totalQuestions \? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'\}/g,
  "${showErrors && (answeredQuestions < totalQuestions || missingExplanations.length > 0) ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}"
);
fs.writeFileSync(formPath, formContent);
console.log('Updated PatientForm.tsx');
