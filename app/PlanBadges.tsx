import type { CSSProperties } from "react";
import { EnterpriseIcon, ProIcon } from "./PlanIcons";

// A small pill placed next to a page title to mark a plan-gated feature.
const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35em",
  verticalAlign: "middle",
  marginLeft: "1.5em",
  padding: "0.2em 0.6em",
  fontSize: "0.5em",
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: "999px",
  border: "1px solid color-mix(in srgb, currentColor 25%, transparent)",
  color: "currentColor",
  opacity: 0.85,
};

export function ProBadge() {
  return (
    <span style={badgeStyle}>
      <ProIcon size="1.4em" />
      Pro Feature
    </span>
  );
}

export function EnterpriseBadge() {
  return (
    <span style={badgeStyle}>
      <EnterpriseIcon size="1.4em" />
      Enterprise Feature
    </span>
  );
}
