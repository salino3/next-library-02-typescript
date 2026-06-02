import { MouseEventHandler } from "react";

interface Props {
  click?: MouseEventHandler<SVGSVGElement> | undefined;
}

export const GlassMagnifyningIcon: React.FC<Props> = ({ click }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="18"
    height="18"
    onClickCapture={click}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
