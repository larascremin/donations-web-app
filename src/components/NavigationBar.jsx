import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import {
  House,
  HandHeart,
  PlusCircle,
  User,
  SignOut,
} from "@phosphor-icons/react";
import logo from "../assets/images/logo.svg";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div>
      {isMobile ? (
        <div className="fixed bottom-0 left-0 w-full z-50 flex py-5 bg-[var(--base-02)] [box-shadow:0px_-6px_10px_rgba(0,0,0,0.12)]">
          <button
            className="w-1/4 flex items-center justify-center"
            onClick={() => navigate("/home")}
          >
            <House
              size={36}
              color={
                path.startsWith("/home") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/home") ? "bold" : "light"}
            />
          </button>
          <button
            className="w-1/4 flex items-center justify-center"
            onClick={() => navigate("/finder")}
          >
            <HandHeart
              size={36}
              color={
                path.startsWith("/finder") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/finder") ? "bold" : "light"}
            />
          </button>
          <button
            className="w-1/4 flex items-center justify-center"
            onClick={() => navigate("/donation")}
          >
            <PlusCircle
              size={36}
              color={
                path.startsWith("/donation") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/donation") ? "bold" : "light"}
            />
          </button>
          <button
            className="w-1/4 flex items-center justify-center"
            onClick={() => navigate("/profile")}
          >
            <User
              size={36}
              color={
                path.startsWith("/profile") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/profile") ? "bold" : "light"}
            />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 h-full w-90 z-50 flex flex-col p-6 bg-[var(--base-02)] [box-shadow:0px_-6px_10px_rgba(0,0,0,0.2)] gap-y-8">
          <div className="flex w-full justify-center my-6">
            <img src={logo} className="h-18" />
          </div>
          <button
            className={`flex items-center rounded-lg px-4 py-2 gap-4 ${
              path.startsWith("/home") ? "bg-[var(--bg-green)]" : ""
            } `}
            onClick={() => navigate("/home")}
          >
            <House
              size={32}
              color={
                path.startsWith("/home") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/home") ? "bold" : "light"}
            />
            <h3
              className={`  ${
                path.startsWith("/home")
                  ? "font-semibold text-[var(--green)]"
                  : "text-[var(--base-04)]"
              }`}
            >
              INÍCIO
            </h3>
          </button>
          <button
            className={`flex items-center rounded-lg px-4 py-2 gap-4 ${
              path.startsWith("/finder") ? "bg-[var(--bg-green)]" : ""
            } `}
            onClick={() => navigate("/finder")}
          >
            <HandHeart
              size={32}
              color={
                path.startsWith("/finder") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/finder") ? "bold" : "light"}
            />
            <h3
              className={`  ${
                path.startsWith("/finder")
                  ? "font-semibold text-[var(--green)]"
                  : "text-[var(--base-04)]"
              }`}
            >
              LISTAGEM
            </h3>
          </button>
          <button
            className={`flex items-center rounded-lg px-4 py-2 gap-4 ${
              path.startsWith("/donation") ? "bg-[var(--bg-green)]" : ""
            } `}
            onClick={() => navigate("/donation")}
          >
            <PlusCircle
              size={32}
              color={
                path.startsWith("/donation") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/donation") ? "bold" : "light"}
            />
            <h3
              className={`  ${
                path.startsWith("/donation")
                  ? "font-semibold text-[var(--green)]"
                  : "text-[var(--base-04)]"
              }`}
            >
              DOAÇÕES
            </h3>
          </button>
          <button
            className={`flex items-center rounded-lg px-4 py-2 gap-4 ${
              path.startsWith("/profile") ? "bg-[var(--bg-green)]" : ""
            } `}
            onClick={() => navigate("/profile")}
          >
            <User
              size={32}
              color={
                path.startsWith("/profile") ? "var(--green)" : "var(--base-04)"
              }
              weight={path.startsWith("/profile") ? "bold" : "light"}
            />
            <h3
              className={`${
                path.startsWith("/profile")
                  ? "font-semibold text-[var(--green)]"
                  : "text-[var(--base-04)]"
              }`}
            >
              PERFIL
            </h3>
          </button>
          <button
            className="flex items-center rounded-lg px-4 py-2 gap-4 mt-auto"
            onClick={() => navigate("/auth")}
          >
            <SignOut size={32} color="var(--base-04)" weight="light" />
            <h3 className="text-[var(--base-04)]">SAIR</h3>
          </button>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
