import { useIntl } from "react-intl";

export const FooterSection = () => {
  const intl = useIntl();

  return (
    <footer class="dp-footer m-t-12">
      <div class="dp-container-fluid">
        <div class="dp-rowflex">
          <div class="col-sm-12 col-md-6 col-lg-6 m-b-12">
            <span>{intl.formatMessage({ id: "footer.iso" })}</span>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 m-b-12 dp-text-align">
            <span>
              {`${intl.formatMessage({ id: "footer.copyright" })} `}
              <a href={intl.formatMessage({ id: "footer.legal_link" })}>
                {intl.formatMessage({ id: "footer.legal_text" })}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
