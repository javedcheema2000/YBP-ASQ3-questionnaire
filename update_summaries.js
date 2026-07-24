import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /const textClass = isSectionEdited\(row\.key\)\s*\n\s*\?\s*'text-purple-800 font-black border-\[2px\] border-purple-600'/g,
    `const textClass = isSectionEdited(row.key)\n                    ? 'text-purple-800 font-black border-[2px] border-purple-600 bg-admin-edited'`
  );
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
