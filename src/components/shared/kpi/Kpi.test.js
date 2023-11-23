import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Kpi } from "./Kpi";
import { TestDopplerIntlProvider } from "../../i18n/TestDopplerIntlProvider";

describe("Kpi component", () => {
  it("should render Kpi Component", async () => {
    // Arrange
    const fakeKpi = {
      kpiTitleId: "dashboard.campaigns.totalCampaigns",
      kpiValue: 21.478,
      iconClass: "deliveries",
    };

    // Act
    render(
      <TestDopplerIntlProvider>
        <Kpi {...fakeKpi} />
      </TestDopplerIntlProvider>,
    );

    // Assert
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByText(fakeKpi.kpiTitleId)).toBeInTheDocument();
    expect(screen.getByText(fakeKpi.kpiValue)).toBeInTheDocument();
  });
});
