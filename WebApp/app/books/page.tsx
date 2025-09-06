"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookOpen, Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"

// Mock data for demonstration
const books = [
  {
    id: 1,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    isbn: "978-85-359-0277-5",
    category: "Literatura",
    status: "Disponível",
    copies: 5,
    available: 3,
    publishYear: 1899,
  },
  {
    id: 2,
    title: "O Cortiço",
    author: "Aluísio Azevedo",
    isbn: "978-85-359-0278-2",
    category: "Literatura",
    status: "Disponível",
    copies: 3,
    available: 1,
    publishYear: 1890,
  },
  {
    id: 3,
    title: "Iracema",
    author: "José de Alencar",
    isbn: "978-85-359-0279-9",
    category: "Literatura",
    status: "Emprestado",
    copies: 4,
    available: 0,
    publishYear: 1865,
  },
  {
    id: 4,
    title: "Física Quântica",
    author: "David J. Griffiths",
    isbn: "978-85-216-1840-4",
    category: "Ciências",
    status: "Disponível",
    copies: 2,
    available: 2,
    publishYear: 2005,
  },
  {
    id: 5,
    title: "História do Brasil",
    author: "Boris Fausto",
    isbn: "978-85-314-0240-9",
    category: "História",
    status: "Disponível",
    copies: 6,
    available: 4,
    publishYear: 1994,
  },
]

const categories = ["All", "Literature", "Science", "History", "Philosophy", "Art"]
const statusOptions = ["All", "Available", "Loaned", "Maintenance"]

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || book.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string, available: number, copies: number) => {
    if (status === "Available") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Available ({available}/{copies})
        </Badge>
      )
    } else if (status === "Loaned") {
      return <Badge variant="destructive">Loaned</Badge>
    } else {
      return <Badge variant="outline">Maintenance</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Book Management</h1>
                <p className="text-muted-foreground">Manage the library collection</p>
              </div>
              <Button asChild>
                <Link href="/books/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Book
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, author or ISBN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSelectedStatus("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Books Table */}
            <Card>
              <CardHeader>
                <CardTitle>Books ({filteredBooks.length})</CardTitle>
                <CardDescription>Complete list of the library collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              {book.title}
                            </div>
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{book.category}</Badge>
                          </TableCell>
                          <TableCell>{book.publishYear}</TableCell>
                          <TableCell>{getStatusBadge(book.status, book.available, book.copies)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/books/${book.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/books/${book.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredBooks.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold text-foreground">No books found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting the filters or adding a new book.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/books/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Book
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
