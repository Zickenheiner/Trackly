import { Outlet } from 'react-router-dom';
import LogoutButton from '@/features/auth/presentation/components/LogoutButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <span className="font-semibold text-lg">Trackly</span>
        <LogoutButton />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
