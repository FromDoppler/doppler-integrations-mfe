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
      <section className="dp-container">
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
                <Table tableData={tableData} />
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 m-b-24">
              <div className="dp-box-shadow">
                <DonutChart data={donutData} title="Ingresos por Campaña" />
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
                  title="Ventas por tipo de campaña"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="dp-footer m-t-12">
        <div class="dp-container-fluid">
          <div class="dp-rowflex">
            <div class="col-sm-12 col-md-6 col-lg-6 m-b-12">
              <span>Certificación de Calidad ISO 9001:2008</span>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 m-b-12 dp-text-align">
              <span>
                © 2019 Doppler LLC. Todos los derechos reservados.
                <a href="https://fromdoppler.com/privacidad">
                  Políticas de privacidad y legales.
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
