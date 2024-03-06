export type AppConfiguration = {
  readonly basename: string | undefined;
  readonly appElementId: string;
  readonly keepAliveMilliseconds: number;
  readonly loginPageUrl: string;
  readonly loaderUrl: string;
  readonly dopplerLegacyBaseUrl: string;
  readonly useDummies: boolean;
  readonly dopplerApisBaseUrl: string;
};
