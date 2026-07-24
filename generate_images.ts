import fs from 'fs';
import path from 'path';
import { Jimp, loadFont } from 'jimp';
import { ASQ_DATA } from './src/data.ts';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Category mapping for styling
const CATEGORIES: Record<string, { label: string; bg: number; accent: string }> = {
  communication: { label: 'COMMUNICATION', bg: 0xe0f2feff, accent: 'Communication' },
  grossMotor: { label: 'GROSS MOTOR', bg: 0xd1fae5ff, accent: 'Gross Motor' },
  fineMotor: { label: 'FINE MOTOR', bg: 0xe0e7ffff, accent: 'Fine Motor' },
  problemSolving: { label: 'PROBLEM SOLVING', bg: 0xfef3c7ff, accent: 'Problem Solving' },
  personalSocial: { label: 'PERSONAL SOCIAL', bg: 0xffe4e6ff, accent: 'Personal Social' },
};

async function main() {
  console.log('Starting image generator...');

  // 1. Purge existing images folder
  if (fs.existsSync(IMAGES_DIR)) {
    console.log(`Purging existing images in ${IMAGES_DIR}...`);
    const files = fs.readdirSync(IMAGES_DIR);
    for (const file of files) {
      fs.unlinkSync(path.join(IMAGES_DIR, file));
    }
  } else {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // 2. Load fonts
  console.log('Loading fonts...');
  const fontSmall = await loadFont('node_modules/@jimp/plugin-print/fonts/open-sans/open-sans-12-black/open-sans-12-black.fnt');
  const fontMedium = await loadFont('node_modules/@jimp/plugin-print/fonts/open-sans/open-sans-16-black/open-sans-16-black.fnt');

  // 3. Extract unique image requirements
  const imageRequirements: Array<{
    id: string;
    month: string;
    category: string;
    filename: string;
    alt: string;
  }> = [];

  const processedFilenames = new Set<string>();

  for (const [monthKey, monthData] of Object.entries(ASQ_DATA)) {
    for (const [catKey, questions] of Object.entries(monthData)) {
      if (catKey === 'overall') continue;
      const qList = questions as any[];
      for (const q of qList) {
        if (q.imageUrl && q.imageAlt) {
          const filename = path.basename(q.imageUrl);
          if (!processedFilenames.has(filename)) {
            processedFilenames.add(filename);
            imageRequirements.push({
              id: q.id,
              month: monthKey,
              category: catKey,
              filename,
              alt: q.imageAlt,
            });
          }
        }
      }
    }
  }

  console.log(`Found ${imageRequirements.length} unique images to generate.`);

  // 4. Generate each image
  let count = 0;
  for (const req of imageRequirements) {
    count++;
    const catConfig = CATEGORIES[req.category] || { label: 'DEVELOPMENT', bg: 0xf1f5f9ff, accent: 'Milestone' };
    const destPath = path.join(IMAGES_DIR, req.filename);

    try {
      // Create base image with soft pastel background matching the category
      const image = new Jimp({ width: 400, height: 300, color: catConfig.bg });

      // Draw a white inner card with a clean 10px margin
      const margin = 12;
      for (let y = margin; y < 300 - margin; y++) {
        for (let x = margin; x < 400 - margin; x++) {
          // Draw thin border for the inner white card
          if (x === margin || x === 400 - margin - 1 || y === margin || y === 300 - margin - 1) {
            image.setPixelColor(0xcbd5e1ff, x, y); // Slate 300 border
          } else {
            image.setPixelColor(0xffffffff, x, y); // White inner background
          }
        }
      }

      // Print Category Badge at the top
      const badgeText = `${catConfig.label} • ${req.month} MONTHS`;
      image.print({
        font: fontSmall,
        x: margin + 20,
        y: margin + 15,
        text: badgeText,
        maxWidth: 360,
      });

      // Draw a divider line under the badge
      const dividerY = margin + 38;
      for (let x = margin + 20; x < 400 - margin - 20; x++) {
        image.setPixelColor(0xe2e8f0ff, x, dividerY); // Slate 200 divider
      }

      // Print Main Description in the center
      const descText = req.alt;
      image.print({
        font: fontMedium,
        x: margin + 20,
        y: margin + 70,
        text: descText,
        maxWidth: 340,
      });

      // Print footer label "ASQ-3 Milestone Diagram"
      image.print({
        font: fontSmall,
        x: margin + 20,
        y: 300 - margin - 35,
        text: `ASQ-3 ID: ${req.id.toUpperCase()}`,
        maxWidth: 360,
      });

      // Write out the file
      await image.write(destPath as `${string}.${string}`);
      
      if (count % 10 === 0 || count === imageRequirements.length) {
        console.log(`Generated ${count}/${imageRequirements.length} images...`);
      }
    } catch (err: any) {
      console.error(`Failed to generate image ${req.filename}:`, err.message);
    }
  }

  console.log('All images generated successfully!');
}

main().catch((err) => {
  console.error('Critical error in image generator:', err);
  process.exit(1);
});
