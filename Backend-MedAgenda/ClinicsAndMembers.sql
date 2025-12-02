USE MedAgenda;

-- ============================================
-- PAÍSES (COUNTRIES)
-- ============================================
INSERT INTO countries (country_name) VALUES
('Colombia'),
('Venezuela'),
('Ecuador'),
('Perú'),
('México');

-- ============================================
-- CLÍNICAS EN COLOMBIA
-- ============================================

-- Clínica CardioSalud - Medellín (Antioquia)
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

-- Clínica NeuroCentro - Bogotá (Cundinamarca)
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

-- Centro Pediátrico Arcoíris - Cali (Valle del Cauca)
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

-- Clínica Ginecológica Mujer Vital - Barranquilla (Atlántico)
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

-- DermaClinic - Bucaramanga (Santander)
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

-- Instituto Oncológico del Caribe - Cartagena (Bolívar)
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

-- Centro de Salud Mental Equilibrio - Manizales (Caldas)
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

-- Clínica Oftalmológica VisiónClara - Cúcuta (Norte de Santander)
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

-- ============================================
-- CLÍNICAS EN VENEZUELA
-- ============================================

-- Centro ORL Salud Auditiva - Caracas (Distrito Capital)
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

-- TraumaClinic - Maracaibo (Zulia)
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
-- MIEMBROS DE LAS CLÍNICAS (CLINIC_MEMBERS)
-- ============================================

-- CardioSalud Medellín (clinic_id = 1)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(1, 1, 'Admin', 'Propietario y director médico de la clínica. Cardiólogo con 20 años de experiencia.'),
(1, 2, 'Doctor', 'Cardiólogo especialista en electrofisiología y arritmias cardíacas.'),
(1, 3, 'Doctor', 'Cardióloga intervencionista, especialista en cateterismos y angioplastias.'),
(1, 4, 'Employee', 'Enfermera jefe de cardiología, coordina el equipo de enfermería y procedimientos.'),
(1, 5, 'Employee', 'Recepcionista y coordinadora de citas médicas.');

-- NeuroCentro Bogotá (clinic_id = 2)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(2, 2, 'Admin', 'Director del centro neurológico y neurólogo clínico senior.'),
(2, 6, 'Doctor', 'Neurocirujano especializado en cirugía de columna y tumores cerebrales.'),
(2, 7, 'Doctor', 'Neuróloga pediatra, atiende casos de epilepsia infantil y trastornos del desarrollo.'),
(2, 8, 'Doctor', 'Neurólogo especialista en enfermedades neurodegenerativas como Parkinson y Alzheimer.'),
(2, 9, 'Employee', 'Técnico en electroencefalografía y estudios neurofisiológicos.'),
(2, 10, 'Employee', 'Administradora de la clínica, gestión de recursos y personal.');

-- Centro Pediátrico Arcoíris (clinic_id = 3)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(3, 3, 'Admin', 'Directora y pediatra general con especialización en neonatología.'),
(3, 11, 'Doctor', 'Pediatra especializado en enfermedades respiratorias infantiles.'),
(3, 12, 'Doctor', 'Pediatra endocrinólogo, manejo de diabetes y trastornos de crecimiento.'),
(3, 13, 'Employee', 'Enfermera pediátrica con experiencia en vacunación y cuidados intensivos.'),
(3, 14, 'Employee', 'Auxiliar administrativo y atención al cliente.');

-- Clínica Ginecológica Mujer Vital (clinic_id = 4)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(4, 4, 'Admin', 'Directora médica, ginecóloga obstetra con subespecialidad en medicina materno-fetal.'),
(4, 15, 'Doctor', 'Ginecólogo oncólogo, especialista en cáncer ginecológico.'),
(4, 16, 'Doctor', 'Ginecóloga especializada en reproducción asistida y fertilidad.'),
(4, 17, 'Employee', 'Enfermera obstétrica, apoyo en partos y consultas prenatales.'),
(4, 18, 'Employee', 'Coordinadora de servicios y facturación.');

-- DermaClinic (clinic_id = 5)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(5, 5, 'Admin', 'Dermatólogo propietario, especialista en dermatología clínica y estética.'),
(5, 19, 'Doctor', 'Dermatóloga especializada en tratamientos láser y rejuvenecimiento facial.'),
(5, 20, 'Employee', 'Esteticista médica, realiza procedimientos cosméticos no quirúrgicos.'),
(5, 21, 'Employee', 'Asistente de consulta y gestión de historias clínicas.');

-- Instituto Oncológico del Caribe (clinic_id = 6)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(6, 6, 'Admin', 'Director del instituto, oncólogo médico con especialización en tumores sólidos.'),
(6, 22, 'Doctor', 'Radio-oncóloga, planificación y ejecución de radioterapia.'),
(6, 23, 'Doctor', 'Oncólogo hematólogo, especialista en leucemias y linfomas.'),
(6, 24, 'Doctor', 'Cirujano oncólogo, procedimientos quirúrgicos en cáncer.'),
(6, 25, 'Employee', 'Enfermera oncológica especializada en quimioterapia.'),
(6, 26, 'Employee', 'Psicóloga oncológica, apoyo emocional a pacientes y familias.');

-- Centro de Salud Mental Equilibrio (clinic_id = 7)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(7, 7, 'Admin', 'Psiquiatra director, especialista en trastornos del ánimo y ansiedad.'),
(7, 27, 'Doctor', 'Psiquiatra infantil y adolescente, manejo de TDAH y trastornos del espectro autista.'),
(7, 28, 'Doctor', 'Psicóloga clínica, terapia cognitivo-conductual y terapia de pareja.'),
(7, 29, 'Employee', 'Psicólogo, terapia grupal y programas de adicciones.'),
(7, 30, 'Employee', 'Trabajadora social, apoyo en casos de violencia y vulnerabilidad.');

-- Clínica Oftalmológica VisiónClara (clinic_id = 8)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(8, 8, 'Admin', 'Oftalmólogo director, cirujano de segmento anterior y cataratas.'),
(8, 31, 'Doctor', 'Oftalmóloga especialista en retina y vítreo, tratamiento de retinopatía diabética.'),
(8, 32, 'Doctor', 'Oftalmólogo pediatra, estrabismo y ambliopía en niños.'),
(8, 33, 'Employee', 'Optómetra, exámenes de refracción y adaptación de lentes de contacto.'),
(8, 34, 'Employee', 'Instrumentadora quirúrgica oftalmológica.');

-- Centro ORL Salud Auditiva (clinic_id = 9)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(9, 9, 'Admin', 'Otorrinolaringólogo director, cirugía de nariz y senos paranasales.'),
(9, 35, 'Doctor', 'ORL especialista en otología y cirugía de oído, implantes cocleares.'),
(9, 36, 'Doctor', 'ORL pediátrico, manejo de amigdalitis recurrente y problemas respiratorios.'),
(9, 37, 'Employee', 'Audiólogo, evaluación audiológica y adaptación de audífonos.'),
(9, 38, 'Employee', 'Fonoaudiólogo, terapia de lenguaje y deglución.');

-- TraumaClinic Zulia (clinic_id = 10)
INSERT INTO clinic_members (clinic_id, user_id, role_within_clinic, role_description) VALUES
(10, 10, 'Admin', 'Traumatólogo ortopedista director, cirugía de rodilla y hombro.'),
(10, 39, 'Doctor', 'Cirujano de columna, manejo de hernias discales y escoliosis.'),
(10, 40, 'Doctor', 'Traumatólogo deportivo, lesiones en atletas y medicina del deporte.'),
(10, 41, 'Employee', 'Fisioterapeuta especializado en rehabilitación ortopédica.'),
(10, 42, 'Employee', 'Técnico en yesos y férulas, inmovilizaciones.');

-- ============================================
-- NOTA: Este script asume que ya existen usuarios
-- con IDs del 1 al 42 en la tabla users.
-- Si no existen, primero debes insertar los usuarios.
-- ============================================
