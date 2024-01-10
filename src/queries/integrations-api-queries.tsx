import { QueryFunction, useQuery } from "@tanstack/react-query";
import {
  AssistedSales,
  ThirdPartyConnection,
} from "../abstractions/integrations-api-client";
import { useAppServices } from "../components/application";

type getIntegrationsApiQueryKey = {
  scope: string;
  dopplerAccountName: string | null;
}[];

export const useGetThirdPartyConnections = () => {
  const { integrationsApiClient, appSessionStateAccessor } = useAppServices();

  const currentSessionState = appSessionStateAccessor.getSessionAuthData();
  const dopplerAccountName =
    currentSessionState.status === "authenticated"
      ? currentSessionState.dopplerAccountName
      : null;

  const queryKey: getIntegrationsApiQueryKey = [
    {
      scope: "third-party-connections",
      dopplerAccountName,
    },
  ];

  const queryFn: QueryFunction<
    ThirdPartyConnection[],
    getIntegrationsApiQueryKey
  > = async (context) => {
    const [{ dopplerAccountName }] = context.queryKey;

    if (!dopplerAccountName) {
      return [];
    }

    const result = await integrationsApiClient.getConnections();
    return result.value;
  };

  const query = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};

export const useGetAssistedSales = () => {
  const { integrationsApiClient, appSessionStateAccessor } = useAppServices();

  const currentSessionState = appSessionStateAccessor.getSessionAuthData();
  const dopplerAccountName =
    currentSessionState.status === "authenticated"
      ? currentSessionState.dopplerAccountName
      : null;

  const queryKey: getIntegrationsApiQueryKey = [
    {
      scope: "assisted-sales",
      dopplerAccountName,
    },
  ];

  const queryFn: QueryFunction<
    AssistedSales[],
    getIntegrationsApiQueryKey
  > = async (context) => {
    const [{ dopplerAccountName }] = context.queryKey;

    if (!dopplerAccountName) {
      return [];
    }

    const result = await integrationsApiClient.getAssistedSales();
    return result.value;
  };

  const query = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};
