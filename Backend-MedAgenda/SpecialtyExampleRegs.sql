USE MedAgenda;

-- Especialidades médicas
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
('Traumatología y Ortopedia', 'Diagnóstico y tratamiento de lesiones y enfermedades del sistema musculoesquelético.');


SELECT c.clinic_id, clinic_name, is_open, clinic_phone_number, clinic_city_id, clinic_address, clinic_description FROM clinics c JOIN clinic_specialties cs ON c.clinic_id = cs.clinic_id JOIN cities ct ON c.clinic_city_id = ct.city_id JOIN states s ON ct.state_id = s.state_id WHERE cs.specialty_id IN(1) AND s.country_id = 1;