import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { UserContext } from "../hooks/UserContext";
import ProtectedRoute from "./ProtectedRoute";

function renderWithUser(userValue) {
  return render(
    <UserContext.Provider value={userValue}>
      <MemoryRouter initialEntries={["/perfil"]}>
        <Routes>
          <Route path="/auth" element={<div>Tela de login</div>} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <div>Conteúdo protegido</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </UserContext.Provider>
  );
}

describe("ProtectedRoute", () => {
  it("renders nothing while the user is still loading", () => {
    const { container } = renderWithUser({ user: null, loadingUser: true });
    expect(container).toBeEmptyDOMElement();
  });

  it("redirects to /auth when there is no authenticated user", () => {
    renderWithUser({ user: null, loadingUser: false });
    expect(screen.getByText("Tela de login")).toBeInTheDocument();
  });

  it("renders the protected content when the user is authenticated", () => {
    renderWithUser({ user: { id: 1, tipo: "DOADOR" }, loadingUser: false });
    expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
  });
});
