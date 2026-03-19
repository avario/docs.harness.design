const IconFerrule = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)">
      <rect x="10" y="14" width="50" height="12" rx="2" fill="#696969" />
      <rect x="0" y="10" width="20" height="20" rx="4" fill="#B8B8B8" />
    </g>
  </svg>
);

const IconRing = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)">
      <rect x="10" y="14" width="25" height="12" rx="2" fill="#696969" />
      <circle cx="45" cy="20" r="10" strokeWidth="8" stroke="#696969" fill="none" />
      <rect x="0" y="10" width="20" height="20" rx="4" fill="#B8B8B8" />
    </g>
  </svg>
);

const IconSpade = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)">
      <rect x="10" y="14" width="25" height="12" rx="2" fill="#696969" />
      <path d="M57,30 L45,30 A10,10 0 0,1 45,10 L57,10" stroke="#696969" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="0" y="10" width="20" height="20" rx="4" fill="#B8B8B8" />
    </g>
  </svg>
);

const IconQuickConnect = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)">
      <rect x="10" y="14" width="25" height="12" rx="2" fill="#696969" />
      <g transform="translate(10, -1)" fill="#696969" stroke="none">
        <path d="M42,9 L48,15 L48,27 L42,33 L22.5,33 L19.5,30 L19.5,12 L22.5,9 L42,9 Z M33,17 C30.790861,17 29,18.790861 29,21 C29,23.209139 30.790861,25 33,25 C35.209139,25 37,23.209139 37,21 C37,18.790861 35.209139,17 33,17 Z" />
      </g>
      <rect x="0" y="10" width="20" height="20" rx="4" fill="#B8B8B8" />
    </g>
  </svg>
);

export default {
  "ferrule": { title: <><IconFerrule/> Ferrule</> },
  "ring": { title: <><IconRing/> Ring Terminal</> },
  "spade": { title: <><IconSpade/> Spade Terminal</> },
  "quick-connect": { title: <><IconQuickConnect/> Quick Connect</> },
};
