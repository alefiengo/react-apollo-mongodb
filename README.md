# react-apollo-mongodb

Frontend React para la aplicación de gestión de tareas. Consume una API GraphQL usando Apollo Client.

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Backend ejecutándose en `http://localhost:3000/graphql`

## Instalación

1. Instala las dependencias:

```bash
npm install
```

## Configuración

El frontend está configurado para conectarse al backend en `http://localhost:3000/graphql`.

Si tu backend corre en otro puerto, edita la URI en `src/main.jsx`:

```javascript
const client = new ApolloClient({
    uri: 'http://localhost:PUERTO/graphql',
    cache: new InMemoryCache(),
});
```

## Uso

### Modo Desarrollo

Antes de iniciar el frontend, asegúrate de que el backend esté corriendo.

```bash
npm run dev
```

El frontend se iniciará en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

### Preview del Build

```bash
npm run preview
```

## Estructura del Proyecto

```text
src/
├── main.jsx        # Configuración de Apollo Client y punto de entrada
└── App.jsx         # Componente principal con query para obtener tareas
```

## Funcionalidad

Esta aplicación implementa un CRUD completo de tareas:

- **Create**: Formulario para crear nuevas tareas con título y descripción
- **Read**: Visualización de todas las tareas en cards
- **Update**: Edición en línea de tareas existentes
- **Delete**: Eliminación de tareas con confirmación

Características adicionales:

- Indicadores de carga y error
- Validación de formularios
- Actualización automática de la lista tras operaciones
- Diseño responsive
- Manejo de errores con mensajes descriptivos

## Tecnologías Utilizadas

- React 18 (Hooks: useState, useQuery, useMutation)
- Apollo Client (GraphQL client)
- GraphQL (Queries y Mutations)
- Vite (Build tool)

## Notas

Este es un proyecto de aprendizaje que demuestra la integración completa de React con Apollo Client y GraphQL, implementando todas las operaciones CRUD de forma simple y sin sobreingeniería.
