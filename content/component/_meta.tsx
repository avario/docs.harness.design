import { IconMinus, IconPlus, IconCircuitDiode, IconCircuitResistor, IconArrowsSplit2, IconMaximize, IconNote } from "@tabler/icons-react";

const IconConnector = () => (
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
    <line x1={2} y1={12} x2={12} y2={12} />
    <line x1={6} y1={6} x2={12} y2={12} />
    <line x1={6} y1={18} x2={12} y2={12} />
    <line x1={12} y1={6} x2={18} y2={12} />
    <line x1={12} y1={18} x2={18} y2={12} />
    <line x1={18} y1={12} x2={22} y2={12} />
  </svg>
);

const IconTerminal = () => (
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
    <line x1={3} y1={12} x2={14} y2={12} />
    <circle cx={18} cy={12} r={3} />
  </svg>
);

const IconSplice = () => (
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
    <line x1={2} y1={12} x2={9} y2={12} />
    <circle cx={12} cy={12} r={3} />
    <line x1={15} y1={12} x2={22} y2={12} />
  </svg>
);

const IconCable = () => (
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
    <line x1={2} y1={9.5} x2={22} y2={9.5} />
    <line x1={2} y1={14.5} x2={22} y2={14.5} />
    <ellipse cx={12} cy={12} rx={4} ry={7} />
  </svg>
);

const IconTwistedWires = () => (
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
    <path
      d="M22,7 C20.6570756,7 19.6184946,7.91306566 18.7003301,9.18739532 M15.394791,14.6792674 C14.4532882,16.0227603 13.3897059,17 12.0003896,17 C7.55611833,17 6.44427128,7 2,7"
      transform="translate(12, 12) scale(1, -1) translate(-12, -12)"
    ></path>
    <path
      d="M22,7 C20.6570756,7 19.6184946,7.91306566 18.7003301,9.18739532 M15.394791,14.6792674 C14.4532882,16.0227603 13.3897059,17 12.0003896,17 C7.55611833,17 6.44427128,7 2,7"
      transform="translate(12, 12) scale(-1, 1) translate(-12, -12)"
    ></path>
  </svg>
);

export default {
  "connector": { title: <><IconConnector/> Connector</> },
  "terminal": { title: <><IconTerminal/> Terminal</> },
  "wire": { title: <><IconMinus className="tabler-icon"/> Wire</> },
  "layout-point": { title: <><IconPlus className="tabler-icon"/> Layout Point</> },
  "splice": { title: <><IconSplice/> Splice</> },
  "cable": { title: <><IconCable/> Cable</> },
  "twisted-wires": { title: <><IconTwistedWires/> Twisted Wires</> },
  "diode": { title: <><IconCircuitDiode className="tabler-icon"/> Diode</> },
  "resistor": { title: <><IconCircuitResistor className="tabler-icon"/> Resistor</> },
  "bundle": { title: <><IconMinus className="tabler-icon"/> Bundle</> },
  "branch-point": { title: <><IconArrowsSplit2 className="tabler-icon"/> Branch Point</> },
  "group": { title: <><IconMaximize className="tabler-icon"/> Group</> },
  "note": { title: <><IconNote className="tabler-icon"/> Note</> },
};
