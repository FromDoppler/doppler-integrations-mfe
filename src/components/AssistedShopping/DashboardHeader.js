import { Helmet } from "react-helmet";
import { HeaderSection } from "../shared/HeaderSection/HeaderSection";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { useIntl } from "react-intl";
import {
  addDays,
  getFirstDayOfLastMonth,
  getFirstDayMonth,
} from "../../utils/index";

export const DashboardHeader = ({ connections, setDateFilter }) => {
  const intl = useIntl();

  const changeDateFilter = (code) => {
    switch (code) {
      case "1":
        setDateFilter({
          fromDate: addDays(new Date(), -7),
          toDate: new Date(),
        });
        break;
      case "2":
        setDateFilter({
          fromDate: addDays(new Date(), -30),
          toDate: new Date(),
        });
        break;
      case "3":
        setDateFilter({
          fromDate: getFirstDayOfLastMonth(new Date()),
          toDate: getFirstDayMonth(new Date()),
        });
        break;
      case "4":
        setDateFilter({
          fromDate: addDays(new Date(), -90),
          toDate: new Date(),
        });
        break;
      default:
        break;
    }
  };

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
              onChangeFunction={() => {}}
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
              onChangeFunction={changeDateFilter}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 m-b-12"></div>
        </form>
      </section>
    </>
  );
};
