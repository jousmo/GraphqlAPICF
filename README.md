# Graphql Example With Mongo DB

Este es un proyecto paso a paso de como configurar un Server de Graphql con Express, esta API tiene como motor de base de datos Mongo DB

**Actualización:** Despues del commit 98748e79b9f5aec cambiamos el Server Express por Apollo Server =)

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

#### Mostrar todos los cursos con su usuario

```graphql
{
  getCourses{
    id
    title
    views
		user{
      id
      email
      hashedPassword
      token
    }
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

#### Motramos N cursos dado una paginación

```graphql
{
  getCourses(page: 1, limit: 2){
    id
    title
  }
}
```

```graphql
{
  getCourses(page: 2, limit: 2){
    id
    title
  }
}
```

#### Mostrar los usuarios con sus cursos

```graphql
{
  getUsers{
    id
    email
 		courses{
      id
      title
    }
  }
}
```

### Mutations

#### Crear un usuario
```graphql
mutation{
  signUp(input: {
    email: "jousmo@outlook.com"
    password: "12345"
  }) {
    id
    email
    hashedPassword
  }
}
```

### Hacer un Login

```graphql
mutation{
  logIn(input: {
    email: "jousmo@outlook.com"
    password: "12345"
  }) {
    id
    email
    hashedPassword
  }
}
```

#### Crear un nuevo curso

```graphql
mutation {
  createCourse(input: {
    title: "RectJS"
    views: 1000
  }, user: "5ec2b61b6dbfc08fd4361f5b"){
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

#### Eliminar un curso por ID

```graphql
mutation {
  deleteCourse(id: "2")
}
```
