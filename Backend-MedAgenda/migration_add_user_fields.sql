USE MedAgenda;

-- ============================================
-- MIGRACION: Agregar nuevos campos a la tabla users
-- Este script modifica la tabla users existente sin perder datos
-- ============================================

-- Modificar longitudes de campos existentes
ALTER TABLE users
    MODIFY COLUMN first_name VARCHAR(50) NOT NULL,
    MODIFY COLUMN second_name VARCHAR(50),
    MODIFY COLUMN first_last_name VARCHAR(50) NOT NULL,
    MODIFY COLUMN second_last_name VARCHAR(50) NOT NULL,
    MODIFY COLUMN legal_id VARCHAR(15) NOT NULL UNIQUE,
    MODIFY COLUMN user_phone_number VARCHAR(20) NOT NULL;

-- Agregar nuevos campos opcionales
ALTER TABLE users
    ADD COLUMN birth_date DATE AFTER user_email_address,
    ADD COLUMN gender ENUM('M', 'F', 'O') AFTER birth_date,
    ADD COLUMN address VARCHAR(255) AFTER gender,
    ADD COLUMN city VARCHAR(100) AFTER address,
    ADD COLUMN state VARCHAR(100) AFTER city,
    ADD COLUMN country VARCHAR(100) AFTER state,
    ADD COLUMN emergency_contact_name VARCHAR(100) AFTER country,
    ADD COLUMN emergency_contact_phone VARCHAR(20) AFTER emergency_contact_name,
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER emergency_contact_phone,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Mensaje de confirmación
SELECT 'Migración completada: Nuevos campos agregados a la tabla users' AS Resultado;
