import { AppConfiguration } from "./abstractions/application";

export const defaultAppConfiguration: AppConfiguration = {
  basename: undefined,
  appElementId: "root",
  keepAliveMilliseconds: 300000,
  // Original WebApp shares the same domain than Hello WebApp. So, it is not
  // necessary to specify the domain, and the path is shared across environments
  loginPageUrl: "/login",
  loaderUrl: "https://cdn.fromdoppler.com/loader/v1/loader.js",
  dopplerLegacyBaseUrl: "https://appint.fromdoppler.net",
  useDummies: true,
  dopplerApisBaseUrl: "https://apis.fromdoppler.com",
};
