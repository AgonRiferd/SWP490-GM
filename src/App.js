import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import ScheduleManage from './pages/manage/schedule'
import PageNotFound from './pages/404';
import HomePage from './pages/home';
import PTManage from './pages/manage/pt';
import ExercisePage from './pages/manage/exercise';
import PackageManage from './pages/manage/package';
import NEManage from './pages/manage/ne';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const isAuthenticated = () => {
    return authenticated;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
        <Route exact path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path="/management">
            <Route exact path="schedule" element={<ScheduleManage />} />
            <Route exact path="pt" element={<PTManage />} />
            <Route exact path="ne" element={<NEManage />} />
            <Route exact path="exercise" element={<ExercisePage />} />
            <Route exact path="package" element={<PackageManage />} />
          </Route>
        </Route>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
