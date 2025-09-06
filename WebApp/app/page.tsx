"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { BookOpen, Users, FileText, AlertTriangle, TrendingUp, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data
const stats = {
  totalBooks: 15420,
  availableBooks: 12850,
  loanedBooks: 2570,
  totalMembers: 3240,
  activeLoans: 2570,
  overdueLoans: 45,
}

const monthlyLoans = [
  { month: "Jan", loans: 320 },
  { month: "Fev", loans: 280 },
  { month: "Mar", loans: 450 },
  { month: "Abr", loans: 380 },
  { month: "Mai", loans: 520 },
  { month: "Jun", loans: 490 },
]

const popularBooks = [
  { title: "Dom Casmurro", author: "Machado de Assis", loans: 45 },
  { title: "O Cortiço", author: "Aluísio Azevedo", loans: 38 },
  { title: "Iracema", author: "José de Alencar", loans: 32 },
  { title: "O Guarani", author: "José de Alencar", loans: 28 },
  { title: "Memórias Póstumas", author: "Machado de Assis", loans: 25 },
]

const overdueBooks = [
  { member: "Ana Silva", book: "Dom Casmurro", dueDate: "2024-01-15", daysOverdue: 5 },
  { member: "João Santos", book: "O Cortiço", dueDate: "2024-01-12", daysOverdue: 8 },
  { member: "Maria Costa", book: "Iracema", dueDate: "2024-01-18", daysOverdue: 2 },
]

const categoryData = [
  { name: "Literature", value: 35, color: "#15803d" },
  { name: "Science", value: 25, color: "#84cc16" },
  { name: "History", value: 20, color: "#f59e0b" },
  { name: "Others", value: 20, color: "#dc2626" },
]

export default function Dashboard() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === "pt" ? "pt-BR" : "en-US"

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
                <h1 className="text-3xl font-serif font-bold text-foreground">{t("dashboard.title")}</h1>
                <p className="text-muted-foreground">{t("dashboard.description")}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {t("dashboard.lastUpdate")}: {new Date().toLocaleDateString(locale)}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Books */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("stats.totalBooks")}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBooks.toLocaleString(locale)}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.availableBooks.toLocaleString(locale)} {t("stats.available")}
                  </p>
                </CardContent>
              </Card>

              {/* Active Members */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("stats.activeMembers")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString(locale)}</div>
                  <p className="text-xs text-muted-foreground">{t("stats.fromLastMonth")}</p>
                </CardContent>
              </Card>

              {/* Active Loans */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("stats.activeLoans")}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeLoans.toLocaleString(locale)}</div>
                  <p className="text-xs text-muted-foreground">
                    {((stats.activeLoans / stats.totalBooks) * 100).toFixed(1)}% {t("stats.ofCollection")}
                  </p>
                </CardContent>
              </Card>

              {/* Overdue Loans */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("stats.overdueLoans")}</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.overdueLoans}</div>
                  <p className="text-xs text-muted-foreground">{t("stats.requiresAttention")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Loans Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t("charts.monthlyLoans")}
                  </CardTitle>
                  <CardDescription>{t("charts.last6Months")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyLoans}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="loans" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("charts.categoryDistribution")}</CardTitle>
                  <CardDescription>{t("charts.percentageOfCollection")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {categoryData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Books */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("tables.popularBooks")}</CardTitle>
                  <CardDescription>{t("tables.basedOnLastMonth")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularBooks.map((book, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {book.loans} {t("tables.loans")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Overdue Books */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-destructive">{t("tables.overdueBooks")}</CardTitle>
                    <CardDescription>{t("tables.requiresImmediateAction")}</CardDescription>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {overdueBooks.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.member}</p>
                          <p className="text-sm text-muted-foreground">{item.book}</p>
                          <p className="text-xs text-muted-foreground">
                            {t("tables.dueDate")}: {new Date(item.dueDate).toLocaleDateString(locale)}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive">{item.daysOverdue} {t("tables.days")}</Badge>
                          <Button size="sm" variant="outline" className="mt-2 w-full bg-transparent">
                            {t("tables.contact")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t("quickActions.title")}</CardTitle>
                <CardDescription>{t("quickActions.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span>{t("quickActions.newBook")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>{t("quickActions.newMember")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span>{t("quickActions.newLoan")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <TrendingUp className="h-6 w-6" />
                    <span>{t("quickActions.reports")}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
