import type {AppProps} from 'next/app';

import GlobalStyle from '../style/GlobalStyle';
import Layout from '../components/Layout';

export default function Xword({Component, pageProps}: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
