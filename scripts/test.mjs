import got from "got";
import { title } from "process";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const URLS = ["/", "/bilder", "/kontakt", "/bilder/frank-zappa"];

main();

async function main(attempts = 3) {
  for (const url of URLS.map((pathname) => `${BASE_URL}${pathname}`)) {
    console.log(url, "...");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const html = await response.text();
      const titleRegex = /<title>([^<]+)<\/title>/;
      console.log({ title: titleRegex.exec(html)[1] });
    } catch (error) {
      console.error("ERROR:", error);
      if (attempts > 0) {
        console.log("Retrying soon...");
        await sleep(2000);
        return main(attempts - 1);
      }
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
