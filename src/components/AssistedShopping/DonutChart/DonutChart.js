import { useEffect, useState } from "react";
import { C3Chart } from "../../shared/C3Chart/C3Chart";
import { useIntl } from "react-intl";

const chartDataOptions = {
  json: {},
};

const fixedChartConfig = {
  legend: {
    show: true,
  },
  color: {
    pattern: ["#FCC762", "#CAAED2", "#E1D5EA", "#FEDF7F", "#B58FC1"],
  },
  transition: {
    duration: 0,
  },
};

export const DonutChart = ({ data, title }) => {
  const [state, setState] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    const fetchData = () => {
      const namesMapping = Object.keys(data[0]).reduce(
        (a, v) => ({
          ...a,
          [v]: intl.formatMessage({ id: `AssistedShopping.${v}` }),
        }),
        {},
      );

      setState({
        chartData: {
          json: data,
          keys: {
            value: Object.keys(data[0]),
          },
          type: "donut",
          names: namesMapping,
        },
        chartConfig: {
          ...fixedChartConfig,
          donut: {
            title: title,
          },
        },
      });
    };

    fetchData();
  }, [data, title, intl]);

  if (state != null) {
    return (
      <C3Chart
        config={state.chartConfig}
        dataOptions={chartDataOptions}
        data={state.chartData}
      />
    );
  } else {
    return <></>;
  }
};
