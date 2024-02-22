import { Result } from "../../abstractions/result-types";
import {
  AppConfiguration,
  AppSessionStateAccessor,
} from "../../abstractions/application";
import {
  AssistedSales,
  IntegrationsApiClient,
  ThirdPartyConnection,
} from "../../abstractions/integrations-api-client";
import { AxiosStatic, Method } from "axios";

export class IntegrationsApiClientImpl implements IntegrationsApiClient {
  private axios;
  private appSessionStateAccessor;

  constructor({
    axiosStatic,
    appSessionStateAccessor,
    appConfiguration: { dopplerApisBaseUrl },
  }: {
    axiosStatic: AxiosStatic;
    appSessionStateAccessor: AppSessionStateAccessor;
    appConfiguration: Partial<AppConfiguration>;
  }) {
    this.axios = axiosStatic.create({
      baseURL: dopplerApisBaseUrl,
    });
    this.appSessionStateAccessor = appSessionStateAccessor;
  }

  private getConnectionData() {
    const connectionData = this.appSessionStateAccessor.getSessionAuthData();
    if (connectionData.status !== "authenticated") {
      throw new Error("Authenticated session required");
    }
    return {
      jwtToken: connectionData.jwtToken,
    };
  }

  private request<T>(
    method: Method,
    url: string,
    parameters: string[] | undefined,
    data: unknown = undefined,
  ) {
    const { jwtToken } = this.getConnectionData();
    return this.axios.request<T>({
      method,
      url: `/integrations/${url}${!!parameters ? `/${parameters.join("/")}` : ""}`,
      headers: { Authorization: `Bearer ${jwtToken}` },
      data,
    });
  }

  private GET<T>(url: string, parameters: string[] | undefined = undefined) {
    return this.request<T>("GET", url, parameters);
  }

  async getConnections(): Promise<Result<ThirdPartyConnection[]>> {
    const response = await this.GET<any>(`user/connections`);
    return {
      success: true,
      value: response.data.map(
        ({
          idUser,
          accountName,
          connectionErrors,
          utcLastCompletedSync,
          utcLastAssistedShoppingSync,
          thirdPartyApp: { idThirdPartyApp, name, assistedShoppingEnabled },
        }: any) => ({
          idUser,
          accountName,
          connectionErrors,
          utcLastCompletedSync,
          utcLastAssistedShoppingSync,
          thirdPartyApp: {
            idThirdPartyApp,
            name,
            assistedShoppingEnabled,
          },
        }),
      ),
    };
  }

  async getAssistedSales(
    idThirdPartyApp: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<Result<AssistedSales[]>> {
    const response = await this.GET<any>(`user/assisted-shopping`, [
      idThirdPartyApp,
      dateFrom.toISOString(),
      dateTo.toISOString(),
    ]);
    return {
      success: true,
      value: response.data.map(
        ({
          idOrder,
          idUser,
          idThirdPartyApp,
          orderTotal,
          currency,
          orderDate,
          openDate,
          campaign: {
            idCampaign,
            name,
            campaignType,
            automationEventType,
            amountSentSubscribers,
            UTCSentDate,
            DistinctOpenedMailCount,
          },
          subscriber: { idSubscriber, email },
        }: any) => ({
          idOrder,
          idUser,
          idThirdPartyApp,
          orderTotal,
          currency,
          orderDate,
          openDate,
          campaign: {
            idCampaign,
            name,
            campaignType,
            automationEventType,
            amountSentSubscribers,
            UTCSentDate,
            DistinctOpenedMailCount,
          },
          subscriber: { idSubscriber, email },
        }),
      ),
    };
  }
}
