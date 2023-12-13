import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Kpi } from "./Kpi";
import { TestDopplerIntlProvider } from "../../i18n/TestDopplerIntlProvider";

describe("Kpi component", () => {
  it("should render Kpi Component", async () => {
    // Arrange
    const fakeKpi = [
      {
        value: "950",
        title: "total_sales",
      },
    ];

    // Act
    render(
      <TestDopplerIntlProvider>
        <Kpi data={fakeKpi} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    expect(
      screen.getByText(`AssistedShopping.kpi.${fakeKpi[0].title}`),
    ).toBeInTheDocument();
    expect(screen.getByText(fakeKpi[0].value)).toBeInTheDocument();
  });
});
