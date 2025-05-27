import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { bookService, authorService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import type { Author } from "@/types";

interface BookFormData {
  title: string;
  authorId: number;
  publishedYear: number;
  isbn: string;
  description?: string;
  genre?: string;
  coverUrl?: string;
}

export function BookForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [authorSearch, setAuthorSearch] = useState("");
  const [formData, setFormData] = useState<BookFormData>(() => ({
    title: searchParams.get("title") || "",
    authorId: Number(searchParams.get("authorId")) || 0,
    publishedYear:
      Number(searchParams.get("publishedYear")) || new Date().getFullYear(),
    isbn: searchParams.get("isbn") || "",
    description: searchParams.get("description") || "",
    genre: searchParams.get("genre") || "",
    coverUrl: searchParams.get("coverUrl") || "",
  }));

  const { data: authorsResponse, isLoading: isLoadingAuthors } = useQuery({
    queryKey: ["authors", authorSearch],
    queryFn: () => authorService.searchByName(authorSearch),
    enabled: authorSearch.length > 2,
  });

  const authors = authorsResponse?.data || [];

  const createBookMutation = useMutation({
    mutationFn: bookService.create,
    onSuccess: () => {
      navigate("/books");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createBookMutation.mutate(formData);
  }

  function handleAuthorSelect(author: Author) {
    setFormData((prev) => ({ ...prev, authorId: author.id }));
    setAuthorSearch("");
  }

  function handleCreateAuthor() {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });
    navigate(`/authors/new?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Novo Livro</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              required
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Autor</label>
            <div className="relative">
              <Input
                value={authorSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAuthorSearch(e.target.value)
                }
                placeholder="Buscar autor..."
              />
              {authorSearch.length > 2 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
                  {isLoadingAuthors ? (
                    <div className="p-2 text-sm">Buscando autores...</div>
                  ) : authors.length > 0 ? (
                    authors.map((author) => (
                      <button
                        key={author.id}
                        type="button"
                        className="w-full p-2 text-left text-sm hover:bg-accent"
                        onClick={() => handleAuthorSelect(author)}
                      >
                        {author.name}
                      </button>
                    ))
                  ) : (
                    <div className="space-y-2 p-2">
                      <p className="text-sm">Nenhum autor encontrado</p>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleCreateAuthor}
                      >
                        Criar novo autor
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ano de Publicação</label>
            <Input
              type="number"
              required
              value={formData.publishedYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  publishedYear: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ISBN</label>
            <Input
              required
              value={formData.isbn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, isbn: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gênero</label>
            <Input
              value={formData.genre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, genre: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL da Capa</label>
            <Input
              type="url"
              value={formData.coverUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, coverUrl: e.target.value }))
              }
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="w-full rounded-md border bg-transparent px-3 py-2"
              rows={4}
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/books")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={createBookMutation.isPending}>
            {createBookMutation.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
