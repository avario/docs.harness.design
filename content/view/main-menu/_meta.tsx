import {
  IconFolder,
  IconSettings,
  IconAdjustments,
  IconUserCircle,
} from "@tabler/icons-react";

export default {
  open: {
    title: (
      <>
        <IconFolder className="tabler-icon" /> Open Harness
      </>
    ),
  },
  "harness-settings": {
    title: (
      <>
        <IconSettings className="tabler-icon" /> Harness Settings
      </>
    ),
  },
  preferences: {
    title: (
      <>
        <IconAdjustments className="tabler-icon" /> Preferences
      </>
    ),
  },
  account: {
    title: (
      <>
        <IconUserCircle className="tabler-icon" /> Account
      </>
    ),
  },
};
