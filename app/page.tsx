import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Home from './home/home';
import { getDiscoverMovie, getTopRated, getTrending, getWatchlist } from '@/service/movies'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['discover/movie'],
    queryFn: getDiscoverMovie,
  })

  await queryClient.prefetchQuery({
    queryKey: ['trending'],
    queryFn: getTrending
  })

  await queryClient.prefetchQuery({
    queryKey: ['toprated'],
    queryFn: getTopRated
  })

  await queryClient.prefetchQuery({
    queryKey: ['watchlist'],
    queryFn: getWatchlist
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  )
}
