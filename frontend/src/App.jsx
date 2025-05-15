import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Notfound } from "./pages/Notfound";
import { Dashboard } from "./pages/Dashboard";
import { Watchlist } from "./pages/Watchlist";
import { Holdings } from "./pages/holdings/Holdings";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Layout } from "./pages/layout/Layout";
import { AuthProvider } from "./contexts/auth.context";
import { Addholding } from "./pages/holdings/AddHoldings";
import { EditHolding } from "./pages/holdings/EditHolding";
import HoldingsLayout from "./pages/holdings/HoldingLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/holdings" element={<HoldingsLayout />}>
              <Route index element={<Holdings />} />
              <Route path="add" element={<Addholding />} />{" "}
              <Route path="edit/:id" element={<EditHolding />} />
            </Route>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/auth/register" />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
