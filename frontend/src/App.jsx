import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Notfound } from "./pages/Notfound";
import { Dashboard } from "./pages/Dashboard";
import { Holdings } from "./pages/holdings/Holdings";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { Layout } from "./pages/layout/Layout";
import { AuthProvider } from "./contexts/auth.context";
import { Addholding } from "./pages/holdings/AddHoldings";
import { EditHolding } from "./pages/holdings/EditHolding";
import HoldingsLayout from "./pages/holdings/HoldingLayout";
import { WatchlistLayout } from "./pages/watchlist/WatchlistLayout";
import { AddWatchlist } from "./pages/watchlist/AddWatchlist";
import { Watchlist } from "./pages/watchlist/Watchlist";
import { StockProvider } from "./contexts/stock.context";
import { StocksListing } from "./pages/stocks/StocksListing";
import { Transactions } from "./pages/bank/Transactions";
import { Loader } from "./pages/components/shared/Loader";
const BankListing = lazy(() =>
  import("./pages/bank/BankListing").then((module) => {
    return { default: module.BankListing };
  })
);

function App() {
  return (
    <BrowserRouter>
      <StockProvider>
        <AuthProvider>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stocks" element={<StocksListing />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/banklisting" element={<BankListing />} />
                <Route path="/holdings" element={<HoldingsLayout />}>
                  <Route index element={<Holdings />} />
                  <Route path="add" element={<Addholding />} />{" "}
                  <Route path="edit/:id" element={<EditHolding />} />
                </Route>
                <Route path="/watchlist" element={<WatchlistLayout />}>
                  <Route index element={<Watchlist />} />
                  <Route path="add" element={<AddWatchlist />} />
                </Route>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/auth/register" />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </Suspense>
          </Layout>
        </AuthProvider>
      </StockProvider>
    </BrowserRouter>
  );
}

export default App;
