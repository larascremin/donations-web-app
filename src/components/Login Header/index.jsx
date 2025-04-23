import logo from "../../assets/images/colored-logo.svg";
import "./style.css";

function LoginHeader({ title }) {
  return (
    <div className="flex-col centralized">
      <img src={logo} className="resized-logo" />
      <h4>{title}</h4>
    </div>
  );
}

export default LoginHeader;
