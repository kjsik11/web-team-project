/* eslint-disable @typescript-eslint/no-explicit-any */
import '@assets/main.css';
import 'nprogress/nprogress.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

// contexts
import ManagedUIContext from '@components/ui/context';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Noop: React.FC = ({ children }) => <>{children}</>;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = (Component as any).Layout || Noop;

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered', registration);
            registration.pushManager.subscribe({ userVisibleOnly: true });
            Notification.requestPermission().then((p) => {
              console.log(p);
            });
          })
          .catch((e) => {
            console.log('SW registration failed: ', e);
          });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />

        <script type="text/javascript" src="/js/redirectIE.js" />
      </Head>
      <ManagedUIContext>
        <Layout sidebar={(Component as any).Sidebar}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  );
};

export default App;
