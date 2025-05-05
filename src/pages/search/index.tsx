import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { fetchSearchBooks } from "@/lib/fetch-books";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/types";

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
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
