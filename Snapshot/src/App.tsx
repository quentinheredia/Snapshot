import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Snapshot from './pages/Snapshot';
import Debt from './pages/Debt';
import SnapshotLive from './pages/SnapshotLive';
import Ladder from './pages/Ladder';
import Layout from './components/Layout';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import ErrorBoundary from './components/ErrorBoundary'; // import your error boundary

const App: React.FC = () => {
  return (
    <CssVarsProvider>
      <Sheet sx={{ backgroundColor: 'background.surface', color: 'text.primary' }}>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/pages/Home" element={<Home />} />
                <Route path="/pages/Snapshot" element={<Snapshot />} />
                <Route path="/pages/SnapshotLive" element={<SnapshotLive />} />
                <Route path="/pages/Debt" element={<Debt />} />
                <Route path="/pages/Ladder" element={<Ladder />} />
                <Route path="/pages/Login" element={<Login />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </Sheet>
    </CssVarsProvider>
  );
};

export default App;
