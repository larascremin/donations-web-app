import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PasswordInput from "./PasswordInput";

describe("PasswordInput", () => {
  it("starts masked and toggles to plain text on click", async () => {
    const user = userEvent.setup();
    render(<PasswordInput value="segredo123" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Senha");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button"));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<PasswordInput value="" onChange={handleChange} />);

    await user.type(screen.getByPlaceholderText("Senha"), "a");
    expect(handleChange).toHaveBeenCalled();
  });
});
