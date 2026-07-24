import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /const bgBase = s\.status === 'normal'[\s\S]*?const bg = edited[\s\S]*?: bgBase;/;

const replacement = `const bgBase = s.status === 'normal' 
                        ? 'bg-emerald-600 text-white' 
                        : s.status === 'borderline' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-red-600 text-white';
                      const bg = edited 
                        ? \`\${bgBase} bg-admin-edited border-[2px] border-white !text-white font-black shadow-sm\`
                        : \`\${bgBase} border-[2px] border-transparent\`;`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
console.log('Fixed Admin');
