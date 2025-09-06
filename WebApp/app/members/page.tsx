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
import { Users, Plus, Search, Filter, MoreHorizontal, Edit, Eye, Trash2, Mail, Phone } from "lucide-react"

// Mock data for demonstration
const members = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-1111",
    membershipType: "Student",
    status: "Active",
    joinDate: "2023-01-15",
    activeLoans: 2,
    totalLoans: 15,
    address: "Rua das Flores, 123",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 99999-2222",
    membershipType: "Professor",
    status: "Active",
    joinDate: "2022-08-20",
    activeLoans: 1,
    totalLoans: 28,
    address: "Av. Principal, 456",
  },
  {
    id: 3,
    name: "Maria Costa",
    email: "maria.costa@email.com",
    phone: "(11) 99999-3333",
    membershipType: "Community",
    status: "Suspended",
    joinDate: "2023-03-10",
    activeLoans: 0,
    totalLoans: 8,
    address: "Rua do Centro, 789",
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 99999-4444",
    membershipType: "Student",
    status: "Active",
    joinDate: "2023-09-05",
    activeLoans: 3,
    totalLoans: 12,
    address: "Rua Nova, 321",
  },
  {
    id: 5,
    name: "Carla Mendes",
    email: "carla.mendes@email.com",
    phone: "(11) 99999-5555",
    membershipType: "Employee",
    status: "Active",
    joinDate: "2021-11-30",
    activeLoans: 1,
    totalLoans: 45,
    address: "Av. Secundária, 654",
  },
]

const membershipTypes = ["All", "Student", "Professor", "Employee", "Community"]
const statusOptions = ["All", "Active", "Suspended", "Inactive"]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    const matchesType = selectedType === "All" || member.membershipType === selectedType
    const matchesStatus = selectedStatus === "All" || member.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    } else if (status === "Suspended") {
      return <Badge variant="destructive">Suspended</Badge>
    } else {
      return <Badge variant="outline">Inactive</Badge>
    }
  }

  const getMembershipBadge = (type: string) => {
    const colors = {
      Student: "bg-blue-100 text-blue-800",
      Professor: "bg-purple-100 text-purple-800",
      Employee: "bg-orange-100 text-orange-800",
      Community: "bg-gray-100 text-gray-800",
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Member Management</h1>
                <p className="text-muted-foreground">Manage library users</p>
              </div>
              <Button asChild>
                <Link href="/members/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Member
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                      <p className="text-2xl font-bold">{members.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                      <p className="text-2xl font-bold">{members.filter((m) => m.status === "Active").length}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                      <p className="text-2xl font-bold">{members.reduce((sum, m) => sum + m.activeLoans, 0)}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Suspended Members</p>
                      <p className="text-2xl font-bold">{members.filter((m) => m.status === "Suspended").length}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Member Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
                      setSelectedType("All")
                      setSelectedStatus("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>Members ({filteredMembers.length})</CardTitle>
                <CardDescription>Complete list of library members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Loans</TableHead>
                        <TableHead>Member Since</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              </div>
                              {member.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                {member.email}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {member.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getMembershipBadge(member.membershipType)}</TableCell>
                          <TableCell>{getStatusBadge(member.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{member.activeLoans} active</div>
                              <div className="text-muted-foreground">{member.totalLoans} total</div>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(member.joinDate).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/members/${member.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Profile
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/members/${member.id}/edit`}>
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

                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold text-foreground">No members found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting the filters or adding a new member.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/members/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Member
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
