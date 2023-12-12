import { useIntl } from "react-intl";

export const Kpi = ({ data }) => {
  const intl = useIntl();

  return (
    <div className="dp-wrapper-as-kpi">
      <ul>
        {data.map((kpi, index) => (
          <li key={index}>
            <div className="dp-kpi-card">
              <span
                className={`dp-assisted-sales-icon dpicon iconapp-${kpi.iconClass}`}
              ></span>
              <div className="dp-assisted-sales-text">
                <h3>{kpi.value}</h3>
                <span>
                  {intl.formatMessage({ id: `AssistedShopping.${kpi.title}` })}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
