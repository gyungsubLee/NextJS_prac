import Link from "next/link";
import Image from "next/image";
import style from "./book-item.module.css";
import { BookData } from "@/types";

export default function BookItem(book: BookData) {
  return (
    <Link href={`books/${book.id}`} className={style.booItem_container}>
      <div className={style.img_container}>
        <Image
          src={book.coverImgUrl}
          alt={book.title}
          width={120}
          height={150}
          className={style.bookItem_coverImg}
        />
      </div>
      <div className={style.text_container}>
        <p className={style.title}>{book.title}</p>
        <p className={style.sub_title}>{book.subTitle}</p>
        <p className={style.author}>
          {book.author} | {book.publisher}
        </p>
      </div>
    </Link>
  );
}
