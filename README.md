# Graphql Example With Mongo DB

Este es un proyecto paso a paso de como configurar un Server de Graphql con Express, esta API tiene como motor de base de datos Mongo DB

## Requisitos
  * Node JS 12.16 LTS
  * Docker Desktop 2.3

## Como Ejecutarlo

  * Clonar el proyecto
  * Crear dentro del proyecto el archivo **.env** el cual contendra la siguiente información

```bash
  DB_NAME=nombredeladb
  DB_USER=usuariodeladb
  DB_PASSWORD=passworddeladb
  DB_HOST=localhost
  DB_PORT=27017
````

  * Iniciar docker-compose

```bash
  docker-compose up -d
```

  * Ejecutar el proyecto con Node JS

```bash
  npm run dev
```

  * Ejecutar **GraphiQL** abrir tu navegador y escribir http://localhost:3001/api


### Comentarios

**Revisar schema.graphql** para sus consultas

### Queries

#### Mostrar todos los cursos

```graphql
{
  getCourses{
    id
    title
    views
  }
}
```

#### Mostramos un curso dado un ID

```graphql
{
  getCourse(id: "1"){
    id
    title
    views
  }
}
```

#### Mostramos un curso dado un ID pasado por variable

```graphql
query GetCourseByID($id: ID!) {
  getCourse(id: $id) {
    id
    title
    views
  }
}

{
  "id": 1
}
```

### Mutations

#### Crear un nuevo curso

```graphql
mutation {
  createCourse(input: {
    title: "Ay Cabron"
    views: 100000
  }) {
    id
    title
    views
  }
}
```

#### Actualizar un curso por ID

```graphql
mutation {
  editCourse(id: "1", input: {
    title: "React JS"
  }) {
    id
    title
    views
  }
}
```
