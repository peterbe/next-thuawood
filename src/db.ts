import { readFile } from "fs/promises";
import { resolve } from "path";

export type Bust = {
  oid: string;
  title: string;
  description: string;
  published: boolean;
  date: string;
  image: string;
};

export async function getBusts() {
  const raw = await readFile(resolve("src/busts.json"), "utf-8");
  const parsed = JSON.parse(raw) as Bust[];
  const busts = parsed
    .filter((bust) => bust.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { busts };
}

export async function getBust(oid: string) {
  const { busts } = await getBusts();
  const index = busts.findIndex((bust) => bust.oid === oid);
  const prev = index === 0 ? busts[busts.length - 1] : busts[index - 1];
  const next = index + 1 < busts.length ? busts[index + 1] : busts[0];
  return { bust: busts[index], prev, next };
}
