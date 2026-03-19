const IconContact = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g fill="#F08C00" stroke="none">
      <polygon points="0,20 15,15 35,15 35,25 0,25" />
      <rect x="30" y="15" width="30" height="10" rx="2" />
    </g>
  </svg>
);

const IconLock = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(10, 0)" fill="#868E96">
      <rect x="25" y="18" width="30" height="12" rx="4" />
      <rect x="0" y="24" width="35" height="6" rx="4" />
      <rect x="50" y="0" width="10" height="40" rx="4" fill="#656B71" />
    </g>
  </svg>
);

const IconDustCover = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g fill="#868E96">
      <rect x="3" y="3" width="18" height="34" rx="6" fill="none" stroke="#868E96" strokeWidth="5" />
      <rect x="21" y="17" width="40" height="6" fill="#656B71" />
      <rect x="45" y="0" width="35" height="40" rx="6" />
      <rect x="60" y="3" width="17" height="34" rx="4" fill="#656B71" />
    </g>
  </svg>
);

const IconBoot = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(15, 0)" fill="#868E96">
      <rect x="0" y="13" width="30" height="14" rx="4" />
      <polygon points="20,15 40,5 40,35 20,25" />
      <rect x="40" y="0" width="10" height="40" rx="4" fill="#656B71" />
      <rect x="0" y="10" width="10" height="20" rx="4" fill="#656B71" />
    </g>
  </svg>
);

const IconBackshell = () => (
  <svg width={20} height={20} viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(15, 0)" fill="#868E96">
      <rect x="0" y="10" width="30" height="20" rx="4" />
      <rect x="20" y="6" width="20" height="28" />
      <rect x="35" y="0" width="15" height="40" rx="4" fill="#656B71" />
      <rect x="16" y="3" width="8" height="34" rx="4" fill="#656B71" />
    </g>
  </svg>
);

export default {
  "contact": { title: <><IconContact/> Contact Part</> },
  "lock": { title: <><IconLock/> Lock Part</> },
  "dust-cover": { title: <><IconDustCover/> Dust Cover Part</> },
  "boot": { title: <><IconBoot/> Boot Part</> },
  "backshell": { title: <><IconBackshell/> Backshell Part</> },
};
