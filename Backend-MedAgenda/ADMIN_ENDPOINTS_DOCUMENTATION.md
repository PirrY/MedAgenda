# Admin Endpoints Documentation

## Overview
This document describes the admin user management endpoints that allow clinic administrators to manage users within their clinic, assign roles, and configure doctor specialties.

## Authentication
All endpoints require JWT authentication. The user must be an admin of a clinic to access these endpoints.

**Header Required:**
```
Authorization: Bearer <jwt_token>
```

---

## Endpoints

### 1. GET `/admin/clinic-users`

Get all users from the admin's clinic.

**Description:** Returns a list of all users who are members of the clinic that the authenticated admin manages.

**Request:**
- Method: `GET`
- URL: `/admin/clinic-users`
- Headers: `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "user_id": 1,
    "email": "carlos.martinez@cardiosalud.com",
    "first_name": "Carlos",
    "second_name": "Andrés",
    "first_last_name": "Martínez",
    "second_last_name": "Gómez",
    "phone_number": "+573001234567",
    "isDoctor": true,
    "isAdmin": true,
    "specialty_id": 1,
    "specialty_name": "Cardiología"
  },
  {
    "user_id": 5,
    "email": "patient@example.com",
    "first_name": "Juan",
    "second_name": null,
    "first_last_name": "Pérez",
    "second_last_name": "García",
    "phone_number": "+573001111111",
    "isDoctor": false,
    "isAdmin": false,
    "specialty_id": null,
    "specialty_name": null
  }
]
```

**Error Responses:**
- `401 Unauthorized`: No valid JWT token provided
- `403 Forbidden`: User is not an admin of any clinic

---

### 2. GET `/admin/search-user?email=<email>`

Search for a user by email address.

**Description:** Searches for a user by their email address and returns their information including their relationship to the admin's clinic.

**Request:**
- Method: `GET`
- URL: `/admin/search-user?email=user@example.com`
- Headers: `Authorization: Bearer <token>`
- Query Parameters:
  - `email` (required): Email address to search for

**Response (200 OK):**
```json
{
  "user_id": 10,
  "email": "doctor@example.com",
  "first_name": "María",
  "second_name": "Fernanda",
  "first_last_name": "López",
  "second_last_name": "Rodríguez",
  "phone_number": "+573109876543",
  "isDoctor": true,
  "isAdmin": false,
  "specialty_id": 2,
  "specialty_name": "Neurología"
}
```

**Error Responses:**
- `400 Bad Request`: Email parameter is missing
- `401 Unauthorized`: No valid JWT token provided
- `403 Forbidden`: User is not an admin of any clinic
- `404 Not Found`: User with the specified email does not exist

**Example curl:**
```bash
curl -X GET "http://localhost:3001/admin/search-user?email=carlos.martinez@cardiosalud.com" \
  -H "Authorization: Bearer <token>"
```

---

### 3. PUT `/admin/update-user-role`

Update a user's role within the clinic.

**Description:** Modifies a user's role in the clinic (Admin, Doctor, or Employee) and optionally assigns a medical specialty to doctors.

**Request:**
- Method: `PUT`
- URL: `/admin/update-user-role`
- Headers:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "isDoctor": true,
  "isAdmin": false,
  "specialty_id": 1
}
```

**Body Parameters:**
- `email` (required, string): Email of the user to update
- `isDoctor` (required, boolean): Whether the user should be a doctor
- `isAdmin` (required, boolean): Whether the user should be an admin
- `specialty_id` (optional, number): Specialty ID to assign (required if `isDoctor` is `true`)

**Business Rules:**
1. If `isAdmin` is `true`, the user's role will be set to "Admin" (admins are also considered doctors)
2. If `isAdmin` is `false` and `isDoctor` is `true`, the user's role will be set to "Doctor"
3. If both `isAdmin` and `isDoctor` are `false`, the user's role will be set to "Employee"
4. If `isDoctor` is `true`, `specialty_id` must be provided
5. If `isDoctor` is `false`, all doctor specialties are removed from the user
6. If the user is not already a member of the clinic, they will be added automatically

**Response (200 OK):**
```json
{
  "message": "User role updated successfully"
}
```

**Error Responses:**
- `400 Bad Request`:
  - `specialty_id` is required when setting `isDoctor` to `true`
  - Invalid request body format
- `401 Unauthorized`: No valid JWT token provided
- `403 Forbidden`: User is not an admin of any clinic
- `404 Not Found`: User with the specified email does not exist

**Example curl - Make user a doctor:**
```bash
curl -X PUT "http://localhost:3001/admin/update-user-role" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "isDoctor": true,
    "isAdmin": false,
    "specialty_id": 1
  }'
```

**Example curl - Make user an admin:**
```bash
curl -X PUT "http://localhost:3001/admin/update-user-role" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "isDoctor": false,
    "isAdmin": true,
    "specialty_id": 1
  }'
```

**Example curl - Remove doctor status:**
```bash
curl -X PUT "http://localhost:3001/admin/update-user-role" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "employee@example.com",
    "isDoctor": false,
    "isAdmin": false
  }'
```

---

### 4. GET `/admin/specialties`

Get all available medical specialties.

**Description:** Returns a list of all medical specialties available in the system. This endpoint is useful when an admin needs to assign a specialty to a doctor.

**Request:**
- Method: `GET`
- URL: `/admin/specialties`
- Headers: `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "specialty_id": 1,
    "specialty_name": "Cardiología",
    "specialty_description": "Especialidad médica que se ocupa de las afecciones del corazón y del aparato circulatorio"
  },
  {
    "specialty_id": 2,
    "specialty_name": "Neurología",
    "specialty_description": "Especialidad médica que trata los trastornos del sistema nervioso"
  },
  {
    "specialty_id": 3,
    "specialty_name": "Pediatría",
    "specialty_description": "Especialidad médica que estudia al niño y sus enfermedades"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: No valid JWT token provided

**Example curl:**
```bash
curl -X GET "http://localhost:3001/admin/specialties" \
  -H "Authorization: Bearer <token>"
```

**Note:** There is also a public endpoint at `/clinics/getAllSpecialties` that returns the same data without requiring authentication.

---

## Database Schema Reference

### Tables Used

#### `clinic_members`
```sql
CREATE TABLE clinic_members(
    clinic_id INT NOT NULL,
    user_id INT NOT NULL,
    role_within_clinic ENUM('Admin','Doctor','Employee') NOT NULL,
    role_description TEXT,
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(clinic_id, user_id)
);
```

#### `doctor_specialties`
```sql
CREATE TABLE doctor_specialties(
    doctor_id INT NOT NULL,
    specialty_id INT NOT NULL,
    PRIMARY KEY(doctor_id, specialty_id)
);
```

#### `specialties`
```sql
CREATE TABLE specialties(
    specialty_id INT AUTO_INCREMENT PRIMARY KEY,
    specialty_name VARCHAR(50) NOT NULL,
    specialty_description TEXT
);
```

---

## Common Workflows

### Workflow 1: Adding a new doctor to the clinic

1. Search for the user by email:
   ```bash
   GET /admin/search-user?email=newdoctor@example.com
   ```

2. Update their role to doctor with a specialty:
   ```bash
   PUT /admin/update-user-role
   Body: {
     "email": "newdoctor@example.com",
     "isDoctor": true,
     "isAdmin": false,
     "specialty_id": 1
   }
   ```

3. Verify the change:
   ```bash
   GET /admin/clinic-users
   ```

### Workflow 2: Promoting a doctor to admin

1. Update their role:
   ```bash
   PUT /admin/update-user-role
   Body: {
     "email": "doctor@example.com",
     "isDoctor": false,
     "isAdmin": true,
     "specialty_id": 1
   }
   ```

### Workflow 3: Removing doctor privileges

1. Update their role to employee:
   ```bash
   PUT /admin/update-user-role
   Body: {
     "email": "doctor@example.com",
     "isDoctor": false,
     "isAdmin": false
   }
   ```
   This will automatically remove all doctor specialties from the user.

---

## Testing

To test these endpoints, you need to:

1. **Login as an admin user:**
   ```bash
   curl -X POST http://localhost:3001/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "user_email_address": "carlos.martinez@cardiosalud.com",
       "password": "12345678"
     }'
   ```

2. **Copy the JWT token from the response**

3. **Use the token in subsequent requests:**
   ```bash
   curl -X GET http://localhost:3001/admin/clinic-users \
     -H "Authorization: Bearer <your-token-here>"
   ```

---

## Security Considerations

1. **Admin Verification:** All endpoints verify that the requesting user is an admin of a clinic before allowing any operations.

2. **Clinic Isolation:** Admins can only view and manage users within their own clinic. They cannot access or modify users from other clinics.

3. **Automatic Clinic Assignment:** When updating a user's role, if they're not already a member of the admin's clinic, they will be automatically added.

4. **Specialty Validation:** The system enforces that doctors must have a specialty assigned, preventing invalid states.

---

## Frontend Integration

The frontend should:

1. **Store the JWT token** after login and include it in the Authorization header for all admin requests.

2. **Fetch the user list** on component mount:
   ```typescript
   const response = await fetch('/admin/clinic-users', {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   ```

3. **Fetch specialties** when showing the role assignment form:
   ```typescript
   const specialties = await fetch('/admin/specialties', {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   ```

4. **Handle errors appropriately:**
   - 401: Redirect to login
   - 403: Show "You don't have permission" message
   - 404: Show "User not found" message
   - 400: Show validation error to user

---

## Implementation Details

### Files Created

- **DTO:** `/src/admin/dto/admin.dto.ts`
- **Repository (Reads):** `/src/admin/repo/reads.ts`
- **Repository (Writes):** `/src/admin/repo/writes.ts`
- **Service:** `/src/admin/admin.service.ts`
- **Controller:** `/src/admin/admin.controller.ts`
- **Module:** `/src/admin/admin.module.ts`

### Module Registration

The `AdminModule` has been registered in `/src/app.module.ts`.

---

## Swagger Documentation

Once the backend is running, you can access the Swagger UI at:
```
http://localhost:3001/api
```

The admin endpoints will be grouped under the "admin" tag.

---

**Last Updated:** December 2025
**Version:** 1.0
