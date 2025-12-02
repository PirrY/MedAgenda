# Endpoints Necesarios para Gestión de Usuarios (Admin)

## 📋 Descripción General

El administrador de una clínica necesita poder:
1. Ver todos los usuarios de su clínica
2. Buscar usuarios por email
3. Modificar el rol de cualquier usuario (convertirlos en doctor, admin, o paciente)
4. Asignar especialidades a los doctores

---

## 🔐 Autenticación

Todos estos endpoints requieren:
- **Autenticación JWT** en el header `Authorization: Bearer <token>`
- **Rol de Admin** (`isAdmin: true` en el token)
- El admin solo puede gestionar usuarios de **su propia clínica**

---

## 1. Obtener Usuarios de la Clínica

**Endpoint:** `GET /admin/clinic-users`

**Autenticación:** Requerida (Admin)

**Descripción:** Obtiene todos los usuarios asociados a la clínica del administrador autenticado

**Parámetros:** Ninguno (el clinic_id se obtiene del token JWT del admin)

**Response esperado:**
```json
[
  {
    "user_id": 1,
    "user_email_address": "carlos.martinez@cardiosalud.com",
    "first_name": "Carlos",
    "second_name": "Andrés",
    "first_last_name": "Martínez",
    "second_last_name": "Gómez",
    "user_phone_number": "+573001234567",
    "is_doctor": true,
    "is_admin": false,
    "specialty_name": "Cardiología",
    "created_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "user_id": 2,
    "user_email_address": "maria.lopez@cardiosalud.com",
    "first_name": "María",
    "second_name": null,
    "first_last_name": "López",
    "second_last_name": "Ruiz",
    "user_phone_number": "+573009876543",
    "is_doctor": false,
    "is_admin": false,
    "specialty_name": null,
    "created_at": "2024-02-20T14:15:00.000Z"
  },
  {
    "user_id": 3,
    "user_email_address": "admin@cardiosalud.com",
    "first_name": "Pedro",
    "second_name": "Antonio",
    "first_last_name": "García",
    "second_last_name": "Sánchez",
    "user_phone_number": "+573005555555",
    "is_doctor": false,
    "is_admin": true,
    "specialty_name": null,
    "created_at": "2023-12-01T08:00:00.000Z"
  }
]
```

**Notas importantes:**
- Solo devuelve usuarios de la clínica del admin autenticado
- `is_doctor` indica si el usuario está en la tabla de doctores
- `is_admin` indica si el usuario es administrador de la clínica
- `specialty_name` solo tiene valor si `is_doctor` es true
- Ordenar por `created_at` descendente (más recientes primero)

**Códigos de respuesta:**
- `200 OK`: Lista obtenida exitosamente (puede ser array vacío)
- `401 Unauthorized`: Token inválido o no es admin
- `403 Forbidden`: No tiene permisos de admin

---

## 2. Buscar Usuario por Email

**Endpoint:** `GET /admin/search-user?email=<email>`

**Autenticación:** Requerida (Admin)

**Descripción:** Busca un usuario específico por su email dentro de la clínica del admin

**Parámetros Query:**
- `email` (string, requerido): Email del usuario a buscar

**Ejemplo:** `GET /admin/search-user?email=carlos.martinez@cardiosalud.com`

**Response esperado:**
```json
{
  "user_id": 1,
  "user_email_address": "carlos.martinez@cardiosalud.com",
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "user_phone_number": "+573001234567",
  "is_doctor": true,
  "is_admin": false,
  "specialty_name": "Cardiología",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

**Códigos de respuesta:**
- `200 OK`: Usuario encontrado
- `404 Not Found`: No se encontró usuario con ese email en la clínica
- `401 Unauthorized`: Token inválido o no es admin
- `403 Forbidden`: No tiene permisos de admin

---

## 3. Actualizar Rol de Usuario

**Endpoint:** `PUT /admin/update-user-role`

**Autenticación:** Requerida (Admin)

**Descripción:** Cambia el rol de un usuario (convertir en doctor, admin, o paciente regular)

**Request Body:**
```json
{
  "user_email_address": "maria.lopez@cardiosalud.com",
  "is_doctor": true,
  "is_admin": false,
  "specialty_id": 2
}
```

**Campos:**
- `user_email_address` (string, requerido): Email del usuario a modificar
- `is_doctor` (boolean, requerido): Si el usuario será doctor
- `is_admin` (boolean, requerido): Si el usuario será admin
- `specialty_id` (number, opcional): ID de la especialidad (requerido solo si `is_doctor` es true)

**Response esperado:**
```json
{
  "user_id": 2,
  "user_email_address": "maria.lopez@cardiosalud.com",
  "first_name": "María",
  "second_name": null,
  "first_last_name": "López",
  "second_last_name": "Ruiz",
  "user_phone_number": "+573009876543",
  "is_doctor": true,
  "is_admin": false,
  "specialty_name": "Dermatología",
  "created_at": "2024-02-20T14:15:00.000Z"
}
```

**Lógica del backend:**

1. **Si `is_doctor` es true:**
   - Insertar registro en la tabla `doctors` si no existe
   - Asociar con la clínica del admin (`clinic_id`)
   - Asignar la especialidad (`specialty_id`)
   - Si ya era doctor, actualizar la especialidad

2. **Si `is_doctor` es false:**
   - Eliminar registro de la tabla `doctors` (si existe)
   - Eliminar asignación de especialidad

3. **Si `is_admin` es true:**
   - Marcar como admin en la tabla correspondiente
   - Asociar con la clínica del admin

4. **Si `is_admin` es false:**
   - Remover permisos de admin

**Validaciones:**
- El usuario debe existir en la base de datos
- El usuario debe pertenecer a la clínica del admin
- Si `is_doctor` es true, `specialty_id` es obligatorio
- No se puede remover el último admin de una clínica (validación opcional pero recomendada)

**Códigos de respuesta:**
- `200 OK`: Rol actualizado exitosamente
- `400 Bad Request`: Datos inválidos (ej: is_doctor true sin specialty_id)
- `401 Unauthorized`: Token inválido o no es admin
- `403 Forbidden`: No tiene permisos de admin
- `404 Not Found`: Usuario no encontrado o no pertenece a la clínica

---

## 4. Obtener Especialidades (Ya debería existir)

**Endpoint:** `GET /specialties`

**Autenticación:** No requerida (público)

**Descripción:** Obtiene todas las especialidades médicas disponibles

**Response esperado:**
```json
[
  {
    "specialty_id": 1,
    "specialty_name": "Cardiología"
  },
  {
    "specialty_id": 2,
    "specialty_name": "Dermatología"
  },
  {
    "specialty_id": 3,
    "specialty_name": "Pediatría"
  }
]
```

**Códigos de respuesta:**
- `200 OK`: Lista obtenida exitosamente

---

## 🗄️ Estructura de Base de Datos Sugerida

### Tabla `users`
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email_address VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100),
  first_last_name VARCHAR(100) NOT NULL,
  second_last_name VARCHAR(100),
  user_phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `doctors`
```sql
CREATE TABLE doctors (
  doctor_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  specialty_id INTEGER REFERENCES specialties(specialty_id),
  license_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);
```

### Tabla `clinic_doctors` (Relación many-to-many)
```sql
CREATE TABLE clinic_doctors (
  clinic_id INTEGER REFERENCES clinics(clinic_id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctors(doctor_id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (clinic_id, doctor_id)
);
```

### Tabla `specialties`
```sql
CREATE TABLE specialties (
  specialty_id SERIAL PRIMARY KEY,
  specialty_name VARCHAR(100) UNIQUE NOT NULL
);
```

---

## 🔍 Query SQL de Referencia

Para obtener los usuarios de una clínica con sus roles:

```sql
SELECT
  u.user_id,
  u.user_email_address,
  u.first_name,
  u.second_name,
  u.first_last_name,
  u.second_last_name,
  u.user_phone_number,
  EXISTS(
    SELECT 1 FROM doctors d
    INNER JOIN clinic_doctors cd ON d.doctor_id = cd.doctor_id
    WHERE d.user_id = u.user_id AND cd.clinic_id = $1
  ) as is_doctor,
  COALESCE(
    (SELECT cd.is_admin FROM clinic_doctors cd
     INNER JOIN doctors d ON cd.doctor_id = d.doctor_id
     WHERE d.user_id = u.user_id AND cd.clinic_id = $1),
    false
  ) as is_admin,
  s.specialty_name,
  u.created_at
FROM users u
LEFT JOIN doctors d ON u.user_id = d.user_id
LEFT JOIN specialties s ON d.specialty_id = s.specialty_id
LEFT JOIN clinic_doctors cd ON d.doctor_id = cd.doctor_id AND cd.clinic_id = $1
WHERE u.user_id IN (
  -- Todos los usuarios que tienen citas en esta clínica
  SELECT DISTINCT patient_id FROM appointments WHERE clinic_id = $1
  UNION
  -- Todos los doctores de esta clínica
  SELECT d.user_id FROM doctors d
  INNER JOIN clinic_doctors cd ON d.doctor_id = cd.doctor_id
  WHERE cd.clinic_id = $1
)
ORDER BY u.created_at DESC;
```

---

## 📝 Prompt para Claude Code (Backend)

```
Necesito implementar los endpoints para que un administrador pueda gestionar los usuarios de su clínica en MedAgenda:

1. **GET /admin/clinic-users** - Obtener todos los usuarios de la clínica
   - Extraer el clinic_id del admin autenticado desde el token JWT
   - Devolver usuarios con: user_id, email, nombres, teléfono, is_doctor, is_admin, specialty_name
   - Solo usuarios relacionados con la clínica (pacientes con citas o doctores asignados)

2. **GET /admin/search-user?email=<email>** - Buscar usuario por email
   - Buscar dentro de los usuarios de la clínica del admin
   - Devolver mismo formato que el endpoint anterior
   - 404 si no se encuentra

3. **PUT /admin/update-user-role** - Cambiar rol de usuario
   - Recibir: user_email_address, is_doctor, is_admin, specialty_id (opcional)
   - Lógica:
     * Si is_doctor: true → Crear/actualizar registro en tabla doctors + clinic_doctors
     * Si is_doctor: false → Eliminar de doctors y clinic_doctors
     * Si is_admin: true → Marcar como admin en clinic_doctors
     * specialty_id es requerido si is_doctor es true
   - Validar que el usuario pertenezca a la clínica del admin

4. **GET /specialties** - Obtener especialidades (si no existe ya)
   - Devolver: specialty_id, specialty_name

Todos los endpoints excepto /specialties requieren:
- Middleware de autenticación JWT
- Middleware de verificación de rol admin
- Manejo de errores (400, 401, 403, 404, 500)
- Validación de datos

Por favor, implementa estos endpoints siguiendo las mejores prácticas y la arquitectura del proyecto.
```

---

## ✅ Resumen Frontend Implementado

**Archivos creados:**
1. `interfaces/adminUser.ts` - Tipos TypeScript
2. `libs/adminService.ts` - Servicios para llamar al backend
3. `app/(webpage)/admin/users/page.tsx` - Página completa de gestión

**Características:**
- ✅ Tabla con todos los usuarios de la clínica
- ✅ Búsqueda por email
- ✅ Visualización de roles con badges (Admin, Doctor, Paciente)
- ✅ Modal para editar roles
- ✅ Selección de especialidad para doctores
- ✅ Validaciones en el frontend
- ✅ Mensajes de éxito/error
- ✅ Estados de carga
- ✅ Diseño moderno y responsive
- ✅ Navegación desde homeAdmin

**Ruta:** `/admin/users`
