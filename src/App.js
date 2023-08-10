import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import MemberManage from './pages/manage/member'
import PageNotFound from './pages/404';
import HomePage from './pages/home';
import PTManage from './pages/manage/pt';
import PackageManage from './pages/manage/package';
import NEManage from './pages/manage/ne';
import React, { useState } from 'react';
import { PageLoader } from './flagments/preloader';
import ReportPage from './pages/report';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isLoading ? (
        <PageLoader setIsLoading={setIsLoading} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <PrivateRoute setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}>
            <Route index element={<HomePage />} />
            <Route path="/management">
              <Route exact path="member" element={<MemberManage />} />
              <Route exact path="pt" element={<PTManage />} />
              <Route exact path="ne" element={<NEManage />} />
              <Route exact path="package" element={<PackageManage />} />
            </Route>
            <Route path="/report" element={<ReportPage />} />
          </Route>
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
