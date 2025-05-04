import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { fetchSearchBooks } from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;

  const searchBooks = await fetchSearchBooks(q);
  return {
    props: {
      searchBooks,
    },
  };
};

export default function Search({
  searchBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
