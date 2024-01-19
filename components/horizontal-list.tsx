import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Movies } from "@/types";
import Link from "next/link";
import WatchlistBtn from "./watchlist-btn";

interface Props {
  result?: Movies["results"]
}

const HorizontalList = ({ result }: Props) => {
  
  return (
    <div className="flex flex-row gap-2 overflow-x-scroll overflow-y-hidden container px-0">
      {result?.map((item) => {
        const IMG_URL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE + '/w300' + item.backdrop_path;
        return (
          <Card key={item.id} className="rounded-none border-none text-white">
            <CardContent className="w-64 aspect-video relative overflow-y-visible whitespace-nowrap">
              <Image
                alt={item.title}
                src={IMG_URL}
                className="object-cover object-center"
                fill
                sizes="25vw"
                loading="lazy" />
              <div className="flex flex-col justify-between absolute overflow-hidden text-wrap left-0 p-4 z-10 w-full h-full bg-foreground transform transition duration-500 opacity-0 hover:opacity-100">
                <p className="font-bold">{item.title}</p>
                <div className="flex gap-2">
                <Link className="w-full" href={`/movie/${item.id}`} passHref>
                  <Button className="w-full">Detail</Button>
                </Link>
                <WatchlistBtn id={item.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}

export default HorizontalList;
