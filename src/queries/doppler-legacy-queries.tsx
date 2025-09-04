import { useMutation } from "@tanstack/react-query";
import { useAppServices } from "../components/application";
import { RfmStatus, UpdateRfmResponse } from "../abstractions/rfm/rfm-types";

export const useUpdateRfmSettings = () => {
  const { dopplerLegacyClient } = useAppServices();

  return useMutation<
    UpdateRfmResponse,
    Error,
    { idThirdPartyApp: number; rfm: RfmStatus }
  >({
    mutationFn: async ({ idThirdPartyApp, rfm }) => {
      return await dopplerLegacyClient.updateRfmSettings(idThirdPartyApp, rfm);
    },
  });
};
