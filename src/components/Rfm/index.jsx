import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { useUpdateRfmSettings } from "../../queries/doppler-legacy-queries";
import { useGetIntegrationStatus } from "../../queries/integrations-api-queries";
import Button from "../ui/Button";
import { LoadingScreen } from "../application";
import { hideNavBar } from "../../utils";

hideNavBar();

export const RFM = ({ integration, idThirdPartyApp }) => {
  const intl = useIntl();
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const {
    data: rfm,
    isLoading,
    isError,
  } = useGetIntegrationStatus(idThirdPartyApp, integration);

  const [changed, setChanged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [rfmChanges, setRfmChanges] = useState({
    active: false,
    period: 120,
  });

  const { mutate: updateRfmSettings, isLoading: updatingMutation } =
    useUpdateRfmSettings();

  useEffect(() => {
    if (rfm) {
      setRfmChanges({
        active: rfm.active,
        period: rfm.period,
      });
    }
  }, [rfm]);

  useEffect(() => {
    const sendHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: "setHeight", height }, "*");
      }
    };

    sendHeight();
    window.addEventListener("resize", sendHeight);

    return () => {
      window.removeEventListener("resize", sendHeight);
    };
  }, [rfm, changed, success, error]);

  const handleToggle = () => {
    setRfmChanges((prev) => ({ ...prev, active: !prev.active }));
    setChanged(true);
  };

  const handlePeriodChange = (e) => {
    setRfmChanges((prev) => ({ ...prev, period: e.target.value }));
    setChanged(true);
  };

  const handleUpdateRfmSettings = () => {
    setSuccess(false);
    setError(null);

    updateRfmSettings(
      {
        idThirdPartyApp,
        rfm: rfmChanges,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setChanged(false);
            setSuccess(true);
          } else {
            setError(data.errorMsg);
          }
        },
        onError: (err) => {
          setError(err.message ?? String(err));
        },
      },
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!isLoading && !isError && rfm?.visible && (
        <div className="dp-app-container" ref={containerRef}>
          <section className="p-t-24">
            <header className="dp-block">
              <div>
                <h2>{intl.formatMessage({ id: "Rfm.title" })}</h2>
                <p className="m-b-6">
                  {intl.formatMessage({ id: "Rfm.subtitle" })}
                </p>
              </div>
              <hr />
            </header>
            <div className="dp-container">
              <div className="col-lg-8 col-md-12 col-sm-12 m-b-24">
                <div>
                  <ul className="dp-list-detail m-b-12">
                    <li>
                      <span className="dp-icodot">.</span>
                      <span>
                        <strong>
                          {intl.formatMessage({ id: "Rfm.list_item_first" })}
                        </strong>{" "}
                        {intl.formatMessage({
                          id: "Rfm.list_item_first_description",
                        })}
                      </span>
                    </li>
                    <li>
                      <span className="dp-icodot">.</span>
                      <span>
                        <strong>
                          {intl.formatMessage({ id: "Rfm.list_item_second" })}
                        </strong>{" "}
                        {intl.formatMessage({
                          id: "Rfm.list_item_second_description",
                        })}
                      </span>
                    </li>
                    <li>
                      <span className="dp-icodot">.</span>
                      <span>
                        <strong>
                          {intl.formatMessage({ id: "Rfm.list_item_third" })}
                        </strong>{" "}
                        {intl.formatMessage({
                          id: "Rfm.list_item_third_description",
                        })}
                      </span>
                    </li>
                  </ul>
                  <p className="m-b-12 dp-color-lightgrey">
                    {intl.formatMessage({ id: "Rfm.more_information" })}{" "}
                    <a
                      href={intl.formatMessage({ id: "Rfm.help_link" })}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {intl.formatMessage({ id: "Rfm.help_link_1" })}
                    </a>
                  </p>
                </div>

                <div className="dp-box-shadow p-l-24 p-r-24 p-t-24 p-b-24">
                  <div style={{ display: "flex" }}>
                    <div className="m-r-6">
                      <div className="dp-switch">
                        <input
                          type="checkbox"
                          id={"activeRfm"}
                          checked={rfmChanges.active}
                          onChange={handleToggle}
                        />
                        <label htmlFor="activeRfm" aria-disabled="false">
                          <span></span>
                        </label>
                      </div>
                    </div>
                    <label>
                      <p>
                        <strong>
                          {rfmChanges.active
                            ? intl.formatMessage({ id: "Rfm.rfm_on" })
                            : intl.formatMessage({ id: "Rfm.rfm_off" })}
                        </strong>
                      </p>
                    </label>
                  </div>
                  <hr className="m-t-6 m-b-6" />
                  <div className="dp-rfm-period-row">
                    <span>
                      {intl.formatMessage({ id: "Rfm.period_start" })}
                    </span>
                    <select
                      className="dp-rfm-select"
                      id="select-period"
                      name="select-period"
                      value={rfmChanges.period}
                      disabled={!rfmChanges.active}
                      onChange={handlePeriodChange}
                    >
                      <option value="120">120</option>
                      <option value="60">60</option>
                      <option value="30">30</option>
                    </select>
                    <span>
                      <strong>
                        {intl.formatMessage({ id: "Rfm.period_end" })}
                      </strong>
                    </span>
                  </div>
                  {rfm.date && (
                    <div>
                      <p className="dp-color-lightgrey m-t-6">
                        {intl.formatMessage({ id: "Rfm.calculation_date" })}{" "}
                        {rfm.date}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="m-t-12 m-b-6">
                      {intl.formatMessage({ id: "Rfm.user_notification" })}
                    </p>
                    <div className="nav-button-bar flex-grid m-t-12">
                      <div className="m-b-12 dp-wrap-message dp-wrap-info ng-binding ng-scope">
                        <span className="dp-message-icon"></span>
                        <div className="dp-content-message">
                          <span id="messageBar">
                            {intl.formatMessage({ id: "Rfm.info" })}
                          </span>
                        </div>
                      </div>
                      {success && (
                        <div className="m-b-12 dp-wrap-message dp-wrap-success">
                          <span className="dp-message-icon"></span>
                          <div className="dp-content-message">
                            <span id="messageBar">
                              {intl.formatMessage({ id: "Rfm.save_success" })}
                            </span>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="m-b-12 dp-wrap-message dp-wrap-cancel">
                          <span className="dp-message-icon"></span>
                          <div className="dp-content-message">
                            <span id="messageBar">{error}</span>
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        <Button
                          size="button-medium"
                          color="primary-grey"
                          onClick={handleBack}
                        >
                          {intl.formatMessage({ id: "General.back" })}
                        </Button>

                        <Button
                          size="button-medium"
                          color="primary-green m-l-24"
                          onClick={handleUpdateRfmSettings}
                          disabled={!changed || updatingMutation}
                          isLoading={updatingMutation}
                        >
                          {intl.formatMessage({ id: "General.save" })}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
