import HeroBanner from "../../components/home/HeroBanner";
import LoadingSkeleton from "../../components/home/LoadingSkeleton";
import MovieRow from "../../components/home/MovieRow";

import useHome from "../../hooks/useHome";

function Home() {
  const { loading, homeData } = useHome();

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-black pb-10 text-white">
      <HeroBanner movie={homeData.heroMovie} genres={homeData.genres} />

      <div className="-mt-28 relative z-20 space-y-10">
        <MovieRow
          title="Trending Now"
          movies={homeData.trendingMovies}
          genres={homeData.genres}
        />

        <MovieRow
          title="Popular Movies"
          movies={homeData.popularMovies}
          genres={homeData.genres}
        />

        <MovieRow
          title="Top Rated"
          movies={homeData.topRatedMovies}
          genres={homeData.genres}
        />

        <MovieRow
          title="Upcoming"
          movies={homeData.upcomingMovies}
          genres={homeData.genres}
        />

        <MovieRow
          title="Now Playing"
          movies={homeData.nowPlayingMovies}
          genres={homeData.genres}
        />
      </div>
    </div>
  );
}

export default Home;
