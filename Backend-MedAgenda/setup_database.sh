#!/bin/bash

# ============================================
# SETUP AUTOMATIZADO DE BASE DE DATOS - MedAgenda
# Este script ejecuta los 3 pasos necesarios para configurar la base de datos
# ============================================

set -e  # Detener en caso de error

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_step() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# ============================================
# Inicio del script
# ============================================
clear
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════╗
║   MedAgenda - Database Setup Script      ║
║   Configuración Automática de BD         ║
╚═══════════════════════════════════════════╝
EOF
echo -e "${NC}"

# ============================================
# Verificar prerrequisitos
# ============================================
print_step "Verificando prerrequisitos..."

# Verificar MySQL
if ! command -v mysql &> /dev/null; then
    print_error "MySQL no está instalado o no está en el PATH"
    exit 1
fi
print_success "MySQL encontrado"

# Verificar archivos necesarios
if [ ! -f "MedAgenda.sql" ]; then
    print_error "No se encontró MedAgenda.sql"
    exit 1
fi

if [ ! -f "create_admin_users.sh" ]; then
    print_error "No se encontró create_admin_users.sh"
    exit 1
fi

if [ ! -f "populate_database.sql" ]; then
    print_error "No se encontró populate_database.sql"
    exit 1
fi

print_success "Todos los archivos necesarios encontrados"

# ============================================
# Solicitar credenciales de MySQL
# ============================================
echo ""
print_info "Por favor ingresa tus credenciales de MySQL:"
read -p "Usuario MySQL (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "Contraseña MySQL: " MYSQL_PASS
echo ""

# Verificar conexión
if ! mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" -e "SELECT 1;" &> /dev/null; then
    print_error "No se pudo conectar a MySQL. Verifica tus credenciales."
    exit 1
fi
print_success "Conexión a MySQL exitosa"

# ============================================
# Preguntar si desea eliminar base de datos existente
# ============================================
echo ""
if mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" -e "USE MedAgenda;" &> /dev/null; then
    print_info "La base de datos 'MedAgenda' ya existe."
    read -p "¿Deseas eliminarla y crear una nueva? (s/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        print_info "Eliminando base de datos existente..."
        mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" -e "DROP DATABASE MedAgenda;"
        print_success "Base de datos eliminada"
    else
        print_error "Setup cancelado por el usuario"
        exit 0
    fi
fi

# ============================================
# PASO 1: Crear las tablas
# ============================================
echo ""
print_step "PASO 1/3: Creando estructura de base de datos..."
print_info "Ejecutando MedAgenda.sql..."

if mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" < MedAgenda.sql; then
    print_success "Tablas creadas exitosamente"
else
    print_error "Error al crear las tablas"
    exit 1
fi

# ============================================
# PASO 2: Crear usuarios administrativos
# ============================================
echo ""
print_step "PASO 2/3: Creando usuarios administrativos..."
print_info "Verificando que el backend esté corriendo..."

# Verificar si el backend está corriendo
API_URL="http://localhost:3000"
if ! curl -s "$API_URL" > /dev/null 2>&1; then
    print_error "El backend no está corriendo en $API_URL"
    print_info "Por favor inicia el backend con: npm run start:dev"
    read -p "Presiona Enter cuando el backend esté corriendo..."
fi

# Verificar nuevamente
if ! curl -s "$API_URL" > /dev/null 2>&1; then
    print_error "Aún no se puede conectar al backend"
    exit 1
fi
print_success "Backend encontrado en $API_URL"

print_info "Creando 10 usuarios doctores..."
chmod +x create_admin_users.sh

# Ejecutar script de creación de usuarios sin mostrar output excesivo
if ./create_admin_users.sh > /tmp/medagenda_users.log 2>&1; then
    print_success "10 usuarios creados exitosamente"
    print_info "Contraseña para todos: 12345678"
else
    print_error "Error al crear usuarios. Ver log: /tmp/medagenda_users.log"
    exit 1
fi

# ============================================
# PASO 3: Poblar la base de datos
# ============================================
echo ""
print_step "PASO 3/3: Poblando base de datos con datos de ejemplo..."
print_info "Insertando países, ciudades, especialidades, clínicas y citas..."

if mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" MedAgenda < populate_database.sql; then
    print_success "Base de datos poblada exitosamente"
else
    print_error "Error al poblar la base de datos"
    exit 1
fi

# ============================================
# Verificación final
# ============================================
echo ""
print_step "Verificando instalación..."

VERIFICATION=$(mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" MedAgenda -N -B -e "
SELECT CONCAT(
    'Usuarios: ', (SELECT COUNT(*) FROM users),
    ' | Clínicas: ', (SELECT COUNT(*) FROM clinics),
    ' | Citas: ', (SELECT COUNT(*) FROM appointments)
);
")

print_success "Verificación completa: $VERIFICATION"

# ============================================
# Resumen final
# ============================================
echo ""
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════╗
║        🎉 ¡Setup Completado! 🎉          ║
╚═══════════════════════════════════════════╝
EOF
echo -e "${NC}"

print_success "Base de datos MedAgenda configurada correctamente"
echo ""
echo -e "${YELLOW}📊 Datos creados:${NC}"
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" MedAgenda -e "
SELECT 'Usuarios' AS Tabla, COUNT(*) AS Total FROM users
UNION ALL SELECT 'Países', COUNT(*) FROM countries
UNION ALL SELECT 'Estados', COUNT(*) FROM states
UNION ALL SELECT 'Ciudades', COUNT(*) FROM cities
UNION ALL SELECT 'Especialidades', COUNT(*) FROM specialties
UNION ALL SELECT 'Clínicas', COUNT(*) FROM clinics
UNION ALL SELECT 'Citas', COUNT(*) FROM appointments;" 2>/dev/null | grep -v "mysql: \[Warning\]"

echo ""
echo -e "${YELLOW}👨‍⚕️ Usuarios creados (contraseña: 12345678):${NC}"
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" MedAgenda -N -B -e "
SELECT CONCAT(first_name, ' ', first_last_name, ' - ', user_email_address)
FROM users
ORDER BY user_id
LIMIT 10;" 2>/dev/null | nl

echo ""
print_info "Para probar la aplicación:"
echo "  1. Inicia sesión con cualquier email de arriba"
echo "  2. Contraseña: 12345678"
echo "  3. API: http://localhost:3000"
echo ""
print_success "¡MedAgenda está listo para usar!"
