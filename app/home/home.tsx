'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MovieList from "@/components/horizontal-list";
import { getDiscoverMovie, getTopRated, getTrending, getWatchlist } from "@/service/movies";
import { useQuery } from '@tanstack/react-query'
import Link from "next/link";

export default function Home() {
  const { data } = useQuery({ queryKey: ['discover/movie'], queryFn: getDiscoverMovie });
  const { data: trending } = useQuery({ queryKey: ['trending'], queryFn: getTrending });
  const { data: topRated } = useQuery({ queryKey: ['toprated'], queryFn: getTopRated });
  const { data: watchlist } = useQuery({ queryKey: ['watchlist'], queryFn: getWatchlist });
    
  return (
    <div className="p-4 md:px-8">
      <Carousel
        opts={{ loop: true }}
      >
        <CarouselContent className="rounded-lg">
          {trending?.results.map((item, index) => {
            const IMG_URL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE + '/w1280' + item.backdrop_path;

            return index < 3 && (
              <CarouselItem className="relative h-[350px] lg:h-[40vw] overflow-hidden" key={item.id}>
                <p className="absolute z-10 font-bold text-4xl md:text-5xl p-4">{item.title || item.name}</p>
                <Image alt="hero-highlight" src={IMG_URL} fill priority sizes="90vw" />
                <Link href={`/movie/${item.id}`}>
                  <Button className="absolute bottom-2 right-2 md:right-4 md:bottom-4" size="xl">Detail</Button>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="bg-slate-100/20 left-2 rounded-lg border-none" />
        <CarouselNext className="bg-slate-100/20 right-2 rounded-lg border-none" />
      </Carousel>
      {watchlist?.results.length && (
        <>
          <p className="py-4 text-2xl font-bold">Watchlist</p>
          <MovieList result={watchlist?.results} />
        </>
      )}
      <p className="py-4 text-2xl font-bold">Discover Movie</p>
      <MovieList result={data?.results} />
      <p className="py-4 text-2xl font-bold">Top Rated Movie</p>
      <MovieList result={topRated?.results} />
    </div>
  )
}