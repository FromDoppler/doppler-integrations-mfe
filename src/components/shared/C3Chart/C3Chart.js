import "./SVGPathElement.patch";
import c3 from "c3";
import { useEffect, useRef } from "react";
import { C3ChartStyled } from "./C3Chart.styles";

export const C3Chart = ({ config, dataOptions, data }) => {
  const chartEl = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const build = { ...config, data: dataOptions, bindto: chartEl.current };
    chart.current = c3.generate(build);
    return () => {
      chart.current = chart.current.destroy();
    };
  }, [config, dataOptions]);

  useEffect(() => {
    if (data) {
      chart.current.load(data);
    }
  }, [data]);

  return <C3ChartStyled ref={chartEl} />;
};
