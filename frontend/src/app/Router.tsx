import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Private from './Private';
import Public from './Public';
import Layout from './Layout';
import routes from '@/core/constants/routes';
import CategoryListPage from '@/features/categories/presentation/pages/CategoryListPage';
import RegisterPage from '@/features/auth/presentation/pages/RegisterPage';
import LoginPage from '@/features/auth/presentation/pages/LoginPage';
import ProfilePage from '@/features/profile/presentation/pages/ProfilePage';
import GoalListPage from '@/features/goals/presentation/pages/GoalListPage';

export default function Router() {
  const PublicRoutes = () => {
    return (
      <Route element={<Public redirect={routes.home} />}>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
      </Route>
    );
  };

  const PrivateRoutes = () => {
    return (
      <Route element={<Private redirect={routes.login} />}>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<h1>Private Route</h1>} />
          <Route path={routes.categories} element={<CategoryListPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path={routes.goals} element={<GoalListPage />} />
        </Route>
      </Route>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {PublicRoutes()}
          {PrivateRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
