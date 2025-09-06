"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Bell, Database, Mail, Shield, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    libraryName: "Bookverse",
    maxLoansPerMember: "5",
    defaultLoanPeriod: "14",
    maxRenewals: "2",
    overdueNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    backupFrequency: "daily",
    emailTemplate:
      "Prezado(a) {memberName},\n\nLembramos que o livro '{bookTitle}' deve ser devolvido até {dueDate}.\n\nAtenciosamente,\nEquipe da Biblioteca",
  })

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Here you would save the settings to your backend
    console.log("Saving settings:", settings)
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Configurações do Sistema</h1>
                <p className="text-muted-foreground">Gerencie as configurações da biblioteca</p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="backup">Backup</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Configurações Gerais
                    </CardTitle>
                    <CardDescription>Parâmetros básicos do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="libraryName">Nome da Biblioteca</Label>
                        <Input
                          id="libraryName"
                          value={settings.libraryName}
                          onChange={(e) => handleSettingChange("libraryName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxLoans">Máximo de Empréstimos por Membro</Label>
                        <Select
                          value={settings.maxLoansPerMember}
                          onValueChange={(value) => handleSettingChange("maxLoansPerMember", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 livros</SelectItem>
                            <SelectItem value="5">5 livros</SelectItem>
                            <SelectItem value="7">7 livros</SelectItem>
                            <SelectItem value="10">10 livros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultLoanPeriod">Período Padrão de Empréstimo (dias)</Label>
                        <Select
                          value={settings.defaultLoanPeriod}
                          onValueChange={(value) => handleSettingChange("defaultLoanPeriod", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 dias</SelectItem>
                            <SelectItem value="14">14 dias</SelectItem>
                            <SelectItem value="21">21 dias</SelectItem>
                            <SelectItem value="30">30 dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxRenewals">Máximo de Renovações</Label>
                        <Select
                          value={settings.maxRenewals}
                          onValueChange={(value) => handleSettingChange("maxRenewals", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 renovação</SelectItem>
                            <SelectItem value="2">2 renovações</SelectItem>
                            <SelectItem value="3">3 renovações</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Configurações de Notificações
                    </CardTitle>
                    <CardDescription>Configure como e quando enviar notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações de Atraso</Label>
                          <p className="text-sm text-muted-foreground">
                            Enviar lembretes automáticos para livros em atraso
                          </p>
                        </div>
                        <Switch
                          checked={settings.overdueNotifications}
                          onCheckedChange={(checked) => handleSettingChange("overdueNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por Email</Label>
                          <p className="text-sm text-muted-foreground">Enviar notificações via email</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por SMS</Label>
                          <p className="text-sm text-muted-foreground">Enviar notificações via SMS</p>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Backup Settings */}
              <TabsContent value="backup">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Backup e Restauração
                    </CardTitle>
                    <CardDescription>Configure backups automáticos e restauração de dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Backup Automático</Label>
                        <p className="text-sm text-muted-foreground">Realizar backups automáticos do sistema</p>
                      </div>
                      <Switch
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                      />
                    </div>

                    {settings.autoBackup && (
                      <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Frequência do Backup</Label>
                        <Select
                          value={settings.backupFrequency}
                          onValueChange={(value) => handleSettingChange("backupFrequency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diário</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex gap-4">
                        <Button variant="outline">
                          <Database className="mr-2 h-4 w-4" />
                          Fazer Backup Agora
                        </Button>
                        <Button variant="outline">
                          <Shield className="mr-2 h-4 w-4" />
                          Restaurar Backup
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Último backup: {new Date().toLocaleDateString("pt-BR")} às{" "}
                        {new Date().toLocaleTimeString("pt-BR")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates Settings */}
              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Templates de Email
                    </CardTitle>
                    <CardDescription>Configure os templates de notificações por email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="emailTemplate">Template de Lembrete de Devolução</Label>
                      <Textarea
                        id="emailTemplate"
                        rows={8}
                        value={settings.emailTemplate}
                        onChange={(e) => handleSettingChange("emailTemplate", e.target.value)}
                        placeholder="Digite o template do email..."
                      />
                      <p className="text-sm text-muted-foreground">
                        Variáveis disponíveis: {"{memberName}"}, {"{bookTitle}"}, {"{dueDate}"}, {"{libraryName}"}
                      </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Pré-visualização:</h4>
                      <div className="text-sm whitespace-pre-line">
                        {settings.emailTemplate
                          .replace("{memberName}", "João Silva")
                          .replace("{bookTitle}", "Dom Casmurro")
                          .replace("{dueDate}", "25/01/2024")
                          .replace("{libraryName}", settings.libraryName)}
                      </div>
                    </div>
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
