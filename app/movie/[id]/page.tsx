import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Detail from './detail';
import { getMovieDetail } from '@/service/movies';

export interface MovieProps {
  params: {
    id: string;
  }
}

export default async function MoviePage(props: MovieProps) {
  const { params: { id } } = props;
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['movie/', id],
    queryFn: ({ queryKey }) => getMovieDetail(queryKey[1]),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail {...props} />
    </HydrationBoundary>
  )
}