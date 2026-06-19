type PlanIconProps = { size?: string | number };

// The Pro plan mark — a yellow variant of the harness.design plan icon.
export function ProIcon({ size = "1em" }: PlanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      style={{ display: "inline", verticalAlign: "middle" }}
    >
      <g
        transform="translate(44, 44) rotate(30) translate(-44, -44)translate(18.5, 6)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="0.5" y1="16" x2="0.5" y2="66" stroke="#fab005" />
        <line x1="10.5" y1="1" x2="10.5" y2="76" stroke="#f59f00" />
        <g transform="translate(20, 6)" stroke="#f08c00">
          <path d="M0.5,20.6085758 C0.5,37.4991638 20.5,34.186197 20.5,49.5932537 C20.5,49.5932537 20.5,53.0621691 20.5,60" />
          <line x1="0.5" y1="0" x2="0.5" y2="60" />
        </g>
        <g stroke="#f59f00">
          <line x1="35.5" y1="0" x2="35.5" y2="20" />
          <circle cx="35.5" cy="26" r="6" />
        </g>
        <line x1="50.5" y1="26" x2="50.5" y2="56" stroke="#fab005" />
      </g>
    </svg>
  );
}

// The Enterprise plan mark — a multi-colour variant of the plan icon.
export function EnterpriseIcon({ size = "1em" }: PlanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      style={{ display: "inline", verticalAlign: "middle" }}
    >
      <g
        transform="translate(44, 44) rotate(30) translate(-44, -44)translate(18.5, 6)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="0.5" y1="16" x2="0.5" y2="66" stroke="#9FE153" />
        <line x1="10.5" y1="1" x2="10.5" y2="76" stroke="#69D574" />
        <g transform="translate(20, 6)" stroke="#20C899">
          <path d="M0.5,20.6085758 C0.5,37.4991638 20.5,34.186197 20.5,49.5932537 C20.5,49.5932537 20.5,53.0621691 20.5,60" />
          <line x1="0.5" y1="0" x2="0.5" y2="60" />
        </g>
        <g stroke="#2EA8D3">
          <line x1="35.5" y1="0" x2="35.5" y2="20" />
          <circle cx="35.5" cy="26" r="6" />
        </g>
        <line x1="50.5" y1="26" x2="50.5" y2="56" stroke="#349BEF" />
      </g>
    </svg>
  );
}
