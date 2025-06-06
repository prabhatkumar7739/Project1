import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home/Home';
import CostAdvice from './components/pages/CostAdvice';
import CloudUsageReport from './components/pages/CloudUsageReport/CloudUsageReport';
import Explorer from './components/pages/Explorer/Explorer';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explorer" element={<Explorer />} />
        <Route path="cost-advice" element={<CostAdvice />} />
        <Route path="cloud-usage" element={<CloudUsageReport />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;