import SearchableLayout from "@/components/searchable-layout";
import React from "react";

export default function Home() {
  return <></>;
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
