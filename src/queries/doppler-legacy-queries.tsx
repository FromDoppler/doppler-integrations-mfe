import {
  useMutation,
  QueryFunction,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAppServices } from "../components/application";
import {
  RfmStatus,
  RfmStatusQueryKey,
  UpdateRfmSettings,
  UpdateRfmStatusQueryKey,
} from "../abstractions/rfm/rfm-types";
import { ShopifyIntegrationResult } from "../abstractions/rfm/shopify/shopify-types";
import { Result } from "../abstractions/result-types";

export const useGetIntegrationStatus = (integration: string) => {
  const { dopplerLegacyClient } = useAppServices();

  const queryKey: RfmStatusQueryKey = [
    { scope: `${integration}-integration-status` },
  ];

  const queryFn: QueryFunction<
    ShopifyIntegrationResult,
    RfmStatusQueryKey
  > = async () => {
    let result: Result<ShopifyIntegrationResult>;

    switch (integration) {
      case "shopify":
        result = await dopplerLegacyClient.getShopifyIntegrationStatus();
        break;
      default:
        throw new Error(`Integration ${integration} not supported`);
    }

    if (!result.success) throw new Error("Integration fetch failed");

    return result.value;
  };

  return useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

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
      if (!result.success) throw new Error("Update failed");
      return result.value;
    },
  });
};
