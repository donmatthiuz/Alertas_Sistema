"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Download, Plus, Eye } from "lucide-react"

import Sidebar from '@/components/Sidebar.js'
import Header from "@/components/Header.js"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Badge from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table"
import SimpleFilterDropdown from "@/components/ui/Filter.js"

// Mock data para alertas
const alertas = [
  {
    id: 1,
    monto: 15000.50,
    estado: "Pendiente",
    detalle: "Transacción sospechosa detectada en cuenta empresarial",
    tipoConclusion: "Fraude",
    fechaCreacion: "2024-08-01",
    tipoUmbral: "Monto Máximo",
    umbral: 10000,
    comentario: ""
  },
  {
    id: 2,
    monto: 8500.00,
    estado: "Concluida",
    detalle: "Operación inusual en horario nocturno",
    tipoConclusion: "Falso Positivo",
    fechaCreacion: "2024-08-02",
    tipoUmbral: "Horario",
    umbral: "22:00",
    comentario: "Verificado con el cliente, operación legítima de emergencia"
  },
  {
    id: 3,
    monto: 25000.00,
    estado: "Rechazada",
    detalle: "Múltiples transferencias a cuentas nuevas",
    tipoConclusion: "Lavado de Dinero",
    fechaCreacion: "2024-08-03",
    tipoUmbral: "Transferencias Diarias",
    umbral: 3,
    comentario: "Patrón sospechoso confirmado, caso escalado a autoridades"
  },
  {
    id: 4,
    monto: 3200.75,
    estado: "Pendiente",
    detalle: "Patrón de retiros frecuentes detectado",
    tipoConclusion: "Sospechoso",
    fechaCreacion: "2024-08-04",
    tipoUmbral: "Retiros por Hora",
    umbral: 5,
    comentario: ""
  },
  {
    id: 5,
    monto: 45000.00,
    estado: "Concluida",
    detalle: "Transferencia internacional de alto monto",
    tipoConclusion: "Legítimo",
    fechaCreacion: "2024-08-05",
    tipoUmbral: "Monto Internacional",
    umbral: 30000,
    comentario: "Documentación completa verificada, operación comercial válida"
  }
]

// Opciones para filtros
const estadosOptions = [
  { value: "Pendiente", label: "Pendiente" },
  { value: "Concluida", label: "Concluida" },
  { value: "Rechazada", label: "Rechazada" }
]

const tiposOptions = [
  { value: "Fraude", label: "Fraude" },
  { value: "Falso Positivo", label: "Falso Positivo" },
  { value: "Lavado de Dinero", label: "Lavado de Dinero" },
  { value: "Sospechoso", label: "Sospechoso" },
  { value: "Legítimo", label: "Legítimo" }
]

const tipoUmbralOptions = [
  { value: "Monto Máximo", label: "Monto Máximo" },
  { value: "Horario", label: "Horario" },
  { value: "Transferencias Diarias", label: "Transferencias Diarias" },
  { value: "Retiros por Hora", label: "Retiros por Hora" },
  { value: "Monto Internacional", label: "Monto Internacional" }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("")
  const [tipoFilter, setTipoFilter] = useState("")
  const [tipoUmbralFilter, setTipoUmbralFilter] = useState("")
  const [comentarios, setComentarios] = useState({})
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.replace("/")
    }
  }, [])

  // Función para obtener el color del badge según el estado
  const getEstadoBadgeVariant = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "warning"
      case "Concluida":
        return "success"
      case "Rechazada":
        return "danger"
      default:
        return "primary"
    }
  }

  // Función para obtener el color del badge según el tipo
  const getTipoBadgeVariant = (tipo) => {
    switch (tipo) {
      case "Fraude":
      case "Lavado de Dinero":
        return "danger"
      case "Sospechoso":
        return "warning"
      case "Falso Positivo":
      case "Legítimo":
        return "success"
      default:
        return "primary"
    }
  }

  // Filtrar alertas basado en búsqueda y filtros
  const filteredAlertas = alertas.filter(alerta => {
    const matchesSearch = searchTerm === "" || 
      alerta.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.id.toString().includes(searchTerm) ||
      alerta.monto.toString().includes(searchTerm) ||
      alerta.tipoUmbral.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEstado = estadoFilter === "" || alerta.estado === estadoFilter
    const matchesTipo = tipoFilter === "" || alerta.tipoConclusion === tipoFilter
    const matchesTipoUmbral = tipoUmbralFilter === "" || alerta.tipoUmbral === tipoUmbralFilter

    return matchesSearch && matchesEstado && matchesTipo && matchesTipoUmbral
  })

  // Formatear monto como moneda
  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(monto)
  }

  // Formatear umbral según el tipo
  const formatUmbral = (umbral, tipoUmbral) => {
    if (tipoUmbral === "Horario") {
      return umbral
    }
    if (tipoUmbral.includes("Monto")) {
      return formatMonto(umbral)
    }
    return umbral.toString()
  }

  // Manejar cambio de comentario
  const handleComentarioChange = (alertaId, comentario) => {
    setComentarios(prev => ({
      ...prev,
      [alertaId]: comentario
    }))
  }

  // Obtener comentario actual (del estado local o del mock data)
  const getComentario = (alerta) => {
    return comentarios[alerta.id] !== undefined ? comentarios[alerta.id] : alerta.comentario
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col">
          <Card className="w-fit">
            <CardContent className="p-4">
              <h1 className="text-5xl font-bold text-gray-900">Plataforma de Gestión</h1>
              <br/>
              <p className="text-xl text-gray-600">Gestión de Alertas de Seguridad</p>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col min-h-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Alertas del Sistema</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="Buscar alertas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Download size={16} />
                    <span>Exportar</span>
                  </Button>
                  <Button variant="primary" className="flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Nueva Alerta</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <SimpleFilterDropdown 
                  options={estadosOptions} 
                  onSelect={setEstadoFilter} 
                  label="Filtrar por Estado"
                />
                <SimpleFilterDropdown 
                  options={tiposOptions} 
                  onSelect={setTipoFilter} 
                  label="Filtrar por Tipo"
                />
                <SimpleFilterDropdown 
                  options={tipoUmbralOptions} 
                  onSelect={setTipoUmbralFilter} 
                  label="Filtrar por Tipo de Umbral"
                />
                {(estadoFilter || tipoFilter || tipoUmbralFilter || searchTerm) && (
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setEstadoFilter("")
                      setTipoFilter("")
                      setTipoUmbralFilter("")
                      setSearchTerm("")
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Limpiar Filtros
                  </Button>
                )}
              </div>
            </div>

            {/* Contenedor con scroll horizontal y tamaño fijo */}
            <div className="flex-1 w-full overflow-auto" style={{ maxWidth: '100%' }}>
              <div className="min-w-[1400px] h-full"> {/* Ancho mínimo fijo para la tabla */}
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead className="w-32">Monto</TableHead>
                      <TableHead className="w-24">Estado</TableHead>
                      <TableHead className="w-80">Detalle</TableHead>
                      <TableHead className="w-36">Tipo de Conclusión</TableHead>
                      <TableHead className="w-40">Tipo de Umbral</TableHead>
                      <TableHead className="w-28">Umbral</TableHead>
                      <TableHead className="w-80">Comentario</TableHead>
                      <TableHead className="w-28">Fecha</TableHead>
                      <TableHead className="w-32">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlertas.map((alerta) => (
                      <TableRow key={alerta.id}>
                        <TableCell className="w-16">
                          <div className="text-sm font-medium text-gray-900">#{alerta.id}</div>
                        </TableCell>
                        <TableCell className="w-32">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatMonto(alerta.monto)}
                          </div>
                        </TableCell>
                        <TableCell className="w-24">
                          <Badge variant={getEstadoBadgeVariant(alerta.estado)}>
                            {alerta.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-80">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={alerta.detalle}>
                            {alerta.detalle}
                          </div>
                        </TableCell>
                        <TableCell className="w-36">
                          <Badge variant={getTipoBadgeVariant(alerta.tipoConclusion)}>
                            {alerta.tipoConclusion}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-40">
                          <div className="text-sm text-gray-700">
                            {alerta.tipoUmbral}
                          </div>
                        </TableCell>
                        <TableCell className="w-28">
                          <div className="text-sm font-medium text-gray-900">
                            {formatUmbral(alerta.umbral, alerta.tipoUmbral)}
                          </div>
                        </TableCell>
                        <TableCell className="w-80">
                          <Input
                            type="text"
                            placeholder="Agregar comentario..."
                            value={getComentario(alerta)}
                            onChange={(e) => handleComentarioChange(alerta.id, e.target.value)}
                            className="text-sm w-full"
                          />
                        </TableCell>
                        <TableCell className="w-28">
                          <div className="text-sm text-gray-900">
                            {new Date(alerta.fechaCreacion).toLocaleDateString('es-GT')}
                          </div>
                        </TableCell>
                        <TableCell className="w-32">
                          <div className="flex space-x-2 whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-900">
                              Procesar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {filteredAlertas.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                No se encontraron alertas que coincidan con los criterios de búsqueda.
              </div>
            )}

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Mostrando {filteredAlertas.length} de {alertas.length} alertas
                </div>
                <div className="flex items-center space-x-4">
                  <span>Pendientes: {alertas.filter(a => a.estado === "Pendiente").length}</span>
                  <span>Concluidas: {alertas.filter(a => a.estado === "Concluida").length}</span>
                  <span>Rechazadas: {alertas.filter(a => a.estado === "Rechazada").length}</span>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}