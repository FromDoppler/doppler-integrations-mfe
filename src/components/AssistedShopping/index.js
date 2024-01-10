import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { AreaChart } from "./AreaChart/AreaChart";
import { Table } from "./Table/Table";
import { DonutChart } from "./DonutChart/DonutChart";
import { BarChart } from "./BarChart/BarChart";
import { Kpi } from "../shared/kpi/Kpi";
import { FooterSection } from "../shared/Footer/footer";
import { useIntl } from "react-intl";
import { LoadingScreen } from "..shared/Loading/application";

export const AssistedShoppingSection = () => {
  const intl = useIntl();

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
  const kpiData = [
    {
      value: "950",
      title: "total_sales",
    },
    {
      value: "$18.200.00",
      title: "total_profit",
    },
    {
      value: "$40.00",
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

  return (
    <>
      <Helmet>
        <title>Ecommerce</title>
      </Helmet>
      <HeaderSection>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h2>{intl.formatMessage({ id: `AssistedShopping.title` })}</h2>
          <p>{intl.formatMessage({ id: `AssistedShopping.description` })}</p>
        </div>
      </HeaderSection>
      <section className="dp-container">
        <form action="#" className="awa-form dp-rowflex">
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown
              title={intl.formatMessage({
                id: `AssistedShopping.dropdowns.ecommerce_title`,
              })}
              options={[
                { name: "Mercadoshops", value: 1 },
                { name: "Tiendanube", value: 3 },
                { name: "Adobe Commerce", value: 8 },
                { name: "vtex", value: 5 },
              ]}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown
              title={intl.formatMessage({
                id: `AssistedShopping.dropdowns.period_title`,
              })}
              options={[
                {
                  name: intl.formatMessage({
                    id: `AssistedShopping.dropdowns.period_option1`,
                  }),
                  value: 1,
                },
                {
                  name: intl.formatMessage({
                    id: `AssistedShopping.dropdowns.period_option2`,
                  }),
                  value: 2,
                },
                {
                  name: intl.formatMessage({
                    id: `AssistedShopping.dropdowns.period_option3`,
                  }),
                  value: 3,
                },
                {
                  name: intl.formatMessage({
                    id: `AssistedShopping.dropdowns.period_option4`,
                  }),
                  value: 4,
                },
              ]}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12"></div>
        </form>
        <Kpi data={kpiData} />
      </section>
      <section className="dp-wrapp-assisted-sales">
        <div className="dp-container">
          <div className="dp-rowflex">
            <div className="col-sm-12 m-b-24 m-t-24">
              <div className="dp-box-shadow">
                <AreaChart />
              </div>
            </div>
            <div className="col-sm-12 col-lg-8 m-b-24">
              <div className="dp-box-shadow">
                <BarChart />
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 m-b-24">
              <div className="dp-box-shadow">
                <DonutChart
                  data={donutData2}
                  title={intl.formatMessage({
                    id: `AssistedShopping.automation_donut_chart_title`,
                  })}
                />
              </div>
            </div>
            <div className="col-sm-12 col-lg-8 m-b-24">
              <div className="dp-box-shadow">
                <h6 class="title-reports-box">
                  {intl.formatMessage({
                    id: `AssistedShopping.table.title`,
                  })}
                </h6>
                <Table tableData={tableData} />
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 m-b-24">
              <div className="dp-box-shadow">
                <DonutChart
                  data={donutData}
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
};
