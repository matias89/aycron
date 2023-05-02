import type { AppProps } from 'next/app';
import { UserProvider } from '@/utils/hooks';
import Layout from '@/components/Layout/Layout';

import GlobalStyle from '@/styles/globalStyles';

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
