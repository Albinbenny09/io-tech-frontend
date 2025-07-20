'use client';

import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';
import store from '@/store';


export default function AppProviders({ children, locale, messages }) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
}
