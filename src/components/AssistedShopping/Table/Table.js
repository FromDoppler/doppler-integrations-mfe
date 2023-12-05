import React, { useState, useEffect } from "react";

export const Table = (data) => {
  const [expandedTables, setExpandedTables] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDataTable(data.tableData);
    };

    fetchData();
  }, [data, expandedTables]);

  const expandTable = (index) => {
    if (expandedTables.includes(index)) {
      setExpandedTables((expandedTables) =>
        expandedTables.filter((key) => key !== index),
      );
    } else {
      setExpandedTables((expandedTables) => [...expandedTables, index]);
    }
  };

  return (
    <div className="dp-block-wlp dp-box-shadow">
      <header className="dp-header-campaing dp-rowflex m-b-18">
        <div className="col-lg-6 col-md-12">
          <div className="dp-calification">
            <span className="dp-useremail-campaign">
              <strong>Ingresos por campañas</strong>
            </span>
          </div>
        </div>
      </header>
      <div className="dp-table-responsive">
        <table
          className="dp-c-table dp-nested-table"
          aria-label="Resultado de historial de suscriptores"
          summary="Resultado de historial de suscriptores"
        >
          <thead>
            <tr>
              <th aria-label="Campaña" scope="col">
                <span>CAMPAÑA</span>
              </th>
              <th aria-label="Asunto" scope="col">
                <span>CANT. DE CAMPAÑAS</span>
              </th>
              <th aria-label="Comportamiento" scope="col">
                <span>TOTAL VENTAS</span>
              </th>
              <th aria-label="Comportamiento" scope="col">
                <span>TOTAL INGRESOS</span>
              </th>
              <th aria-label="Comportamiento" scope="col">
                <span>% CONVERSION</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((summaryByCampaign, summaryIndex) => (
              <React.Fragment key={`summaryKey-${summaryIndex}`}>
                <tr>
                  <td>
                    <span className="dp-name-text">
                      <button
                        type="button"
                        className={`dp-expand-results ${
                          expandedTables.includes(summaryIndex.toString())
                            ? "dp-open-results"
                            : ""
                        }`}
                        data-key={summaryIndex}
                        onClick={(e) => {
                          expandTable(e.currentTarget.getAttribute("data-key"));
                        }}
                      >
                        <i className="ms-icon icon-arrow-next"></i>
                      </button>
                      {summaryByCampaign.name}
                    </span>
                  </td>
                  <td>
                    <span>{summaryByCampaign.amount}</span>
                  </td>
                  <td>
                    <span>{summaryByCampaign.sales}</span>
                  </td>
                  <td>
                    <span>{summaryByCampaign.revenue}</span>
                  </td>
                  <td>
                    <span>{summaryByCampaign.conversion}</span>
                  </td>
                </tr>
                {summaryByCampaign.campaigns.length > 0 ? (
                  <tr
                    className={`dp-expanded-table ${
                      expandedTables.includes(summaryIndex.toString())
                        ? "show"
                        : ""
                    }`}
                    key={`expandableTableKey-${summaryIndex}`}
                  >
                    <td className="dp-latest-results"></td>
                    <td className="dp-list-results">
                      <table className="dp-table-results">
                        <thead>
                          <tr>
                            <th aria-label="Nombre de campaña" scope="col">
                              <span>Nombre de campaña</span>
                            </th>
                            <th aria-label="Tipo de campaña" scope="col">
                              <span>Tipo</span>
                            </th>
                            <th aria-label="Ventas" scope="col">
                              <span>Ventas</span>
                            </th>
                            <th aria-label="Ingresos" scope="col">
                              <span>Ingresos</span>
                            </th>
                            <th aria-label="Conversión" scope="col">
                              <span>Conversión</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {summaryByCampaign.campaigns.map(
                            (campaign, campaignIndex) => (
                              <tr key={`campaign-${campaignIndex}`}>
                                <td>
                                  <span>{campaign.name}</span>
                                </td>
                                <td>
                                  <span>{campaign.type}</span>
                                </td>
                                <td>
                                  <span>{campaign.sales}</span>
                                </td>
                                <td>
                                  <span>{campaign.income}</span>
                                </td>
                                <td>
                                  <span>{campaign.conversion}</span>
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};