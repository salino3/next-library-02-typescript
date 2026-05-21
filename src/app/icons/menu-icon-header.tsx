interface Props {
  click?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const MenuIconHeaser: React.FC<Props> = ({ click }) => (
  <div
    onClick={click}
    style={{
      transform: "rotate(90deg)",
    }}
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
