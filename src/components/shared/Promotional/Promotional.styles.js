import styled from "styled-components";

const PromotionalImg = (props) => <img {...props} alt={props.alt} />;

const Image = styled.img`
  max-height: 40px;
  max-width: 100%;
`;

export const StyledPromotionalPreviewImg = styled(PromotionalImg)``;
export const StyledPromotionalLogo = styled(PromotionalImg)``;
export { Image };
