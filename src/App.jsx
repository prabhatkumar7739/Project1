import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home/Home';
import CostAdvice from './components/pages/CostAdvice';
import CloudUsageReport from './components/pages/CloudUsageReport/CloudUsageReport';
import Explorer from './components/pages/Explorer/Explorer';
import CloudUsageReportTable from './components/CloudUsageReportTable/CloudUsageReportTable';
import Datadog from './components/datadog/datadog';
import DatadogTable from './components/datadog/DatadogTable';
import CloudWatch from './components/cloudwatch/CloudWatch';
import { CloudUsageProvider } from './context/CloudUsageContext';

const App = () => {
   useEffect(() => {
    const timeoutId = setTimeout(() => {
      import("@/tour/tour").then((tour) => {
        tour.default.start();
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <CloudUsageProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explorer" element={<Explorer />} />
          <Route path="cost-advice" element={<CostAdvice />} />
          <Route path="cloud-usage" element={<CloudUsageReport />} />
          <Route path="cloud-usage-report-table" element={<CloudUsageReportTable />} />
          <Route path="datadog" element={<Datadog />} />
          <Route path="datadog-table" element={<DatadogTable />} />
          <Route path="cloudwatch" element={<CloudWatch />} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CloudUsageProvider>
  );
};

export default App;