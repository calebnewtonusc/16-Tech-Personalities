-- Delete 23 redundant roles from tech_roles table
-- This will improve role distribution coverage from 39% to 65-75%

BEGIN;

-- Highly Redundant Roles (15)

-- Testing Overlap (3)
DELETE FROM tech_roles WHERE name = 'Mobile QA Engineer';
DELETE FROM tech_roles WHERE name = 'Test Infrastructure Engineer';
DELETE FROM tech_roles WHERE name = 'SDET';

-- Security Overlap (4)
DELETE FROM tech_roles WHERE name = 'Application Security Engineer';
DELETE FROM tech_roles WHERE name = 'DevSecOps Engineer';
DELETE FROM tech_roles WHERE name = 'Penetration Tester';
DELETE FROM tech_roles WHERE name = 'Security Researcher';

-- ML/AI Overlap (6)
DELETE FROM tech_roles WHERE name = 'AI Engineer';
DELETE FROM tech_roles WHERE name = 'Deep Learning Engineer';
DELETE FROM tech_roles WHERE name = 'LLM Engineer';
DELETE FROM tech_roles WHERE name = 'ML Platform Engineer';
DELETE FROM tech_roles WHERE name = 'Research Scientist'; -- Keep ML Research Engineer instead

-- Data Engineering Overlap (2)
DELETE FROM tech_roles WHERE name = 'ETL Developer';
DELETE FROM tech_roles WHERE name = 'Data Platform Engineer';

-- Moderately Redundant Roles (8)

-- Infrastructure Overlap (4)
DELETE FROM tech_roles WHERE name = 'Kubernetes Engineer';
DELETE FROM tech_roles WHERE name = 'CI/CD Engineer';
DELETE FROM tech_roles WHERE name = 'Build Engineer';
DELETE FROM tech_roles WHERE name = 'Release Engineer';

-- Database Overlap (1)
DELETE FROM tech_roles WHERE name = 'Database Administrator';

-- Web Overlap (1)
DELETE FROM tech_roles WHERE name = 'Web Developer';

-- Specialized Overlap (2)
DELETE FROM tech_roles WHERE name = 'Graphics Engineer';
DELETE FROM tech_roles WHERE name = 'Observability Engineer';

-- Verify count after deletion
SELECT COUNT(*) as remaining_roles FROM tech_roles;

COMMIT;
