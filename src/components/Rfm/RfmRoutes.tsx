import { useParams } from "react-router-dom";
import { useGetThirdPartyConnections } from "../../queries/integrations-api-queries";
import { LoadingScreen, RequireAuth } from "../application";
import { RFM } from ".";

export const RfmRoutes = () => {
  const { integration } = useParams<{ integration: string }>();
  const thirdPartyConnections = useGetThirdPartyConnections();

  if (thirdPartyConnections.isLoading) return <LoadingScreen />;
  if (thirdPartyConnections.isError)
    return <div>Error al cargar integraciones</div>;

  const connection = thirdPartyConnections.data.find(
    (c) => c.thirdPartyApp.name.toLowerCase() === integration,
  );

  if (!connection) return <div>Integración no encontrada</div>;

  return (
    <RequireAuth>
      <RFM
        integration={connection.thirdPartyApp.name.toLowerCase()}
        idThirdPartyApp={connection.thirdPartyApp.idThirdPartyApp}
      />
    </RequireAuth>
  );
};
