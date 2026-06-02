import { Outlet } from 'react-router-dom';
import BottomNav from '../core/components/BottomNav';
import Sidebar from '../core/components/Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
