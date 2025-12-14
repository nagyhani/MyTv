
import { Suspense } from "react";
import BackGround from "./(main)/components/background/BackGround";
import MovieListss from "./(main)/components/movieLists/movieLists";
import SearchBar from "./(main)/components/SearchBar/SearchBar";
import Trending from "./(main)/components/Trending/Trending";
import TvShow from "./(main)/components/tvShow/TvShow";

export default function Home() {

 
  return <div>
    <Suspense>

    <BackGround/>
    <SearchBar/>
    <Trending/>
    <MovieListss/>
    <TvShow/>
    </Suspense>
    

  </div>;
}
