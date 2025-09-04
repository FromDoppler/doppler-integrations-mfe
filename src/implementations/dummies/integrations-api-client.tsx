import { timeout } from "../../utils";
import sampleThirdPartyConnections from "./sample-third-party-connections.json";
import sampleAssistedSales from "./sample-assisted-sales.json";
import { Result } from "../../abstractions/result-types";
import {
  AssistedSales,
  IntegrationsApiClient,
  ThirdPartyConnection,
} from "../../abstractions/integrations-api-client";
import { RfmStatus } from "../../abstractions/rfm/rfm-types";

export class DummyIntegrationsApiClient implements IntegrationsApiClient {
  getConnections: () => Promise<Result<ThirdPartyConnection[]>> = async () => {
    console.log("Begin getConnections...");
    await timeout(1000);

    const value = JSON.parse(
      JSON.stringify(sampleThirdPartyConnections),
    ) as any;

    const result: Result<ThirdPartyConnection[]> = {
      success: true,
      value,
    };

    console.log("End getConnections", { result });
    return result;
  };

  getAssistedSales: (
    idThirdPartyApp: string,
    dateFrom: Date,
    dateTo: Date,
  ) => Promise<Result<AssistedSales[]>> = async (
    idThirdPartyApp,
    dateFrom,
    dateTo,
  ) => {
    console.log("Begin getAssistedSales...");
    await timeout(1000);

    const value = JSON.parse(JSON.stringify(sampleAssistedSales)) as any;

    let resultValue = [];
    resultValue = value.filter(
      (sale: any) =>
        new Date(sale.orderDate).getTime() >= dateFrom.getTime() &&
        new Date(sale.orderDate).getTime() <= dateTo.getTime() &&
        sale.idThirdPartyApp.toString() === idThirdPartyApp,
    );

    const result: Result<AssistedSales[]> = {
      success: true,
      value: resultValue,
    };

    console.log("End getAssistedSales", { result });
    return result;
  };

  getIntegrationStatus: () => Promise<RfmStatus> = async () => {
    console.log("Begin getIntegrationStatus...");
    await timeout(1000);

    const result = {
      visible: true,
      active: false,
      period: "120",
      date: "20/08/2025",
    };

    console.log("End getIntegrationStatus", { result });

    return result;
  };
}
