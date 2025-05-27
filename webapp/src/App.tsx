import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        async lazy() {
          const { BookList } = await import("./pages/books/BookList");
          return { Component: BookList };
        },
      },
      {
        path: "books/new",
        async lazy() {
          const { BookForm } = await import("./pages/books/BookForm");
          return { Component: BookForm };
        },
      },
      {
        path: "authors/new",
        async lazy() {
          const { AuthorForm } = await import("./pages/authors/AuthorForm");
          return { Component: AuthorForm };
        },
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
