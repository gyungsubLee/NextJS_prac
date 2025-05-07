import { BookData } from "@/types";

// const BASE_URL = "http://localhost:12345";
const BASE_URL = "https://onbite-books-server-henna.vercel.app";

const BASE_URL_BOOK = `${BASE_URL}/book`;

async function fetchTemplate(url: string): Promise<BookData[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("응답이 실패 했습니다.");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const fetchBooks = () => fetchTemplate(`${BASE_URL_BOOK}`);
export const fetchRandomBooks = () => fetchTemplate(`${BASE_URL_BOOK}/random`);
export const fetchSearchBooks = (q: string) =>
  fetchTemplate(`${BASE_URL_BOOK}/search?q=${q}`);

export async function fetchBookById(id: number): Promise<BookData | null> {
  try {
    const response = await fetch(`${BASE_URL_BOOK}/${id}`);
    if (!response.ok) {
      throw new Error("응답이 실패 했습니다.");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
