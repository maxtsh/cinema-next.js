import { useState, useEffect, memo } from "react";
import useReactQuery from "api/hooks/useReactQuery";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { Intro, Backdrop, Overlay, NextButton, PrevButton } from "./styles";
import type { NowPlaying } from "Types/HomePage";

interface MainIntroData {
  data: {
    page: number;
    results: NowPlaying[];
    total_pages: number;
    total_results: number;
  };
  status: number;
}

type SlideType = {
  auto: boolean;
  min: number;
  max: number;
  current: number;
};

const MainSlider: React.FC = () => {
  const { data } = useReactQuery<MainIntroData>({
    key: "now-playing",
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing?${process.env.NEXT_PUBLIC_LANG}&page=1`,
  });

  const [slide, setSlide] = useState<SlideType>({
    auto: true,
    min: 0,
    max: (data?.data?.results.length || 1) - 1,
    current: 0,
  });

  // Handle Autoplay
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (slide.auto) {
      interval = setInterval(() => {
        slide.current < slide.max
          ? setSlide({ ...slide, current: slide.current + 1 })
          : setSlide({ ...slide, current: 0 });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [slide]);

  const handleNextSlide = () => {
    if (slide.current < slide.max)
      setSlide({ ...slide, current: slide.current + 1 });
  };

  const handlePrevSlide = () => {
    if (slide.current > slide.min)
      setSlide({ ...slide, current: slide.current - 1 });
  };

  const currData = data?.data.results[slide.current];

  return (
    <>
      <Backdrop
        src={`https://image.tmdb.org/t/p/original/${currData?.backdrop_path}`}
      />
      <Intro>
        <h1 className="title">{currData?.title}</h1>
        <Rating name="read-only" value={value} readOnly />
        <p className="description">{currData?.overview}</p>
      </Intro>
      <NextButton onClick={handleNextSlide}>
        <MdArrowForwardIos fontWeight={700} color="#fff" size={40} />
      </NextButton>
      <PrevButton onClick={handlePrevSlide}>
        <MdArrowBackIosNew fontWeight={700} color="#fff" size={40} />
      </PrevButton>
      <Overlay />
    </>
  );
};

export default memo(MainSlider);
