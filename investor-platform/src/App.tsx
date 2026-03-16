import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SectorOverview from './pages/SectorOverview';
import StockDetail from './pages/StockDetail';
import UpsidePotential from './pages/UpsidePotential';
import EntryOpportunity from './pages/EntryOpportunity';
import ValuationComparison from './pages/ValuationComparison';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Dashboard />} />
        <Route path="/upside"             element={<UpsidePotential />} />
        <Route path="/entry"              element={<EntryOpportunity />} />
        <Route path="/valuation"          element={<ValuationComparison />} />
        <Route path="/sector/:sectorId"   element={<SectorOverview />} />
        <Route path="/stock/:stockId"     element={<StockDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
