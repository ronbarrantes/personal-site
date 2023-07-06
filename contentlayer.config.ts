import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  // filePathPattern: `**/*.md`,
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    image: {
      type: 'string',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) =>
        post._raw.flattenedPath.replace(`${post._raw.sourceFileDir}/`, ''),
    },
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}))

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    image: {
      type: 'string',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (note) =>
        note._raw.flattenedPath.replace(`${note._raw.sourceFileDir}/`, ''),
    },
    // tag: {
    //   type: 'string',
    //   resolve: (note) =>
    //     note._raw.flattenedPath.replace(`${note._raw.sourceFileDir}/`, ''),
    // },
    url: {
      type: 'string',
      resolve: (note) => `/${note._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Note],
})
