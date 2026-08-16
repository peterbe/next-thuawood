import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { input } from "@inquirer/prompts";

main();

async function main() {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error("Usage: node ./scripts/add-photo.ts <path-to-image>");
    process.exit(1);
  }
  if (!existsSync(imagePath)) {
    console.error(`No such file: ${imagePath}`);
    process.exit(1);
  }
  await inputImage(imagePath);
}

async function inputImage(imagePath: string) {
  const title = await input({
    message: "Title:",
    validate: (value) => value.trim().length > 0 || "Title cannot be empty",
  });

  await addPhoto(imagePath, title.trim());
  console.log(`Added photo ${imagePath} with title "${title.trim()}"`);
}

type Bust = {
  oid: string;
  title: string;
  description?: string;
  image: string;
  published: boolean;
  date: string;
};

async function addPhoto(imagePath: string, title: string) {
  const busts = JSON.parse(readFileSync("src/busts.json", "utf-8")) as Bust[];
  const found = busts.find((b) => b.image === imagePath);
  if (found) {
    throw new Error(
      `Bust with image ${imagePath} already exists: ${found.title}`,
    );
  }

  const oid = imagePath.split("/").slice(-2, -1)[0].toLocaleLowerCase();
  const oidFound = busts.find((b) => b.oid === oid);
  if (oidFound) {
    throw new Error(`Bust with oid ${oid} already exists: ${oidFound.title}`);
  }

  const newBust: Bust = {
    oid,
    title,
    image: imagePath.replace("public/", ""),
    description: "",
    published: true,
    date: new Date().toISOString(),
  };
  busts.push(newBust);
  writeFileSync("src/busts.json", JSON.stringify(busts, null, 2));
}
