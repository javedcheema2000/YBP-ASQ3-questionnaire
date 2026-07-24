import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/index.css');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /\.bg-admin-edited \{ background-image: repeating-linear-gradient\(45deg, rgba\(255, 255, 255, 0\.45\), rgba\(255, 255, 255, 0\.45\) 4px, transparent 4px, transparent 8px\); \}/,
  '.bg-admin-edited { background-image: repeating-linear-gradient(45deg, rgba(168, 85, 247, 0.35), rgba(168, 85, 247, 0.35) 4px, transparent 4px, transparent 8px); }'
);

fs.writeFileSync(filePath, content);
console.log('Updated index.css');
