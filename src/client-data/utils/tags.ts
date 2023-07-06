const sanitizedTags: Record<string, string> = {
  'c++': 'cpp',
  'c#': 'csharp',
  'react.js': 'reactjs',
  'react native': 'react-native',
  'next.js': 'nextjs',
}

/**
 * A function that takes a tag and returns the sanitized version of the tag.
 * @param tag
 * @returns the tag or tag array with sanitized tags
 */
export const sanitizeTag = (tag: string | string[] | undefined) => {
  if (!tag) return tag

  if (Array.isArray(tag))
    return tag.map((t) => sanitizedTags[t.toLowerCase()] || t)

  const sanitizedTag = sanitizedTags[tag.toLowerCase()]
  return sanitizedTag || tag
}

export const reverseSanitizedTag = (tag: string | undefined) => {
  if (!tag) return tag

  const sanitizedTag = Object.entries(sanitizedTags).find(
    ([_tag, sanitizedTag]) => {
      return sanitizedTag === tag
    }
  )

  return sanitizedTag ? sanitizedTag[0] : tag
}
