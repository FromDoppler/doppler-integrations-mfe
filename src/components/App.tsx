import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./application";
import { AssistedShoppingSection } from "./AssistedShopping";

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
  </Routes>
);
