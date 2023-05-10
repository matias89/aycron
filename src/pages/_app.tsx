import type { AppProps } from 'next/app';
import { UserProvider } from '@/utils/hooks';
import Layout from '@/components/Layout/Layout';

import GlobalStyle from '@/styles/globalStyles';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </UserProvider>
  )
}
