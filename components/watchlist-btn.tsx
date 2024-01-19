'use client'
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist, getWatchlist } from "@/service/movies";
import { PlusIcon, Cross2Icon } from "@radix-ui/react-icons";

interface WatchlistBtnProps {
  className?: string;
  id: number;
}

const WatchlistBtn = (props: WatchlistBtnProps) => {
  const { data } = useQuery({ queryKey: ['watchlist'], queryFn: getWatchlist });
  const queryClient = useQueryClient();
  const watchlist = data?.results.map(item => item.id) || [];
  const listed = watchlist.includes(props.id);
  const { mutate } = useMutation({
    mutationFn: ({ id, act }: { id: number, act: boolean }) => addToWatchlist(id, act),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
  })

  const handleClick = () => mutate({
      id: props.id,
      act: !listed
    });

  return (
    <Button className={cn(props.className, "h-10")} variant="secondary" onClick={handleClick}>
      {!listed ? <PlusIcon /> : <Cross2Icon />}
    </Button>
  )
}

export default WatchlistBtn;
