import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { AreaChart } from "./AreaChart/AreaChart";
import { Table } from "./Table/Table";
import { DonutChart } from "./DonutChart/DonutChart";
import { BarChart } from "./BarChart/BarChart";
import { Kpi } from "../shared/kpi/Kpi";

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
  const kpiData = [
    {
      iconClass: "shopping-complete",
      value: "950",
      title: "Total de Ventas",
    },
    {
      iconClass: "dollar-money",
      value: "$18.200.00",
      title: "Total de ganacia",
    },
    {
      iconClass: "shopping-bag",
      value: "$40.00",
      title: "Ganancia promedio",
    },
    {
      iconClass: "capital",
      value: "2.0 %",
      title: "Tasa de conversión",
    },
    {
      iconClass: "sales-growth",
      value: "32 %",
      title: "Retorno Inversión",
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
        <Kpi data={kpiData} />
        <br />
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
