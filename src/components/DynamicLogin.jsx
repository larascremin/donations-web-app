import { useMediaQuery } from "react-responsive";
import logo from "../assets/images/logo.svg";

const DynamicLogin = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={
        isMobile
          ? "bg-[var(--base-05)] h-screen"
          : "bg-[var(--base-01)] flex h-screen"
      }
    >
      {isMobile ? <></> : <div className="bg-[var(--base-05)] w-1/2"></div>}
      <div className={isMobile ? "comp-popup" : "comp-desktop"}>
        <div className="">
          <img
            src={logo}
            className={isMobile ? "h-14 justify-self-center" : "h-20"}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DynamicLogin;
