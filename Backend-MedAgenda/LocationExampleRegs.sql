USE MedAgenda;

-- País
INSERT INTO countries (country_name) VALUES ('Colombia');

-- Departamentos (States)
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

-- Ciudades principales
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


-- País
INSERT INTO countries (country_name) VALUES ('Venezuela');

-- Estados (States)
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

-- Ciudades principales
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
