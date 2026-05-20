import {
  IconManualGearbox,
  IconBrandStackshare,
  IconNut,
  IconLine,
  IconMenu2Filled,
} from "@tabler/icons-react";

export default {
  "schematic": { title: <><IconManualGearbox className="tabler-icon"/> Schematic View</> },
  "layout": { title: <><IconBrandStackshare className="tabler-icon"/> Layout View</> },
  "parts": { title: <span style={{ pointerEvents: 'none' }}><IconNut className="tabler-icon"/> Parts View</span> },
  "connections": { title: <><IconLine className="tabler-icon"/> Connections View</> },
  "main-menu": { title: <span style={{ pointerEvents: 'none' }}><IconMenu2Filled className="tabler-icon"/> Main Menu</span> },
};