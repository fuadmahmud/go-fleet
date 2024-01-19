'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { MovieProps } from './page';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetail, getSimilarMovie } from '@/service/movies';
import Link from 'next/link';
import MovieList from '@/components/horizontal-list';
import WatchlistBtn from '@/components/watchlist-btn';

const Movie = (props: MovieProps) => {
  const { params: { id } } = props;
  const { data } = useQuery({ queryKey: ['movie/', id], queryFn: ({ queryKey }) => getMovieDetail(queryKey[1]) });
  const { data: similar } = useQuery({ queryKey: ['movie/similar/', id], queryFn: ({ queryKey }) => getSimilarMovie(queryKey[1]) });
  const IMG_URL = data ? process.env.NEXT_PUBLIC_BASE_URL_IMAGE + '/w1280' + data.backdrop_path : "";
  

  return (
    <div>
      { data && <div className="h-[60vh] w-full relative">
        <div
          className="flex flex-col justify-end p-4"
          style={{
            backgroundImage: `url(${IMG_URL})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            height: '100%',
            width: '100%',
          }} 
        >
          <div className="flex flex-col gap-4 w-1/2 pb-4 h-3/4 justify-end">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{new Date(data.release_date).getFullYear()}</p>
              <span>•</span>
              <p className="text-sm font-semibold">{data.original_language.toUpperCase()}</p>
            </div>
            <div className="flex gap-2">
              {data.genres.map((item, index) => (
                <React.Fragment key={item.id}>
                  <p className="text-xs font-semibold">{item.name}</p>
                  {index !== data.genres.length - 1 && <div className="w-px h-full bg-white" />}
                </React.Fragment>
              ))}
            </div>
            <div className='overflow-hidden'>
              <p className="line-clamp-5 text-xs text-white/90">{data.overview}</p>
            </div>
            <div className="flex gap-2">
              <Link className="z-10" href={data.homepage} referrerPolicy="no-referrer" target="_blank" passHref>
                <Button variant="secondary">Explore More</Button>
              </Link>
              <WatchlistBtn className="bg-black/30 hover:bg-black/20 z-10 text-white" id={parseInt(id)} />
            </div>
          </div>
        </div>
        <div className="absolute h-1/4 bottom-0 left-0 right-0" style={{ background: "linear-gradient(0deg, rgba(26, 26, 29, 1) 0%, rgba(26, 26, 29, .25) 60%, rgba(0,0,0,0) 100%)" }} />
      </div>}
      <div className="p-4 md:px-8">
        <p className="py-4 text-2xl font-bold">Similar Movie</p>
        <MovieList result={similar?.results} />
      </div>
    </div>
  )
}

export default Movie;
