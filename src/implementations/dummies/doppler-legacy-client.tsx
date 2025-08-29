import { DopplerLegacyClient } from "../../abstractions/doppler-legacy-client";
import { RfmStatus, UpdateRfmResponse } from "../../abstractions/rfm/rfm-types";

export class DummyDopplerLegacyClient implements DopplerLegacyClient {
  updateRfmSettings = async (
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ): Promise<UpdateRfmResponse> => {
    return {
      success: true,
      rfm: {
        visible: true,
        active: true,
        period: "120",
        date: "22/08/2025",
      },
    };
  };
}
