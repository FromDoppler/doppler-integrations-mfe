import { useEffect, useState } from "react";
import { C3Chart } from "../../shared/C3Chart/C3Chart";
import { useIntl } from "react-intl";
import { OverlayStyle } from "../../shared/styles/overlay.styles";

export const BarChart = ({ data }) => {
  const intl = useIntl();
  const [state, setState] = useState(null);

  const chartDataOptions = {
    json: [],
    type: "bar",
    empty: {
      label: {
        text: "",
      },
    },
  };

  const [chartConfig] = useState({
    legend: {
      show: false,
    },
    color: {
      pattern: ["#E1D5EA"],
    },
    axis: {
      x: {
        type: "category",
        tick: {
          centered: true,
        },
      },
      y: {
        show: true,
        tick: {
          format: (y) => {
            return `$ ${parseInt(y)}`;
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
            x: "name",
            value: [
              intl.formatMessage({ id: `AssistedShopping.bar_chart_revenue` }),
            ],
          },
          type: "bar",
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
            id: `AssistedShopping.bar_chart_title`,
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
