import { AxiosStatic, Method } from "axios";
import {
  AppConfiguration,
  AppSessionStateAccessor,
} from "../../abstractions/application";
import { DopplerLegacyClient } from "../../abstractions/doppler-legacy-client";
import { Result } from "../../abstractions/result-types";
import { ShopifyIntegrationResult } from "../../abstractions/rfm/shopify/shopify-types";
import { RfmStatus, UpdateRfmSettings } from "../../abstractions/rfm/rfm-types";

export class DopplerLegacyClientImpl implements DopplerLegacyClient {
  private axios;
  private appSessionStateAccessor;

  constructor({
    axiosStatic,
    appSessionStateAccessor,
    appConfiguration: { dopplerLegacyBaseUrl },
  }: {
    axiosStatic: AxiosStatic;
    appSessionStateAccessor: AppSessionStateAccessor;
    appConfiguration: Partial<AppConfiguration>;
  }) {
    this.axios = axiosStatic.create({
      baseURL: dopplerLegacyBaseUrl,
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
      url: `${url}${!!parameters ? `/${parameters.join("/")}` : ""}`,
      headers: { Authorization: `Bearer ${jwtToken}` },
      data,
    });
  }

  private GET<T>(url: string, parameters: string[] | undefined = undefined) {
    return this.request<T>("GET", url, parameters);
  }

  private POST<T>(url: string, data: unknown = undefined) {
    return this.request<T>("POST", url, undefined, data);
  }

  async getShopifyIntegrationStatus(): Promise<
    Result<ShopifyIntegrationResult>
  > {
    const response = await this.GET<any>(
      "/Integration/Integration/GetShopifyIntegrationStatus",
    );
    return {
      success: true,
      value: response.data,
    };
  }

  async updateRfmSettings(
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ): Promise<Result<UpdateRfmSettings>> {
    const response = await this.POST<any>(
      "/Integration/Integration/UpdateRfmSettings",
      { idThirdPartyApp, rfm },
    );

    return {
      success: true,
      value: response.data,
    };
  }
}
