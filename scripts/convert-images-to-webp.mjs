import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function collectImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertToWebp(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, ".webp");

  await sharp(inputPath)
    .webp({
      lossless: true,
      effort: 6,
    })
    .toFile(outputPath);

  const [inputStat, outputStat] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outputPath),
  ]);

  return {
    inputPath,
    outputPath,
    inputSize: inputStat.size,
    outputSize: outputStat.size,
  };
}

async function main() {
  const images = await collectImages(PUBLIC_DIR);

  if (images.length === 0) {
    console.log("No PNG or JPG images found in public/");
    return;
  }

  console.log(`Converting ${images.length} image(s) to lossless WebP...\n`);

  const results = [];

  for (const imagePath of images) {
    const result = await convertToWebp(imagePath);
    results.push(result);

    const saved = result.inputSize - result.outputSize;
    const pct = ((saved / result.inputSize) * 100).toFixed(1);
    const sign = saved >= 0 ? "saved" : "larger by";

    console.log(
      `${path.basename(result.inputPath)} -> ${path.basename(result.outputPath)} (${sign} ${Math.abs(saved)} bytes, ${Math.abs(Number(pct))}%)`,
    );

    await fs.unlink(imagePath);
  }

  const totalIn = results.reduce((sum, r) => sum + r.inputSize, 0);
  const totalOut = results.reduce((sum, r) => sum + r.outputSize, 0);
  const totalSaved = totalIn - totalOut;

  console.log(
    `\nDone. ${results.length} file(s) converted. Total ${totalSaved >= 0 ? "saved" : "increase"}: ${Math.abs(totalSaved)} bytes.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
