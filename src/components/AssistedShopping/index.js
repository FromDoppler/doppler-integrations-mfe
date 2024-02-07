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
import { Promotional } from "../shared/Promotional/Promotional";
import logo from "./logo.png";
import preview from "./preview.gif";
import { OverlayStyle } from "../shared/styles/overlay.styles";
import { useAppServices } from "../application";

export const AssistedShoppingSection = () => {
  const intl = useIntl();

  const {
    appConfiguration: { dopplerLegacyBaseUrl },
  } = useAppServices();

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

  const {
    query: assistedSales,
    setDateFilter,
    setIdThirdPartyApp,
  } = useGetAssistedSales();

  if (thirdPartyConnections.isLoading) {
    return <LoadingScreen />;
  }

  if (thirdPartyConnections.isError || assistedSales.isError) {
    window.location.replace(
      dopplerLegacyBaseUrl.concat("/", "Error/ShowErrorView"),
    );
  }

  if (thirdPartyConnections.data.length === 0) {
    return (
      <Promotional
        title={intl.formatMessage({ id: `AssistedShopping.promotional.title` })}
        description={intl.formatMessage({
          id: `AssistedShopping.promotional.description`,
        })}
        actionText={intl.formatMessage({
          id: `AssistedShopping.promotional.action_text`,
        })}
        actionUrl={intl.formatMessage({
          id: `AssistedShopping.promotional.action_url`,
        })}
        logoUrl={logo}
        previewUrl={preview}
      />
    );
  }

  if (assistedSales.isLoading) {
    return (
      <>
        <DashboardHeader
          connections={connections}
          setDateFilter={setDateFilter}
          setIdThirdPartyApp={setIdThirdPartyApp}
        />
        <LoadingScreen />
      </>
    );
  } else {
    return (
      <>
        <DashboardHeader
          connections={connections}
          setDateFilter={setDateFilter}
          setIdThirdPartyApp={setIdThirdPartyApp}
        />
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
                  {getTableData(assistedSales.data).length === 0 ? (
                    <OverlayStyle>
                      <p>
                        {intl
                          .formatMessage({
                            id: `AssistedShopping.no_data_text`,
                          })
                          .toUpperCase()}
                      </p>
                    </OverlayStyle>
                  ) : (
                    <></>
                  )}
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
      value: `$ ${(totalSales > 0 ? totalProfit / totalSales : 0).toFixed(2)}`,
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

const getAreaData = (assistedSales) => {
  const salesByOrderDate = new Map(
    assistedSales.map((order) => [
      new Date(order.orderDate).getUTCMonth(),
      {
        date:
          new Date(order.orderDate).getUTCFullYear() +
          "-" +
          (new Date(order.orderDate).getUTCMonth() + 1) +
          "-01",
        deliveries: assistedSales
          .filter(
            (sale) =>
              new Date(sale.campaign.UTCSentDate).getUTCMonth() ===
              new Date(order.orderDate).getUTCMonth(),
          )
          .reduce((a, v) => (a += v.campaign.amountSentSubscribers), 0),
        sales: assistedSales.filter(
          (sale) =>
            new Date(sale.orderDate).getUTCMonth() ===
            new Date(order.orderDate).getUTCMonth(),
        ).length,
      },
    ]),
  );

  const salesBySentDate = new Map(
    assistedSales.map((order) => [
      new Date(order.campaign.UTCSentDate).getUTCMonth(),
      {
        date:
          new Date(order.campaign.UTCSentDate).getUTCFullYear() +
          "-" +
          (new Date(order.campaign.UTCSentDate).getUTCMonth() + 1) +
          "-01",
        deliveries: assistedSales
          .filter(
            (sale) =>
              new Date(sale.campaign.UTCSentDate).getUTCMonth() ===
              new Date(order.campaign.UTCSentDate).getUTCMonth(),
          )
          .reduce((a, v) => (a += v.campaign.amountSentSubscribers), 0),
        sales: assistedSales.filter(
          (sale) =>
            new Date(sale.campaign.UTCSentDate).getUTCMonth() ===
            new Date(order.campaign.UTCSentDate).getUTCMonth(),
        ).length,
      },
    ]),
  );

  return [...new Map([...salesByOrderDate, ...salesBySentDate]).values()];
};

const getAutomationBarData = (assistedSales) => {
  const automationEventTypes = [
    ...new Set(assistedSales.map((sale) => sale.campaign.automationEventType)),
  ];

  let automationData = [];
  automationEventTypes.forEach((eventType) => {
    automationData.push({
      name: eventType,
      revenue: assistedSales
        .filter((sale) => sale.campaign.automationEventType.includes(eventType))
        .reduce((a, v) => a + v.orderTotal, 0),
    });
  });

  automationData.sort((a, b) => b.value - a.value);

  if (automationData.length > 4) {
    const minorityAmount = automationData.reduce((a, v, index) => {
      return index >= 4 ? a + +v.revenue : a;
    }, 0);

    automationData = automationData.filter((_eventType, index) => index < 4);

    automationData.push({
      name: "others",
      revenue: minorityAmount,
    });
  }

  return automationData;
};

const getAutomationDonutData = (assistedSales) => {
  let automationEventTypes = [
    ...new Map(
      assistedSales.map((order) => [
        order.campaign["automationEventType"],
        {
          key: order.campaign.automationEventType,
          value: assistedSales
            .filter((sale) =>
              sale.campaign.automationEventType.includes(
                order.campaign.automationEventType,
              ),
            )
            .reduce((a, v) => a + v.orderTotal, 0),
        },
      ]),
    ).values(),
  ].sort((a, b) => b.value - a.value);

  if (automationEventTypes.length > 4) {
    const minorityAmount = automationEventTypes.reduce((a, v, index) => {
      return index >= 4 ? a + +v.value : a;
    }, 0);

    automationEventTypes = automationEventTypes.filter(
      (_eventType, index) => index < 4,
    );

    automationEventTypes.push({
      key: "others",
      value: minorityAmount,
    });
  }

  return automationEventTypes.reduce(
    (a, v) => ({
      ...a,
      [v.key.toLowerCase()]: v.value,
    }),
    {},
  );
};

const getTableData = (assistedSales) => {
  const campaignTypes = [
    ...new Set(assistedSales.map((sale) => sale.campaign.campaignType)),
  ];

  const result = [];
  campaignTypes.forEach((type) => {
    const filteredSales = assistedSales.filter((sale) =>
      sale.campaign.campaignType.includes(type),
    );

    const uniqueCampaigns = [
      ...new Map(
        filteredSales.map((sale) => [
          sale.campaign.idCampaign,
          {
            name: sale.campaign.name,
            type:
              sale.campaign.campaignType === "automation"
                ? sale.campaign.automationEventType
                : sale.campaign.campaignType,
            sale: filteredSales.filter(
              (order) => order.campaign.idCampaign === sale.campaign.idCampaign,
            ).length,
            income: filteredSales
              .filter(
                (order) =>
                  order.campaign.idCampaign === sale.campaign.idCampaign,
              )
              .reduce((a, v) => a + v.orderTotal, 0),
            conversion: (
              filteredSales.filter(
                (order) =>
                  order.campaign.idCampaign === sale.campaign.idCampaign,
              ).length / sale.campaign.amountSentSubscribers
            ).toFixed(2),
            amountSentSubscribers: sale.campaign.amountSentSubscribers,
          },
        ]),
      ).values(),
    ];

    result.push({
      name: type,
      amount: uniqueCampaigns.length,
      sales: filteredSales.length,
      revenue: filteredSales.reduce(
        (total, order) => (total += order.orderTotal),
        0,
      ),
      conversion: (
        filteredSales.length /
        uniqueCampaigns.reduce(
          (total, campaign) => (total += campaign.amountSentSubscribers),
          0,
        )
      ).toFixed(2),
      campaigns: uniqueCampaigns,
    });
  });

  return result;
};

const getCampaignsDonutData = (assistedSales) => {
  const campaignTypes = [
    ...new Set(assistedSales.map((sale) => sale.campaign.campaignType)),
  ];

  return campaignTypes.reduce(
    (a, v) => ({
      ...a,
      [v]: assistedSales.filter((order) =>
        order.campaign.campaignType.includes(v),
      ).length,
    }),
    {},
  );
};
