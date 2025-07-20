'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import './globals.css';
import LanguageWrapper from './components/AppProviders';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <LanguageWrapper>
            {children}
          </LanguageWrapper>
        </Provider>
      </body>
    </html>
  );
}
