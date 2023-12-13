import { useEffect, useState } from "react";
import { C3Chart } from "../../shared/C3Chart/C3Chart";

const chartDataOptions = {
  json: {},
};

const data = [
  { name: "carrito abandonado", revenue: 200 },
  { name: "poducto visitado", revenue: 100 },
  { name: "comportamiento en sitio", revenue: 300 },
  { name: "comportamiento en campaña", revenue: 400 },
  { name: "pago pendiente", revenue: 200 },
];

export const BarChart = () => {
  const [state, setState] = useState({
    chartData: {
      json: data,
      keys: {
        x: "name",
        value: ["revenue"],
      },
      type: "bar",
    },
  });

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
            return "$" + y;
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
            value: ["revenue"],
          },
          type: "bar",
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="">
        <h6 className="title-reports-box">Ingresos por tipo de automation</h6>
      </div>
      <C3Chart
        config={chartConfig}
        dataOptions={chartDataOptions}
        data={state.chartData}
      />
    </div>
  );
};
