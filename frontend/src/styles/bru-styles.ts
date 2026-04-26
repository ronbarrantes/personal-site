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
  --ink: #5abf97;
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
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.bru .marquee {
  display: flex;
  white-space: nowrap;
  animation: bru-marq 28s linear infinite;
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
`;
