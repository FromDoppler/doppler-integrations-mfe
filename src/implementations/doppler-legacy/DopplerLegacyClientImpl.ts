import { AxiosStatic, Method } from "axios";
import {
  AppConfiguration,
  AppSessionStateAccessor,
} from "../../abstractions/application";
import { DopplerLegacyClient } from "../../abstractions/doppler-legacy-client";
import { RfmStatus, UpdateRfmResponse } from "../../abstractions/rfm/rfm-types";

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
      withCredentials: true,
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
    return this.axios.request<T>({
      method,
      url: `${url}${!!parameters ? `/${parameters.join("/")}` : ""}`,
      data,
    });
  }

  private GET<T>(url: string, parameters: string[] | undefined = undefined) {
    return this.request<T>("GET", url, parameters);
  }

  private POST<T>(url: string, data: unknown = undefined) {
    return this.request<T>("POST", url, undefined, data);
  }

  async updateRfmSettings(
    idThirdPartyApp: number,
    rfm: RfmStatus,
  ): Promise<UpdateRfmResponse> {
    const response = await this.POST<UpdateRfmResponse>(
      `/Integration/Integration/UpdateRfmSettings?idThirdPartyApp=${idThirdPartyApp}`,
      rfm,
    );

    return response.data;
  }
}
