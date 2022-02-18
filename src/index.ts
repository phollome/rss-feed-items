import { writeFile as writeFileCb } from "fs";
import { promisify } from "util";
import { getItems, fetch } from "./utils";

const writeFile = promisify(writeFileCb);

const feedUrl = process.env.FEED_URL;
if (feedUrl === undefined) {
  throw new Error("environment variable FEED_ENV needs to be set");
}
const itemsLimit = process.env.ITEMS_LIMIT;

async function main() {
  const xml = (await fetch(feedUrl)) as string;

  let limit: number | undefined;
  if (itemsLimit !== undefined) {
    limit = parseInt(itemsLimit);
  }
  const items = getItems(xml, limit);

  await writeFile("./items.json", JSON.stringify(items), "utf-8");
}

main()
  .then(() => console.log("done."))
  .catch((err) => console.error(err));
