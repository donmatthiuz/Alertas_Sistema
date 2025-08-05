const expresiones = [
  { 
    id: 1, 
    nombre: "comida", 
    expresion: "comida", 
    proposito: "Buscar productos de la categoría comida",
    tipo: "texto plano"
  },
  { 
    id: 2, 
    nombre: "gaseosas", 
    expresion: "gaseosas", 
    proposito: "Buscar productos de la categoría gaseosas",
    tipo: "texto plano"
  },
  { 
    id: 3, 
    nombre: "hamburguesas", 
    expresion: "hamburguesashotdogstacos", 
    proposito: "Buscar productos de hamburguesas, hot dogs y tacos",
    tipo: "texto plano"
  },
  { 
    id: 4, 
    nombre: "tags food", 
    expresion: "#food", 
    proposito: "Buscar todos los productos etiquetados como comida",
    tipo: "texto plano"
  },
  { 
    id: 5, 
    nombre: "tags drinks", 
    expresion: "#drinks", 
    proposito: "Buscar todos los productos etiquetados como bebidas",
    tipo: "texto plano"
  },
  { 
    id: 6, 
    nombre: "tags fastfood", 
    expresion: "#fastfood", 
    proposito: "Buscar todos los productos de comida rápida",
    tipo: "texto plano"
  },
  { 
    id: 7, 
    nombre: "orden alfabético", 
    expresion: "orden[A-Z]", 
    proposito: "Ordenar comercios alfabéticamente de A a Z",
    tipo: "regex"
  },
  { 
    id: 8, 
    nombre: "orden descendente", 
    expresion: "orden[Z-A]", 
    proposito: "Ordenar comercios alfabéticamente de Z a A",
    tipo: "regex"
  },
  { 
    id: 9, 
    nombre: "inicial A", 
    expresion: "inicial[A]", 
    proposito: "Buscar comercios que empiecen con la letra A",
    tipo: "regex"
  },
  { 
    id: 10, 
    nombre: "inicial B", 
    expresion: "inicial[B]", 
    proposito: "Buscar comercios que empiecen con la letra B",
    tipo: "regex"
  },
  { 
    id: 11, 
    nombre: "por nombre", 
    expresion: "nombre[producto]", 
    proposito: "Buscar por nombre específico de producto",
    tipo: "regex"
  },
  { 
    id: 12, 
    nombre: "estado asignado", 
    expresion: "estado[asignado]", 
    proposito: "Buscar productos con estado asignado",
    tipo: "regex"
  },
  { 
    id: 13, 
    nombre: "estado pendiente", 
    expresion: "estado[pendiente]", 
    proposito: "Buscar productos con estado pendiente",
    tipo: "regex"
  },
  { 
    id: 14, 
    nombre: "estado completado", 
    expresion: "estado[completado]", 
    proposito: "Buscar productos con estado completado",
    tipo: "regex"
  }
];
export default expresiones;