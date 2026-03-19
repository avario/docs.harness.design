import { IconTopologyRing3, IconPlugConnected, IconBolt, IconCopyCheck, IconShare2, IconDeviceMobile, IconBraces } from "@tabler/icons-react";

const IconSplitScreen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="tabler-icon"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <g transform="rotate(90, 12, 12)">
      <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M4 16a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -2" />
    </g>
  </svg>
);

export default {
  "nets": { title: <><IconTopologyRing3 className="tabler-icon"/> Nets</> },
  "mates": { title: <><IconPlugConnected className="tabler-icon"/> Mates</> },
  "signals": { title: <><IconBolt className="tabler-icon"/> Signals</> },
  "validation": { title: <><IconCopyCheck className="tabler-icon"/> Validation</> },
  "sharing": { title: <><IconShare2 className="tabler-icon"/> Sharing</> },
  "mobile": { title: <><IconDeviceMobile className="tabler-icon"/> Mobile Support</> },
  "split-screen": { title: <><IconSplitScreen/> Split Screen</> },
  "local-data": { title: <><IconBraces className="tabler-icon"/> Local Data</> },
};