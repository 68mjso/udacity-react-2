// @ts-ignore
import React from "react";

import { render } from "@testing-library/react";
import NotFoundPage from "../containers/NotFoundPage";

describe("Not Found Page Component", () => {
  it("Not Found Page renders correctly", async () => {
    const component = render(<NotFoundPage />);
    expect(component).toMatchSnapshot();
  });
});
