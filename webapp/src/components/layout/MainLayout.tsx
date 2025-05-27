import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link
              to="/books"
              className="transition-colors hover:text-foreground/80"
            >
              Livros
            </Link>
            <Link
              to="/books/new"
              className="transition-colors hover:text-foreground/80"
            >
              Novo Livro
            </Link>
            <Link
              to="/authors/new"
              className="transition-colors hover:text-foreground/80"
            >
              Novo Autor
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Biblioteca Digital. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
