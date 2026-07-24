import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /const textClass = isSectionEdited\(row\.key\)[\s\S]*?\? '.*?bg-admin-edited'/g,
    `const textClass = isSectionEdited(row.key)\n                    ? '!text-white font-black border-[2px] border-white bg-admin-edited'`
  );
  fs.writeFileSync(filePath, content);
  console.log(`Updated textClass in ${file}`);
}
