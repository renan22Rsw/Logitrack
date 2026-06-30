"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface InputSearchProps {
  placeholder: string;
  initialSearch: string;
}

export const InputSearch = ({
  placeholder,
  initialSearch,
}: InputSearchProps) => {
  const [search, setSearch] = useState(initialSearch);
  const isFirstRender = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const currentSearch = searchParams.get("search") ?? "";

      if (search === currentSearch) return;

      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  return (
    <div className="relative flex items-center gap-4">
      <Search className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2" />
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="max-w-80 rounded-lg py-4.5 pl-10 placeholder:text-xs"
      />
    </div>
  );
};
