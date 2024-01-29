import { QueryFunction, useQuery } from "@tanstack/react-query";
import {
  AssistedSales,
  ThirdPartyConnection,
} from "../abstractions/integrations-api-client";
import { useAppServices } from "../components/application";
import { useCallback, useState } from "react";
import { addDays } from "../utils/index";

type getIntegrationsApiQueryKey = {
  scope: string;
  dopplerAccountName: string | null;
  thirdPartyAppId: number | null;
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

  const connections = useGetThirdPartyConnections();
  const firstThirdPartyId =
    connections?.data?.at(0)?.thirdPartyApp.idThirdPartyApp;

  const currentSessionState = appSessionStateAccessor.getSessionAuthData();
  const dopplerAccountName =
    currentSessionState.status === "authenticated"
      ? currentSessionState.dopplerAccountName
      : null;

  const filteredSales = useCallback(
    (sales: AssistedSales[]) => {
      let result = [];
      result = sales.filter(
        (sale) =>
          new Date(sale.orderDate).getTime() > dateFilter.fromDate.getTime() &&
          new Date(sale.orderDate).getTime() < dateFilter.toDate.getTime(),
      );

      if (idThirdPartyApp) {
        return result.filter(
          (sale) => sale.idThirdPartyApp.toString() === idThirdPartyApp,
        );
      } else {
        return result.filter(
          (sale) => sale.idThirdPartyApp === firstThirdPartyId,
        );
      }
    },
    [dateFilter, idThirdPartyApp, firstThirdPartyId],
  );

  const queryKey: getIntegrationsApiQueryKey = [
    {
      scope: "assisted-sales",
      dopplerAccountName,
      thirdPartyAppId: firstThirdPartyId ?? null,
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
    select: filteredSales,
    enabled: !!firstThirdPartyId,
  });

  return { query, setDateFilter, setIdThirdPartyApp };
};
