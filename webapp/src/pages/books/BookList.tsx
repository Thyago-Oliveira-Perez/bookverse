import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { bookService } from "../../services/api";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router-dom";

export function BookList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    title: searchParams.get("title") || "",
    author: searchParams.get("author") || "",
    year: searchParams.get("year") || "",
    genre: searchParams.get("genre") || "",
  });

  const { data: booksResponse, isLoading } = useQuery({
    queryKey: ["books", filters],
    queryFn: () => bookService.search(filters as Record<string, string>),
  });

  const books = booksResponse?.data || [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams(filters as Record<string, string>);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Livros</h1>
      </div>

      <form
        onSubmit={handleSearch}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      >
        <Input
          placeholder="Título"
          value={filters.title}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Input
          placeholder="Autor"
          value={filters.author}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, author: e.target.value }))
          }
        />
        <Input
          placeholder="Ano"
          type="number"
          value={filters.year}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, year: e.target.value }))
          }
        />
        <Input
          placeholder="Gênero"
          value={filters.genre}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, genre: e.target.value }))
          }
        />
        <Button type="submit" className="sm:col-span-2 md:col-span-4">
          Buscar
        </Button>
      </form>

      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book.id} className="rounded-lg border p-4">
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-muted-foreground">
                por {book.author?.name || "Autor Desconhecido"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                  {book.publishedYear}
                </span>
                {book.genre && (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                    {book.genre}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
