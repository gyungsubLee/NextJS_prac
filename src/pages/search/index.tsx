import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { fetchSearchBooks } from "@/lib/fetch-books";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async (q: string) => {
    const data = await fetchSearchBooks(q);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과 API
      fetchSearchResult(q);
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서를 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
