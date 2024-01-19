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
      accountName: connectionData.dopplerAccountName,
      jwtToken: connectionData.jwtToken,
    };
  }

  private request<T>(method: Method, url: string, data: unknown = undefined) {
    const { accountName, jwtToken } = this.getConnectionData();
    return this.axios.request<T>({
      method,
      url: `/integrations/${url}${accountName}`,
      headers: { Authorization: `Bearer ${jwtToken}` },
      data,
    });
  }

  private GET<T>(url: string) {
    return this.request<T>("GET", url);
  }

  async getConnections(): Promise<Result<ThirdPartyConnection[]>> {
    const response = await this.GET<any>(`connections/`);
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

  async getAssistedSales(): Promise<Result<AssistedSales[]>> {
    const response = await this.GET<any>(`assisted-shopping/`);
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
          },
          subscriber: { idSubscriber, email },
        }),
      ),
    };
  }
}
