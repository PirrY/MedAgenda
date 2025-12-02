# 🗄️ Setup Completo de Base de Datos - MedAgenda

Este documento te guiará paso a paso para configurar completamente la base de datos de MedAgenda con datos de ejemplo.

---

## 📋 Prerrequisitos

- MySQL 8.0 o superior instalado
- Node.js y npm instalados (para el backend)
- Acceso root a MySQL
- Backend de MedAgenda configurado

---

## 🚀 Proceso de Setup (3 Pasos)

### **Paso 1: Crear las Tablas** 📊

Este paso crea la estructura completa de la base de datos (tablas, relaciones, índices).

```bash
mysql -u root -p < MedAgenda.sql
```

**¿Qué crea?**
- Base de datos `MedAgenda`
- 11 tablas: users, clinics, appointments, specialties, countries, states, cities, etc.
- Todas las relaciones de llaves foráneas
- Índices necesarios

**Tiempo estimado:** 5 segundos

---

### **Paso 2: Crear los Usuarios Administrativos** 👥

Este paso crea 10 usuarios administradores (doctores propietarios de clínicas) usando la API REST.

**2.1. Asegúrate de que el backend esté corriendo:**

```bash
cd Backend-MedAgenda
npm run start:dev
```

Espera a ver el mensaje:
```
Application is running on: http://localhost:3000
```

**2.2. Ejecuta el script de creación de usuarios:**

```bash
# Dale permisos de ejecución (solo la primera vez)
chmod +x create_admin_users.sh

# Ejecuta el script
./create_admin_users.sh
```

**Nota:** Si tu API corre en un puerto diferente, edita la variable `API_URL` en el script.

**¿Qué crea?**
- 10 usuarios doctores con perfil completo
- Contraseña para todos: `12345678`

**Usuarios creados:**
1. Carlos Andrés Martínez - `carlos.martinez@cardiosalud.com` (Cardiólogo)
2. María Fernanda López - `maria.lopez@neurocentro.com` (Neuróloga)
3. Ana Lucía Torres - `ana.torres@pediatricoarcoiris.com` (Pediatra)
4. Sofía Patricia Herrera - `sofia.herrera@mujervital.com` (Ginecóloga)
5. Jorge Eduardo Suárez - `jorge.suarez@dermaclinic.com` (Dermatólogo)
6. Ricardo Javier Morales - `ricardo.morales@oncologico.com` (Oncólogo)
7. Laura Cristina Vargas - `laura.vargas@equilibriomental.com` (Psiquiatra)
8. Fernando Alejandro Ruiz - `fernando.ruiz@visionclara.com` (Oftalmólogo)
9. Gabriel Antonio Méndez - `gabriel.mendez@saludauditiva.com` (Otorrinolaringólogo)
10. Miguel Ángel Ramos - `miguel.ramos@traumaclinic.com` (Traumatólogo)

**Tiempo estimado:** 30-60 segundos

---

### **Paso 3: Poblar la Base de Datos** 🎯

Este paso agrega todos los datos de ejemplo: países, ciudades, especialidades, clínicas, y citas.

```bash
mysql -u root -p MedAgenda < populate_database.sql
```

**¿Qué crea?**
- 5 países (Colombia, Venezuela, Ecuador, Perú, México)
- 20 estados/departamentos
- 20 ciudades
- 12 especialidades médicas
- 10 clínicas operativas
- 10 miembros de clínicas (los doctores admins)
- Relaciones doctor-especialidad
- Relaciones clínica-especialidad
- 25 citas de ejemplo (16 futuras + 9 pasadas)

**Tiempo estimado:** 10 segundos

---

## ✅ Verificación del Setup

Después de completar los 3 pasos, verifica que todo esté correcto:

```bash
mysql -u root -p MedAgenda
```

Ejecuta estas consultas:

```sql
-- Ver total de registros
SELECT 'Usuarios' AS Tabla, COUNT(*) AS Total FROM users
UNION ALL SELECT 'Países', COUNT(*) FROM countries
UNION ALL SELECT 'Estados', COUNT(*) FROM states
UNION ALL SELECT 'Ciudades', COUNT(*) FROM cities
UNION ALL SELECT 'Especialidades', COUNT(*) FROM specialties
UNION ALL SELECT 'Clínicas', COUNT(*) FROM clinics
UNION ALL SELECT 'Citas', COUNT(*) FROM appointments;

-- Ver clínicas creadas
SELECT clinic_id, clinic_name, clinic_city_id, is_open
FROM clinics;

-- Ver doctores y sus especialidades
SELECT
    u.first_name,
    u.first_last_name,
    u.user_email_address,
    s.specialty_name
FROM users u
JOIN doctor_specialties ds ON u.user_id = ds.doctor_id
JOIN specialties s ON ds.specialty_id = s.specialty_id;
```

**Resultados esperados:**
- Usuarios: 10
- Países: 5
- Estados: 20
- Ciudades: 20
- Especialidades: 12
- Clínicas: 10
- Citas: 25

---

## 📁 Estructura de Archivos

```
Backend-MedAgenda/
├── MedAgenda.sql                    # Paso 1: Crear tablas
├── create_admin_users.sh            # Paso 2: Crear usuarios
├── populate_database.sql            # Paso 3: Poblar datos
├── clear_all_tables.sql             # Limpia datos (mantiene estructura)
├── migration_add_user_fields.sql    # Migración para tablas existentes
└── DATABASE_SETUP.md                # Este archivo
```

---

## 🔄 Para Reiniciar desde Cero

Si necesitas empezar de nuevo:

```bash
# 1. Eliminar la base de datos
mysql -u root -p -e "DROP DATABASE IF EXISTS MedAgenda;"

# 2. Volver a ejecutar los 3 pasos
mysql -u root -p < MedAgenda.sql
./create_admin_users.sh
mysql -u root -p MedAgenda < populate_database.sql
```

---

## 🧪 Probar la Aplicación

### 1. Iniciar sesión como doctor:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "user_email_address": "carlos.martinez@cardiosalud.com",
    "password": "12345678"
  }'
```

Guarda el `access_token` del response.

### 2. Ver perfil del doctor:

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <tu_token>"
```

### 3. Ver citas de un paciente:

Primero crea un usuario paciente o usa uno existente (user_id 11-20 en el populate).

```bash
curl -X GET http://localhost:3000/appointments/patient \
  -H "Authorization: Bearer <token_del_paciente>"
```

---

## 🎨 Datos de Ejemplo Incluidos

### Países y Ciudades:
- 🇨🇴 **Colombia**: Medellín, Bogotá, Cali, Barranquilla, Bucaramanga, etc.
- 🇻🇪 **Venezuela**: Caracas, Maracaibo, Valencia, etc.
- 🇪🇨 Ecuador, 🇵🇪 Perú, 🇲🇽 México (sin ciudades aún)

### Clínicas:
1. **CardioSalud Medellín** - Cardiología
2. **NeuroCentro Bogotá** - Neurología
3. **Pediátrico Arcoíris** (Cali) - Pediatría
4. **Mujer Vital** (Barranquilla) - Ginecología
5. **DermaClinic** (Bucaramanga) - Dermatología
6. **Instituto Oncológico** (Cartagena) - Oncología
7. **Equilibrio Mental** (Manizales) - Psiquiatría
8. **VisiónClara** (Cúcuta) - Oftalmología
9. **Salud Auditiva CCS** (Caracas) - Otorrinolaringología
10. **TraumaClinic Zulia** (Maracaibo) - Traumatología

### Especialidades:
- Cardiología, Neurología, Pediatría, Ginecología
- Dermatología, Oncología, Psiquiatría, Oftalmología
- Otorrinolaringología, Traumatología, Medicina General, Urología

### Citas:
- **16 citas futuras** (del 10 al 19 de diciembre de 2025)
- **9 citas pasadas** (noviembre 2025)
- Pacientes con IDs 11-20

---

## 🛠️ Solución de Problemas

### Error: "Access denied for user"
```bash
# Verifica tu usuario y contraseña de MySQL
mysql -u root -p
```

### Error: "Database already exists"
```bash
# Elimina la base de datos existente primero
mysql -u root -p -e "DROP DATABASE MedAgenda;"
```

### Error: "Cannot connect to MySQL server"
```bash
# Asegúrate de que MySQL esté corriendo
sudo systemctl start mysql    # Linux
brew services start mysql      # macOS
```

### Error en create_admin_users.sh: "Connection refused"
```bash
# Verifica que el backend esté corriendo
cd Backend-MedAgenda
npm run start:dev
```

### Error: "Duplicate entry"
```bash
# Si ya existen datos, limpia primero
mysql -u root -p MedAgenda < clear_all_tables.sql
```

---

## 📝 Notas Importantes

1. **Contraseñas**: Todos los doctores tienen la contraseña `12345678` (solo para desarrollo)
2. **Citas**: Las citas de ejemplo tienen fechas fijas (diciembre 2025), actualízalas si es necesario
3. **Pacientes**: Los IDs 11-20 se asumen como pacientes, créalos según necesites
4. **Producción**: NO uses estos scripts en producción sin cambiar las contraseñas

---

## 🎉 ¡Setup Completo!

Si todo funcionó correctamente, ahora tienes:
- ✅ Base de datos creada y poblada
- ✅ 10 doctores administradores
- ✅ 10 clínicas operativas
- ✅ Datos geográficos completos
- ✅ Especialidades médicas
- ✅ Citas de ejemplo

**¡Tu aplicación MedAgenda está lista para usar!** 🚀

---

## 📞 Soporte

Si encuentras problemas:
1. Verifica que completaste los 3 pasos en orden
2. Revisa los logs del backend: `npm run start:dev`
3. Verifica los logs de MySQL: `sudo tail -f /var/log/mysql/error.log`
4. Consulta la documentación adicional en `ENDPOINTS_IMPLEMENTED.md`
