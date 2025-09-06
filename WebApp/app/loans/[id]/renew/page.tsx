"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, User, BookOpen, Calendar, AlertTriangle } from "lucide-react"

// Mock data for demonstration
const loanData = {
  id: 1,
  memberName: "Ana Silva",
  memberEmail: "ana.silva@email.com",
  membershipType: "Estudante",
  bookTitle: "Dom Casmurro",
  bookAuthor: "Machado de Assis",
  bookIsbn: "978-85-359-0277-5",
  loanDate: "2024-01-20",
  currentDueDate: "2024-02-03",
  daysUntilDue: 3,
  renewals: 0,
  maxRenewals: 2,
}

const renewalPeriods = [
  { value: "7", label: "7 dias" },
  { value: "14", label: "14 dias (padrão)" },
  { value: "21", label: "21 dias" },
  { value: "30", label: "30 dias" },
]

export default function RenewLoanPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [renewalPeriod, setRenewalPeriod] = useState("14")

  const calculateNewDueDate = (days: string) => {
    const currentDue = new Date(loanData.currentDueDate)
    currentDue.setDate(currentDue.getDate() + Number.parseInt(days))
    return currentDue.toLocaleDateString("pt-BR")
  }

  const handleRenewal = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the renewal data to your backend
    console.log("Renewal data:", { loanId: params.id, renewalPeriod })
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

  const getDueBadge = (daysUntilDue: number) => {
    if (daysUntilDue < 0) {
      return <Badge variant="destructive">{Math.abs(daysUntilDue)} dias em atraso</Badge>
    } else if (daysUntilDue <= 3) {
      return (
        <Badge variant="outline" className="border-orange-500 text-orange-700">
          Vence em {daysUntilDue} dias
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {daysUntilDue} dias restantes
        </Badge>
      )
    }
  }

  const canRenew = loanData.renewals < loanData.maxRenewals

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
                <h1 className="text-3xl font-serif font-bold text-foreground">Renovar Empréstimo</h1>
                <p className="text-muted-foreground">Estenda o prazo de devolução do livro</p>
              </div>
            </div>

            {/* Current Loan Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Empréstimo Atual</CardTitle>
                <CardDescription>Detalhes do empréstimo que será renovado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Member Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Membro</span>
                    </div>
                    <div className="pl-7">
                      <div className="font-medium">{loanData.memberName}</div>
                      <div className="text-sm text-muted-foreground">{loanData.memberEmail}</div>
                      <div className="mt-2">{getMembershipBadge(loanData.membershipType)}</div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Livro</span>
                    </div>
                    <div className="pl-7">
                      <div className="font-medium">{loanData.bookTitle}</div>
                      <div className="text-sm text-muted-foreground">{loanData.bookAuthor}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1">{loanData.bookIsbn}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data do Empréstimo</Label>
                    <p>{new Date(loanData.loanDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data de Vencimento Atual</Label>
                    <p>{new Date(loanData.currentDueDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="mt-1">{getDueBadge(loanData.daysUntilDue)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Renovações</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">
                        {loanData.renewals}/{loanData.maxRenewals}
                      </Badge>
                      {!canRenew && (
                        <div className="flex items-center gap-1 text-sm text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          Limite de renovações atingido
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Renewal Form */}
            {canRenew ? (
              <form onSubmit={handleRenewal} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Configurar Renovação
                    </CardTitle>
                    <CardDescription>Escolha o período adicional para o empréstimo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="renewalPeriod">Período Adicional</Label>
                        <Select value={renewalPeriod} onValueChange={setRenewalPeriod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {renewalPeriods.map((period) => (
                              <SelectItem key={period.value} value={period.value}>
                                {period.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nova Data de Vencimento</Label>
                        <div className="p-2 bg-muted rounded-md">
                          <span className="text-sm font-medium">{calculateNewDueDate(renewalPeriod)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo da Renovação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Vencimento Atual</Label>
                        <p>{new Date(loanData.currentDueDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Período Adicional</Label>
                        <p>{renewalPeriods.find((p) => p.value === renewalPeriod)?.label}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Novo Vencimento</Label>
                        <p className="font-medium text-primary">{calculateNewDueDate(renewalPeriod)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/loans">Cancelar</Link>
                  </Button>
                  <Button type="submit">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Confirmar Renovação
                  </Button>
                </div>
              </form>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Renovação não permitida</h3>
                    <p className="text-muted-foreground mb-4">
                      Este empréstimo já atingiu o limite máximo de {loanData.maxRenewals} renovações.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      O livro deve ser devolvido até {new Date(loanData.currentDueDate).toLocaleDateString("pt-BR")}.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/loans">Voltar aos Empréstimos</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
