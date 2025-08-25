import { DopplerLegacyClient } from "../../abstractions/doppler-legacy-client";
import { Result } from "../../abstractions/result-types";
import { RfmStatus, UpdateRfmSettings } from "../../abstractions/rfm/rfm-types";
import { ShopifyIntegrationResult } from "../../abstractions/rfm/shopify/shopify-types";

export class DummyDopplerLegacyClient implements DopplerLegacyClient {
  getShopifyIntegrationStatus: () => Promise<Result<ShopifyIntegrationResult>> =
    async () => {
      return {
        success: true,
        value: {
          rfm: {
            visible: true,
            active: false,
            period: "120",
            date: "20/08/2025",
          },
        },
      };
    };
  updateRfmSettings: (
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ) => Promise<Result<UpdateRfmSettings>> = async () => {
    return {
      success: true,
      value: {
        rfm: {
          visible: true,
          active: true,
          period: "120",
          date: "22/08/2025",
        },
      },
    };
  };
}
