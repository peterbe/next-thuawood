import { readdirSync, existsSync } from "fs";
import { execSync } from "child_process";

main();

async function main() {
  const files = readdirSync("public/images", { withFileTypes: true });

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
      let name = ent.name;
      if (
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png")
      ) {
        images.push(`${dir}/${ent.name}`);
      } else {
        name = name.toLowerCase();
        if (
          name.endsWith(".jpg") ||
          name.endsWith(".jpeg") ||
          name.endsWith(".png")
        ) {
          console.log("WARNING! Case mismatch", `${dir}/${ent.name}`);
        }
      }
    }
  }
  return images;
}

function convert(input, output) {
  console.log(`converting ${input} to ${output}`);
  execSync(`cwebp "${input}" -o "${output}"`);
  console.log("Created", output);
}