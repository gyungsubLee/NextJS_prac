import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClinckBnt = () => {
    router.push("/books/2");
  };

  useEffect(() => {
    router.prefetch("/books/2");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        <Link href={"/books/1"}>books/1</Link>
        <div>
          <button onClick={onClinckBnt}>/books/2 페이지 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
