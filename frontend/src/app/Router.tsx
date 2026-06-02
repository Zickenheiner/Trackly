import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Private from './Private';
import Public from './Public';
import routes from '@/core/constants/routes';
import CategoryListPage from '@/features/categories/presentation/pages/CategoryListPage';
import RegisterPage from '@/features/auth/presentation/pages/RegisterPage';
import LoginPage from '@/features/auth/presentation/pages/LoginPage';
import ProfilePage from '@/features/profile/presentation/pages/ProfilePage';
import TransactionListPage from '@/features/transactions/presentation/pages/TransactionListPage';
import GoalListPage from '@/features/goals/presentation/pages/GoalListPage';

export default function Router() {
  const PublicRoutes = () => {
    return (
      <Route element={<Public redirect={routes.dashboard} />}>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
      </Route>
    );
  };

  const PrivateRoutes = () => {
    return (
      <Route element={<Private redirect={routes.login} />}>
        <Route
          path={routes.dashboard}
          element={
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
          }
        />
        <Route path={routes.transactions} element={<TransactionListPage />} />
        <Route path={routes.categories} element={<CategoryListPage />} />
        <Route path={routes.goals} element={<GoalListPage />} />
        <Route path={routes.profile} element={<ProfilePage />} />
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
