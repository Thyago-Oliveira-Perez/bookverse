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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  BookOpen,
} from "lucide-react"

// Mock data for demonstration
const activeLoans = [
  {
    id: 1,
    memberName: "Ana Silva",
    memberEmail: "ana.silva@email.com",
    bookTitle: "Dom Casmurro",
    bookAuthor: "Machado de Assis",
    loanDate: "2024-01-20",
    dueDate: "2024-02-03",
    daysUntilDue: 3,
    renewals: 0,
    maxRenewals: 2,
  },
  {
    id: 2,
    memberName: "João Santos",
    memberEmail: "joao.santos@email.com",
    bookTitle: "O Cortiço",
    bookAuthor: "Aluísio Azevedo",
    loanDate: "2024-01-15",
    dueDate: "2024-01-29",
    daysUntilDue: -2,
    renewals: 1,
    maxRenewals: 2,
  },
  {
    id: 3,
    memberName: "Maria Costa",
    memberEmail: "maria.costa@email.com",
    bookTitle: "Iracema",
    bookAuthor: "José de Alencar",
    loanDate: "2024-01-18",
    dueDate: "2024-02-01",
    daysUntilDue: 1,
    renewals: 0,
    maxRenewals: 2,
  },
  {
    id: 4,
    memberName: "Pedro Oliveira",
    memberEmail: "pedro.oliveira@email.com",
    bookTitle: "O Guarani",
    bookAuthor: "José de Alencar",
    loanDate: "2024-01-10",
    dueDate: "2024-01-24",
    daysUntilDue: -7,
    renewals: 2,
    maxRenewals: 2,
  },
]

const loanHistory = [
  {
    id: 5,
    memberName: "Carla Mendes",
    memberEmail: "carla.mendes@email.com",
    bookTitle: "Memórias Póstumas de Brás Cubas",
    bookAuthor: "Machado de Assis",
    loanDate: "2023-12-01",
    dueDate: "2023-12-15",
    returnDate: "2023-12-14",
    status: "Returned",
    daysLate: 0,
  },
  {
    id: 6,
    memberName: "Roberto Silva",
    memberEmail: "roberto.silva@email.com",
    bookTitle: "Casa Grande & Senzala",
    bookAuthor: "Gilberto Freyre",
    loanDate: "2023-11-20",
    dueDate: "2023-12-04",
    returnDate: "2023-12-06",
    status: "Returned",
    daysLate: 2,
  },
  {
    id: 7,
    memberName: "Lucia Santos",
    memberEmail: "lucia.santos@email.com",
    bookTitle: "Quincas Borba",
    bookAuthor: "Machado de Assis",
    loanDate: "2023-11-15",
    dueDate: "2023-11-29",
    returnDate: "2023-11-28",
    status: "Returned",
    daysLate: 0,
  },
]

const statusOptions = ["All", "On Time", "Due Soon", "Overdue"]

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const getDueBadge = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return <Badge variant="destructive">{Math.abs(daysUntilDue)} days overdue</Badge>
    } else if (daysUntilDue <= 3) {
      return (
        <Badge variant="outline" className="border-orange-500 text-orange-700">
          Due in {daysUntilDue} days
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {daysUntilDue} days left
        </Badge>
      )
    }
  }

  const getHistoryStatusBadge = (status: string, daysLate: number) => {
    if (status === "Returned" && daysLate === 0) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Returned on time
        </Badge>
      )
    } else if (status === "Returned" && daysLate > 0) {
      return (
        <Badge variant="outline" className="border-orange-500 text-orange-700">
          Returned {daysLate} days late
        </Badge>
      )
    }
    return <Badge variant="outline">{status}</Badge>
  }

  const filteredActiveLoans = activeLoans.filter((loan) => {
    const matchesSearch =
      loan.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesStatus = true
    if (selectedStatus === "On Time") {
      matchesStatus = loan.daysUntilDue > 3
    } else if (selectedStatus === "Due Soon") {
      matchesStatus = loan.daysUntilDue >= 0 && loan.daysUntilDue <= 3
    } else if (selectedStatus === "Overdue") {
      matchesStatus = loan.daysUntilDue < 0
    }

    return matchesSearch && matchesStatus
  })

  const filteredHistory = loanHistory.filter(
    (loan) =>
      loan.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
                <h1 className="text-3xl font-serif font-bold text-foreground">Loan Management</h1>
                <p className="text-muted-foreground">Track loans and returns</p>
              </div>
              <Button asChild>
                <Link href="/loans/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Loan
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                      <p className="text-2xl font-bold">{activeLoans.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                      <p className="text-2xl font-bold text-destructive">
                        {activeLoans.filter((loan) => loan.daysUntilDue < 0).length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Due Today</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {activeLoans.filter((loan) => loan.daysUntilDue >= 0 && loan.daysUntilDue <= 1).length}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total History</p>
                      <p className="text-2xl font-bold">{loanHistory.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by member, book or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

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
                      setSelectedStatus("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loans Tables */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList>
                <TabsTrigger value="active">Active Loans ({filteredActiveLoans.length})</TabsTrigger>
                <TabsTrigger value="history">History ({filteredHistory.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Loans</CardTitle>
                    <CardDescription>Books currently on loan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Book</TableHead>
                            <TableHead>Loan Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Renewals</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredActiveLoans.map((loan) => (
                            <TableRow key={loan.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div>{loan.memberName}</div>
                                    <div className="text-sm text-muted-foreground">{loan.memberEmail}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div className="font-medium">{loan.bookTitle}</div>
                                    <div className="text-sm text-muted-foreground">{loan.bookAuthor}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(loan.loanDate).toLocaleDateString("en-US")}</TableCell>
                              <TableCell>{new Date(loan.dueDate).toLocaleDateString("en-US")}</TableCell>
                              <TableCell>{getDueBadge(loan.daysUntilDue)}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {loan.renewals}/{loan.maxRenewals}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Mark as Returned
                                    </DropdownMenuItem>
                                    {loan.renewals < loan.maxRenewals && (
                                      <DropdownMenuItem asChild>
                                        <Link href={`/loans/${loan.id}/renew`}>
                                          <RotateCcw className="mr-2 h-4 w-4" />
                                          Renew Loan
                                        </Link>
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                      <AlertTriangle className="mr-2 h-4 w-4" />
                                      Send Reminder
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {filteredActiveLoans.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No active loans</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          There are no active loans at the moment, or none match your filters.
                        </p>
                        <div className="mt-6">
                          <Button asChild>
                            <Link href="/loans/new">
                              <Plus className="mr-2 h-4 w-4" />
                              New Loan
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Loan History</CardTitle>
                    <CardDescription>Record of completed loans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Book</TableHead>
                            <TableHead>Loan Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Return Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredHistory.map((loan) => (
                            <TableRow key={loan.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div>{loan.memberName}</div>
                                    <div className="text-sm text-muted-foreground">{loan.memberEmail}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <div className="font-medium">{loan.bookTitle}</div>
                                    <div className="text-sm text-muted-foreground">{loan.bookAuthor}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(loan.loanDate).toLocaleDateString("en-US")}</TableCell>
                              <TableCell>{new Date(loan.dueDate).toLocaleDateString("en-US")}</TableCell>
                              <TableCell>{new Date(loan.returnDate).toLocaleDateString("en-US")}</TableCell>
                              <TableCell>{getHistoryStatusBadge(loan.status, loan.daysLate)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {filteredHistory.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No history found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          There are no records of completed loans that match your filters.
                        </p>
                      </div>
                    )}
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
