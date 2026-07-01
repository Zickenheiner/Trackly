import { Button } from '@/core/ui/Button';
import { useLogout } from './use-logout';

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <Button
      label="Se déconnecter"
      variant="ghost"
      onPress={() => logoutMutation.mutate()}
      loading={logoutMutation.isPending}
    />
  );
}
