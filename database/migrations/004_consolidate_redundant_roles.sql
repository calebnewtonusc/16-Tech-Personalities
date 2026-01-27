-- Migration: Consolidate redundant tech roles
-- Date: 2026-01-26
-- Purpose: Reduce from 95 to 61 roles by removing redundancies
-- Rationale: iOS/Android/Flutter are all covered by "Mobile Engineer"
--            Unity/Unreal/Gameplay are all covered by "Game Developer"
--            Similar consolidations for other role categories

BEGIN;

-- Mobile: Keep Mobile Engineer, remove platform-specific variants
DELETE FROM tech_roles WHERE name IN (
  'iOS Engineer',
  'Android Engineer',
  'Flutter Developer',
  'React Native Developer',
  'Cross-Platform Mobile Engineer'
);

-- Game Development: Keep Game Developer, remove engine-specific roles
DELETE FROM tech_roles WHERE name IN (
  'Unity Developer',
  'Unreal Engine Developer',
  'Gameplay Engineer',
  'Game Engine Programmer'
);

-- Blockchain: Keep Blockchain Engineer, remove redundant variants
DELETE FROM tech_roles WHERE name IN (
  'Blockchain Developer',
  'Smart Contract Engineer'
);

-- Security: Keep specialized roles, merge general ones
DELETE FROM tech_roles WHERE name IN (
  'Cloud Security Engineer',
  'Infrastructure Security Engineer',
  'Network Security Engineer'
);
-- Note: Keep Security Engineer (general), Application Security Engineer,
--       DevSecOps Engineer, Penetration Tester, Security Researcher

-- Infrastructure: Consolidate overlapping roles
DELETE FROM tech_roles WHERE name IN (
  'Container Platform Engineer',
  'Build Engineer',
  'Release Engineer',
  'Infrastructure Engineer',
  'Reliability Engineer'
);
-- Note: Keep Platform Engineer, SRE, DevOps Engineer, Kubernetes Engineer, CI/CD Engineer

-- Backend: Merge API/Protocol into Backend Engineer
DELETE FROM tech_roles WHERE name IN (
  'API Engineer',
  'Protocol Engineer'
);
-- Note: Keep Backend Engineer, Microservices Engineer

-- Machine Learning: Consolidate variants
DELETE FROM tech_roles WHERE name IN (
  'Applied Machine Learning Engineer',
  'Generative AI Engineer'
);
-- Note: Keep ML Engineer, MLOps Engineer, LLM Engineer, CV, NLP, Deep Learning

-- ML Research: Merge Research Engineer
DELETE FROM tech_roles WHERE name = 'Research Engineer';
-- Note: Keep ML Research Engineer, Research Scientist

-- Data Engineering: Merge pipelines into Data Engineer
DELETE FROM tech_roles WHERE name IN (
  'Data Pipeline Engineer',
  'Streaming Data Engineer'
);
-- Note: Keep Data Engineer, Analytics Engineer

-- Database: Merge SQL/NoSQL variants
DELETE FROM tech_roles WHERE name IN (
  'SQL Developer',
  'NoSQL Engineer'
);
-- Note: Keep Database Engineer, DBA, ETL Developer, Data Warehouse Engineer

-- Testing: Consolidate QA roles
DELETE FROM tech_roles WHERE name IN (
  'Software Test Engineer (SDET)',
  'Performance Test Engineer'
);
-- Note: Keep QA Engineer, Test Automation Engineer, Mobile QA Engineer

-- Developer Relations: Merge into Developer Advocate
DELETE FROM tech_roles WHERE name = 'Developer Relations Engineer';

-- Developer Tools: Merge DevEx into Developer Tools Engineer
DELETE FROM tech_roles WHERE name = 'Developer Experience Engineer (DevEx)';

-- Growth: Merge Experimentation into Growth Engineer
DELETE FROM tech_roles WHERE name = 'Experimentation Engineer';

-- Systems: Merge Real-Time into Systems Engineer
DELETE FROM tech_roles WHERE name = 'Real-Time Systems Engineer';

-- Verify the consolidation
DO $$
DECLARE
  role_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO role_count FROM tech_roles;

  IF role_count > 65 THEN
    RAISE WARNING 'Expected ~61 roles, found % roles', role_count;
  ELSE
    RAISE NOTICE 'Consolidation successful: % roles remaining', role_count;
  END IF;
END $$;

COMMIT;

-- Rollback instructions (if needed):
-- Restore from backup: pg_restore or re-run original seed.sql
