import {
  StyledPromotionalLogo,
  StyledPromotionalPreviewImg,
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

              <div className="dp-actions">
                <a
                  href={actionUrl}
                  className="dp-button button-big primary-green"
                >
                  {actionText}
                </a>
              </div>
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
