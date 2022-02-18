import type { Item } from "./types";
import * as https from "https";

import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  stopNodes: ["rss.channel.item.description"],
});

export function removeContentDataSection(string: string): string {
  if (string.startsWith("<![CDATA[") && string.endsWith("]]>")) {
    return string
      .replace("<![CDATA[", "")
      .replace("]]>", "")
      .trimStart()
      .trimEnd();
  }
  return string;
}

export function removeHtmlTags(string: string): string {
  return string.replace(/(<([^>]+)>)/gi, "");
}

export function getItems(xml: string): Array<Item> {
  const document = parser.parse(xml);
  const itemsMap = document.rss.channel.item;

  let items: Array<Item> = [];
  if (Array.isArray(itemsMap)) {
    items = itemsMap;
  } else {
    items.push(itemsMap);
  }

  const cleanedItems = items.map((item) => {
    const { description, ...otherProps } = item;
    return {
      ...otherProps,
      description: removeHtmlTags(removeContentDataSection(description)),
    };
  });

  return cleanedItems;
}

export function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => resolve(body));
      })
      .on("error", (err) => reject(err));
  });
}
