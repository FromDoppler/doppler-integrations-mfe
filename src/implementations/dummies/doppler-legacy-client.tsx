import { DopplerLegacyClient } from "../../abstractions/doppler-legacy-client";
import { RfmStatus } from "../../abstractions/rfm/rfm-types";

export class DummyDopplerLegacyClient implements DopplerLegacyClient {
  updateRfmSettings: (
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ) => Promise<RfmStatus> = async () => {
    return {
      visible: true,
      active: true,
      period: "120",
      date: "22/08/2025",
    };
  };
}
