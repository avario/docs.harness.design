const IconWire = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="0" y="17" width="60" height="6" rx="2" fill="#E67700" />
    <rect x="0" y="14" width="55" height="12" rx="2" fill="#868E96" />
  </svg>
);

const IconConnector = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <g transform="translate(12, 0)">
      <rect x="28" y="4" width="8" height="32" rx="1" fill="#696969" />
      <rect x="0" y="0" width="28" height="40" rx="16" ry="16" fill="#B8B8B8" />
      <rect x="14" y="0" width="16" height="40" fill="#B8B8B8" />
    </g>
  </svg>
);

const IconSplice = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="0" y="17" width="60" height="6" rx="2" fill="#696969" />
    <circle cx="30" cy="20" r="12" fill="#868E96" />
  </svg>
);

const IconCable = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="10" y="11.5" width="50" height="5" rx="2" fill="#E67700" />
    <rect x="10" y="9" width="45" height="10" rx="2" fill="#FFFFFF" />
    <rect x="10" y="23.5" width="50" height="5" rx="2" fill="#E67700" />
    <rect x="10" y="21" width="45" height="10" rx="2" fill="#FFFFFF" />
    <rect x="10" y="7" width="40" height="26" rx="2" fill="#868E96" />
    <rect x="0" y="5" width="45" height="30" rx="2" fill="#495057" />
  </svg>
);

const IconDiode = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="0" y="17" width="60" height="6" rx="2" fill="#696969" />
    <rect x="14" y="10" width="32" height="20" rx="2" fill="#495057" />
    <rect x="20" y="10" width="4" height="20" fill="#868E96" />
  </svg>
);

const IconResistor = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="0" y="17" width="60" height="6" rx="2" fill="#696969" />
    <g fill="#CEB58C" transform="translate(30, 10)">
      <rect x="-10" y="0" width="20" height="20" />
      <ellipse cx="-10" cy="10" rx="12" ry="12" />
      <ellipse cx="10" cy="10" rx="12" ry="12" />
    </g>
  </svg>
);

const IconGeneric = () => (
  <svg width={20} height={20} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4em" }}>
    <rect x="6" y="11" width="48" height="6" rx="2" fill="#696969" />
    <rect x="6" y="23" width="48" height="6" rx="2" fill="#696969" />
    <rect x="15" y="5" width="30" height="30" rx="2" fill="#495057" />
    <rect x="22" y="12" width="16" height="16" rx="2" fill="#373C41" />
  </svg>
);

export default {
  "wire": { title: <><IconWire/> Wire Part</> },
  "splice": { title: <><IconSplice/> Splice Part</> },
  "diode": { title: <><IconDiode/> Diode Part</> },
  "resistor": { title: <><IconResistor/> Resistor Part</> },
  "cable": { title: <><IconCable/> Cable Part</> },
  "generic": { title: <><IconGeneric/> Generic Part</> },
  "connector": { title: <><IconConnector/> Connector Part</> },
  "accessory": {
    title: <> Accessories</>,
    theme: { collapsed: true }
  },
  "terminal": {
    title: <> Terminals</>,
    theme: { collapsed: true }
  },
  "covering": {
    title: <> Coverings</>,
    theme: { collapsed: true }
  },
};
