import "../../styles/colors.css";

const TRIANGLE_SVG = ({ color, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="88"
    height="76"
    viewBox="0 0 88 76"
    fill={color}
    className={className}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M44 0.287842L87.3013 75.2878H0.69873L44 0.287842Z"
      fill={color}
    />
  </svg>
);

export default TRIANGLE_SVG;
