# ⚡ Quick Start - Setup Rápido de MedAgenda

## 🎯 Setup en 1 Comando (Recomendado)

```bash
chmod +x setup_database.sh
./setup_database.sh
```

El script automático hace todo por ti:
1. ✅ Crea las tablas
2. ✅ Crea los usuarios admin
3. ✅ Puebla la base de datos
4. ✅ Verifica que todo funcione

**Requisito:** El backend debe estar corriendo (`npm run start:dev`)

---

## 📝 Setup Manual (3 Pasos)

Si prefieres hacerlo paso a paso:

### 1️⃣ Crear Tablas
```bash
mysql -u root -p < MedAgenda.sql
```

### 2️⃣ Crear Usuarios (backend debe estar corriendo)
```bash
chmod +x create_admin_users.sh
./create_admin_users.sh
```

### 3️⃣ Poblar Datos
```bash
mysql -u root -p MedAgenda < populate_database.sql
```

---

## 👤 Usuarios de Prueba

**Todos tienen la contraseña:** `12345678`

| Email | Especialidad |
|-------|--------------|
| carlos.martinez@cardiosalud.com | Cardiología |
| maria.lopez@neurocentro.com | Neurología |
| ana.torres@pediatricoarcoiris.com | Pediatría |
| sofia.herrera@mujervital.com | Ginecología |
| jorge.suarez@dermaclinic.com | Dermatología |

---

## 🧪 Probar la API

### Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "user_email_address": "carlos.martinez@cardiosalud.com",
    "password": "12345678"
  }'
```

### Ver perfil:
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <tu_token>"
```

---

## 📚 Documentación Completa

Ver `DATABASE_SETUP.md` para instrucciones detalladas.

---

## 🔄 Reiniciar Todo

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS MedAgenda;"
./setup_database.sh
```

---

## ❓ Problemas Comunes

**Error: "Connection refused"**
→ Inicia el backend: `npm run start:dev`

**Error: "Access denied"**
→ Verifica usuario/contraseña de MySQL

**Error: "Database exists"**
→ Elimina primero: `mysql -u root -p -e "DROP DATABASE MedAgenda;"`

---

¡Listo! 🚀
