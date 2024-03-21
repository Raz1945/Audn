# Backend

1. **Inicializa el proyecto**:
   ```bash
   npm init
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Agrega las siguientes librerías**:
   ```bash
   npm i dotenv express express-validator
   ```

4. **Incluye estas herramientas**:
   ```bash
   npm i bcrypt cors jsonwebtoken
   ```

5. **Configura el entorno de desarrollo**:
   ```bash
   npm i nodemon knex pg
   ```

## Comandos de migración

### Crear una migración

Para generar archivos de migración, utiliza el siguiente comando:
```bash
npx knex migrate:make <nombre_archivo>
```

### Ejecutar migraciones pendientes

Para aplicar la siguiente migración que aún no se ha ejecutado:
```bash
npx knex migrate:up
```

También puedes ejecutar una migración específica que aún no se ha aplicado:
```bash
npx knex migrate:up <nombre_del_archivo>
```

O simplemente, para aplicar la última migración pendiente:
```bash
npx knex migrate:latest
```

### Revertir migraciones

Para deshacer el último lote de migraciones:
```bash
npx knex migrate:rollback
```

Si deseas revertir todas las migraciones completadas:
```bash
npx knex migrate:rollback --all
```

## Listado de migraciones

Para enumerar las migraciones completadas y pendientes:
```bash
npx knex migrate:list
```
