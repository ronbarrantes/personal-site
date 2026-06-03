import rehypePrettyCode from "rehype-pretty-code";
import type { Options as RehypeSanitizeOptions } from "rehype-sanitize";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const blogMarkdownSchema: RehypeSanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code || []),
      ["className"],
      ["dataLanguage"],
      ["dataTheme"],
      ["style"],
    ],
    div: [
      ...(defaultSchema.attributes?.div || []),
      ["className"],
      ["dataLanguage"],
      ["dataTheme"],
      ["style"],
    ],
    figure: [
      ...(defaultSchema.attributes?.figure || []),
      ["className"],
      ["dataRehypePrettyCodeFigure"],
    ],
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      ["className"],
      ["dataLanguage"],
      ["dataTheme"],
      ["style"],
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      ["className"],
      ["dataLine"],
      ["dataHighlightedLine"],
      ["style"],
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "figure",
    "figcaption",
  ],
};

export async function renderSafeBlogMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark",
        light: "github-light",
      },
    })
    .use(rehypeSanitize, blogMarkdownSchema)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
