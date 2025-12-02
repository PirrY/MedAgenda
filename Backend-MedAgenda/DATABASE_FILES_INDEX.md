# 📁 Índice de Archivos de Base de Datos - MedAgenda

## 🎯 Para Setup Inicial (Usa estos)

### **Opción A: Automático (Recomendado)**
| Archivo | Descripción | Comando |
|---------|-------------|---------|
| `setup_database.sh` | **Script automático todo-en-uno** | `./setup_database.sh` |
| `QUICK_START.md` | Guía rápida de setup | Ver archivo |

### **Opción B: Manual (Paso a paso)**
| Orden | Archivo | Descripción | Comando |
|-------|---------|-------------|---------|
| 1️⃣ | `MedAgenda.sql` | Crear tablas | `mysql -u root -p < MedAgenda.sql` |
| 2️⃣ | `create_admin_users.sh` | Crear usuarios | `./create_admin_users.sh` |
| 3️⃣ | `populate_database.sql` | Poblar datos | `mysql -u root -p MedAgenda < populate_database.sql` |

---

## 📚 Documentación

| Archivo | Contenido |
|---------|-----------|
| `DATABASE_SETUP.md` | **Guía completa de setup** - Instrucciones detalladas paso a paso |
| `QUICK_START.md` | **Guía rápida** - Setup en 1 comando |
| `ENDPOINTS_IMPLEMENTED.md` | Documentación de endpoints REST API |
| `UPDATED_FIELDS_DOCUMENTATION.md` | Documentación de campos de usuario |
| `DATABASE_FILES_INDEX.md` | Este archivo - Índice de todos los archivos |

---

## 🔧 Scripts de Utilidad

| Archivo | Propósito | Cuándo Usar |
|---------|-----------|-------------|
| `clear_all_tables.sql` | Limpia todos los datos (mantiene tablas) | Para resetear datos sin recrear estructura |
| `migration_add_user_fields.sql` | Migración para bases existentes | Si ya tienes una BD y quieres agregar campos nuevos |

---

## 📊 Scripts de Datos (No usar directamente)

Estos archivos están incluidos en `populate_database.sql`, no necesitas ejecutarlos por separado:

| Archivo | Contenido | Nota |
|---------|-----------|------|
| `LocationExampleRegs.sql` | Países, estados, ciudades | ⚠️ Obsoleto, usar `populate_database.sql` |
| `SpecialtyExampleRegs.sql` | Especialidades médicas | ⚠️ Obsoleto, usar `populate_database.sql` |
| `ClinicsAndMembers.sql` | Clínicas y miembros (necesita 42 usuarios) | ⚠️ Obsoleto, usar `populate_database.sql` |

---

## 🗂️ Archivos por Categoría

### **Setup Inicial**
```
setup_database.sh           ← Script automático (RECOMENDADO)
MedAgenda.sql              ← Paso 1: Crear tablas
create_admin_users.sh      ← Paso 2: Crear usuarios
populate_database.sql      ← Paso 3: Poblar datos
```

### **Documentación**
```
DATABASE_SETUP.md          ← Guía completa
QUICK_START.md             ← Guía rápida
ENDPOINTS_IMPLEMENTED.md   ← Docs de API
UPDATED_FIELDS_DOCUMENTATION.md
DATABASE_FILES_INDEX.md    ← Este archivo
```

### **Utilidades**
```
clear_all_tables.sql       ← Limpiar datos
migration_add_user_fields.sql ← Migración
```

---

## ⚡ Flujos de Trabajo Comunes

### 🆕 Primera Vez - Setup Completo
```bash
# Opción rápida (recomendada)
./setup_database.sh

# O paso a paso
mysql -u root -p < MedAgenda.sql
./create_admin_users.sh
mysql -u root -p MedAgenda < populate_database.sql
```

### 🔄 Resetear Todo desde Cero
```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS MedAgenda;"
./setup_database.sh
```

### 🧹 Solo Limpiar Datos (mantener estructura)
```bash
mysql -u root -p MedAgenda < clear_all_tables.sql
./create_admin_users.sh
mysql -u root -p MedAgenda < populate_database.sql
```

### 📦 Migrar Base de Datos Existente
```bash
mysql -u root -p MedAgenda < migration_add_user_fields.sql
```

---

## 📋 Checklist de Setup

- [ ] MySQL instalado y corriendo
- [ ] Backend de MedAgenda instalado (`npm install`)
- [ ] Backend corriendo (`npm run start:dev`)
- [ ] Ejecutar `./setup_database.sh`
- [ ] Verificar que hay 10 usuarios
- [ ] Verificar que hay 10 clínicas
- [ ] Probar login con un usuario

---

## 💡 Tips

1. **Siempre usa `setup_database.sh`** para setup inicial - es más rápido y menos propenso a errores
2. **`QUICK_START.md`** tiene todo lo necesario para empezar rápido
3. **`DATABASE_SETUP.md`** tiene instrucciones detalladas si necesitas más información
4. Los archivos obsoletos (`LocationExampleRegs.sql`, etc.) pueden eliminarse

---

## 🆘 ¿Qué archivo usar?

| Quiero... | Usa este archivo |
|-----------|------------------|
| Configurar todo rápido | `setup_database.sh` |
| Entender cada paso | `DATABASE_SETUP.md` |
| Ver comandos rápidos | `QUICK_START.md` |
| Limpiar y empezar de nuevo | `clear_all_tables.sql` + setup |
| Migrar BD existente | `migration_add_user_fields.sql` |
| Ver endpoints de API | `ENDPOINTS_IMPLEMENTED.md` |
| Crear solo las tablas | `MedAgenda.sql` |

---

**Última actualización:** Diciembre 2025
