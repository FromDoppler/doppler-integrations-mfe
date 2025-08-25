import { Result } from "./result-types";
import { RfmStatus, UpdateRfmSettings } from "./rfm/rfm-types";
import { ShopifyIntegrationResult } from "./rfm/shopify/shopify-types";

export interface DopplerLegacyClient {
  getShopifyIntegrationStatus: () => Promise<Result<ShopifyIntegrationResult>>;
  updateRfmSettings: (
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ) => Promise<Result<UpdateRfmSettings>>;
}
