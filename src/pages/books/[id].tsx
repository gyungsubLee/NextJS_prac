import { BookData } from "@/types";
import style from "./[id].module.css";
import { fetchBookById } from "@/lib/fetch-books";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } }, // url 파라이머 String만 가능
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id;
  const book = await fetchBookById(Number(id));

  // 404 페이지 반환
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서를 만나보세요"
          />
        </Head>
        <div>로딩 중 입니다 ...</div>
      </>
    );
  if (!book) {
    return <div>문제가 발생했습니다. 다시 시도하세요.</div>;
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    book as BookData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} alt={title} className={style.cover_img} />
        </div>
        <div>
          <h2 className={style.title}>{title}</h2>
          <p className={style.author}>
            {author} | {publisher}{" "}
          </p>
          <div className={style.description}>
            <h3 className={style.sub_title}>{subTitle}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
