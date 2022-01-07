import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import useReactQuery from "api/hooks/useReactQuery";
import Api from "api";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import Slider from "components/Slider";
import { HomeContainer } from "styles/HomeStyles";
import type { NowPlaying } from "Types/HomePage";

interface Props {
  data: {
    page: number;
    results: NowPlaying[];
    total_pages: number;
    total_results: number;
  };
  status: number;
}

const Home: NextPage<Props> = () => {
  // We access the cached data for the specific key on cache here if its prefetch on server
  // otherwise it will call to fetch data on client.
  const { data } = useReactQuery<Props>({
    key: "now-playing",
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing?${process.env.NEXT_PUBLIC_LANG}&page=1`,
  });

  console.log(data);

  return (
    <HomeContainer>
      <Head>
        <title>Movie Database - Home</title>
        <meta name="description" content="Maxtsh - Movie Database Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
    </HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  // Prefetching Data using QueryClient and React Query PreFetching
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("now-playing", () =>
    Api({
      method: "GET",
      url: `${process.env.BASE_URL}/movie/now_playing?${process.env.LANG}&page=1`,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
