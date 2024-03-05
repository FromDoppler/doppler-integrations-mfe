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
import { getFormatedNumber, getStartOfDate } from "../../utils";
import { useState } from "react";
import logo_Tiendanube from "../shared/Images/Logo_Tiendanube.png";
import logo_MShops from "../shared/Images/Logo_MShops.png";
import logo_Vtex from "../shared/Images/Logo_Vtex.png";
import logo_Acommerce from "../shared/Images/Logo_ACommerce.png";

export const AssistedShoppingSection = () => {
  const intl = useIntl();
  const [onFirstRender, setonFirstRender] = useState(true);

  const {
    appConfiguration: { dopplerLegacyBaseUrl },
  } = useAppServices();

  const thirdPartyConnections = useGetThirdPartyConnections();
  const connections = [];
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

  thirdPartyConnections.data.forEach((connection) => {
    if (connection.thirdPartyApp.assistedShoppingEnabled) {
      connections.push({
        name: connection.thirdPartyApp.name,
        value: connection.thirdPartyApp.idThirdPartyApp,
      });
    }
  });

  if (connections.length === 0) {
    return (
      <Promotional
        title={intl.formatMessage({ id: `AssistedShopping.promotional.title` })}
        description={intl.formatMessage({
          id: `AssistedShopping.promotional.description`,
        })}
        logoUrl={logo}
        previewUrl={preview}
        IntegrationsText={intl.formatMessage({
          id: `AssistedShopping.promotional.storesTitle`,
        })}
        integrationLinks={[
          {
            name: "Tiendanube",
            logo: logo_Tiendanube,
            actionUrl: dopplerLegacyBaseUrl.concat(
              "/",
              `${intl.formatMessage({
                id: `AssistedShopping.promotional.tnUrl`,
              })}`,
            ),
          },
          {
            name: "Adobe Commerce",
            logo: logo_Acommerce,
            actionUrl: dopplerLegacyBaseUrl.concat(
              "/",
              `${intl.formatMessage({
                id: `AssistedShopping.promotional.acUrl`,
              })}`,
            ),
          },
          {
            name: "Vtex",
            logo: logo_Vtex,
            actionUrl: dopplerLegacyBaseUrl.concat(
              "/",
              `${intl.formatMessage({
                id: `AssistedShopping.promotional.vtexUrl`,
              })}`,
            ),
          },
          {
            name: "Mercado Shops",
            logo: logo_MShops,
            actionUrl: dopplerLegacyBaseUrl.concat(
              "/",
              `${intl.formatMessage({
                id: `AssistedShopping.promotional.msUrl`,
              })}`,
            ),
          },
        ]}
      />
    );
  }

  if (onFirstRender) {
    setIdThirdPartyApp(connections.at(0).value.toString());
    setonFirstRender(false);
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
                  <AreaChart data={getAreaData(assistedSales.data, intl)} />
                </div>
              </div>
              <div className="col-sm-12 col-lg-8 m-b-24">
                <div className="dp-box-shadow">
                  <BarChart
                    data={getAutomationBarData(
                      assistedSales.data.filter((order) =>
                        order.campaign.campaignType.includes("automation"),
                      ),
                      intl,
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
      value: assistedSales[0]?.currency
        ? getFormatedNumber(totalProfit, "currency", assistedSales[0].currency)
        : 0,
      title: "total_profit",
    },
    {
      value: assistedSales[0]?.currency
        ? getFormatedNumber(
            totalSales > 0 ? totalProfit / totalSales : 0,
            "currency",
            assistedSales[0].currency,
          )
        : 0,
      title: "avg_profit",
    },
  ];
};

const getAreaData = (assistedSales, intl) => {
  return [
    ...new Map(
      assistedSales.map((order) => [
        new Date(order.orderDate).getUTCFullYear() +
          new Date(order.orderDate).getUTCMonth() +
          new Date(order.orderDate).getUTCDate(),
        {
          date:
            new Date(order.orderDate).getUTCFullYear() +
            "-" +
            (new Date(order.orderDate).getUTCMonth() + 1) +
            "-" +
            new Date(order.orderDate).getUTCDate(),
          [intl.formatMessage({
            id: `AssistedShopping.area_chart.deliveries`,
          })]: assistedSales
            .filter(
              (sale) =>
                getStartOfDate(
                  new Date(sale.campaign.utcSentDate),
                ).getTime() ===
                getStartOfDate(new Date(order.orderDate)).getTime(),
            )
            .reduce((a, v) => (a += v.campaign.amountSentSubscribers), 0),
          [intl.formatMessage({ id: `AssistedShopping.area_chart.sales` })]:
            assistedSales.filter(
              (sale) =>
                getStartOfDate(new Date(sale.orderDate)).getTime() ===
                getStartOfDate(new Date(order.orderDate)).getTime(),
            ).length,
        },
      ]),
    ).values(),
  ];
};

const getAutomationBarData = (assistedSales, intl) => {
  const automationEventTypes = [
    ...new Set(assistedSales.map((sale) => sale.campaign.automationEventType)),
  ];

  let automationData = [];
  automationEventTypes.forEach((eventType) => {
    automationData.push({
      name: intl.formatMessage({
        id: `AssistedShopping.campaign_types.${eventType}`,
      }),
      [intl.formatMessage({ id: `AssistedShopping.bar_chart_revenue` })]:
        assistedSales
          .filter((sale) =>
            sale.campaign.automationEventType.includes(eventType),
          )
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
      [v.key]: v.value,
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
            income: getFormatedNumber(
              filteredSales
                .filter(
                  (order) =>
                    order.campaign.idCampaign === sale.campaign.idCampaign,
                )
                .reduce((a, v) => a + v.orderTotal, 0),
              "currency",
              assistedSales[0]?.currency ?? null,
            ),
            amountSentSubscribers: sale.campaign.amountSentSubscribers,
          },
        ]),
      ).values(),
    ];

    result.push({
      name: type,
      amount: uniqueCampaigns.length,
      sales: filteredSales.length,
      revenue: getFormatedNumber(
        filteredSales.reduce((total, order) => (total += order.orderTotal), 0),
        "currency",
        assistedSales[0]?.currency ?? null,
      ),
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

const getUniqueCampaigs = (assistedSales) => {
  return [
    ...new Map(
      assistedSales.map((sale) => [sale.campaign.idCampaign, sale.campaign]),
    ).values(),
  ];
};
