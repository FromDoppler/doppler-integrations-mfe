import styled from "styled-components";
import { colors } from "../styles/colors";
import { spacings } from "../styles/spacings";

export const C3ChartStyled = styled.div`
  margin: ${spacings.spacesLvl0} ${spacings.spacesLvl4} ${spacings.spacesLvl6};

  svg {
    font:
      400 11px "Proxima-Nova",
      sans-serif;
    color: ${colors.softGrey};
    width: 100%;
    display: inline-block;
  }

  .c3-legend-item-hidden {
    opacity: 0.15;
  }

  path,
  line {
    fill: none;
    stroke: ${colors.softGrey};
  }

  .c3-line {
    stroke-width: 2px;
    position: relative;
    transition: all 0.5s ease-in-out;
  }

  .c3-areas {
    opacity: 0.3;
  }

  .c3-tooltip-container {
    background: ${colors.white};
    padding: ${spacings.spacesLvl4} ${spacings.spacesLvl5};
    min-width: 180px;
    color: ${colors.darkGrey};
    font:
      400 12px "Proxima-Nova",
      sans-serif;
    z-index: 10;
    box-shadow: 0 0 0 4px rgba(204, 204, 204, 0.3);
    border: 1px solid ${colors.softGrey};
    position: relative;
  }

  .c3-tooltip th,
  .c3-tooltip .tooltip-title {
    font-size: 11px;
    padding: 2px 5px;
    text-align: left;
    color: ${colors.lightGrey};
    font-weight: normal;
    line-height: 13px;
  }
`;
