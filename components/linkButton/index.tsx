import Link from "next/link";

interface Button{
    route: string,
    text: string,
    className: string,
}
export default function LinkButton({route, text, className}: Button){
    return(
        <Link href={route} className={className}>{text}</Link>
    );
}