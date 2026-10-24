const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

(async () => {
  const allFiles = getAllFiles(PUBLIC_DIR);
  const imageFiles = allFiles.filter(f => /\.(png|jpe?g)$/i.test(f));
  
  let totalSaved = 0;
  let optimizedCount = 0;

  for (const file of imageFiles) {
    const stat = fs.statSync(file);
    if (stat.size < 60 * 1024) continue; // skip small icons under 60KB

    try {
      const origSize = stat.size;
      const inputBuffer = fs.readFileSync(file);
      const meta = await sharp(inputBuffer).metadata();
      let pipeline = sharp(inputBuffer);

      // Downscale if wider than 1600px
      if (meta.width > 1600) {
        pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
      }

      let buf;
      if (meta.format === 'png') {
        buf = await pipeline.png({ quality: 82, compressionLevel: 9, effort: 7 }).toBuffer();
      } else {
        buf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      }

      if (buf.length < origSize) {
        fs.writeFileSync(file, buf);
        const saved = origSize - buf.length;
        totalSaved += saved;
        optimizedCount++;
        const rel = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
        console.log(`Optimized: ${rel} | ${(origSize/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB (saved ${(saved/1024).toFixed(0)}KB)`);
      }
    } catch (err) {
      console.error('Error on file', file, err.message);
    }
  }

  console.log(`\nDone! Optimized ${optimizedCount} images. Total additional bandwidth saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB!`);
})();
