import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { C3Chart } from "../../shared/C3Chart/C3Chart";
import { OverlayStyle } from "../../shared/styles/overlay.styles";

export const AreaChart = ({ data }) => {
  const [state, setState] = useState(null);
  const intl = useIntl();

  const chartDataOptions = {
    json: [],
    type: "area-spline",
    empty: {
      label: {
        text: "",
      },
    },
  };

  const [chartConfig] = useState({
    legend: {
      show: true,
    },
    color: {
      pattern: ["#fbb224", "#B58FC1"],
    },
    point: {
      r: 3,
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          culling: false,
          format: (x) => {
            return intl.formatDate(x, { month: "long", year: "numeric" });
          },
        },
      },
    },
    transition: {
      duration: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({
        chartData: {
          json: data,
          keys: {
            x: "date",
            value: ["deliveries", "sales"],
          },
          type: "area-spline",
        },
      });
    };

    fetchData();
  }, [data]);

  if (state != null) {
    return (
      <>
        {state.chartData.json.length === 0 ? (
          <OverlayStyle>
            <p>
              {intl
                .formatMessage({
                  id: `AssistedShopping.no_data_text`,
                })
                .toUpperCase()}
            </p>
          </OverlayStyle>
        ) : (
          <></>
        )}
        <h6 className="title-reports-box">
          {intl.formatMessage({
            id: `AssistedShopping.area_chart_title`,
          })}
        </h6>
        <C3Chart
          config={chartConfig}
          dataOptions={chartDataOptions}
          data={state.chartData.json.length === 0 ? {} : state.chartData}
        />
      </>
    );
  } else {
    return <></>;
  }
};
