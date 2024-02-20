# Errores

Ver cómo configurar los mensajes de errores que devuelve la terminal y los que se muestran en la consola del navegador.

Teniendo como base el usuario:

```json
{
  "email": "bruno@mail.com",
  "username": "Bruno",
  "password": "asd12345"
}
```

Al intentar registrar otro Bruno:

```json
{
  "email": "bruno22@mail.com", // Se cambia el correo
  "username": "Bruno",
  "password": "asd12345"
}
```

**Error al crear usuario:** `error: insert into "users" ("email", "password", "username") values ($1, $2, $3) returning * - llave duplicada viola restricción de unicidad «users_username_unique»`

```json
{
  "length": 214,
  "severity": "ERROR",
  "code": "23505",
  "detail": "Ya existe la llave (username)=(Bruno).",
  "hint": undefined,
  "position": undefined,
  "internalPosition": undefined,
  "internalQuery": undefined,
  "where": undefined,
  "schema": "public",
  "table": "users",
  "column": undefined,
  "dataType": undefined,
  "constraint": "users_username_unique",
  "file": "nbtinsert.c",
  "line": "673",
  "routine": "_bt_check_unique"
}
```
