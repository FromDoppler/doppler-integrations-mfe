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

        {/* <div className="dp-rowflex dp-dashboard-panel">
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
        </div> */}
        <AreaChart />
      </div>
    </>
  );
};
