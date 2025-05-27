import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Bem-vindo à Biblioteca Digital
      </h1>

      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Sua plataforma para cadastro e consulta de livros. Gerencie sua coleção
        de forma simples e eficiente.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/books"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Ver Livros
        </Link>
        <Link
          to="/books/new"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Adicionar Livro
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Catálogo Completo</h3>
          <p className="text-sm text-muted-foreground">
            Acesse nossa coleção completa de livros e autores
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Busca Avançada</h3>
          <p className="text-sm text-muted-foreground">
            Encontre livros usando filtros específicos
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Gestão Simplificada</h3>
          <p className="text-sm text-muted-foreground">
            Cadastre e atualize informações facilmente
          </p>
        </div>
      </div>
    </div>
  );
}
