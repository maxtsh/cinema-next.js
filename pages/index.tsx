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
import { HomeContainer } from "styles/HomeStyles";
import type { TrendingTypes } from "Types/HomePage";

interface Props {
  data: {
    page: number;
    results: TrendingTypes[];
    total_pages: number;
    total_results: number;
  };
  status: number;
}

const Home: NextPage<Props> = () => {
  // We access the cached data for the specific key on cache here if its prefetch on server
  // otherwise it will call to fetch data on client.
  const { data } = useReactQuery<Props>({
    key: "trending",
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/trending/all/week`,
  });

  const backdrop = `https://image.tmdb.org/t/p/original/${data?.data.results[0].backdrop_path}`;

  return (
    <HomeContainer src={backdrop}>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="International movie DB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data?.data?.results?.map((res: TrendingTypes) => (
          <li key={res.id}>{res.title}</li>
        ))}
      </ul>
    </HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  // Prefetching Data using QueryClient and React Query PreFetching
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("trending", () =>
    Api({
      method: "GET",
      url: `${process.env.BASE_URL}/trending/all/week`,
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
