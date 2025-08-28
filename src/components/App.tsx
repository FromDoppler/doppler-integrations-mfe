import { Routes, Route } from "react-router-dom";
import { AssistedShoppingSection } from "./AssistedShopping";
import { RequireAuth } from "./application";
import { RfmRoutes } from "./Rfm/RfmRoutes";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/assisted-shopping"
        element={
          <RequireAuth>
            <AssistedShoppingSection />
          </RequireAuth>
        }
      />
      <Route
        path=":integration/rfm"
        element={
          <RequireAuth>
            <RfmRoutes />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
