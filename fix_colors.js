import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

// 1. Fix Admin.tsx
const adminPath = path.join(srcDir, 'Admin.tsx');
let adminContent = fs.readFileSync(adminPath, 'utf8');

adminContent = adminContent.replace(
  /const bgBase = s\.status === 'normal'[\s\S]*?const bg = edited[\s\S]*?: `\$\{bgBase\} border-\[2px\] border-transparent`;/g,
  `const bgBase = s.status === 'normal' 
                        ? 'bg-[#D1FAE5] text-[#064E3B]' 
                        : s.status === 'borderline' 
                          ? 'bg-[#FED7AA] text-[#78350F]' 
                          : 'bg-[#FECACA] text-[#7F1D1D]';
                      const bg = edited 
                        ? \`\${bgBase} bg-admin-edited border-[2px] border-purple-600 !text-purple-900 font-black shadow-sm\`
                        : \`\${bgBase} border-[2px] border-transparent\`;`
);
fs.writeFileSync(adminPath, adminContent);
console.log('Fixed Admin.tsx');

// 2. Fix Summary*.tsx
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix baseBg
  content = content.replace(
    /const baseBg = isBlack \? 'bg-red-600' : isGray \? 'bg-amber-500' : 'bg-emerald-600';/g,
    `const baseBg = isBlack ? 'bg-[#FECACA]' : isGray ? 'bg-[#FED7AA]' : 'bg-[#D1FAE5]';`
  );
  
  // Fix bg (for chart)
  content = content.replace(
    /const bg = isBlack \? 'bg-red-600' : isGray \? 'bg-amber-500' : 'bg-emerald-600';/g,
    `const bg = isBlack ? 'bg-[#FECACA]' : isGray ? 'bg-[#FED7AA]' : 'bg-[#D1FAE5]';`
  );
  
  // Fix textClass
  content = content.replace(
    /const textClass = isSectionEdited\(row\.key\)\s*\n\s*\?\s*'\!text-white font-black border-\[2px\] border-white bg-admin-edited'/g,
    `const textClass = isSectionEdited(row.key)\n                    ? '!text-purple-900 font-black border-[2px] border-purple-600 bg-admin-edited'`
  );
  
  content = content.replace(
    /isBlack \s*\n\s*\?\s*'text-white font-extrabold border-black'\s*\n\s*:\s*isGray\s*\n\s*\?\s*'text-white font-extrabold border-black'\s*\n\s*:\s*'text-white font-extrabold border-black'/g,
    `isBlack \n                      ? 'text-[#7F1D1D] font-extrabold border-black'\n                      : isGray\n                        ? 'text-[#78350F] font-extrabold border-black'\n                        : 'text-[#064E3B] font-extrabold border-black'`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${file}`);
}
