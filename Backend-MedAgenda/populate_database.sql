USE MedAgenda;

-- ============================================
-- SCRIPT DE POBLACIÓN DE BASE DE DATOS
-- Este script debe ejecutarse DESPUÉS de crear los usuarios con create_admin_users.sh
-- ============================================

-- ============================================
-- 1. PAÍSES (COUNTRIES)
-- ============================================
INSERT INTO countries (country_name) VALUES
('Colombia'),
('Venezuela'),
('Ecuador'),
('Perú'),
('México');

-- ============================================
-- 2. ESTADOS/DEPARTAMENTOS (STATES)
-- ============================================

-- Colombia
INSERT INTO states (state_name, country_id) VALUES
('Antioquia', 1),
('Cundinamarca', 1),
('Valle del Cauca', 1),
('Atlántico', 1),
('Santander', 1),
('Bolívar', 1),
('Caldas', 1),
('Norte de Santander', 1),
('Risaralda', 1),
('Quindío', 1);

-- Venezuela
INSERT INTO states (state_name, country_id) VALUES
('Distrito Capital', 2),
('Zulia', 2),
('Carabobo', 2),
('Miranda', 2),
('Lara', 2),
('Aragua', 2),
('Bolívar', 2),
('Táchira', 2),
('Anzoátegui', 2),
('Mérida', 2);

-- ============================================
-- 3. CIUDADES (CITIES)
-- ============================================

-- Ciudades de Colombia
INSERT INTO cities (city_name, state_id) VALUES
('Medellín', 1),
('Bogotá', 2),
('Cali', 3),
('Barranquilla', 4),
('Bucaramanga', 5),
('Cartagena', 6),
('Manizales', 7),
('Cúcuta', 8),
('Pereira', 9),
('Armenia', 10);

-- Ciudades de Venezuela
INSERT INTO cities (city_name, state_id) VALUES
('Caracas', 11),
('Maracaibo', 12),
('Valencia', 13),
('Los Teques', 14),
('Barquisimeto', 15),
('Maracay', 16),
('Ciudad Guayana', 17),
('San Cristóbal', 18),
('Barcelona', 19),
('Mérida', 20);

-- ============================================
-- 4. ESPECIALIDADES MÉDICAS (SPECIALTIES)
-- ============================================
INSERT INTO specialties (specialty_name, specialty_description) VALUES
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio.'),
('Neurología', 'Estudio y tratamiento de trastornos del sistema nervioso central y periférico.'),
('Pediatría', 'Atención médica integral a niños, desde el nacimiento hasta la adolescencia.'),
('Ginecología', 'Salud del sistema reproductor femenino y atención ginecológica general.'),
('Dermatología', 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.'),
('Oncología', 'Prevención, diagnóstico y tratamiento del cáncer.'),
('Psiquiatría', 'Diagnóstico y tratamiento de trastornos mentales y emocionales.'),
('Oftalmología', 'Estudio y tratamiento de enfermedades de los ojos y la visión.'),
('Otorrinolaringología', 'Tratamiento de enfermedades del oído, nariz y garganta.'),
('Traumatología', 'Diagnóstico y tratamiento de lesiones y enfermedades del sistema musculoesquelético.'),
('Medicina General', 'Atención médica integral y diagnóstico de condiciones de salud generales.'),
('Urología', 'Diagnóstico y tratamiento de enfermedades del sistema urinario y reproductor masculino.');

-- ============================================
-- 5. CLÍNICAS
-- ============================================

-- Clínica 1: CardioSalud - Medellín
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'CardioSalud Medellín', TRUE, '+573001234567',
    '07:00', '12:00', '18:00',
    '60', '30',
    1, 'Calle 10 #43-12, El Poblado',
    'Centro especializado en cardiología con tecnología de punta. Contamos con 15 años de experiencia en diagnóstico y tratamiento de enfermedades cardiovasculares.',
    1
);

-- Clínica 2: NeuroCentro - Bogotá
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'NeuroCentro Bogotá', TRUE, '+573109876543',
    '08:00', '13:00', '19:00',
    '60', '45',
    2, 'Carrera 15 #93-40, Chicó',
    'Clínica especializada en neurología y neurocirugía. Ofrecemos servicios de diagnóstico avanzado con resonancia magnética 3T y electroencefalografía digital.',
    2
);

-- Clínica 3: Centro Pediátrico Arcoíris - Cali
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'Pediátrico Arcoíris', TRUE, '+573201122334',
    '07:30', '12:30', '17:30',
    '60', '20',
    3, 'Avenida 6N #23-45, Granada',
    'Centro pediátrico integral con atención desde recién nacidos hasta adolescentes. Ambiente cálido y amigable para los niños.',
    3
);

-- Clínica 4: Mujer Vital - Barranquilla
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'Mujer Vital', TRUE, '+573155544332',
    '08:00', '12:00', '17:00',
    '60', '30',
    4, 'Calle 98 #52-165, Riomar',
    'Clínica dedicada a la salud integral de la mujer. Ginecología, obstetricia, planificación familiar y medicina estética.',
    4
);

-- Clínica 5: DermaClinic - Bucaramanga
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'DermaClinic', TRUE, '+573187776655',
    '09:00', '13:00', '18:00',
    '60', '25',
    5, 'Carrera 27 #42-27, Cabecera',
    'Centro dermatológico con tratamientos médicos y estéticos. Láser, crioterapia, y procedimientos cosméticos avanzados.',
    5
);

-- Clínica 6: Instituto Oncológico - Cartagena
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'Instituto Oncológico', TRUE, '+573144455566',
    '07:00', '12:00', '16:00',
    '60', '60',
    6, 'Avenida Pedro de Heredia',
    'Instituto especializado en oncología médica y radioterapia. Tratamiento integral del cáncer con equipo multidisciplinario.',
    6
);

-- Clínica 7: Equilibrio Mental - Manizales
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'Equilibrio Mental', TRUE, '+573122233344',
    '08:00', '12:00', '18:00',
    '60', '50',
    7, 'Calle 65 #23-45, Milán',
    'Centro especializado en psiquiatría y psicología clínica. Atención a trastornos de ansiedad, depresión, y adicciones.',
    7
);

-- Clínica 8: VisiónClara - Cúcuta
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'VisiónClara', TRUE, '+573166677788',
    '08:30', '12:30', '17:30',
    '60', '30',
    8, 'Avenida 0 #11-56, Centro',
    'Clínica oftalmológica con cirugía láser, tratamiento de cataratas, glaucoma y servicios de optometría.',
    8
);

-- Clínica 9: Salud Auditiva CCS - Caracas
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'Salud Auditiva CCS', TRUE, '+582129998877',
    '09:00', '13:00', '18:00',
    '60', '30',
    11, 'Av. Francisco de Miranda',
    'Centro especializado en otorrinolaringología. Tratamiento de problemas auditivos, nasales y de garganta.',
    9
);

-- Clínica 10: TraumaClinic Zulia - Maracaibo
INSERT INTO clinics (
    clinic_name, is_open, clinic_phone_number,
    clinic_opening_time, clinic_break_time, clinic_close_time,
    clinic_break_duration, clinic_average_appointment_time,
    clinic_city_id, clinic_address, clinic_description, clinic_owner
) VALUES (
    'TraumaClinic Zulia', TRUE, '+582615554433',
    '07:00', '12:00', '19:00',
    '60', '40',
    12, 'Calle 72 con Av. 3E',
    'Clínica de traumatología y ortopedia. Especialistas en lesiones deportivas, fracturas y cirugía de columna.',
    10
);

-- ============================================
-- 6. MIEMBROS DE CLÍNICAS (CLINIC_MEMBERS)
-- ============================================

-- CardioSalud Medellín (clinic_id = 1)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(1, 1, 'Admin', 'Propietario y director médico de la clínica. Cardiólogo con 20 años de experiencia.');

-- NeuroCentro Bogotá (clinic_id = 2)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(2, 2, 'Admin', 'Director del centro neurológico y neurólogo clínico senior.');

-- Centro Pediátrico Arcoíris (clinic_id = 3)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(3, 3, 'Admin', 'Directora y pediatra general con especialización en neonatología.');

-- Mujer Vital (clinic_id = 4)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(4, 4, 'Admin', 'Directora médica, ginecóloga obstetra con subespecialidad en medicina materno-fetal.');

-- DermaClinic (clinic_id = 5)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(5, 5, 'Admin', 'Dermatólogo propietario, especialista en dermatología clínica y estética.');

-- Instituto Oncológico (clinic_id = 6)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(6, 6, 'Admin', 'Director del instituto, oncólogo médico con especialización en tumores sólidos.');

-- Equilibrio Mental (clinic_id = 7)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(7, 7, 'Admin', 'Psiquiatra director, especialista en trastornos del ánimo y ansiedad.');

-- VisiónClara (clinic_id = 8)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(8, 8, 'Admin', 'Oftalmólogo director, cirujano de segmento anterior y cataratas.');

-- Salud Auditiva CCS (clinic_id = 9)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(9, 9, 'Admin', 'Otorrinolaringólogo director, cirugía de nariz y senos paranasales.');

-- TraumaClinic Zulia (clinic_id = 10)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(10, 10, 'Admin', 'Traumatólogo ortopedista director, cirugía de rodilla y hombro.');

-- ============================================
-- 7. ESPECIALIDADES DE LOS DOCTORES (DOCTOR_SPECIALTIES)
-- ============================================
INSERT INTO doctor_specialties (doctor_id, specialty_id) VALUES
(1, 1),  -- Dr. Carlos: Cardiología
(2, 2),  -- Dra. María: Neurología
(3, 3),  -- Dra. Ana: Pediatría
(4, 4),  -- Dra. Sofía: Ginecología
(5, 5),  -- Dr. Jorge: Dermatología
(6, 6),  -- Dr. Ricardo: Oncología
(7, 7),  -- Dra. Laura: Psiquiatría
(8, 8),  -- Dr. Fernando: Oftalmología
(9, 9),  -- Dr. Gabriel: Otorrinolaringología
(10, 10); -- Dr. Miguel: Traumatología

-- ============================================
-- 8. ESPECIALIDADES DE LAS CLÍNICAS (CLINIC_SPECIALTIES)
-- ============================================
INSERT INTO clinic_specialties (clinic_id, specialty_id) VALUES
(1, 1),   -- CardioSalud: Cardiología
(1, 11),  -- CardioSalud: Medicina General
(2, 2),   -- NeuroCentro: Neurología
(2, 11),  -- NeuroCentro: Medicina General
(3, 3),   -- Pediátrico Arcoíris: Pediatría
(3, 11),  -- Pediátrico Arcoíris: Medicina General
(4, 4),   -- Mujer Vital: Ginecología
(4, 11),  -- Mujer Vital: Medicina General
(5, 5),   -- DermaClinic: Dermatología
(6, 6),   -- Instituto Oncológico: Oncología
(6, 11),  -- Instituto Oncológico: Medicina General
(7, 7),   -- Equilibrio Mental: Psiquiatría
(8, 8),   -- VisiónClara: Oftalmología
(9, 9),   -- Salud Auditiva: Otorrinolaringología
(10, 10), -- TraumaClinic: Traumatología
(10, 11); -- TraumaClinic: Medicina General

-- ============================================
-- 9. CITAS DE EJEMPLO (APPOINTMENTS)
-- Nota: Necesitarás crear algunos usuarios pacientes primero
-- Para este ejemplo, asumiremos que hay usuarios con IDs 11-20 como pacientes
-- ============================================

-- Citas futuras (próximos días)
INSERT INTO appointments (clinic_id, patient_id, doctor_id, scheduled_time_date, appointment_description) VALUES
(1, 11, 1, '2025-12-10 09:00:00', 'Control cardiológico de rutina'),
(1, 12, 1, '2025-12-10 09:30:00', 'Evaluación de presión arterial elevada'),
(1, 13, 1, '2025-12-10 10:00:00', 'Seguimiento post-operatorio'),
(2, 14, 2, '2025-12-11 10:00:00', 'Evaluación de migrañas crónicas'),
(2, 15, 2, '2025-12-11 10:45:00', 'Consulta por mareos y vértigo'),
(3, 16, 3, '2025-12-12 08:00:00', 'Control de crecimiento y desarrollo infantil'),
(3, 17, 3, '2025-12-12 08:20:00', 'Vacunación esquema completo'),
(4, 18, 4, '2025-12-13 09:00:00', 'Control prenatal primer trimestre'),
(4, 19, 4, '2025-12-13 09:30:00', 'Consulta ginecológica anual'),
(5, 20, 5, '2025-12-14 10:00:00', 'Tratamiento de acné'),
(5, 11, 5, '2025-12-14 10:25:00', 'Evaluación de lunares y manchas'),
(6, 12, 6, '2025-12-15 08:00:00', 'Consulta oncológica inicial'),
(7, 13, 7, '2025-12-16 11:00:00', 'Terapia para ansiedad y depresión'),
(8, 14, 8, '2025-12-17 09:00:00', 'Examen de la vista y graduación de lentes'),
(9, 15, 9, '2025-12-18 10:00:00', 'Evaluación de pérdida auditiva'),
(10, 16, 10, '2025-12-19 08:00:00', 'Evaluación de dolor de rodilla');

-- Citas pasadas (para historial)
INSERT INTO appointments (clinic_id, patient_id, doctor_id, scheduled_time_date, appointment_description) VALUES
(1, 11, 1, '2025-11-15 09:00:00', 'Electrocardiograma de rutina'),
(1, 12, 1, '2025-11-20 10:00:00', 'Consulta por dolor en el pecho'),
(2, 14, 2, '2025-11-10 11:00:00', 'Evaluación neurológica inicial'),
(3, 16, 3, '2025-11-05 08:30:00', 'Control de peso y talla'),
(4, 18, 4, '2025-10-25 09:00:00', 'Ecografía obstétrica'),
(5, 20, 5, '2025-11-12 10:00:00', 'Primera consulta dermatológica'),
(7, 13, 7, '2025-11-18 14:00:00', 'Evaluación psiquiátrica inicial'),
(8, 14, 8, '2025-10-30 09:30:00', 'Control post-cirugía de cataratas'),
(10, 16, 10, '2025-11-08 08:00:00', 'Radiografía de rodilla');

-- ============================================
-- MENSAJE DE CONFIRMACIÓN
-- ============================================
SELECT '✅ Base de datos poblada exitosamente!' AS Resultado;
SELECT 'Total de países:' AS Info, COUNT(*) AS Cantidad FROM countries
UNION ALL
SELECT 'Total de estados:', COUNT(*) FROM states
UNION ALL
SELECT 'Total de ciudades:', COUNT(*) FROM cities
UNION ALL
SELECT 'Total de especialidades:', COUNT(*) FROM specialties
UNION ALL
SELECT 'Total de clínicas:', COUNT(*) FROM clinics
UNION ALL
SELECT 'Total de miembros de clínicas:', COUNT(*) FROM clinic_members
UNION ALL
SELECT 'Total de citas:', COUNT(*) FROM appointments;
