export const bruStyles = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

.bru {
  --bg: #ffe500;
  --ink: #0a0a0a;
  --alt: #ffffff;
  --accent: #ff3864;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Space Mono', monospace;
  min-height: 100vh;
  position: relative;
}
.bru.dark {
  --bg: #0b0d09;
  --ink: #35af96;
  --alt: #111a0e;
  --accent: #a870c2;
}
.bru::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(45deg, transparent 0 20px, rgba(0,0,0,0.04) 20px 21px);
  pointer-events: none;
  z-index: 0;
}
.bru h1, .bru h2, .bru h3, .bru .smash {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: -0.03em;
  line-height: 0.85;
  text-transform: uppercase;
}
.bru .syne { font-family: 'Syne', sans-serif; }
.bru .box {
  border: 3px solid var(--ink);
  background: var(--alt);
  color: var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  position: relative;
}
.bru.dark .box { background: #111a0e; color: var(--ink); }
.bru .box:hover { transform: translate(-2px,-2px); box-shadow: 12px 12px 0 var(--ink); }
.bru .tag {
  display: inline-block;
  background: var(--ink);
  color: var(--bg);
  padding: 2px 10px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.bru .stripe {
  background: repeating-linear-gradient(-45deg, var(--ink) 0 10px, transparent 10px 20px);
}
@keyframes bru-marq {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.bru .marquee {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: bru-marq 28s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}
.bru .marquee-group {
  display: flex;
  flex-shrink: 0;
  flex-basis: auto;
  gap: 0;
  min-width: max-content;
}
.bru .marquee-item {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding-inline: 0.5rem;
}
.bru .marquee-separator {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding-inline: 0.5rem;
  transform: translateY(-0.04em);
}
.bru .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--ink);
  color: var(--bg);
  padding: 12px 18px;
  font-family: 'Archivo Black', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid var(--ink);
  box-shadow: 6px 6px 0 var(--accent);
  transition: transform 0.12s, box-shadow 0.12s;
  cursor: pointer;
}
.bru .btn:hover { transform: translate(-2px,-2px); box-shadow: 10px 10px 0 var(--accent); }
.bru .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.bru .btn-alt {
  background: var(--bg);
  color: var(--ink);
  box-shadow: 6px 6px 0 var(--ink);
}
.bru .brut-name-col { container-type: size; }
.bru .brut-name { font-size: clamp(48px, 26cqh, 220px); }
@media (min-width: 768px) {
  .bru .brut-name-col { container-type: normal; }
  .bru .brut-name { font-size: 11vw; }
}
.bru input, .bru textarea {
  background: var(--bg);
  color: var(--ink);
  border: 2px solid var(--ink);
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  padding: 10px 12px;
  width: 100%;
  outline: none;
  resize: none;
  display: block;
}
.bru input:focus, .bru textarea:focus {
  border-color: var(--accent);
  box-shadow: 4px 4px 0 var(--accent);
}
.bru .blog-prose {
  font-size: 16px;
  line-height: 1.75;
}
.bru .blog-prose > * + * {
  margin-top: 1.25rem;
}
.bru .blog-prose h1,
.bru .blog-prose h2,
.bru .blog-prose h3 {
  margin-top: 2rem;
}
.bru .blog-prose h2 {
  font-size: clamp(2rem, 8vw, 4rem);
}
.bru .blog-prose h3 {
  font-size: clamp(1.5rem, 6vw, 2.5rem);
}
.bru .blog-prose p,
.bru .blog-prose li {
  max-width: 72ch;
}
.bru .blog-prose a {
  color: var(--accent);
  font-weight: 700;
  text-decoration: underline;
}
.bru .blog-prose ul,
.bru .blog-prose ol {
  padding-left: 1.5rem;
}
.bru .blog-prose ul {
  list-style: square;
}
.bru .blog-prose ol {
  list-style: decimal;
}
.bru .blog-prose blockquote {
  border-left: 8px solid var(--accent);
  background: var(--alt);
  padding: 1rem;
  font-weight: 700;
  box-shadow: 6px 6px 0 var(--ink);
}
.bru .blog-prose pre {
  overflow-x: auto;
  border: 3px solid var(--ink);
  background: #ffffff;
  padding: 1rem;
  box-shadow: 8px 8px 0 var(--ink);
}
.bru.dark .blog-prose pre {
  background: #0d1117;
}
.bru .blog-prose code {
  font-family: 'Fira Mono', 'Space Mono', monospace;
  font-size: 0.9em;
}
.bru .blog-prose pre code,
.bru .blog-prose pre code span {
  color: var(--shiki-light);
}
.bru.dark .blog-prose pre code,
.bru.dark .blog-prose pre code span {
  color: var(--shiki-dark);
}
.bru .blog-prose :not(pre) > code {
  background: var(--ink);
  color: var(--bg);
  padding: 0.1rem 0.35rem;
}
`;
