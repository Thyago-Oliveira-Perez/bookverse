"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, BookOpen } from "lucide-react"

const categories = ["Literatura", "Ciências", "História", "Filosofia", "Arte", "Tecnologia", "Biografia"]

export default function NewBookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishYear: "",
    publisher: "",
    pages: "",
    copies: "",
    description: "",
    location: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("New book data:", formData)
    // Simulate success and redirect
    router.push("/books")
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
                <Link href="/books">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Novo Livro</h1>
                <p className="text-muted-foreground">Adicione um novo livro ao acervo</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Informações Básicas
                  </CardTitle>
                  <CardDescription>Dados principais do livro</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Digite o título do livro"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Autor *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => handleInputChange("author", e.target.value)}
                        placeholder="Nome do autor"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={formData.isbn}
                        onChange={(e) => handleInputChange("isbn", e.target.value)}
                        placeholder="978-85-359-0277-5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publishYear">Ano de Publicação</Label>
                      <Input
                        id="publishYear"
                        type="number"
                        value={formData.publishYear}
                        onChange={(e) => handleInputChange("publishYear", e.target.value)}
                        placeholder="2024"
                        min="1000"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="publisher">Editora</Label>
                      <Input
                        id="publisher"
                        value={formData.publisher}
                        onChange={(e) => handleInputChange("publisher", e.target.value)}
                        placeholder="Nome da editora"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pages">Número de Páginas</Label>
                      <Input
                        id="pages"
                        type="number"
                        value={formData.pages}
                        onChange={(e) => handleInputChange("pages", e.target.value)}
                        placeholder="300"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Breve descrição do livro..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Estoque</CardTitle>
                  <CardDescription>Dados sobre disponibilidade e localização</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="copies">Número de Exemplares *</Label>
                      <Input
                        id="copies"
                        type="number"
                        value={formData.copies}
                        onChange={(e) => handleInputChange("copies", e.target.value)}
                        placeholder="1"
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização na Biblioteca</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Seção A, Estante 3, Prateleira 2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/books">Cancelar</Link>
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Livro
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
