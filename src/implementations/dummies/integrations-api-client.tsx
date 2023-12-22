import { timeout } from "../../utils";
import sampleThirdPartyConnections from "./sample-third-party-connections.json";
import sampleAssistedSales from "./sample-assisted-sales.json";
import { Result } from "../../abstractions/result-types";
import {
  AssistedSales,
  IntegrationsApiClient,
  ThirdPartyConnection,
} from "../../abstractions/integrations-api-client";

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

  getAssistedSales: () => Promise<Result<AssistedSales[]>> = async () => {
    console.log("Begin getAssistedSales...");
    await timeout(1000);

    const value = JSON.parse(JSON.stringify(sampleAssistedSales)) as any;

    const result: Result<AssistedSales[]> = {
      success: true,
      value,
    };

    console.log("End getAssistedSales", { result });
    return result;
  };
}
