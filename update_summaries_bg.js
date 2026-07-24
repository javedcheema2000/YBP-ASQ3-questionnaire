import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /const baseBg = isBlack \? 'bg-rose-200' : isGray \? 'bg-amber-200' : 'bg-emerald-200';/g,
    `const baseBg = isBlack ? 'bg-red-600' : isGray ? 'bg-amber-500' : 'bg-emerald-600';`
  );
  content = content.replace(
    /const bg = isBlack \? 'bg-rose-200' : isGray \? 'bg-amber-200' : 'bg-emerald-200';/g,
    `const bg = isBlack ? 'bg-red-600' : isGray ? 'bg-amber-500' : 'bg-emerald-600';`
  );
  content = content.replace(
    /const textClass = isSectionEdited\(row\.key\)\s*\n\s*\?\s*'\!text-purple-900 font-black border-\[2px\] border-purple-600 bg-admin-edited'/g,
    `const textClass = isSectionEdited(row.key)\n                    ? '!text-purple-900 font-black border-[2px] border-purple-600 bg-admin-edited'`
  );
  content = content.replace(
    /isBlack \s*\n\s*\?\s*'text-rose-950 font-extrabold border-black'\s*\n\s*:\s*isGray\s*\n\s*\?\s*'text-amber-950 font-extrabold border-black'\s*\n\s*:\s*'text-emerald-950 font-extrabold border-black'/g,
    `isBlack \n                      ? 'text-white font-extrabold border-black'\n                      : isGray\n                        ? 'text-white font-extrabold border-black'\n                        : 'text-white font-extrabold border-black'`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
