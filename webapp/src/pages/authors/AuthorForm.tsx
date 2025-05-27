import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authorService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthorFormData {
  name: string;
  birthDate?: string;
  nationality?: string;
  biography?: string;
}

export function AuthorForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<AuthorFormData>({
    name: "",
    birthDate: "",
    nationality: "",
    biography: "",
  });

  const createAuthorMutation = useMutation({
    mutationFn: authorService.create,
    onSuccess: (response) => {
      const params = new URLSearchParams(searchParams);
      params.set("authorId", String(response.data.id));
      navigate(`/books/new?${params.toString()}`);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createAuthorMutation.mutate(formData);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Novo Autor</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <Input
              required
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data de Nascimento</label>
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, birthDate: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nacionalidade</label>
            <Input
              value={formData.nationality}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  nationality: e.target.value,
                }))
              }
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Biografia</label>
            <textarea
              className="w-full rounded-md border bg-transparent px-3 py-2"
              rows={4}
              value={formData.biography}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({ ...prev, biography: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={createAuthorMutation.isPending}>
            {createAuthorMutation.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
