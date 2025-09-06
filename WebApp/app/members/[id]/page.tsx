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
import { ArrowLeft, Edit, User, Mail, Phone, MapPin, Calendar, FileText, BookOpen, AlertTriangle } from "lucide-react"

// Mock data for demonstration
const member = {
  id: 1,
  name: "Ana Silva",
  email: "ana.silva@email.com",
  phone: "(11) 99999-1111",
  membershipType: "Estudante",
  status: "Ativo",
  joinDate: "2023-01-15",
  birthDate: "1995-03-20",
  document: "123.456.789-00",
  address: "Rua das Flores, 123",
  city: "São Paulo",
  zipCode: "01234-567",
  activeLoans: 2,
  totalLoans: 15,
  notes: "Membro exemplar, sempre devolve os livros no prazo.",
}

const loanHistory = [
  {
    id: 1,
    bookTitle: "Dom Casmurro",
    author: "Machado de Assis",
    loanDate: "2024-01-20",
    dueDate: "2024-02-03",
    returnDate: null,
    status: "Emprestado",
    daysLate: 0,
  },
  {
    id: 2,
    bookTitle: "O Cortiço",
    author: "Aluísio Azevedo",
    loanDate: "2024-01-15",
    dueDate: "2024-01-29",
    returnDate: null,
    status: "Emprestado",
    daysLate: 0,
  },
  {
    id: 3,
    bookTitle: "Iracema",
    author: "José de Alencar",
    loanDate: "2023-12-10",
    dueDate: "2023-12-24",
    returnDate: "2023-12-22",
    status: "Devolvido",
    daysLate: 0,
  },
  {
    id: 4,
    bookTitle: "O Guarani",
    author: "José de Alencar",
    loanDate: "2023-11-20",
    dueDate: "2023-12-04",
    returnDate: "2023-12-06",
    status: "Devolvido",
    daysLate: 2,
  },
]

export default function MemberProfilePage({ params }: { params: { id: string } }) {
  const getStatusBadge = (status: string) => {
    if (status === "Ativo") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    } else if (status === "Suspenso") {
      return <Badge variant="destructive">Suspenso</Badge>
    } else {
      return <Badge variant="outline">Inativo</Badge>
    }
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

  const getLoanStatusBadge = (status: string, daysLate: number) => {
    if (status === "Devolvido") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Devolvido
        </Badge>
      )
    } else if (status === "Emprestado" && daysLate > 0) {
      return <Badge variant="destructive">Em Atraso</Badge>
    } else if (status === "Emprestado") {
      return <Badge variant="outline">Emprestado</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
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
                  <Link href="/members">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">{member.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      {getMembershipBadge(member.membershipType)}
                      {getStatusBadge(member.status)}
                    </div>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href={`/members/${member.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Member Info Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <div>{member.address}</div>
                        <div className="text-muted-foreground">
                          {member.city} - {member.zipCode}
                        </div>
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
                      <span className="text-muted-foreground">Empréstimos ativos:</span>
                      <span className="font-medium">{member.activeLoans}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de empréstimos:</span>
                      <span className="font-medium">{member.totalLoans}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Membro desde:</span>
                      <span className="font-medium">{new Date(member.joinDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atrasos:</span>
                      <span className="font-medium">{loanHistory.filter((loan) => loan.daysLate > 0).length}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Novo Empréstimo
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Email
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Suspender Membro
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="loans">Empréstimos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Informações Pessoais
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Nome Completo</Label>
                            <p>{member.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">CPF/RG</Label>
                            <p>{member.document}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                            <p>{new Date(member.birthDate).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Tipo de Membro</Label>
                            <div className="mt-1">{getMembershipBadge(member.membershipType)}</div>
                          </div>
                        </div>

                        {member.notes && (
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Observações</Label>
                            <p className="mt-1 text-sm leading-relaxed">{member.notes}</p>
                          </div>
                        )}
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
                            <p>{new Date(member.joinDate).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Status Atual</Label>
                            <div className="mt-1">{getStatusBadge(member.status)}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="loans">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Histórico de Empréstimos
                        </CardTitle>
                        <CardDescription>Registro completo de todos os empréstimos do membro</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Livro</TableHead>
                                <TableHead>Data do Empréstimo</TableHead>
                                <TableHead>Data de Vencimento</TableHead>
                                <TableHead>Data de Devolução</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {loanHistory.map((loan) => (
                                <TableRow key={loan.id}>
                                  <TableCell className="font-medium">
                                    <div>
                                      <div className="font-medium">{loan.bookTitle}</div>
                                      <div className="text-sm text-muted-foreground">{loan.author}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{new Date(loan.loanDate).toLocaleDateString("pt-BR")}</TableCell>
                                  <TableCell>{new Date(loan.dueDate).toLocaleDateString("pt-BR")}</TableCell>
                                  <TableCell>
                                    {loan.returnDate
                                      ? new Date(loan.returnDate).toLocaleDateString("pt-BR")
                                      : "Em andamento"}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      {getLoanStatusBadge(loan.status, loan.daysLate)}
                                      {loan.daysLate > 0 && (
                                        <Badge variant="destructive" className="text-xs">
                                          {loan.daysLate} dias
                                        </Badge>
                                      )}
                                    </div>
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
