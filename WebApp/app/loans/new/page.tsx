"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Search, User, BookOpen, Calendar, AlertCircle } from "lucide-react"

// Mock data for demonstration
const availableBooks = [
  { id: 1, title: "Dom Casmurro", author: "Machado de Assis", isbn: "978-85-359-0277-5", available: 3 },
  { id: 2, title: "O Cortiço", author: "Aluísio Azevedo", isbn: "978-85-359-0278-2", available: 1 },
  { id: 4, title: "Física Quântica", author: "David J. Griffiths", isbn: "978-85-216-1840-4", available: 2 },
  { id: 5, title: "História do Brasil", author: "Boris Fausto", isbn: "978-85-314-0240-9", available: 4 },
]

const activeMembers = [
  { id: 1, name: "Ana Silva", email: "ana.silva@email.com", membershipType: "Estudante", activeLoans: 2 },
  { id: 2, name: "João Santos", email: "joao.santos@email.com", membershipType: "Professor", activeLoans: 1 },
  { id: 3, name: "Maria Costa", email: "maria.costa@email.com", membershipType: "Comunidade", activeLoans: 0 },
  { id: 4, name: "Pedro Oliveira", email: "pedro.oliveira@email.com", membershipType: "Estudante", activeLoans: 3 },
  { id: 5, name: "Carla Mendes", email: "carla.mendes@email.com", membershipType: "Funcionário", activeLoans: 1 },
]

const loanPeriods = [
  { value: "7", label: "7 dias" },
  { value: "14", label: "14 dias (padrão)" },
  { value: "21", label: "21 dias" },
  { value: "30", label: "30 dias" },
]

export default function NewLoanPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    memberId: "",
    bookId: "",
    loanPeriod: "14",
    notes: "",
  })
  const [bookSearch, setBookSearch] = useState("")
  const [memberSearch, setMemberSearch] = useState("")

  const selectedBook = availableBooks.find((book) => book.id.toString() === formData.bookId)
  const selectedMember = activeMembers.find((member) => member.id.toString() === formData.memberId)

  const filteredBooks = availableBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.isbn.includes(bookSearch),
  )

  const filteredMembers = activeMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase()),
  )

  const calculateDueDate = (days: string) => {
    const date = new Date()
    date.setDate(date.getDate() + Number.parseInt(days))
    return date.toLocaleDateString("pt-BR")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.memberId || !formData.bookId) {
      alert("Por favor, selecione um membro e um livro.")
      return
    }
    // Here you would typically send the data to your backend
    console.log("New loan data:", formData)
    // Simulate success and redirect
    router.push("/loans")
  }

  const getMembershipBadge = (type: string) => {
    const colors = {
      Estudante: "bg-blue-100 text-blue-800",
      Professor: "bg-purple-100 text-purple-800",
      Funcionário: "bg-orange-100 text-orange-800",
      Comunidade: "bg-gray-100 text-gray-800",
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/loans">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Novo Empréstimo</h1>
                <p className="text-muted-foreground">Registre um novo empréstimo de livro</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Member Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Selecionar Membro
                    </CardTitle>
                    <CardDescription>Escolha o membro que fará o empréstimo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberSearch">Buscar Membro</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="memberSearch"
                          placeholder="Digite o nome ou email..."
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.memberId === member.id.toString()
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, memberId: member.id.toString() }))}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {getMembershipBadge(member.membershipType)}
                                <Badge variant="outline" className="text-xs">
                                  {member.activeLoans} empréstimos ativos
                                </Badge>
                              </div>
                            </div>
                            {member.activeLoans >= 5 && (
                              <AlertCircle className="h-5 w-5 text-orange-500" title="Limite de empréstimos próximo" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedMember && (
                      <div className="p-3 bg-primary/5 border border-primary rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-medium text-primary">Membro Selecionado:</span>
                        </div>
                        <div className="mt-1">
                          <div className="font-medium">{selectedMember.name}</div>
                          <div className="text-sm text-muted-foreground">{selectedMember.email}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Book Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Selecionar Livro
                    </CardTitle>
                    <CardDescription>Escolha o livro a ser emprestado</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookSearch">Buscar Livro</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bookSearch"
                          placeholder="Digite o título, autor ou ISBN..."
                          value={bookSearch}
                          onChange={(e) => setBookSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredBooks.map((book) => (
                        <div
                          key={book.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.bookId === book.id.toString()
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, bookId: book.id.toString() }))}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{book.title}</div>
                              <div className="text-sm text-muted-foreground">{book.author}</div>
                              <div className="text-xs text-muted-foreground font-mono">{book.isbn}</div>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {book.available} disponível
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedBook && (
                      <div className="p-3 bg-primary/5 border border-primary rounded-lg">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-medium text-primary">Livro Selecionado:</span>
                        </div>
                        <div className="mt-1">
                          <div className="font-medium">{selectedBook.title}</div>
                          <div className="text-sm text-muted-foreground">{selectedBook.author}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Loan Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Detalhes do Empréstimo
                  </CardTitle>
                  <CardDescription>Configure os parâmetros do empréstimo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanPeriod">Período do Empréstimo</Label>
                      <Select
                        value={formData.loanPeriod}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, loanPeriod: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {loanPeriods.map((period) => (
                            <SelectItem key={period.value} value={period.value}>
                              {period.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data de Vencimento</Label>
                      <div className="p-2 bg-muted rounded-md">
                        <span className="text-sm font-medium">{calculateDueDate(formData.loanPeriod)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Input
                      id="notes"
                      placeholder="Observações sobre o empréstimo..."
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              {selectedMember && selectedBook && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Empréstimo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Membro</Label>
                        <p className="font-medium">{selectedMember.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Livro</Label>
                        <p className="font-medium">{selectedBook.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Data do Empréstimo</Label>
                        <p>{new Date().toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Data de Vencimento</Label>
                        <p>{calculateDueDate(formData.loanPeriod)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/loans">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={!formData.memberId || !formData.bookId}>
                  <Save className="mr-2 h-4 w-4" />
                  Registrar Empréstimo
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
