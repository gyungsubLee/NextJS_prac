import { BookData } from "@/types";
import style from "./[id].module.css";
import { fetchBookById } from "@/lib/fetch-books";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const book = await fetchBookById(Number(id));
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) {
    return <div>책을 찾을 수 없습니다.</div>;
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    book as BookData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={title} className={style.cover_img} />
      </div>
      <div>
        <h2 className={style.title}>{title}</h2>
        <h3 className={style.sub_title}>{subTitle}</h3>
        <p className={style.description}>{description}</p>
        <p className={style.author}>
          {author} | {publisher}{" "}
        </p>
      </div>
    </div>
  );
}
