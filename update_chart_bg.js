import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('Summary') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /const bg = isBlack \? 'bg-\[#FECACA\]' : isGray \? 'bg-\[#FED7AA\]' : 'bg-\[#D1FAE5\]';/g,
    `const bg = isBlack ? 'bg-rose-200' : isGray ? 'bg-amber-200' : 'bg-emerald-200';`
  );
  fs.writeFileSync(filePath, content);
  console.log(`Updated chart bg in ${file}`);
}
