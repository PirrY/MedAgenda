# Endpoints Implementados - MedAgenda Backend

## 📋 Resumen

Se han implementado 4 nuevos endpoints para gestión de perfil de usuario y consulta de citas:

### ✅ Endpoints de Perfil de Usuario

#### 1. **GET /users/profile**
Obtiene el perfil completo del usuario autenticado.

**Autenticación:** Bearer Token requerido

**Response:**
```json
{
  "user_id": 1,
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "legal_id": "1035678901",
  "user_phone_number": "+573001234567",
  "user_email_address": "carlos.martinez@cardiosalud.com"
}
```

**Códigos de respuesta:**
- `200 OK`: Perfil obtenido exitosamente
- `401 Unauthorized`: Token inválido o expirado
- `404 Not Found`: Usuario no encontrado

---

#### 2. **PUT /users/profile**
Actualiza la información del perfil del usuario autenticado.

**Autenticación:** Bearer Token requerido

**Request Body (todos los campos son opcionales):**
```json
{
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "user_phone_number": "+573001234567"
}
```

**Response:**
```json
{
  "user_id": 1,
  "first_name": "Carlos",
  "second_name": "Andrés",
  "first_last_name": "Martínez",
  "second_last_name": "Gómez",
  "legal_id": "1035678901",
  "user_phone_number": "+573001234567",
  "user_email_address": "carlos.martinez@cardiosalud.com"
}
```

**Notas:**
- Todos los campos son opcionales (solo se actualizan los enviados)
- El campo `user_email_address` NO se puede actualizar
- El campo `legal_id` NO se puede actualizar
- Si envías un campo, debe cumplir las validaciones (ej: phone debe ser válido)

**Códigos de respuesta:**
- `200 OK`: Perfil actualizado exitosamente
- `400 Bad Request`: Datos inválidos
- `401 Unauthorized`: Token inválido o expirado
- `404 Not Found`: Usuario no encontrado

---

#### 3. **PUT /users/change-password**
Cambia la contraseña del usuario autenticado.

**Autenticación:** Bearer Token requerido

**Request Body:**
```json
{
  "current_password": "12345678",
  "new_password": "nuevaContraseña123",
  "confirm_password": "nuevaContraseña123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

**Validaciones:**
- La contraseña actual debe ser correcta
- `new_password` y `confirm_password` deben coincidir
- La nueva contraseña debe tener mínimo 6 caracteres
- Las contraseñas se hashean con bcrypt

**Códigos de respuesta:**
- `200 OK`: Contraseña cambiada exitosamente
- `400 Bad Request`:
  - Contraseñas no coinciden
  - Contraseña actual incorrecta
  - Contraseña muy corta
- `401 Unauthorized`: Token inválido o expirado
- `404 Not Found`: Usuario no encontrado

---

### ✅ Endpoint de Citas del Paciente

#### 4. **GET /appointments/patient**
Obtiene todas las citas (pasadas y futuras) del paciente autenticado.

**Autenticación:** Bearer Token requerido

**Response:**
```json
[
  {
    "appointment_id": 1,
    "clinic_id": 1,
    "clinic_name": "CardioSalud Medellín",
    "first_name": "María",
    "second_name": "Fernanda",
    "first_last_name": "López",
    "second_last_name": "Rodríguez",
    "start_date_time": "2025-12-15T10:00:00.000Z",
    "end_date_time": "2025-12-15T10:30:00.000Z",
    "appointment_description": "Control cardiológico"
  },
  {
    "appointment_id": 2,
    "clinic_id": 2,
    "clinic_name": "NeuroCentro Bogotá",
    "first_name": "Carlos",
    "second_name": null,
    "first_last_name": "Martínez",
    "second_last_name": "Gómez",
    "start_date_time": "2025-12-20T14:30:00.000Z",
    "end_date_time": "2025-12-20T15:15:00.000Z",
    "appointment_description": null
  }
]
```

**Notas:**
- Las citas se ordenan por fecha descendente (más recientes primero)
- Se incluye información del doctor (nombre completo) y de la clínica
- `end_date_time` se calcula automáticamente usando `clinic_average_appointment_time`
- Si no hay citas, retorna un array vacío `[]`

**Códigos de respuesta:**
- `200 OK`: Citas obtenidas exitosamente (puede ser array vacío)
- `401 Unauthorized`: Token inválido o expirado

---

## 🔧 Archivos Modificados

### DTOs Actualizados
- **Backend-MedAgenda/src/users/dto/users.dto.ts**
  - ✅ `UpdateProfileDto` - Para actualizar perfil
  - ✅ `ChangePasswordDto` - Para cambiar contraseña

### Repositorios Actualizados
- **Backend-MedAgenda/src/users/repo/reads.ts**
  - ✅ `getUserById()` - Obtiene perfil completo por ID
  - ✅ `getPasswordHashById()` - Obtiene hash de contraseña
  - ✅ Interface `UserProfile`

- **Backend-MedAgenda/src/users/repo/writes.ts**
  - ✅ `updateUserProfile()` - Actualiza perfil (campos dinámicos)
  - ✅ `updateUserPassword()` - Actualiza contraseña hasheada

- **Backend-MedAgenda/src/appointments/repo/reads.ts**
  - ✅ `getAppointmentsByPatientId()` - Obtiene citas del paciente

### Servicios Actualizados
- **Backend-MedAgenda/src/users/users.service.ts**
  - ✅ `getUserProfile()` - Lógica de negocio para obtener perfil
  - ✅ `updateUserProfile()` - Lógica de negocio para actualizar perfil
  - ✅ `changePassword()` - Lógica de negocio para cambiar contraseña

- **Backend-MedAgenda/src/appointments/appointments.service.ts**
  - ✅ `getPatientAppointments()` - Lógica de negocio para obtener citas

### Controladores Actualizados
- **Backend-MedAgenda/src/users/users.controller.ts**
  - ✅ `GET /users/profile` endpoint
  - ✅ `PUT /users/profile` endpoint
  - ✅ `PUT /users/change-password` endpoint

- **Backend-MedAgenda/src/appointments/appointments.controller.ts**
  - ✅ `GET /appointments/patient` endpoint

---

## 🔐 Seguridad Implementada

1. **Autenticación JWT:**
   - Todos los endpoints requieren `JwtAuthGuard`
   - El token debe enviarse en el header: `Authorization: Bearer <token>`
   - El user_id se extrae automáticamente del token (`req.user.id`)

2. **Validación de Datos:**
   - DTOs con class-validator para validar inputs
   - Validación de formatos (email, teléfono)
   - Validación de longitudes mínimas/máximas

3. **Hash de Contraseñas:**
   - Bcrypt con salt rounds = 10
   - Comparación segura de contraseñas

4. **Autorización:**
   - Los usuarios solo pueden ver/editar su propio perfil
   - El user_id se obtiene del token JWT (no del request body)

---

## 🧪 Pruebas con curl

### 1. Obtener perfil
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <tu_token>"
```

### 2. Actualizar perfil
```bash
curl -X PUT http://localhost:3000/users/profile \
  -H "Authorization: Bearer <tu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Carlos",
    "user_phone_number": "+573001234567"
  }'
```

### 3. Cambiar contraseña
```bash
curl -X PUT http://localhost:3000/users/change-password \
  -H "Authorization: Bearer <tu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "12345678",
    "new_password": "nuevaPass123",
    "confirm_password": "nuevaPass123"
  }'
```

### 4. Obtener citas del paciente
```bash
curl -X GET http://localhost:3000/appointments/patient \
  -H "Authorization: Bearer <tu_token>"
```

---

## 📝 Notas Importantes

1. **Base de Datos:**
   - Los endpoints funcionan con el esquema actual de `MedAgenda.sql`
   - No se requieren cambios en la estructura de la base de datos

2. **Compatibilidad:**
   - Implementado siguiendo el patrón arquitectónico existente en el proyecto
   - Compatible con la estructura actual de NestJS

3. **Swagger/OpenAPI:**
   - Todos los endpoints están documentados con decoradores de Swagger
   - Accede a la documentación en: `http://localhost:3000/api` (si está configurado)

4. **Manejo de Errores:**
   - Excepciones claras y específicas (NotFoundException, BadRequestException, etc.)
   - Códigos HTTP apropiados
   - Mensajes de error descriptivos

---

## ✅ Estado de Implementación

- [x] DTOs creados y validados
- [x] Funciones de repositorio implementadas
- [x] Servicios con lógica de negocio
- [x] Controladores con endpoints REST
- [x] Autenticación JWT integrada
- [x] Validaciones de seguridad
- [x] Documentación Swagger

## 🚀 Próximos Pasos

Para probar los endpoints:
1. Asegúrate de que el servidor esté corriendo: `npm run start:dev`
2. Registra un usuario usando `POST /users/register`
3. Inicia sesión para obtener un token JWT
4. Usa el token para acceder a los endpoints protegidos

¡Todos los endpoints están listos para usar! 🎉
