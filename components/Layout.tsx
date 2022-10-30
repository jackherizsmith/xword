import React, {ReactNode} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

namespace S {
  export const Page = styled.div`
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    min-height: 100vh;
  `;
}

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({children, title = 'Crossword Builder'}: Props) => (
  <S.Page>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <nav></nav>
    {children}
    <div />
    <footer></footer>
  </S.Page>
);

export default Layout;
