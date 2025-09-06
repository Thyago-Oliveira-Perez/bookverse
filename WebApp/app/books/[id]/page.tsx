"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, BookOpen, Calendar, MapPin, User, FileText } from "lucide-react"

// Mock data for demonstration
const book = {
  id: 1,
  title: "Dom Casmurro",
  author: "Machado de Assis",
  isbn: "978-85-359-0277-5",
  category: "Literatura",
  publishYear: 1899,
  publisher: "Editora Ática",
  pages: 256,
  copies: 5,
  available: 3,
  location: "Seção A, Estante 2, Prateleira 3",
  description:
    "Dom Casmurro é um romance escrito por Machado de Assis em 1899. A obra é narrada em primeira pessoa pelo protagonista Bentinho, que conta a história de seu amor por Capitu e suas suspeitas sobre a traição dela.",
  addedDate: "2023-01-15",
  lastUpdated: "2024-01-10",
}

const loanHistory = [
  {
    id: 1,
    member: "Ana Silva",
    loanDate: "2024-01-05",
    returnDate: "2024-01-19",
    status: "Devolvido",
    daysLate: 0,
  },
  {
    id: 2,
    member: "João Santos",
    loanDate: "2023-12-10",
    returnDate: "2023-12-24",
    status: "Devolvido",
    daysLate: 0,
  },
  {
    id: 3,
    member: "Maria Costa",
    loanDate: "2023-11-20",
    returnDate: "2023-12-05",
    status: "Devolvido",
    daysLate: 1,
  },
  {
    id: 4,
    member: "Pedro Oliveira",
    loanDate: "2024-01-20",
    returnDate: null,
    status: "Emprestado",
    daysLate: 0,
  },
]

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    if (status === "Devolvido") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Devolvido
        </Badge>
      )
    } else if (status === "Emprestado") {
      return <Badge variant="destructive">Emprestado</Badge>
    } else {
      return <Badge variant="outline">Em Atraso</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/books">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-serif font-bold text-foreground">{book.title}</h1>
                  <p className="text-muted-foreground">por {book.author}</p>
                </div>
              </div>
              <Button asChild>
                <Link href={`/books/${book.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Cover and Quick Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-32 h-48 bg-muted rounded-lg flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{book.category}</Badge>
                        <Badge variant={book.available > 0 ? "secondary" : "destructive"}>
                          {book.available > 0 ? `${book.available} disponível` : "Indisponível"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de exemplares:</span>
                      <span className="font-medium">{book.copies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponíveis:</span>
                      <span className="font-medium">{book.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emprestados:</span>
                      <span className="font-medium">{book.copies - book.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de empréstimos:</span>
                      <span className="font-medium">{loanHistory.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="history">Histórico de Empréstimos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    {/* Book Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Informações do Livro
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">ISBN</Label>
                            <p className="font-mono">{book.isbn}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Ano de Publicação</Label>
                            <p>{book.publishYear}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Editora</Label>
                            <p>{book.publisher}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Páginas</Label>
                            <p>{book.pages}</p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                          <p className="mt-1 text-sm leading-relaxed">{book.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>Localização: {book.location}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* System Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Informações do Sistema
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Data de Cadastro</Label>
                            <p>{new Date(book.addedDate).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Última Atualização</Label>
                            <p>{new Date(book.lastUpdated).toLocaleDateString("pt-BR")}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Histórico de Empréstimos
                        </CardTitle>
                        <CardDescription>Registro completo de todos os empréstimos deste livro</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Membro</TableHead>
                                <TableHead>Data do Empréstimo</TableHead>
                                <TableHead>Data de Devolução</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dias de Atraso</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {loanHistory.map((loan) => (
                                <TableRow key={loan.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      {loan.member}
                                    </div>
                                  </TableCell>
                                  <TableCell>{new Date(loan.loanDate).toLocaleDateString("pt-BR")}</TableCell>
                                  <TableCell>
                                    {loan.returnDate
                                      ? new Date(loan.returnDate).toLocaleDateString("pt-BR")
                                      : "Em andamento"}
                                  </TableCell>
                                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                                  <TableCell>
                                    {loan.daysLate > 0 ? (
                                      <Badge variant="destructive">{loan.daysLate} dias</Badge>
                                    ) : (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
