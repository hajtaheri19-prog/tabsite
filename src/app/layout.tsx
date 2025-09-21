import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Vazirmatn } from 'next/font/google';
import NetworkStatusDetector from '@/components/layout/network-status-detector';
import PWAInstallButton from '@/components/layout/pwa-install-button';
import ServiceWorkerRegistration from '@/components/layout/service-worker-registration';
import PWAIconGenerator from '@/components/layout/pwa-icon-generator';
import PWAStatus from '@/components/layout/pwa-status';

const vazirmatn = Vazirmatn({ subsets: ['latin', 'arabic'], variable: '--font-vazirmatn' });

export const metadata: Metadata = {
  title: 'تبدیلا | دستیار هوشمند شما',
  description: 'دستیار هوشمند شما برای انواع محاسبات و تبدیل واحدها',
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'تبدیلا | دستیار هوشمند شما',
    description: 'دستیار هوشمند شما برای انواع محاسبات و تبدیل واحدها',
    images: ['/lo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'تبدیلا | دستیار هوشمند شما',
    description: 'دستیار هوشمند شما برای انواع محاسبات و تبدیل واحدها',
    images: ['/lo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#2a0e5c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" />
         <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16 32x32 48x48" />
         <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
         <link rel="apple-touch-icon" href="/favicon.ico" sizes="180x180" />
         <meta name="msapplication-TileImage" content="/favicon.ico" />
         <meta name="msapplication-TileColor" content="#2a0e5c" />
         <meta name="theme-color" content="#2a0e5c" />
         <meta name="google-site-verification" content="a0CBqNHND-fQsNhWsJvkCKJ6bbepFSU_3MlL2jwKslY" />
      </head>
      <body className={vazirmatn.variable}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="gradient-bg antialiased">
                {children}
                <Toaster />
                <NetworkStatusDetector />
                <PWAInstallButton />
                <ServiceWorkerRegistration />
                <PWAIconGenerator />
                <PWAStatus />
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
