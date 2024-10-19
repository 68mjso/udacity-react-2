// @ts-ignore
import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

describe("Navbar Component", () => {
  const mockUser = {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: null,
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  };
  const onLogoutMock = jest.fn();

  test("Call Log Out function", () => {
    render(
      <MemoryRouter>
        <Navbar user={mockUser} onLogout={onLogoutMock} />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });
});
