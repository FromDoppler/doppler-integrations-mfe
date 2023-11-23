import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { Kpi } from "../shared/kpi/Kpi";
import { AreaChart } from "./AreaChart/AreaChart";

export const AssistedShoppingSection = () => {
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

      <form action="#" className="form-filters">
        <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
          <Dropdown />
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 m-b-12">
          <Dropdown />
        </div>
      </form>
      <div className="dp-container">
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
      </div>
    </>
  );
};
