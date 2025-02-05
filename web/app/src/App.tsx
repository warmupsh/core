import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Catalog from './pages/Catalog';
import Teams from './pages/Teams';
import TeamView from './pages/TeamView';
import ProjectView from './pages/ProjectView';
import Member from './pages/Member'; // Import the new Member page
import MemberView from './pages/MemberView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<TeamView />} />
        <Route path="/projects/:id" element={<ProjectView />} />
        <Route path="/members" element={<Member />} />
        <Route path="/members/:id" element={<MemberView />} />
        <Route path="/projects" element={<Navigate to="/catalog" replace />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;