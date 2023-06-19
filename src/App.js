import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import MemberManage from './pages/manage/member'
import PageNotFound from './pages/404';
import HomePage from './pages/home';
import StaffManage from './pages/manage/staff';
import ExercisePage from './pages/manage/exercise';

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
            <Route exact path="member" element={<MemberManage />} />
            <Route exact path="staff" element={<StaffManage />} />
            <Route exact path="exercise" element={<ExercisePage />} />
          </Route>
        </Route>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
