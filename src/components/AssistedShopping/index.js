import { AreaChart } from "./AreaChart/AreaChart";
import { Table } from "./Table/Table";
import { DonutChart } from "./DonutChart/DonutChart";
import { BarChart } from "./BarChart/BarChart";
import { Kpi } from "../shared/kpi/Kpi";
import { FooterSection } from "../shared/Footer/footer";
import { useIntl } from "react-intl";
import { LoadingScreen } from "../shared/Loading/LoadingScreen";
import {
  useGetThirdPartyConnections,
  useGetAssistedSales,
} from "../../queries/integrations-api-queries";
import { DashboardHeader } from "./DashboardHeader";

export const AssistedShoppingSection = () => {
  const intl = useIntl();

  const thirdPartyConnections = useGetThirdPartyConnections();
  const connections = [];
  if (!thirdPartyConnections.isLoading) {
    thirdPartyConnections.data.forEach((connection) => {
      connections.push({
        name: connection.thirdPartyApp.name,
        value: connection.thirdPartyApp.idThirdPartyApp,
      });
    });
  }

  const assistedSales = useGetAssistedSales();

  if (thirdPartyConnections.isLoading) {
    return <LoadingScreen />;
  }

  const tableData = [
    {
      name: "Automation",
      amount: 10,
      sales: 42,
      revenue: 1400000,
      conversion: 2,
      campaigns: [
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
      ],
    },
    {
      name: "Clásica",
      amount: 10,
      sales: 42,
      revenue: 1400000,
      conversion: 2,
      campaigns: [
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
      ],
    },
    {
      name: "Social",
      amount: 10,
      sales: 42,
      revenue: 1400000,
      conversion: 2,
      campaigns: [
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
      ],
    },
    {
      name: "Test A/B",
      amount: 10,
      sales: 42,
      revenue: 1400000,
      conversion: 2,
      campaigns: [
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
        {
          name: "campaña navidad 2024",
          type: "clasica",
          sales: 5,
          income: 170000,
          conversion: 5,
        },
        {
          name: "Campaña Verano 2024",
          type: "carrito abandonado",
          sales: 10,
          income: 340000,
          conversion: 2,
        },
      ],
    },
  ];
  if (assistedSales.isLoading) {
    return (
      <>
        <DashboardHeader connections={connections} />
        <LoadingScreen />
      </>
    );
  } else {
    return (
      <>
        <DashboardHeader connections={connections} />
        <section className="dp-container">
          <Kpi data={getKPIData(assistedSales.data)} />
        </section>
        <section className="dp-wrapp-assisted-sales">
          <div className="dp-container">
            <div className="dp-rowflex">
              <div className="col-sm-12 m-b-24 m-t-24">
                <div className="dp-box-shadow">
                  <AreaChart data={getAreaData(assistedSales.data)} />
                </div>
              </div>
              <div className="col-sm-12 col-lg-8 m-b-24">
                <div className="dp-box-shadow">
                  <BarChart
                    data={getAutomationBarData(
                      assistedSales.data.filter((order) =>
                        order.campaign.campaignType.includes("automation"),
                      ),
                    )}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 m-b-24">
                <div className="dp-box-shadow">
                  <DonutChart
                    data={getAutomationDonutData(
                      assistedSales.data.filter((order) =>
                        order.campaign.campaignType.includes("automation"),
                      ),
                    )}
                    title={intl.formatMessage({
                      id: `AssistedShopping.automation_donut_chart_title`,
                    })}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-8 m-b-24">
                <div className="dp-box-shadow">
                  <h6 className="title-reports-box">
                    {intl.formatMessage({
                      id: `AssistedShopping.table.title`,
                    })}
                  </h6>
                  <Table tableData={getTableData(assistedSales.data)} />
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 m-b-24">
                <div className="dp-box-shadow">
                  <DonutChart
                    data={getCampaignsDonutData(assistedSales.data)}
                    title={intl.formatMessage({
                      id: `AssistedShopping.campaign_donut_chart_title`,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterSection />
      </>
    );
  }
};

  const donutData = [{ clasica: 37, testab: 10, social: 33, automation: 20 }];
  const donutData2 = [
    {
      abandonedCart: 35,
      campaignBehavior: 10,
      productRetarget: 15,
      pendingPayment: 20,
      siteBehavior: 20,
    },
  ];
const getKPIData = (assistedSales) => {
  const totalProfit = assistedSales.reduce(
    (total, order) => (total += order.orderTotal),
    0,
  );
  const totalSales = assistedSales.length;
  return [
    {
      value: totalSales,
      title: "total_sales",
    },
    {
      value: `$ ${totalProfit.toFixed(2)}`,
      title: "total_profit",
    },
    {
      value: `$ ${(totalProfit / totalSales).toFixed(2)}`,
      title: "avg_profit",
    },
    {
      value: "2.0 %",
      title: "convertion_rate",
    },
    {
      value: "32 %",
      title: "investment_return",
    },
  ];
};

  );
};
