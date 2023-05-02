import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/utils/hooks';
import Layout from '@/components/Layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
