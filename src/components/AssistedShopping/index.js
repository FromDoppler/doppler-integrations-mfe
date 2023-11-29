import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { Kpi } from "../shared/kpi/Kpi";
import { AreaChart } from "./AreaChart/AreaChart";
import { Table } from "./Table/Table";

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
        <form action="#" className="form-filters">
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
            <Dropdown />
          </div>
        </form>
        <div className="dp-rowflex dp-dashboard-panel">
          <Kpi
            iconClass="dpicon iconapp-shopping-complete"
            kpiValue="950"
            kpiTitleId="Total de ventas"
          />
          <Kpi
            iconClass="dpicon iconapp-dollar-money"
            kpiValue="$18.200.00"
            kpiTitleId="Total de ganancia"
          />
          <Kpi
            iconClass="dpicon iconapp-shopping-bag"
            kpiValue="$40.00"
            kpiTitleId="Ganancia promedio"
          />
          <Kpi
            iconClass="dpicon iconapp-shopping-bag"
            kpiValue="2.0%"
            kpiTitleId="Tasa de conversion"
          />
          <Kpi
            iconClass="dpicon iconapp-sales-growth"
            kpiValue="32%"
            kpiTitleId="Retorno inversion"
          />
        </div>
        <AreaChart />
        <br />
        <Table tableData={tableData} />
      </div>
    </>
  );
};
