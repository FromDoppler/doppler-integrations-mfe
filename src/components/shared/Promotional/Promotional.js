import {
  StyledPromotionalLogo,
  StyledPromotionalPreviewImg,
  Image,
} from "./Promotional.styles";

export const Promotional = ({
  title,
  description,
  features,
  paragraph,
  actionText,
  actionUrl,
  logoUrl,
  previewUrl,
  caption,
  IntegrationsText,
  integrationLinks,
}) => {
  return (
    <section className="p-t-54 p-b-54">
      <div className="dp-container">
        <div className="dp-rowflex">
          <div className="col-sm-12">
            <div className="dp-icon-promotion">
              <StyledPromotionalLogo src={logoUrl} alt="icon" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="dp-content-promotion">
              <h1>{title}</h1>
              <p>{description}</p>
              {features ? (
                <ul className="dp-list-promo">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : null}

              {paragraph ? (
                <span className="dp-cta-paragraph">{paragraph}</span>
              ) : null}
              {actionUrl ? (
                <div className="dp-actions">
                  <a
                    href={actionUrl}
                    className="dp-button button-big primary-green"
                  >
                    {actionText}
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="p-t-54 p-b-30">
                    <strong>{IntegrationsText}</strong>
                  </h2>

                  <div className="dp-rowflex">
                    {integrationLinks.map((integration, index) => (
                      <div
                        className="col-lg-5 m-b-12 m-r-12"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={`int-${index}`}
                      >
                        <a
                          href={integration.actionUrl}
                          className="dp-button button-medium p-t-12 p-b-12 p-l-12 p-r-12 dp-bg-verysoft-gray"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <Image
                            src={integration.logo}
                            alt={integration.name}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <figure className="dp-img-promotion">
              <StyledPromotionalPreviewImg src={previewUrl} alt={title} />
              {caption ? <figcaption>{caption}</figcaption> : null}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
