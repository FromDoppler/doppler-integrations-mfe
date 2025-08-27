import { RfmStatus } from "./rfm/rfm-types";

export interface DopplerLegacyClient {
  updateRfmSettings: (
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ) => Promise<RfmStatus>;
}
