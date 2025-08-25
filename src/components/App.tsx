import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./application";
import { AssistedShoppingSection } from "./AssistedShopping";
import { RFM } from "./Rfm";

export const App = () => (
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
      path="/shopify/rfm"
      element={
        <RequireAuth>
          <RFM integration={"shopify"} idThirdPartyApp={7} />
        </RequireAuth>
      }
    />
  </Routes>
);
