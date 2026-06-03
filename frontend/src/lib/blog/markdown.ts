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
      ["data-language"],
      ["data-theme"],
      ["style"],
    ],
    div: [
      ...(defaultSchema.attributes?.div || []),
      ["className"],
      ["data-language"],
      ["data-theme"],
      ["style"],
    ],
    figure: [
      ...(defaultSchema.attributes?.figure || []),
      ["className"],
      ["data-rehype-pretty-code-figure"],
    ],
    pre: [
      ...(defaultSchema.attributes?.pre || []),
      ["className"],
      ["data-language"],
      ["data-theme"],
      ["style"],
    ],
    span: [
      ...(defaultSchema.attributes?.span || []),
      ["className"],
      ["data-line"],
      ["data-highlighted-line"],
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
