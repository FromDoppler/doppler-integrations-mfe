import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { C3Chart } from "../../shared/C3Chart/C3Chart";

const chartDataOptions = {
  json: {},
};

const data = [
  { date: "2023-01-01", data1: 300, data2: 130 },
  { date: "2023-02-01", data1: 350, data2: 100 },
  { date: "2023-03-01", data1: 300, data2: 140 },
  { date: "2023-04-01", data1: 0, data2: 200 },
  { date: "2023-05-01", data1: 0, data2: 150 },
  { date: "2023-06-01", data1: 100, data2: 50 },
];

export const AreaChart = () => {
  const [state, setState] = useState({
    chartData: {
      json: data,
      keys: {
        x: "date",
        value: ["data1", "data2"],
      },
      type: "area-spline",
    },
  });
  const intl = useIntl();

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
            value: ["data1", "data2"],
          },
        },
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <h6 className="title-reports-box">
        {intl.formatMessage({
          id: `AssistedShopping.area_chart_title`,
        })}
      </h6>
      <C3Chart
        config={chartConfig}
        dataOptions={chartDataOptions}
        data={state.chartData}
      />
    </>
  );
};
