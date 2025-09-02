import { useParams } from "react-router-dom";
import { useGetThirdPartyConnections } from "../../queries/integrations-api-queries";
import { LoadingScreen, RequireAuth } from "../application";
import { useAppServices } from "../application";
import { RFM } from ".";

export const RfmRoutes = () => {
  const { integration } = useParams<{ integration: string }>();
  const thirdPartyConnections = useGetThirdPartyConnections();
  const {
    appConfiguration: { dopplerLegacyBaseUrl },
  } = useAppServices();

  if (thirdPartyConnections.isLoading) return <LoadingScreen />;
  if (thirdPartyConnections.isError) return null;

  const connection = thirdPartyConnections.data.find(
    (c) => c.thirdPartyApp.name.toLowerCase() === integration,
  );

  if (!connection) {
    window.location.href = `${dopplerLegacyBaseUrl}/Error/ShowErrorView`;
    return null;
  }

  return (
    <RequireAuth>
      <RFM
        integration={connection.thirdPartyApp.name.toLowerCase()}
        idThirdPartyApp={connection.thirdPartyApp.idThirdPartyApp}
      />
    </RequireAuth>
  );
};
