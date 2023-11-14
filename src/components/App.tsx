import { Routes, Route } from "react-router-dom";
import { Main } from "./Main";
import { Campaign } from "./Campaign";
import { ConfigurationDemo } from "./ConfigurationDemo";
import { RequireAuth } from "./application";
import { SessionDemo } from "./SessionDemo";

export const App = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route
        path="campaigns/:idCampaign"
        element={
          <RequireAuth>
            <Campaign />
          </RequireAuth>
        }
      />
      <Route path="session-demo" element={<SessionDemo />} />
      <Route path="configuration-demo" element={<ConfigurationDemo />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Route>
  </Routes>
);
