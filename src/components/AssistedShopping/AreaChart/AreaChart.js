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
          culling: true,
          format: (x) => {
            return intl.formatDate(x, {
              month: "short",
              day: "2-digit",
            });
          },
        },
      },
      y: {
        show: true,
        label: {
          text: intl.formatMessage({
            id: `AssistedShopping.area_chart.deliveries`,
          }),
          position: "outer-middle",
        },
      },
      y2: {
        show: true,
        label: {
          text: intl.formatMessage({ id: `AssistedShopping.area_chart.sales` }),
          position: "outer-middle",
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
            value: [
              intl.formatMessage({
                id: `AssistedShopping.area_chart.deliveries`,
              }),
              intl.formatMessage({
                id: `AssistedShopping.area_chart.sales`,
              }),
            ],
          },
          type: "area-spline",
          axes: {
            [intl.formatMessage({
              id: `AssistedShopping.area_chart.sales`,
            })]: "y",
            [intl.formatMessage({
              id: `AssistedShopping.area_chart.sales`,
            })]: "y2",
          },
        },
      });
    };

    fetchData();
  }, [data, intl]);

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
            id: `AssistedShopping.area_chart.title`,
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
