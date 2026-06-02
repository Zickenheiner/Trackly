import { motion } from 'motion/react';
import { AlertCircle, UserCircle } from 'lucide-react';
import { useProfile } from '../../domain/hooks/user-profile.hook';
import ProfileForm from '../components/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl space-y-6">
      <Skeleton className="h-8 w-48" />
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileError() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl flex flex-col items-center justify-center gap-4 min-h-[50vh]">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-muted-foreground text-center">
        Impossible de charger votre profil. Veuillez réessayer.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Réessayer
      </Button>
    </div>
  );
}

export default function ProfilePage() {
  const { profile, profileIsLoading, profileError } = useProfile();

  if (profileIsLoading) return <ProfileSkeleton />;
  if (profileError || !profile) return <ProfileError />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <UserCircle className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold">Mon profil</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Modifiez vos informations personnelles et votre devise préférée.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
