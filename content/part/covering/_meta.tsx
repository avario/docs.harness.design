const IconHeatshrink = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <path d="M20,29 C14.6,29 8,29 2,29 L2,11 C8,11 14.6,11 20,11 C28,11 34,0 40,0 C44,0 50.6,0 55,0 L55,40 C50.6,40 44,40 40,40 C34,40 28,29 20,29 Z" />
      <ellipse cx="2" cy="20" rx="5" ry="9" />
      <ellipse cx="55" cy="20" rx="5" ry="20" fill="#656B71" />
    </g>
  </svg>
);

const IconTape = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <polygon points="0,5 60,5 55,10 60,15, 55,20 60,25, 55,30 60,35 0,35" />
    </g>
  </svg>
);

const IconCorrugatedTubing = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <ellipse cx="4" cy="20" rx="4" ry="15" />
      <rect x="4" y="5" width="52" height="30" />
      <ellipse cx="56" cy="20" rx="4" ry="15" fill="#656B71" />
      <rect x="9" y="2" width="8" height="36" rx="4" />
      <rect x="20" y="2" width="8" height="36" rx="4" />
      <rect x="31" y="2" width="8" height="36" rx="4" />
      <rect x="42" y="2" width="8" height="36" rx="4" />
    </g>
  </svg>
);

const IconSpiralWrap = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <ellipse cx="4" cy="20" rx="4" ry="15" />
      <rect x="4" y="5" width="52" height="30" />
      <ellipse cx="56" cy="20" rx="4" ry="15" fill="#656B71" />
      <g fill="#656B71">
        <polygon points="5,5 10,5 30,35 25,35" />
        <polygon points="25,5 30,5 50,35 45,35" />
      </g>
    </g>
  </svg>
);

const IconTubing = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <ellipse cx="4" cy="20" rx="4" ry="15" />
      <rect x="4" y="5" width="52" height="30" />
      <ellipse cx="56" cy="20" rx="4" ry="15" fill="#656B71" />
    </g>
  </svg>
);

const IconBraidedSleeve = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <ellipse cx="4" cy="20" rx="4" ry="15" />
      <rect x="4" y="5" width="52" height="30" />
      <ellipse cx="56" cy="20" rx="4" ry="15" fill="#656B71" />
      <g fill="#656B71">
        <polygon points="3,5 15,5 35,35 23,35" />
        <polygon points="23,5 35,5 55,35 43,35" />
      </g>
      <g fill="black" opacity="0.35">
        <polygon points="3,35 15,35 35,5 23,5" />
        <polygon points="23,35 35,35 55,5 43,5" />
      </g>
    </g>
  </svg>
);

export default {
  "heatshrink": { title: <><IconHeatshrink/> Heatshrink</> },
  "tape": { title: <><IconTape/> Tape</> },
  "corrugated-tubing": { title: <><IconCorrugatedTubing/> Corrugated Tubing</> },
  "spiral-wrap": { title: <><IconSpiralWrap/> Spiral Wrap</> },
  "tubing": { title: <><IconTubing/> Tubing</> },
  "braided-sleeve": { title: <><IconBraidedSleeve/> Braided Sleeve</> },
};
