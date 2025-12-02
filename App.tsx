import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LicenseGate from "./components/LicenseGate";
import ApiKeyPage from "./components/ApiKeyPage";
import StudioPage from "./components/StudioPage";
import { API_KEY_STORAGE_KEY } from "./constants";

const ProtectedStudio: React.FC = () => {
  const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);

  // Relaxed check: Just ensure a key exists and is not empty.
  const isValidKey = typeof savedKey === "string" && savedKey.trim().length > 0;

  if (!isValidKey) {
    return <Navigate to="/api-key" replace />;
  }

  return <StudioPage />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LicenseGate />} />
        <Route path="/api-key" element={<ApiKeyPage />} />
        <Route path="/studio" element={<ProtectedStudio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;