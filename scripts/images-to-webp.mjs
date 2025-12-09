import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";

main();

async function main() {
  const _files = readdirSync("public/images", { withFileTypes: true });

  const images = [...getImages("public/images"), ...getImages("public/photos")];
  for (const image of images) {
    const webp = image.replace(/\.(jpg|jpeg|png)$/, ".webp");
    if (!existsSync(webp)) {
      convert(image, webp);
    }
  }
}

function getImages(dir) {
  const images = [];
  const ents = readdirSync(dir, { withFileTypes: true });
  for (const ent of ents) {
    if (ent.isDirectory()) {
      images.push(...getImages(`${dir}/${ent.name}`));
    } else if (ent.isFile()) {
      const name = ent.name.toLowerCase();
      if (
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png")
      ) {
        images.push(`${dir}/${ent.name}`);
      }
    }
  }
  return images;
}

function convert(input, output) {
  console.log(`converting ${input} to ${output}`);
  if (process.env.CI) {
    throw new Error(
      `THIS IS CI. The file ${input} hasn't already been converted to webp.\n
      Please run 'npm run images-to-webp' locally and commit the changes.`,
    );
  }
  execSync(`cwebp "${input}" -o "${output}"`);
  console.log("Created", output);
}
