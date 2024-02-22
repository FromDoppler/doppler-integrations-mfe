import { QueryFunction, useQuery } from "@tanstack/react-query";
import {
  AssistedSales,
  ThirdPartyConnection,
} from "../abstractions/integrations-api-client";
import { useAppServices } from "../components/application";
import { useState } from "react";
import { addDays } from "../utils/index";

type getIntegrationsApiQueryKey = {
  scope: string;
  dopplerAccountName: string | null;
  thirdPartyAppId: string | null;
  dateFilter: {
    fromDate: Date;
    toDate: Date;
  } | null;
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
      thirdPartyAppId: null,
      dateFilter: null,
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
  const [dateFilter, setDateFilter] = useState<{
    fromDate: Date;
    toDate: Date;
  }>({
    fromDate: addDays(new Date(), -7),
    toDate: new Date(),
  });
  const [idThirdPartyApp, setIdThirdPartyApp] = useState<string | null>(null);

  const currentSessionState = appSessionStateAccessor.getSessionAuthData();
  const dopplerAccountName =
    currentSessionState.status === "authenticated"
      ? currentSessionState.dopplerAccountName
      : null;

  const queryKey: getIntegrationsApiQueryKey = [
    {
      scope: "assisted-sales",
      dopplerAccountName,
      thirdPartyAppId: idThirdPartyApp,
      dateFilter: dateFilter,
    },
  ];

  const queryFn: QueryFunction<
    AssistedSales[],
    getIntegrationsApiQueryKey
  > = async (context) => {
    const [{ dopplerAccountName }] = context.queryKey;

    if (!dopplerAccountName || idThirdPartyApp == null) {
      return [];
    }

    const result = await integrationsApiClient.getAssistedSales(
      idThirdPartyApp,
      dateFilter.fromDate,
      dateFilter.toDate,
    );
    return result.value;
  };

  const query = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!idThirdPartyApp,
  });

  return { query, setDateFilter, setIdThirdPartyApp };
};
