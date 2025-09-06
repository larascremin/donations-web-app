import { useMediaQuery } from "react-responsive";
import logo from "../assets/images/logo.svg";
import mobile01 from "../assets/images/cj-login-01.svg";
import mobile02 from "../assets/images/cj-login-02.svg";
import desktop01 from "../assets/images/cj-login-03.svg";
import desktop02 from "../assets/images/cj-login-04.svg";

const DynamicLogin = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={
        isMobile
          ? "bg-[var(--base-05)] h-screen flex flex-col justify-end"
          : "bg-[var(--base-01)] flex h-screen"
      }
    >
      {isMobile ? (
        <div className="flex-1 flex justify-between items-end">
          <img src={mobile02} />
          <img src={mobile01} />
        </div>
      ) : (
        <div className="bg-[var(--base-05)] w-1/2 flex flex-col">
          <h1 className="text-[var(--base-01)] p-20 font-light text-4xl leading-normal flex-1">
            “A transformação social
            <br /> começa com um gesto:
            <br /> o de{" "}
            <span className="text-[var(--pink)] font-bold">doar</span>.”
          </h1>
          <div className="flex w-full justify-between items-end">
            <img src={desktop01} />
            <img src={desktop02} />
          </div>
        </div>
      )}
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
