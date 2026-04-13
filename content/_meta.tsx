export function IconPro({ size = "1.5em", className = "" }) {
  return (
    <img
      src="/images/general/pro.svg"
      style={{ display: "inline", verticalAlign: "middle", width: size, height: size, marginRight: "0.5em", marginBottom: "0.3em" }}
      className={className}
      alt="Pro"
    />
  );
}

export default {
  index: {},
  'quick-start': { theme: { collapsed: true } },
  view: { theme: { collapsed: true } },
  component: { theme: { collapsed: true } },
  part: { theme: { collapsed: true } },
  feature: { theme: { collapsed: true } },
  examples: { theme: { collapsed: true } },
  shortcuts: {},
  faq: {},
  updates: { theme: { collapsed: true } },
  legal: { theme: { collapsed: true } },
  about: { },
  'beta-end': { title: <span style={{ color: '#F49F00' }}>Beta has Ended</span> },
  'pro-plan': { title: <span style={{ color: '#F49F00' }}><IconPro/>Pro Plan</span> },
  'partnership-program': { display: 'hidden' },
}