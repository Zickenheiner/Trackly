import { LogOut } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useLogout } from '../../domain/hooks/auth.hook';

export default function LogoutButton() {
  const { logout, logoutIsPending } = useLogout();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => logout()}
      disabled={logoutIsPending}
    >
      <LogOut className="h-4 w-4 mr-2" />
      {logoutIsPending ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  );
}
