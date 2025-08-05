 const filtro_search = [
    
      { value: "regex", label: "Busqueda por Texto" },
      { value: "texto", label: "Busqueda por regex" },
]



const filtro_estado = [

   { value: "asignado", label: "Asignado" },
      { value: "pendiente", label: "Pendiente" },
]


const filtro_expresion = [

   { value: "text", label: "Texto Plano" },
      { value: "regex", label: "Regex" },
]





  const allTags = [
    {id: 1, nombre: "fast food"},
    {id: 2, nombre: "burgers"},
    {id: 3, nombre: "cafe"},
    {id: 4, nombre: "snack"},
    {id: 5, nombre: "bebidas"},
    {id: 6 , nombre: "gaseosas"}
  ];

  const allMCC = [


    {id: 111, nombre: "AGUA"},
    {id: 222, nombre: "COMIDA"},
    {id: 333, nombre: "CAFE"},
    {id: 444, nombre: "ENTRETENIMIENTO"}
  ];


export {
  filtro_estado, 
  filtro_search, allMCC, allTags, filtro_expresion
}
