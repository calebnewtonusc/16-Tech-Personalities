-- Tech 16 Role Scoring Weights
-- Maps each role to personality types with fit scores (0.0 to 1.0)
-- Based on Interface (U/S), Scope (E/O), Decision (V/L), Execution (A/T)

-- Helper: Get role_id by name
-- Use this pattern: (SELECT id FROM tech_roles WHERE name = 'Role Name')

-- FRONTEND ENGINEERING ROLES
-- Strong fit: U-E-V-A (Rapid Prototyper), U-O-V-A (Creative Developer), U-O-V-T (Professional Frontend)

-- Frontend Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Frontend Engineer'), 'B-U-E-V-A', 0.95),  -- Rapid Prototyper
((SELECT id FROM tech_roles WHERE name = 'Frontend Engineer'), 'B-U-O-V-A', 0.90),  -- Creative Developer
((SELECT id FROM tech_roles WHERE name = 'Frontend Engineer'), 'B-U-O-V-T', 0.92),  -- Professional Frontend
((SELECT id FROM tech_roles WHERE name = 'Frontend Engineer'), 'B-U-E-V-T', 0.85),  -- Product Innovator
((SELECT id FROM tech_roles WHERE name = 'Frontend Engineer'), 'B-S-E-V-A', 0.70);  -- System Innovator (full-stack)

-- Web Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Web Developer'), 'B-U-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Web Developer'), 'B-U-O-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Web Developer'), 'B-U-O-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Web Developer'), 'B-S-E-V-A', 0.75);  -- Full-stack lean

-- Design Systems Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Design Systems Engineer'), 'B-U-O-V-T', 0.98),  -- Professional Frontend
((SELECT id FROM tech_roles WHERE name = 'Design Systems Engineer'), 'B-U-E-V-T', 0.90),  -- Product Innovator
((SELECT id FROM tech_roles WHERE name = 'Design Systems Engineer'), 'B-U-O-V-A', 0.85),  -- Creative Developer
((SELECT id FROM tech_roles WHERE name = 'Design Systems Engineer'), 'B-U-E-V-A', 0.80);

-- Animation Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Animation Engineer'), 'B-U-O-V-A', 0.98),  -- Creative Developer (perfect fit)
((SELECT id FROM tech_roles WHERE name = 'Animation Engineer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Animation Engineer'), 'B-U-O-V-T', 0.82);

-- Accessibility Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Accessibility Engineer'), 'B-U-E-L-T', 0.95),  -- UX Scientist
((SELECT id FROM tech_roles WHERE name = 'Accessibility Engineer'), 'B-U-O-V-T', 0.88),  -- Professional Frontend
((SELECT id FROM tech_roles WHERE name = 'Accessibility Engineer'), 'B-U-O-L-T', 0.85);  -- Quality Guardian

-- Performance Engineer (Frontend)
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Performance Engineer'), 'B-U-O-L-A', 0.95),  -- Performance Optimizer
((SELECT id FROM tech_roles WHERE name = 'Performance Engineer'), 'B-U-E-L-A', 0.88),  -- Growth Hacker
((SELECT id FROM tech_roles WHERE name = 'Performance Engineer'), 'B-U-E-L-T', 0.82);

-- MOBILE ENGINEERING ROLES
-- Strong fit: U-E-V-T (Product Innovator), U-E-V-A (Rapid Prototyper)

-- Mobile Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Mobile Engineer'), 'B-U-E-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Mobile Engineer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Mobile Engineer'), 'B-U-O-V-T', 0.88);

-- iOS Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'iOS Engineer'), 'B-U-E-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'iOS Engineer'), 'B-U-O-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'iOS Engineer'), 'B-U-E-V-A', 0.88);

-- Android Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Android Engineer'), 'B-U-E-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Android Engineer'), 'B-U-O-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Android Engineer'), 'B-U-E-V-A', 0.88);

-- React Native Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'React Native Developer'), 'B-U-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'React Native Developer'), 'B-U-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'React Native Developer'), 'B-S-E-V-A', 0.78);  -- System Innovator

-- Flutter Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Flutter Developer'), 'B-U-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Flutter Developer'), 'B-U-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Flutter Developer'), 'B-U-O-V-A', 0.82);

-- Cross-Platform Mobile Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Cross-Platform Mobile Engineer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Cross-Platform Mobile Engineer'), 'B-U-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Cross-Platform Mobile Engineer'), 'B-S-E-V-A', 0.80);

-- BACKEND/SYSTEMS ENGINEERING ROLES
-- Strong fit: S-O-V-A (Backend Craftsperson), S-E-V-A (System Innovator), S-O-V-T (Reliability Engineer)

-- Backend Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Backend Engineer'), 'B-S-O-V-A', 0.95),  -- Backend Craftsperson
((SELECT id FROM tech_roles WHERE name = 'Backend Engineer'), 'B-S-E-V-A', 0.92),  -- System Innovator
((SELECT id FROM tech_roles WHERE name = 'Backend Engineer'), 'B-S-O-V-T', 0.88),  -- Reliability Engineer
((SELECT id FROM tech_roles WHERE name = 'Backend Engineer'), 'B-S-E-V-T', 0.85);  -- Platform Builder

-- Full Stack Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Full Stack Engineer'), 'B-S-E-V-A', 0.95),  -- System Innovator (perfect)
((SELECT id FROM tech_roles WHERE name = 'Full Stack Engineer'), 'B-U-E-V-A', 0.90),  -- Rapid Prototyper
((SELECT id FROM tech_roles WHERE name = 'Full Stack Engineer'), 'B-S-O-V-A', 0.85),
((SELECT id FROM tech_roles WHERE name = 'Full Stack Engineer'), 'B-U-E-V-T', 0.82);

-- API Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'API Engineer'), 'B-S-O-V-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'API Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'API Engineer'), 'B-S-O-V-T', 0.85);

-- Microservices Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Microservices Engineer'), 'B-S-O-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Microservices Engineer'), 'B-S-E-V-T', 0.90),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Microservices Engineer'), 'B-S-O-V-T', 0.88);

-- Distributed Systems Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Distributed Systems Engineer'), 'B-S-E-V-T', 0.95),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Distributed Systems Engineer'), 'B-S-E-L-T', 0.92),  -- Cloud Architect
((SELECT id FROM tech_roles WHERE name = 'Distributed Systems Engineer'), 'B-S-O-V-T', 0.88);  -- Reliability Engineer

-- Systems Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Systems Engineer'), 'B-S-O-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Systems Engineer'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Systems Engineer'), 'B-S-O-L-T', 0.85);

-- INFRASTRUCTURE/PLATFORM ROLES
-- Strong fit: S-E-V-T (Platform Builder), S-O-V-T (Reliability Engineer), S-E-L-T (Cloud Architect)

-- Platform Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Platform Engineer'), 'B-S-E-V-T', 0.98),  -- Platform Builder (perfect)
((SELECT id FROM tech_roles WHERE name = 'Platform Engineer'), 'B-S-E-L-T', 0.92),  -- Cloud Architect
((SELECT id FROM tech_roles WHERE name = 'Platform Engineer'), 'B-S-O-V-T', 0.88);

-- Infrastructure Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Engineer'), 'B-S-E-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Engineer'), 'B-S-E-L-T', 0.95),  -- Cloud Architect
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Engineer'), 'B-S-O-V-T', 0.90);

-- Cloud Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Cloud Engineer'), 'B-S-E-L-T', 0.98),  -- Cloud Architect (perfect)
((SELECT id FROM tech_roles WHERE name = 'Cloud Engineer'), 'B-S-E-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Cloud Engineer'), 'B-S-O-V-T', 0.85);

-- Site Reliability Engineer (SRE)
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Site Reliability Engineer (SRE)'), 'B-S-O-V-T', 0.98),  -- Reliability Engineer
((SELECT id FROM tech_roles WHERE name = 'Site Reliability Engineer (SRE)'), 'B-S-E-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Site Reliability Engineer (SRE)'), 'B-S-O-L-T', 0.88);

-- DevOps Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'DevOps Engineer'), 'B-S-O-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'DevOps Engineer'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'DevOps Engineer'), 'B-S-O-V-A', 0.82);

-- Kubernetes Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Kubernetes Engineer'), 'B-S-E-V-T', 0.95),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Kubernetes Engineer'), 'B-S-E-L-T', 0.90),  -- Cloud Architect
((SELECT id FROM tech_roles WHERE name = 'Kubernetes Engineer'), 'B-S-O-V-T', 0.88);

-- Container Platform Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Container Platform Engineer'), 'B-S-E-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Container Platform Engineer'), 'B-S-E-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Container Platform Engineer'), 'B-S-O-V-T', 0.85);

-- CI/CD Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'CI/CD Engineer'), 'B-S-O-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'CI/CD Engineer'), 'B-S-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'CI/CD Engineer'), 'B-S-O-V-A', 0.82);

-- Build Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Build Engineer'), 'B-S-O-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Build Engineer'), 'B-S-E-V-T', 0.85),
((SELECT id FROM tech_roles WHERE name = 'Build Engineer'), 'B-S-O-L-A', 0.80);

-- Release Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Release Engineer'), 'B-S-O-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Release Engineer'), 'B-S-O-L-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Release Engineer'), 'B-S-E-V-T', 0.82);

-- DATA ENGINEERING ROLES
-- Strong fit: S-O-L-A (Systems Optimizer), S-E-L-A (Research Engineer for ML-adjacent)

-- Data Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Data Engineer'), 'B-S-O-L-A', 0.95),  -- Systems Optimizer
((SELECT id FROM tech_roles WHERE name = 'Data Engineer'), 'B-S-E-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Data Engineer'), 'B-S-O-V-A', 0.82);

-- Analytics Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Analytics Engineer'), 'B-S-O-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Analytics Engineer'), 'B-U-E-L-A', 0.88),  -- Growth Hacker
((SELECT id FROM tech_roles WHERE name = 'Analytics Engineer'), 'B-S-E-L-A', 0.85);

-- Data Platform Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Data Platform Engineer'), 'B-S-E-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Data Platform Engineer'), 'B-S-E-V-T', 0.88),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Data Platform Engineer'), 'B-S-O-L-A', 0.85);

-- ETL Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'ETL Developer'), 'B-S-O-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'ETL Developer'), 'B-S-O-L-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'ETL Developer'), 'B-S-O-V-A', 0.82);

-- Data Pipeline Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Data Pipeline Engineer'), 'B-S-O-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Data Pipeline Engineer'), 'B-S-E-L-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Data Pipeline Engineer'), 'B-S-O-V-A', 0.82);

-- Streaming Data Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Streaming Data Engineer'), 'B-S-E-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Streaming Data Engineer'), 'B-S-O-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Streaming Data Engineer'), 'B-S-E-V-T', 0.82);

-- Data Warehouse Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Data Warehouse Engineer'), 'B-S-O-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Data Warehouse Engineer'), 'B-S-O-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Data Warehouse Engineer'), 'B-S-E-L-A', 0.82);

-- DATABASE ENGINEERING ROLES
-- Strong fit: S-O-L-A (Systems Optimizer), S-O-L-T (Security Architect for DBA)

-- Database Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Database Engineer'), 'B-S-O-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Database Engineer'), 'B-S-O-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Database Engineer'), 'B-S-O-V-A', 0.85);

-- Database Administrator (DBA)
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Database Administrator (DBA)'), 'B-S-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Database Administrator (DBA)'), 'B-S-O-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Database Administrator (DBA)'), 'B-S-O-V-T', 0.85);

-- SQL Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'SQL Developer'), 'B-S-O-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'SQL Developer'), 'B-S-O-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'SQL Developer'), 'B-S-O-L-T', 0.82);

-- NoSQL Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'NoSQL Engineer'), 'B-S-E-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'NoSQL Engineer'), 'B-S-O-L-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'NoSQL Engineer'), 'B-S-E-V-A', 0.80);

-- Search Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Search Engineer'), 'B-S-E-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Search Engineer'), 'B-S-O-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Search Engineer'), 'B-S-E-V-A', 0.82);

-- MACHINE LEARNING/AI ROLES
-- Strong fit: S-E-L-A (Research Engineer), S-E-V-T (Platform Builder for MLOps), S-O-L-A (for ML Engineers)

-- Machine Learning Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Machine Learning Engineer'), 'B-S-E-L-A', 0.95),  -- Research Engineer
((SELECT id FROM tech_roles WHERE name = 'Machine Learning Engineer'), 'B-S-O-L-A', 0.90),  -- Systems Optimizer
((SELECT id FROM tech_roles WHERE name = 'Machine Learning Engineer'), 'B-S-E-V-A', 0.85);

-- ML Platform Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'ML Platform Engineer'), 'B-S-E-V-T', 0.95),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'ML Platform Engineer'), 'B-S-E-L-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'ML Platform Engineer'), 'B-S-E-L-T', 0.85);

-- MLOps Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'MLOps Engineer'), 'B-S-E-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'MLOps Engineer'), 'B-S-O-V-T', 0.90),  -- Reliability Engineer
((SELECT id FROM tech_roles WHERE name = 'MLOps Engineer'), 'B-S-E-L-A', 0.85);

-- ML Research Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'ML Research Engineer'), 'B-S-E-L-A', 0.98),  -- Research Engineer (perfect)
((SELECT id FROM tech_roles WHERE name = 'ML Research Engineer'), 'B-S-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'ML Research Engineer'), 'B-S-E-L-T', 0.82);

-- Applied Machine Learning Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Applied Machine Learning Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Applied Machine Learning Engineer'), 'B-S-O-L-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Applied Machine Learning Engineer'), 'B-S-E-V-A', 0.82);

-- Computer Vision Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Computer Vision Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Computer Vision Engineer'), 'B-S-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Computer Vision Engineer'), 'B-S-O-L-A', 0.82);

-- NLP Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'NLP Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'NLP Engineer'), 'B-S-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'NLP Engineer'), 'B-S-O-L-A', 0.82);

-- Deep Learning Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Deep Learning Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Deep Learning Engineer'), 'B-S-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Deep Learning Engineer'), 'B-S-O-L-A', 0.85);

-- Generative AI Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Generative AI Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Generative AI Engineer'), 'B-S-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Generative AI Engineer'), 'B-U-E-V-A', 0.75);  -- Creative applications

-- LLM Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'LLM Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'LLM Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'LLM Engineer'), 'B-S-O-L-A', 0.82);

-- AI Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'AI Engineer'), 'B-S-E-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'AI Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'AI Engineer'), 'B-S-O-L-A', 0.85);

-- Research Scientist
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Research Scientist'), 'B-S-E-L-A', 1.00),  -- Research Engineer (perfect match)
((SELECT id FROM tech_roles WHERE name = 'Research Scientist'), 'B-S-E-L-T', 0.90),  -- Cloud Architect (strategic)
((SELECT id FROM tech_roles WHERE name = 'Research Scientist'), 'B-S-E-V-A', 0.82);

-- Research Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Research Engineer'), 'B-S-E-L-A', 0.98),
((SELECT id FROM tech_roles WHERE name = 'Research Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Research Engineer'), 'B-S-E-L-T', 0.85);

-- SECURITY ENGINEERING ROLES
-- Strong fit: S-O-L-T (Security Architect), S-E-L-T (Cloud Architect for cloud security)

-- Security Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Security Engineer'), 'B-S-O-L-T', 0.98),  -- Security Architect (perfect)
((SELECT id FROM tech_roles WHERE name = 'Security Engineer'), 'B-S-E-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Security Engineer'), 'B-S-O-V-T', 0.82);

-- Application Security Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Application Security Engineer'), 'B-S-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Application Security Engineer'), 'B-U-O-L-T', 0.88),  -- Quality Guardian
((SELECT id FROM tech_roles WHERE name = 'Application Security Engineer'), 'B-S-E-L-T', 0.82);

-- Cloud Security Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Cloud Security Engineer'), 'B-S-E-L-T', 0.95),  -- Cloud Architect
((SELECT id FROM tech_roles WHERE name = 'Cloud Security Engineer'), 'B-S-O-L-T', 0.92),  -- Security Architect
((SELECT id FROM tech_roles WHERE name = 'Cloud Security Engineer'), 'B-S-E-V-T', 0.82);

-- DevSecOps Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'DevSecOps Engineer'), 'B-S-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'DevSecOps Engineer'), 'B-S-O-V-T', 0.90),  -- Reliability Engineer
((SELECT id FROM tech_roles WHERE name = 'DevSecOps Engineer'), 'B-S-E-L-T', 0.85);

-- Infrastructure Security Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Security Engineer'), 'B-S-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Security Engineer'), 'B-S-E-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Infrastructure Security Engineer'), 'B-S-O-V-T', 0.85);

-- Network Security Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Network Security Engineer'), 'B-S-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Network Security Engineer'), 'B-S-E-L-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Network Security Engineer'), 'B-S-O-V-T', 0.82);

-- Penetration Tester
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Penetration Tester'), 'B-S-E-L-A', 0.92),  -- Research Engineer (exploration)
((SELECT id FROM tech_roles WHERE name = 'Penetration Tester'), 'B-S-O-L-T', 0.90),  -- Security Architect
((SELECT id FROM tech_roles WHERE name = 'Penetration Tester'), 'B-S-E-V-A', 0.82);

-- Security Researcher
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Security Researcher'), 'B-S-E-L-A', 0.98),  -- Research Engineer
((SELECT id FROM tech_roles WHERE name = 'Security Researcher'), 'B-S-E-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Security Researcher'), 'B-S-O-L-T', 0.82);

-- QA/TESTING ROLES
-- Strong fit: U-O-L-T (Quality Guardian), U-E-L-T (UX Scientist)

-- QA Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'QA Engineer'), 'B-U-O-L-T', 0.95),  -- Quality Guardian
((SELECT id FROM tech_roles WHERE name = 'QA Engineer'), 'B-U-E-L-T', 0.90),  -- UX Scientist
((SELECT id FROM tech_roles WHERE name = 'QA Engineer'), 'B-S-O-L-T', 0.82);

-- Test Automation Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Test Automation Engineer'), 'B-U-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Test Automation Engineer'), 'B-S-O-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Test Automation Engineer'), 'B-U-E-L-T', 0.85);

-- Software Test Engineer (SDET)
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Software Test Engineer (SDET)'), 'B-U-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Software Test Engineer (SDET)'), 'B-S-O-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Software Test Engineer (SDET)'), 'B-S-O-V-T', 0.82);

-- Test Infrastructure Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Test Infrastructure Engineer'), 'B-S-O-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Test Infrastructure Engineer'), 'B-S-E-V-T', 0.88),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Test Infrastructure Engineer'), 'B-U-O-L-T', 0.85);

-- Performance Test Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Performance Test Engineer'), 'B-U-O-L-A', 0.92),  -- Performance Optimizer
((SELECT id FROM tech_roles WHERE name = 'Performance Test Engineer'), 'B-U-O-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Performance Test Engineer'), 'B-S-O-L-A', 0.85);

-- Mobile QA Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Mobile QA Engineer'), 'B-U-O-L-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Mobile QA Engineer'), 'B-U-E-L-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Mobile QA Engineer'), 'B-U-O-V-T', 0.80);

-- BLOCKCHAIN/WEB3 ROLES
-- Strong fit: S-E-L-A (Research Engineer), S-E-V-A (System Innovator)

-- Blockchain Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Blockchain Engineer'), 'B-S-E-L-A', 0.95),  -- Research Engineer
((SELECT id FROM tech_roles WHERE name = 'Blockchain Engineer'), 'B-S-E-V-A', 0.92),  -- System Innovator
((SELECT id FROM tech_roles WHERE name = 'Blockchain Engineer'), 'B-S-E-V-T', 0.85);

-- Smart Contract Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Smart Contract Engineer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Smart Contract Engineer'), 'B-S-O-L-T', 0.88),  -- Security-conscious
((SELECT id FROM tech_roles WHERE name = 'Smart Contract Engineer'), 'B-S-E-V-A', 0.85);

-- Web3 Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Web3 Developer'), 'B-S-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Web3 Developer'), 'B-U-E-V-A', 0.88),  -- Rapid Prototyper
((SELECT id FROM tech_roles WHERE name = 'Web3 Developer'), 'B-S-E-L-A', 0.85);

-- Blockchain Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Blockchain Developer'), 'B-S-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Blockchain Developer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Blockchain Developer'), 'B-S-E-V-T', 0.82);

-- GAME DEVELOPMENT ROLES
-- Mix of U (graphics/gameplay) and S (engine), V-A for creative

-- Game Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Game Developer'), 'B-U-E-V-A', 0.90),  -- Rapid Prototyper
((SELECT id FROM tech_roles WHERE name = 'Game Developer'), 'B-S-E-V-A', 0.88),  -- System Innovator
((SELECT id FROM tech_roles WHERE name = 'Game Developer'), 'B-U-O-V-A', 0.85);  -- Creative Developer

-- Game Engine Programmer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Game Engine Programmer'), 'B-S-E-V-T', 0.92),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Game Engine Programmer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Game Engine Programmer'), 'B-S-O-V-T', 0.82);

-- Unity Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Unity Developer'), 'B-U-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Unity Developer'), 'B-U-O-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Unity Developer'), 'B-S-E-V-A', 0.82);

-- Unreal Engine Developer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Unreal Engine Developer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Unreal Engine Developer'), 'B-S-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Unreal Engine Developer'), 'B-U-O-V-A', 0.85);

-- Graphics Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Graphics Engineer'), 'B-S-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Graphics Engineer'), 'B-S-E-L-A', 0.88),  -- Research-heavy
((SELECT id FROM tech_roles WHERE name = 'Graphics Engineer'), 'B-U-O-V-A', 0.82);

-- Gameplay Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Gameplay Engineer'), 'B-U-E-V-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Gameplay Engineer'), 'B-U-O-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Gameplay Engineer'), 'B-S-E-V-A', 0.80);

-- EMBEDDED/IOT ROLES
-- Strong fit: S-O-V-T (Reliability Engineer), S-E-V-T (Platform Builder)

-- Embedded Software Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Embedded Software Engineer'), 'B-S-O-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Embedded Software Engineer'), 'B-S-O-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Embedded Software Engineer'), 'B-S-E-V-T', 0.82);

-- Firmware Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Firmware Engineer'), 'B-S-O-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Firmware Engineer'), 'B-S-O-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Firmware Engineer'), 'B-S-O-V-A', 0.82);

-- IoT Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'IoT Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'IoT Engineer'), 'B-S-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'IoT Engineer'), 'B-S-O-V-T', 0.85);

-- Robotics Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Robotics Engineer'), 'B-S-E-L-A', 0.92),  -- Research Engineer
((SELECT id FROM tech_roles WHERE name = 'Robotics Engineer'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Robotics Engineer'), 'B-S-O-V-T', 0.82);

-- Real-Time Systems Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Real-Time Systems Engineer'), 'B-S-O-V-T', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Real-Time Systems Engineer'), 'B-S-O-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Real-Time Systems Engineer'), 'B-S-E-V-T', 0.82);

-- GROWTH/PRODUCT ROLES
-- Strong fit: U-E-L-A (Growth Hacker), U-E-V-A (Rapid Prototyper for Product)

-- Growth Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Growth Engineer'), 'B-U-E-L-A', 0.98),  -- Growth Hacker (perfect)
((SELECT id FROM tech_roles WHERE name = 'Growth Engineer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Growth Engineer'), 'B-U-E-L-T', 0.85);

-- Product Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Product Engineer'), 'B-U-E-V-T', 0.95),  -- Product Innovator
((SELECT id FROM tech_roles WHERE name = 'Product Engineer'), 'B-U-E-V-A', 0.92),  -- Rapid Prototyper
((SELECT id FROM tech_roles WHERE name = 'Product Engineer'), 'B-S-E-V-A', 0.82);  -- Full-stack

-- Experimentation Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Experimentation Engineer'), 'B-U-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'Experimentation Engineer'), 'B-U-E-L-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Experimentation Engineer'), 'B-S-E-L-A', 0.82);

-- A/B Testing Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'A/B Testing Engineer'), 'B-U-E-L-A', 0.95),
((SELECT id FROM tech_roles WHERE name = 'A/B Testing Engineer'), 'B-U-E-L-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'A/B Testing Engineer'), 'B-U-E-V-A', 0.80);

-- DEVTOOLS/DEVREL ROLES
-- Mix of all types, focus on communication and tooling

-- Developer Tools Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Developer Tools Engineer'), 'B-S-E-V-T', 0.92),  -- Platform Builder
((SELECT id FROM tech_roles WHERE name = 'Developer Tools Engineer'), 'B-S-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Developer Tools Engineer'), 'B-U-E-V-A', 0.82);

-- Developer Experience Engineer (DevEx)
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Developer Experience Engineer (DevEx)'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Developer Experience Engineer (DevEx)'), 'B-U-E-V-A', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Developer Experience Engineer (DevEx)'), 'B-U-E-V-T', 0.85);

-- SDK Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'SDK Engineer'), 'B-S-E-V-T', 0.92),
((SELECT id FROM tech_roles WHERE name = 'SDK Engineer'), 'B-S-O-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'SDK Engineer'), 'B-S-E-V-A', 0.82);

-- Developer Advocate
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Developer Advocate'), 'B-U-E-V-A', 0.90),  -- Communication + exploration
((SELECT id FROM tech_roles WHERE name = 'Developer Advocate'), 'B-U-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Developer Advocate'), 'B-S-E-V-A', 0.82);

-- Developer Relations Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Developer Relations Engineer'), 'B-U-E-V-A', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Developer Relations Engineer'), 'B-U-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Developer Relations Engineer'), 'B-S-E-V-A', 0.85);

-- SPECIALIZED ROLES

-- Compiler Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Compiler Engineer'), 'B-S-E-L-A', 0.95),  -- Research Engineer
((SELECT id FROM tech_roles WHERE name = 'Compiler Engineer'), 'B-S-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Compiler Engineer'), 'B-S-O-L-T', 0.80);

-- Protocol Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Protocol Engineer'), 'B-S-E-L-A', 0.92),
((SELECT id FROM tech_roles WHERE name = 'Protocol Engineer'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Protocol Engineer'), 'B-S-E-L-T', 0.85);

-- Observability Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Observability Engineer'), 'B-S-O-V-T', 0.92),  -- Reliability Engineer
((SELECT id FROM tech_roles WHERE name = 'Observability Engineer'), 'B-S-E-V-T', 0.88),
((SELECT id FROM tech_roles WHERE name = 'Observability Engineer'), 'B-S-O-L-A', 0.82);

-- Reliability Engineer
INSERT INTO role_scoring_weights (role_id, personality_type, weight) VALUES
((SELECT id FROM tech_roles WHERE name = 'Reliability Engineer'), 'B-S-O-V-T', 0.98),
((SELECT id FROM tech_roles WHERE name = 'Reliability Engineer'), 'B-S-E-V-T', 0.90),
((SELECT id FROM tech_roles WHERE name = 'Reliability Engineer'), 'B-S-O-L-T', 0.85);
