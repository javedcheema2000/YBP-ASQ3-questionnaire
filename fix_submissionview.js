import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/SubmissionView.tsx');
let content = fs.readFileSync(file, 'utf8');

// Change savedAnswers[q.id] to answers[q.id] so the score updates live while editing
content = content.replace(
  /const val = savedAnswers\[q\.id\];/g,
  'const val = answers[q.id];'
);

// We should also ensure the header score has the thatched pattern if edited
// Let's find where the score is displayed in the header.
// It looks like: Score: {sectionTotal}

fs.writeFileSync(file, content);
console.log('Fixed SubmissionView');
