import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import GlobalStyle, { Container } from "styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <GlobalStyle />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
