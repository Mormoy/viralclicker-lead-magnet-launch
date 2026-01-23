import { Download, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminPWA } from '@/hooks/use-admin-pwa';

export function InstallPWAButton() {
  const { isInstallable, isInstalled, installApp } = useAdminPWA();

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <CheckCircle className="w-4 h-4" />
        <span className="hidden sm:inline">App instalada</span>
      </div>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      onClick={installApp}
      variant="outline"
      size="sm"
      className="border-viralOrange text-viralOrange hover:bg-viralOrange hover:text-white transition-colors"
    >
      <Smartphone className="w-4 h-4 mr-2" />
      <span className="hidden sm:inline">Instalar App</span>
      <Download className="w-4 h-4 sm:hidden" />
    </Button>
  );
}
