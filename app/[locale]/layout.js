import { notFound } from 'next/navigation';
import AppProviders from '@/app/components/AppProviders';
import '@/app/globals.css';
import { DM_Sans } from 'next/font/google';
import RouteLoadingSpinner from '@/app/components/RouteLoadingSpinner';
 const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Add or remove as needed
  variable: '--font-dm-sans',
});



export default async function LocaleLayout({ children, params }) {
 
     const { locale } = await params;
  let messages;
  try {
    messages = (await import(`@/app/messages/${locale}.json`)).default;
  } catch (err) {
    console.error(`Missing messages for locale "${locale}"`);
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <AppProviders locale={locale} messages={messages}>
          <RouteLoadingSpinner/>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
