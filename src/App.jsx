import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { CloudUsageProvider } from './context/CloudUsageContext';
import { CloudProviderProvider } from './context/CloudProviderContext';
import { FormTableProvider } from './context/FormTableContext';
import { PortfolioProvider } from './context/PortfolioContext';
import MainContent from './components/pages/Home/MainContent';

const Explorer = lazy(() => import('../src/components/pages/Explorer/Explorer'));
const CostAdvice = lazy(() => import('../src/components/pages/CostAdvice'));
const CloudUsageReports = lazy(() => import('../src/components/pages/CloudUsageReport/CloudUsageReport'));
const CloudUsageReportTable = lazy(() => import('../src/components/CloudUsageReportTable/CloudUsageReportTable'));
const Datadog = lazy(()=>import('../src/components/datadog/datadog'))
const CloudWatch = lazy(()=>import('../src/components/cloudwatch/cloudwatch'))

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
    <BrowserRouter>
      <CloudProviderProvider>
        <FormTableProvider>
          <PortfolioProvider>
            <CloudUsageProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<MainContent />} />
                    <Route path="managePortfolio" element={<MainContent />} />
                    <Route path="explorer" element={<Explorer />} />
                    <Route path="cost-advice" element={<CostAdvice />} />
                    <Route path="cloud-usage" element={<CloudUsageReports />} />
                    <Route path="cloud-usage-report-table" element={<CloudUsageReportTable />} />
                    <Route path='datadog' element={<Datadog/>}/>
                    <Route path='cloudwatch' element={<CloudWatch/>}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </CloudUsageProvider>
          </PortfolioProvider>
        </FormTableProvider>
      </CloudProviderProvider>
    </BrowserRouter>
  );
};

export default App;