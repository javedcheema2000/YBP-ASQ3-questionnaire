import fs from 'fs';
import path from 'path';

const adminPath = path.join(process.cwd(), 'src/Admin.tsx');
let content = fs.readFileSync(adminPath, 'utf8');

const regex = /const bgBase = s\.status === 'normal' \s*\n\s*\?\s*'bg-emerald-200 text-emerald-900' \s*\n\s*:\s*s\.status === 'borderline' \s*\n\s*\?\s*'bg-amber-200 text-amber-900' \s*\n\s*:\s*'bg-rose-200 text-rose-900';\s*\n\s*const bg = edited \s*\n\s*\?\s*\`\$\{\bgBase\} bg-admin-edited border-\[2px\] border-purple-600 \!text-purple-900 font-black shadow-sm\`\s*\n\s*:\s*bgBase;/g;

const replacement = `const bgBase = s.status === 'normal' 
                        ? 'bg-emerald-600 text-white' 
                        : s.status === 'borderline' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-red-600 text-white';
                      const bg = edited 
                        ? \`\${bgBase} bg-admin-edited border-[2px] border-purple-600 !text-purple-900 font-black shadow-sm\`
                        : \`\${bgBase} border-[2px] border-transparent\`;`;

content = content.replace(regex, replacement);

fs.writeFileSync(adminPath, content);
console.log('Updated Admin.tsx');
