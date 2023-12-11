import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { AreaChart } from "./AreaChart/AreaChart";
import { Table } from "./Table/Table";
import { DonutChart } from "./DonutChart/DonutChart";
import { BarChart } from "./BarChart/BarChart";

export const AssistedShoppingSection = () => {
  const tableData = [
    {
      name: "campañas",
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
      name: "Automations",
      amount: 10,
      sales: 42,
      revenue: 1400000,
      conversion: 2,
      campaigns: [],
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

  return (
    <>
      <Helmet>
        <title>Ecommerce</title>
      </Helmet>
      <HeaderSection>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h2>Reporte de métricas Ventas Asistidas</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </HeaderSection>
      <div className="dp-container">
        <form action="#" className="awa-form dp-rowflex">
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12"></div>
        </form>
        <div className="dp-wrapper-as-kpi">
          <ul>
            <li>
              <div className="dp-kpi-card">
                <span className="dp-assisted-sales-icon dpicon iconapp-shopping-complete"></span>
                <div className="dp-assisted-sales-text">
                  <h3>950</h3>
                  <span>Total de Ventas</span>
                </div>
              </div>
            </li>
            <li>
              <div className="dp-kpi-card">
                <span className="dp-assisted-sales-icon dpicon iconapp-dollar-money"></span>
                <div className="dp-assisted-sales-text">
                  <h3>$18.200.00 </h3>
                  <span>Total de ganacia</span>
                </div>
              </div>
            </li>
            <li>
              <div className="dp-kpi-card">
                <span className="dp-assisted-sales-icon dpicon iconapp-shopping-bag"></span>
                <div className="dp-assisted-sales-text">
                  <h3>$40.00</h3>
                  <span>Ganancia promedio</span>
                </div>
              </div>
            </li>
            <li>
              <div className="dp-kpi-card">
                <span className="dp-assisted-sales-icon dpicon iconapp-capital"></span>
                <div className="dp-assisted-sales-text">
                  <h3>2.0%</h3>
                  <span>Tasa de conversión</span>
                </div>
              </div>
            </li>
            <li>
              <div className="dp-kpi-card">
                <span className="dp-assisted-sales-icon dpicon iconapp-sales-growth"></span>
                <div className="dp-assisted-sales-text">
                  <h3>32 %</h3>
                  <span>Retorno Inversión</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <AreaChart />
        <br />
        <Table tableData={tableData} />
        <br />
        <DonutChart data={donutData} title="Ingresos por Campaña" />
        <br />
        <BarChart />
        <br />
        <DonutChart data={donutData2} title="Ventas por tipo de campaña" />
      </div>
    </>
  );
};
