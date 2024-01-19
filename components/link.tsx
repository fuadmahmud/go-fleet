import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  children: React.ReactNode;
  active?: boolean;
}

const CustomLink = ({ active, children, ...props }: Props) => {
  const activeLink = "font-bold text-primarygreen underline"

  return (
    <Link
      className={`hover:font-bold hover:text-primarygreen hover:underline underline-offset-4 ${active ? activeLink : ''}`}
      {...props}>
      {children}
    </Link>
  )
}

export default CustomLink;
