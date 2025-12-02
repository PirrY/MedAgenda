USE MedAgenda;

-- ============================================
-- SCRIPT PARA LIMPIAR TODAS LAS TABLAS
-- Este script borra todas las entradas pero mantiene la estructura
-- ============================================

-- IMPORTANTE: Desactivar las restricciones de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas en orden (de menos a más dependencias)
TRUNCATE TABLE absences;
TRUNCATE TABLE clinic_specialties;
TRUNCATE TABLE doctor_specialties;
TRUNCATE TABLE appointments;
TRUNCATE TABLE clinic_members;
TRUNCATE TABLE clinics;
TRUNCATE TABLE specialties;
TRUNCATE TABLE cities;
TRUNCATE TABLE states;
TRUNCATE TABLE countries;
TRUNCATE TABLE users;

-- Reactivar las restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Mensaje de confirmación
SELECT 'Todas las tablas han sido limpiadas exitosamente' AS Resultado;
