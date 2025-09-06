"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, BookOpen, AlertTriangle, Award, FileText } from "lucide-react"

// Mock data for demonstration
const popularBooksData = [
  { title: "Dom Casmurro", author: "Machado de Assis", loans: 45, category: "Literatura" },
  { title: "O Cortiço", author: "Aluísio Azevedo", loans: 38, category: "Literatura" },
  { title: "Física Quântica", author: "David J. Griffiths", loans: 32, category: "Ciências" },
  { title: "História do Brasil", author: "Boris Fausto", loans: 28, category: "História" },
  { title: "Iracema", author: "José de Alencar", loans: 25, category: "Literatura" },
  { title: "Química Orgânica", author: "John McMurry", loans: 22, category: "Ciências" },
  { title: "Sociologia", author: "Anthony Giddens", loans: 20, category: "Ciências Sociais" },
  { title: "O Guarani", author: "José de Alencar", loans: 18, category: "Literatura" },
]

const overdueData = [
  {
    member: "João Santos",
    book: "O Cortiço",
    dueDate: "2024-01-12",
    daysOverdue: 8,
    memberType: "Professor",
    phone: "(11) 99999-2222",
  },
  {
    member: "Pedro Oliveira",
    book: "O Guarani",
    dueDate: "2024-01-10",
    daysOverdue: 10,
    memberType: "Estudante",
    phone: "(11) 99999-4444",
  },
  {
    member: "Maria Costa",
    book: "Iracema",
    dueDate: "2024-01-18",
    daysOverdue: 2,
    memberType: "Comunidade",
    phone: "(11) 99999-3333",
  },
  {
    member: "Carlos Silva",
    book: "Física Quântica",
    dueDate: "2024-01-15",
    daysOverdue: 5,
    memberType: "Estudante",
    phone: "(11) 99999-5555",
  },
]

const usageByPeriodData = [
  { month: "Jul", loans: 320, returns: 315, newMembers: 25 },
  { month: "Ago", loans: 280, returns: 285, newMembers: 18 },
  { month: "Set", loans: 450, returns: 440, newMembers: 32 },
  { month: "Out", loans: 380, returns: 390, newMembers: 28 },
  { month: "Nov", loans: 520, returns: 510, newMembers: 35 },
  { month: "Dez", loans: 490, returns: 485, newMembers: 22 },
  { month: "Jan", loans: 410, returns: 420, newMembers: 30 },
]

const activeMembersData = [
  { name: "Ana Silva", loans: 15, returns: 15, avgDays: 12, memberType: "Estudante", lastLoan: "2024-01-20" },
  { name: "Carla Mendes", loans: 12, returns: 12, avgDays: 10, memberType: "Funcionário", lastLoan: "2024-01-18" },
  { name: "Roberto Santos", loans: 11, returns: 10, avgDays: 14, memberType: "Professor", lastLoan: "2024-01-15" },
  { name: "Lucia Costa", loans: 9, returns: 9, avgDays: 11, memberType: "Comunidade", lastLoan: "2024-01-22" },
  { name: "Fernando Silva", loans: 8, returns: 8, avgDays: 13, memberType: "Estudante", lastLoan: "2024-01-19" },
  { name: "Patricia Oliveira", loans: 7, returns: 7, avgDays: 9, memberType: "Professor", lastLoan: "2024-01-21" },
]

const categoryDistribution = [
  { name: "Literatura", value: 35, color: "#15803d", loans: 156 },
  { name: "Ciências", value: 25, color: "#84cc16", loans: 112 },
  { name: "História", value: 20, color: "#f59e0b", loans: 89 },
  { name: "Filosofia", value: 12, color: "#dc2626", loans: 54 },
  { name: "Arte", value: 8, color: "#8b5cf6", loans: 36 },
]

const periodOptions = [
  { value: "7days", label: "Últimos 7 dias" },
  { value: "30days", label: "Últimos 30 dias" },
  { value: "3months", label: "Últimos 3 meses" },
  { value: "6months", label: "Últimos 6 meses" },
  { value: "1year", label: "Último ano" },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days")

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

  const exportReport = (reportType: string) => {
    // Here you would implement the actual export functionality
    console.log(`Exporting ${reportType} report...`)
    alert(`Exportando relatório: ${reportType}`)
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
                <h1 className="text-3xl font-serif font-bold text-foreground">Relatórios e Analytics</h1>
                <p className="text-muted-foreground">Análises detalhadas do uso da biblioteca</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Empréstimos</p>
                      <p className="text-2xl font-bold">2,850</p>
                      <p className="text-xs text-green-600">+12% vs período anterior</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Livros Mais Populares</p>
                      <p className="text-2xl font-bold">{popularBooksData.length}</p>
                      <p className="text-xs text-muted-foreground">Top performers</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Membros Ativos</p>
                      <p className="text-2xl font-bold">{activeMembersData.length}</p>
                      <p className="text-xs text-blue-600">Usuários frequentes</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Atrasos</p>
                      <p className="text-2xl font-bold text-destructive">{overdueData.length}</p>
                      <p className="text-xs text-destructive">Requer atenção</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reports Tabs */}
            <Tabs defaultValue="popular-books" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="popular-books">Livros Populares</TabsTrigger>
                <TabsTrigger value="overdue">Atrasos</TabsTrigger>
                <TabsTrigger value="usage-stats">Estatísticas de Uso</TabsTrigger>
                <TabsTrigger value="active-members">Membros Ativos</TabsTrigger>
              </TabsList>

              {/* Popular Books Report */}
              <TabsContent value="popular-books" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Livros Mais Emprestados</CardTitle>
                        <CardDescription>Ranking dos livros mais populares</CardDescription>
                      </div>
                      <Button size="sm" onClick={() => exportReport("Livros Populares")}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={popularBooksData.slice(0, 6)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} fontSize={12} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="loans" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Categoria</CardTitle>
                      <CardDescription>Empréstimos por categoria de livro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="loans"
                          >
                            {categoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {categoryDistribution.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm">
                              {item.name} ({item.loans})
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Detalhamento dos Livros Mais Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Posição</TableHead>
                          <TableHead>Título</TableHead>
                          <TableHead>Autor</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Empréstimos</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {popularBooksData.map((book, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">#{index + 1}</TableCell>
                            <TableCell className="font-medium">{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{book.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{book.loans} empréstimos</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Overdue Report */}
              <TabsContent value="overdue">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-destructive">Relatório de Atrasos</CardTitle>
                      <CardDescription>Empréstimos em atraso que requerem ação</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => exportReport("Atrasos")}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Membro</TableHead>
                          <TableHead>Livro</TableHead>
                          <TableHead>Data de Vencimento</TableHead>
                          <TableHead>Dias em Atraso</TableHead>
                          <TableHead>Tipo de Membro</TableHead>
                          <TableHead>Contato</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {overdueData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.member}</TableCell>
                            <TableCell>{item.book}</TableCell>
                            <TableCell>{new Date(item.dueDate).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">{item.daysOverdue} dias</Badge>
                            </TableCell>
                            <TableCell>{getMembershipBadge(item.memberType)}</TableCell>
                            <TableCell className="font-mono text-sm">{item.phone}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  Contatar
                                </Button>
                                <Button size="sm" variant="outline">
                                  Suspender
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Usage Statistics */}
              <TabsContent value="usage-stats" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Estatísticas de Uso por Período</CardTitle>
                      <CardDescription>Tendências de empréstimos e devoluções</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => exportReport("Estatísticas de Uso")}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={usageByPeriodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="loans" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="returns" stroke="hsl(var(--secondary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="newMembers" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-sm">Empréstimos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <span className="text-sm">Devoluções</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm">Novos Membros</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <BookOpen className="mx-auto h-8 w-8 text-primary mb-2" />
                        <p className="text-2xl font-bold">2,850</p>
                        <p className="text-sm text-muted-foreground">Total de Empréstimos</p>
                        <p className="text-xs text-green-600 mt-1">+12% vs período anterior</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-secondary mb-2" />
                        <p className="text-2xl font-bold">2,795</p>
                        <p className="text-sm text-muted-foreground">Total de Devoluções</p>
                        <p className="text-xs text-green-600 mt-1">+8% vs período anterior</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Users className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                        <p className="text-2xl font-bold">190</p>
                        <p className="text-sm text-muted-foreground">Novos Membros</p>
                        <p className="text-xs text-green-600 mt-1">+15% vs período anterior</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Active Members Report */}
              <TabsContent value="active-members">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Membros Mais Ativos</CardTitle>
                      <CardDescription>Usuários com maior engajamento na biblioteca</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => exportReport("Membros Ativos")}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Posição</TableHead>
                          <TableHead>Membro</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Empréstimos</TableHead>
                          <TableHead>Devoluções</TableHead>
                          <TableHead>Média de Dias</TableHead>
                          <TableHead>Último Empréstimo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeMembersData.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">#{index + 1}</TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{getMembershipBadge(member.memberType)}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{member.loans}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{member.returns}</Badge>
                            </TableCell>
                            <TableCell>{member.avgDays} dias</TableCell>
                            <TableCell>{new Date(member.lastLoan).toLocaleDateString("pt-BR")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
