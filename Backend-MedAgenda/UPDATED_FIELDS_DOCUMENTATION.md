# Actualización de Campos de Usuario - MedAgenda

## 📋 Resumen de Cambios

Se han agregado nuevos campos opcionales a la tabla `users` para almacenar información adicional del perfil de usuario.

---

## 🗄️ Cambios en la Base de Datos

### Campos Agregados a la Tabla `users`:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `birth_date` | DATE | No | Fecha de nacimiento del usuario |
| `gender` | ENUM('M','F','O') | No | Género del usuario (M=Masculino, F=Femenino, O=Otro) |
| `address` | VARCHAR(255) | No | Dirección física del usuario |
| `city` | VARCHAR(100) | No | Ciudad de residencia |
| `state` | VARCHAR(100) | No | Estado/Departamento de residencia |
| `country` | VARCHAR(100) | No | País de residencia |
| `emergency_contact_name` | VARCHAR(100) | No | Nombre del contacto de emergencia |
| `emergency_contact_phone` | VARCHAR(20) | No | Teléfono del contacto de emergencia |
| `created_at` | TIMESTAMP | Automático | Fecha de creación del registro |
| `updated_at` | TIMESTAMP | Automático | Fecha de última actualización |

### Campos Modificados (ampliación de longitud):

| Campo | Antes | Después |
|-------|-------|---------|
| `first_name` | VARCHAR(20) | VARCHAR(50) |
| `second_name` | VARCHAR(20) | VARCHAR(50) |
| `first_last_name` | VARCHAR(20) | VARCHAR(50) |
| `second_last_name` | VARCHAR(20) | VARCHAR(50) |
| `legal_id` | VARCHAR(10) | VARCHAR(15) |
| `user_phone_number` | VARCHAR(13) | VARCHAR(20) |

---

## 🔧 Migración de Base de Datos

### Para Base de Datos Nueva:
Usa el archivo `MedAgenda.sql` actualizado:
```bash
mysql -u root -p < Backend-MedAgenda/MedAgenda.sql
```

### Para Base de Datos Existente:
Usa el script de migración para no perder datos:
```bash
mysql -u root -p < Backend-MedAgenda/migration_add_user_fields.sql
```

⚠️ **IMPORTANTE**: El script de migración NO borra datos existentes, solo agrega columnas nuevas.

---

## 📝 Endpoints Actualizados

### 1. **POST /users/register** (Registro de Usuarios)

Ahora acepta campos adicionales **opcionales**:

**Request Body:**
```json
{
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "legal_id": "1035678901",
  "password": "12345678",
  "user_phone_number": "+573001234567",
  "user_email_address": "carlos.martinez@example.com",

  "birth_date": "1975-03-15",
  "gender": "M",
  "address": "Calle 10 #43-12, El Poblado",
  "city": "Medellín",
  "state": "Antioquia",
  "country": "Colombia",
  "emergency_contact_name": "María Martínez",
  "emergency_contact_phone": "+573009876543"
}
```

**Campos Obligatorios:**
- `first_name`
- `first_last_name`
- `second_last_name`
- `legal_id`
- `user_phone_number`
- `user_email_address`
- `password`

**Campos Opcionales:**
- `second_name`
- `birth_date` (formato: YYYY-MM-DD)
- `gender` (valores: 'M', 'F', 'O')
- `address`
- `city`
- `state`
- `country`
- `emergency_contact_name`
- `emergency_contact_phone`

---

### 2. **GET /users/profile** (Obtener Perfil)

**Response actualizado:**
```json
{
  "user_id": 1,
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "legal_id": "1035678901",
  "user_phone_number": "+573001234567",
  "user_email_address": "carlos.martinez@example.com",

  "birth_date": "1975-03-15",
  "gender": "M",
  "address": "Calle 10 #43-12, El Poblado",
  "city": "Medellín",
  "state": "Antioquia",
  "country": "Colombia",
  "emergency_contact_name": "María Martínez",
  "emergency_contact_phone": "+573009876543"
}
```

**Nota:** Los campos opcionales pueden ser `null` si no fueron proporcionados.

---

### 3. **PUT /users/profile** (Actualizar Perfil)

Ahora acepta los nuevos campos para actualización:

**Request Body (todos los campos son opcionales):**
```json
{
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "user_phone_number": "+573001234567",

  "birth_date": "1975-03-15",
  "gender": "M",
  "address": "Calle 10 #43-12, El Poblado",
  "city": "Medellín",
  "state": "Antioquia",
  "country": "Colombia",
  "emergency_contact_name": "María Martínez",
  "emergency_contact_phone": "+573009876543"
}
```

**Campos NO Modificables:**
- `user_id`
- `user_email_address`
- `legal_id`
- `password_hash` (usar `/users/change-password` para cambiar contraseña)
- `created_at`
- `updated_at`

**Validaciones:**
- `birth_date`: Debe ser formato ISO 8601 (YYYY-MM-DD)
- `gender`: Solo acepta 'M', 'F', u 'O'
- `user_phone_number`: Debe ser un número de teléfono válido con código de país

---

## 🧪 Ejemplos de Uso

### Crear usuario con información completa:
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Ana",
    "second_name": "María",
    "first_last_name": "García",
    "second_last_name": "López",
    "legal_id": "1234567890",
    "password": "password123",
    "user_phone_number": "+573001234567",
    "user_email_address": "ana.garcia@example.com",
    "birth_date": "1990-05-15",
    "gender": "F",
    "address": "Carrera 7 #45-30",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "country": "Colombia",
    "emergency_contact_name": "Pedro García",
    "emergency_contact_phone": "+573109876543"
  }'
```

### Crear usuario solo con campos obligatorios:
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "first_last_name": "Pérez",
    "second_last_name": "González",
    "legal_id": "9876543210",
    "password": "password123",
    "user_phone_number": "+573201234567",
    "user_email_address": "juan.perez@example.com"
  }'
```

### Actualizar solo algunos campos del perfil:
```bash
curl -X PUT http://localhost:3000/users/profile \
  -H "Authorization: Bearer <tu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Medellín",
    "state": "Antioquia",
    "address": "Calle 50 #60-20"
  }'
```

---

## 📊 Valores Válidos para ENUM

### Campo `gender`:
- `'M'` - Masculino
- `'F'` - Femenino
- `'O'` - Otro

---

## ✅ Lista de Verificación para Implementación

- [x] Base de datos actualizada (MedAgenda.sql)
- [x] Script de migración creado (migration_add_user_fields.sql)
- [x] DTOs actualizados (CreateUserDto, UpdateProfileDto)
- [x] Repositorio actualizado (reads.ts, writes.ts)
- [x] Servicios actualizados (users.service.ts)
- [x] Controladores actualizados (users.controller.ts)
- [x] Script de usuarios admin actualizado (create_admin_users.sh)
- [x] Documentación actualizada

---

## 🚀 Pasos para Implementar en Producción

1. **Respaldar la base de datos actual:**
   ```bash
   mysqldump -u root -p MedAgenda > backup_medagenda.sql
   ```

2. **Ejecutar el script de migración:**
   ```bash
   mysql -u root -p MedAgenda < Backend-MedAgenda/migration_add_user_fields.sql
   ```

3. **Reiniciar el servidor backend:**
   ```bash
   cd Backend-MedAgenda
   npm run start:dev
   ```

4. **Verificar que los endpoints funcionan correctamente:**
   - Probar POST /users/register con campos nuevos
   - Probar GET /users/profile
   - Probar PUT /users/profile con campos nuevos

---

## 🔍 Notas Técnicas

### Retrocompatibilidad:
- ✅ Los usuarios existentes NO necesitan agregar estos campos
- ✅ Todos los campos nuevos son opcionales (NULL permitido)
- ✅ Los campos existentes siguen funcionando igual
- ✅ El endpoint de registro sigue aceptando solo campos obligatorios

### Performance:
- Los campos adicionales NO afectan el rendimiento significativamente
- Los índices existentes (`user_email_address`, `legal_id`) se mantienen intactos
- `created_at` y `updated_at` se actualizan automáticamente

### Validaciones:
- `birth_date`: Acepta formato ISO 8601 (YYYY-MM-DD)
- `gender`: Solo valores del ENUM ('M', 'F', 'O')
- `user_phone_number`: Validado con decorador `@IsPhoneNumber()`
- Strings: Sin validación de longitud máxima adicional (VARCHAR define límite)

---

## 📞 Soporte

Si encuentras algún problema durante la migración o implementación:
1. Verifica que ejecutaste el script de migración correctamente
2. Revisa los logs del servidor backend
3. Asegúrate de que todos los campos en el request cumplan las validaciones

¡Actualización completada exitosamente! 🎉
