import PropTypes from "prop-types";

export const Kpi = ({ iconClass, kpiValue, kpiTitleId }) => {
  return (
    <div className="col-lg-2 col-md-2 col-sm-12" role="figure">
      <div className="dp-dashboard-kpi">
        <span className={`dp-dashboard-icon ${iconClass}`} />
        <span className="dp-kpi-value dp-bold">{kpiValue}</span>
        <p className="dp-kpi-title dp-bold">{kpiTitleId}</p>
      </div>
    </div>
  );
};

Kpi.propTypes = {
  iconClass: PropTypes.string.isRequired,
  kpiValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  kpiTitleId: PropTypes.string.isRequired,
};
