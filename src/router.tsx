import { Route, Routes } from 'react-router';
import { ProtectedRoute, GuestRoute } from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Resolution from './pages/Resolution';
import Paragraph from './pages/Paragraph';
import ParagraphEdit from './pages/ParagraphEdit';
import Organization from './pages/Organization';
import Role from './pages/Role';
import RoleCreate from './pages/RoleCreate';
import User from './pages/User';
import UserCreate from './pages/UserCreate';
import OrganizationMember from './pages/OrganizationMember';

const AppRoutes = () => (
    <Routes>
        <Route index path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/resolutions" element={<ProtectedRoute><Resolution /></ProtectedRoute>} />
        <Route path="/criteria" element={<ProtectedRoute><Paragraph /></ProtectedRoute>} />
        <Route path="/criteria/:id/edit" element={<ProtectedRoute><ParagraphEdit /></ProtectedRoute>} />
        <Route path="/organizations" element={<ProtectedRoute><Organization /></ProtectedRoute>} />
        <Route path="/roles" element={<ProtectedRoute><Role /></ProtectedRoute>} />
        <Route path="/roles/create" element={<ProtectedRoute><RoleCreate /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/users/create" element={<ProtectedRoute><UserCreate /></ProtectedRoute>} />
        <Route path="/organization-members" element={<ProtectedRoute><OrganizationMember /></ProtectedRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
    </Routes>
);

export default AppRoutes;
