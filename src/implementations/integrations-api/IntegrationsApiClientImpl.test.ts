import {
  AppConfiguration,
  AppSessionStateAccessor,
} from "../../abstractions/application";
import { AxiosStatic } from "axios";
import { IntegrationsApiClientImpl } from "./IntegrationsApiClientImpl";

describe(IntegrationsApiClientImpl.name, () => {
  describe("getConnections", () => {
    it("should request API with the right parameters and return API result as it is", async () => {
      // Arrange
      const jwtToken = "jwtToken";
      const dopplerAccountName = "dopplerAccountName";
      const dopplerApisBaseUrl = "dopplerApisBaseUrl";

      const appSessionStateAccessor = {
        getSessionUserData: () => ({
          status: "authenticated",
          dopplerAccountName,
        }),
        getSessionAuthData: () => ({
          status: "authenticated",
          dopplerAccountName,
          jwtToken,
        }),
      } as AppSessionStateAccessor;

      const apiResponse = [
        {
          idUser: 0,
          accountName: "doppler@fromdoppler.com",
          connectionErrors: 0,
          utcLastCompletedSync: "2023-01-01",
          utcLastAssistedShoppingSync: "2023-01-01",
          thirdPartyApp: {
            idThirdPartyApp: 3,
            name: "Tiendanube",
            assistedShoppingEnabled: true,
          },
        },
      ];

      const appConfiguration = {
        dopplerApisBaseUrl: dopplerApisBaseUrl,
      } as AppConfiguration;

      const request = jest.fn(() =>
        Promise.resolve({
          data: apiResponse,
        }),
      );

      const create = jest.fn(() => ({
        request,
      }));

      const axiosStatic = {
        create,
      } as unknown as AxiosStatic;

      const sut = new IntegrationsApiClientImpl({
        axiosStatic,
        appSessionStateAccessor,
        appConfiguration,
      });

      // Act
      const result = await sut.getConnections();

      // Assert
      expect(create).toHaveBeenCalledWith({
        baseURL: dopplerApisBaseUrl,
      });
      expect(request).toHaveBeenCalledWith({
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: "GET",
        url: `/integrations/user/connections`,
      });

      expect(result).toEqual({
        success: true,
        value: apiResponse,
      });
    });

    it("should throw error result when an unexpected error occurs", async () => {
      // Arrange
      const error = new Error("Network error");
      const appSessionStateAccessor = {
        getSessionUserData: () => ({
          status: "authenticated",
          dopplerAccountName: "dopplerAccountName",
        }),
        getSessionAuthData: () => ({
          status: "authenticated",
          dopplerAccountName: "dopplerAccountName",
          jwtToken: "jwtToken",
        }),
      } as AppSessionStateAccessor;

      const appConfiguration = {
        dopplerApisBaseUrl: "dopplerApisBaseUrl",
      } as AppConfiguration;

      const axiosStatic = {
        create: () => ({
          request: () => Promise.reject(error),
        }),
      } as unknown as AxiosStatic;

      const sut = new IntegrationsApiClientImpl({
        axiosStatic,
        appSessionStateAccessor,
        appConfiguration,
      });

      // Assert
      await expect(async () => {
        // Act
        await sut.getConnections();
      }).rejects.toThrow(error);
    });

    it.each([
      { sessionStatus: "non-authenticated" },
      { sessionStatus: "unknown" },
      { sessionStatus: "weird inexistent status" },
    ])(
      "should throw error result when the session is not authenticated ($sessionStatus)",
      async ({ sessionStatus }) => {
        // Arrange
        const appSessionStateAccessor = {
          getSessionUserData: () => ({
            status: sessionStatus,
          }),
          getSessionAuthData: () => ({
            status: sessionStatus,
          }),
        } as AppSessionStateAccessor;

        const appConfiguration = {
          dopplerApisBaseUrl: "dopplerApisBaseUrl",
        } as AppConfiguration;

        const request = jest.fn(() => {});

        const axiosStatic = {
          create: () => ({
            request,
          }),
        } as unknown as AxiosStatic;

        const sut = new IntegrationsApiClientImpl({
          axiosStatic,
          appSessionStateAccessor,
          appConfiguration,
        });

        // Assert
        await expect(async () => {
          // Act
          await sut.getConnections();
        }).rejects.toThrow(new Error("Authenticated session required"));

        // Assert
        expect(request).not.toHaveBeenCalled();
      },
    );
  });
});

describe(IntegrationsApiClientImpl.name, () => {
  describe("getAssistedSales", () => {
    it("should request API with the right parameters and return API result as it is", async () => {
      // Arrange
      const jwtToken = "jwtToken";
      const dopplerAccountName = "dopplerAccountName";
      const dopplerApisBaseUrl = "dopplerApisBaseUrl";

      const appSessionStateAccessor = {
        getSessionUserData: () => ({
          status: "authenticated",
          dopplerAccountName,
        }),
        getSessionAuthData: () => ({
          status: "authenticated",
          dopplerAccountName,
          jwtToken,
        }),
      } as AppSessionStateAccessor;

      const apiResponse = [
        {
          idOrder: 123,
          idUser: 123,
          idThirdPartyApp: 3,
          orderTotal: 10.0,
          currency: "ARS",
          orderDate: "2023-01-01 00:00:00",
          openDate: "2023-01-01 00:00:00",
          campaign: {
            idCampaign: 123,
            name: "campaign1",
            campaignType: "automation",
            automationEventType: "list suscription",
            amountSentSubscribers: 10,
            UTCSentDate: "2022-12-19 15:12:45.353",
          },
          subscriber: {
            idSubscriber: 123,
            email: "doppler@fromdoppler.com",
          },
        },
      ];

      const appConfiguration = {
        dopplerApisBaseUrl: dopplerApisBaseUrl,
      } as AppConfiguration;

      const request = jest.fn(() =>
        Promise.resolve({
          data: apiResponse,
        }),
      );

      const create = jest.fn(() => ({
        request,
      }));

      const axiosStatic = {
        create,
      } as unknown as AxiosStatic;

      const sut = new IntegrationsApiClientImpl({
        axiosStatic,
        appSessionStateAccessor,
        appConfiguration,
      });

      const date = new Date();
      // Act
      const result = await sut.getAssistedSales("1", date, date);

      // Assert
      expect(create).toHaveBeenCalledWith({
        baseURL: dopplerApisBaseUrl,
      });
      expect(request).toHaveBeenCalledWith({
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: "GET",
        url: `/integrations/user/assisted-shopping/1/${date.toUTCString()}/${date.toUTCString()}`,
      });

      expect(result).toEqual({
        success: true,
        value: apiResponse,
      });
    });

    it("should throw error result when an unexpected error occurs", async () => {
      // Arrange
      const error = new Error("Network error");
      const appSessionStateAccessor = {
        getSessionUserData: () => ({
          status: "authenticated",
          dopplerAccountName: "dopplerAccountName",
        }),
        getSessionAuthData: () => ({
          status: "authenticated",
          dopplerAccountName: "dopplerAccountName",
          jwtToken: "jwtToken",
        }),
      } as AppSessionStateAccessor;

      const appConfiguration = {
        dopplerApisBaseUrl: "dopplerApisBaseUrl",
      } as AppConfiguration;

      const axiosStatic = {
        create: () => ({
          request: () => Promise.reject(error),
        }),
      } as unknown as AxiosStatic;

      const sut = new IntegrationsApiClientImpl({
        axiosStatic,
        appSessionStateAccessor,
        appConfiguration,
      });

      // Assert
      await expect(async () => {
        // Act
        await sut.getAssistedSales("1", new Date(), new Date());
      }).rejects.toThrow(error);
    });

    it.each([
      { sessionStatus: "non-authenticated" },
      { sessionStatus: "unknown" },
      { sessionStatus: "weird inexistent status" },
    ])(
      "should throw error result when the session is not authenticated ($sessionStatus)",
      async ({ sessionStatus }) => {
        // Arrange
        const appSessionStateAccessor = {
          getSessionUserData: () => ({
            status: sessionStatus,
          }),
          getSessionAuthData: () => ({
            status: sessionStatus,
          }),
        } as AppSessionStateAccessor;

        const appConfiguration = {
          dopplerApisBaseUrl: "dopplerApisBaseUrl",
        } as AppConfiguration;

        const request = jest.fn(() => {});

        const axiosStatic = {
          create: () => ({
            request,
          }),
        } as unknown as AxiosStatic;

        const sut = new IntegrationsApiClientImpl({
          axiosStatic,
          appSessionStateAccessor,
          appConfiguration,
        });

        // Assert
        await expect(async () => {
          // Act
          await sut.getAssistedSales("1", new Date(), new Date());
        }).rejects.toThrow(new Error("Authenticated session required"));

        // Assert
        expect(request).not.toHaveBeenCalled();
      },
    );
  });
});
