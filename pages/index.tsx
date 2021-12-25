import Head from "next/head";
import Api from "api";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

type ResultType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
interface Props {
  trending: {
    page: number;
    results: ResultType[];
    total_pages: number;
    total_results: number;
  };
}

const Home: NextPage<Props> = ({ trending }) => {
  console.log(trending);
  return (
    <div>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="International movie DB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {trending.results.map((res: ResultType) => (
        <p key={res.id}>{res.title}</p>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const res = await Api({
    method: "GET",
    url: `${process.env.BASE_URL}/trending/all/week`,
  });

  console.log(res);

  return {
    props: {
      trending: res.data,
    },
  };
};

export default Home;
