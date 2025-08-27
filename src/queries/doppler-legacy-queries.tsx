import { useMutation } from "@tanstack/react-query";
import { useAppServices } from "../components/application";
import { RfmStatus } from "../abstractions/rfm/rfm-types";

export const useUpdateRfmSettings = () => {
  const { dopplerLegacyClient } = useAppServices();

  return useMutation({
    mutationFn: async ({
      idThirdPartyApp,
      rfm,
    }: {
      idThirdPartyApp: number;
      rfm: RfmStatus;
    }) => {
      const result = await dopplerLegacyClient.updateRfmSettings(
        idThirdPartyApp,
        rfm,
      );

      return result;
    },
  });
};
