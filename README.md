# Patagonian | IUPA > Programación Web 2

## Clase 27 Abril. Express API

### Software

- [GIT](https://git-scm.com)
- [Node.JS](https://nodejs.org/es)

### Setup

1. Clonar el repositorio: `git clone https://github.com/Patagonian-IUPA/programacion-web-2-express-api.git`
2. Instalar dependencias: `npm install`
3. Ejecutar servidor: [Express](https://expressjs.com/es/): `node server.js`

## Docker

```bash
docker compose up

# Si no funciona lo anterior
docker-compose up
```

### Setup DB

```sql
create table users(username varchar(255), password varchar(255), name varchar(255), age smallint, id int not null primary key auto_increment);

insert into users(username, password, name, age) values ('edu', 'educuomo', 'Eduardo Cuomo', 33);
```
