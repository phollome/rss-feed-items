import { getItems, removeContentDataSection, removeHtmlTags } from "./utils";

const title = "my title";
const description = "my description";
const pubDate = new Date().toUTCString();
const link = "https://my-url.com/1-episode";

test("extract fields from feed item", () => {
  const xml = `
  <rss>
    <channel>
      <item>
        <title>${title}</title>
        <description>${description}</description>
        <pubDate>${pubDate}</pubDate>
        <link>${link}</link>
      </item>
    </channel>
  </rss>`;

  const items = getItems(xml);
  expect(items[0]).toMatchObject({
    title,
    description,
    pubDate,
    link,
  });
});

test("remove content data section", () => {
  expect(removeContentDataSection(description)).toBe(description);
  expect(removeContentDataSection(`<![CDATA[${description}]]>`)).toBe(
    description
  );
  expect(removeContentDataSection(`<![CDATA[ ${description} ]]>`)).toBe(
    description
  );
});

test("handle encoded description", () => {
  const xml = `
    <rss>
      <channel>
        <item>
          <title>${title}</title>
          <description><![CDATA[${description}]]></description>
          <pubDate>${pubDate}</pubDate>
          <link>${link}</link>
        </item>
      </channel>
    </rss>
  `;
  const items = getItems(xml);
  expect(items[0]).toMatchObject({
    title,
    description,
    pubDate,
    link,
  });
});

test("remove html tags", () => {
  expect(removeHtmlTags(description)).toBe(description);
  expect(removeHtmlTags(`<p>${description}</p>`)).toBe(description);
});

test("remove html from description", () => {
  const xml = `
    <rss>
      <channel>
        <item>
          <title>${title}</title>
          <description><p>${description}</p></description>
          <pubDate>${pubDate}</pubDate>
          <link>${link}</link>
        </item>
      </channel>
    </rss>
  `;
  const items = getItems(xml);
  expect(items[0]).toMatchObject({
    title,
    description,
    pubDate,
    link,
  });
});
