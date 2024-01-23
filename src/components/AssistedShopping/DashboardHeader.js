import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { useIntl } from "react-intl";

export const DashboardHeader = ({ connections }) => {
  const intl = useIntl();

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
              options={connections}
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
      </section>
    </>
  );
};
