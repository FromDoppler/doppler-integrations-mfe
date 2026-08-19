import { Routes, Route } from "react-router-dom";
import { AssistedShoppingSection } from "./AssistedShopping";
import { PrivateRoute } from "./application";
import { RfmRoutes } from "./Rfm/RfmRoutes";
import { COLLABORATOR_SECTION } from "../utils/constants";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/assisted-shopping"
        element={
          <PrivateRoute section={COLLABORATOR_SECTION.Reports}>
            <AssistedShoppingSection />
          </PrivateRoute>
        }
      />
      <Route
        path=":integration/rfm"
        element={
          <PrivateRoute section={COLLABORATOR_SECTION.Integration}>
            <RfmRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
