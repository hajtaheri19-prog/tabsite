'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function ManualInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstalling(false);
      toast({
        title: 'نصب شد!',
        description: 'تبدیلا با موفقیت روی دستگاه شما نصب شد.',
      });
    };

    // Check on load
    checkIfInstalled();

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check periodically for standalone mode
    const interval = setInterval(checkIfInstalled, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearInterval(interval);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: 'نصب در دسترس نیست',
        description: 'مرورگر شما از نصب PWA پشتیبانی نمی‌کند یا برنامه قبلاً نصب شده است.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsInstalling(true);
      
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: 'در حال نصب...',
          description: 'لطفاً منتظر بمانید تا نصب کامل شود.',
        });
      } else {
        toast({
          title: 'نصب لغو شد',
          description: 'می‌توانید بعداً از دکمه نصب استفاده کنید.',
          variant: 'destructive',
        });
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error installing PWA:', error);
      toast({
        title: 'خطا در نصب',
        description: 'مشکلی در نصب برنامه پیش آمد. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsInstalling(false);
    }
  };

  // Don't show if already installed
  if (isInstalled) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
        disabled
      >
        <Check className="w-4 h-4 ml-2" />
        نصب شده
      </Button>
    );
  }

  // Don't show if no prompt available
  if (!deferredPrompt) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstallClick}
      disabled={isInstalling}
      className="hover:bg-primary/10"
    >
      {isInstalling ? (
        <>
          <div className="w-4 h-4 ml-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          در حال نصب...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 ml-2" />
          نصب برنامه
        </>
      )}
    </Button>
  );
}
