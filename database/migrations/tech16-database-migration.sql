-- Tech 16 Redesign: Database Migration Script
-- Updates personality_profiles with new names and adds category field

-- 1. Add new columns to personality_profiles
ALTER TABLE personality_profiles
ADD COLUMN IF NOT EXISTS category VARCHAR(20);

ALTER TABLE personality_profiles
ADD COLUMN IF NOT EXISTS tagline TEXT;

-- 2. Update all 16 personality profiles with new names, taglines, and categories

-- INNOVATORS (U-E) - Purple
UPDATE personality_profiles SET
  name = 'The Rapid Prototyper',
  tagline = 'Ship fast, iterate faster',
  category = 'innovators'
WHERE type_code = 'B-U-E-V-A';

UPDATE personality_profiles SET
  name = 'The Product Innovator',
  tagline = 'Building features users love',
  category = 'innovators'
WHERE type_code = 'B-U-E-V-T';

UPDATE personality_profiles SET
  name = 'The Growth Hacker',
  tagline = 'Data-driven user acquisition',
  category = 'innovators'
WHERE type_code = 'B-U-E-L-A';

UPDATE personality_profiles SET
  name = 'The UX Scientist',
  tagline = 'Measuring and optimizing experiences',
  category = 'innovators'
WHERE type_code = 'B-U-E-L-T';

-- CRAFTERS (U-O) - Green
UPDATE personality_profiles SET
  name = 'The Creative Developer',
  tagline = 'Where design meets code',
  category = 'crafters'
WHERE type_code = 'B-U-O-V-A';

UPDATE personality_profiles SET
  name = 'The Professional Frontend',
  tagline = 'Production-ready, pixel-perfect',
  category = 'crafters'
WHERE type_code = 'B-U-O-V-T';

UPDATE personality_profiles SET
  name = 'The Performance Optimizer',
  tagline = 'Making experiences blazing fast',
  category = 'crafters'
WHERE type_code = 'B-U-O-L-A';

UPDATE personality_profiles SET
  name = 'The Quality Guardian',
  tagline = 'Zero bugs, maximum quality',
  category = 'crafters'
WHERE type_code = 'B-U-O-L-T';

-- ARCHITECTS (S-E) - Blue
UPDATE personality_profiles SET
  name = 'The System Innovator',
  tagline = 'Rapid backend prototyping',
  category = 'architects'
WHERE type_code = 'B-S-E-V-A';

UPDATE personality_profiles SET
  name = 'The Platform Builder',
  tagline = 'Building platforms at scale',
  category = 'architects'
WHERE type_code = 'B-S-E-V-T';

UPDATE personality_profiles SET
  name = 'The Research Engineer',
  tagline = 'Pushing technological boundaries',
  category = 'architects'
WHERE type_code = 'B-S-E-L-A';

UPDATE personality_profiles SET
  name = 'The Cloud Architect',
  tagline = 'Designing scalable cloud infrastructure',
  category = 'architects'
WHERE type_code = 'B-S-E-L-T';

-- ENGINEERS (S-O) - Orange
UPDATE personality_profiles SET
  name = 'The Backend Craftsperson',
  tagline = 'Building reliable APIs',
  category = 'engineers'
WHERE type_code = 'B-S-O-V-A';

UPDATE personality_profiles SET
  name = 'The Reliability Engineer',
  tagline = '99.99% uptime, guaranteed',
  category = 'engineers'
WHERE type_code = 'B-S-O-V-T';

UPDATE personality_profiles SET
  name = 'The Systems Optimizer',
  tagline = 'Data-driven system performance',
  category = 'engineers'
WHERE type_code = 'B-S-O-L-A';

UPDATE personality_profiles SET
  name = 'The Security Architect',
  tagline = 'Secure, compliant, unbreakable',
  category = 'engineers'
WHERE type_code = 'B-S-O-L-T';

-- 3. Add category column to tech_roles table
ALTER TABLE tech_roles
ADD COLUMN IF NOT EXISTS category VARCHAR(50);

-- 4. Make all optional columns nullable
DO $$
BEGIN
    -- Make skills nullable if exists
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'tech_roles' AND column_name = 'skills') THEN
        ALTER TABLE tech_roles ALTER COLUMN skills DROP NOT NULL;
    END IF;

    -- Make roadmap nullable if exists
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'tech_roles' AND column_name = 'roadmap') THEN
        ALTER TABLE tech_roles ALTER COLUMN roadmap DROP NOT NULL;
    END IF;

    -- Make tools nullable if exists
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'tech_roles' AND column_name = 'tools') THEN
        ALTER TABLE tech_roles ALTER COLUMN tools DROP NOT NULL;
    END IF;

    -- Make salary_range nullable if exists
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'tech_roles' AND column_name = 'salary_range') THEN
        ALTER TABLE tech_roles ALTER COLUMN salary_range DROP NOT NULL;
    END IF;
END $$;

-- 5. Delete existing tech roles to avoid duplicates
DELETE FROM role_scoring_weights;
DELETE FROM tech_roles;

-- 6. Add comprehensive tech roles (IC engineering roles from 525-role list)
-- Prioritizing hands-on engineering roles relevant for personality assessment

-- Frontend/UI Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Frontend Engineer', 'Builds user-facing web applications using modern frameworks like React, Vue, or Angular', 'frontend'),
('Web Developer', 'Creates websites and web applications with focus on functionality and user experience', 'frontend'),
('Design Systems Engineer', 'Builds and maintains component libraries, design tokens, and design system infrastructure', 'frontend'),
('Animation Engineer', 'Creates interactive animations and micro-interactions for web and mobile applications', 'frontend'),
('Accessibility Engineer', 'Ensures web applications are accessible to all users, implementing WCAG compliance', 'frontend'),
('Performance Engineer', 'Optimizes frontend performance, focusing on load times, rendering, and Core Web Vitals', 'frontend');

-- Mobile Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Mobile Engineer', 'Develops mobile applications for iOS and Android platforms', 'mobile'),
('iOS Engineer', 'Builds native iOS applications using Swift and SwiftUI with a focus on Apple ecosystem', 'mobile'),
('Android Engineer', 'Develops native Android applications using Kotlin and Jetpack Compose', 'mobile'),
('React Native Developer', 'Creates cross-platform mobile apps using React Native for iOS and Android', 'mobile'),
('Flutter Developer', 'Builds cross-platform mobile applications using Flutter and Dart', 'mobile'),
('Cross-Platform Mobile Engineer', 'Develops mobile apps that work across iOS and Android using cross-platform frameworks', 'mobile');

-- Backend/Systems Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Backend Engineer', 'Builds server-side logic, databases, and APIs that power applications', 'backend'),
('Full Stack Engineer', 'Works on both frontend and backend, building complete features end-to-end', 'fullstack'),
('API Engineer', 'Specializes in designing and building RESTful and GraphQL APIs with focus on developer experience', 'backend'),
('Microservices Engineer', 'Designs and implements microservices architectures with focus on service decomposition and API design', 'backend'),
('Distributed Systems Engineer', 'Builds large-scale distributed systems focusing on consistency, availability, and partition tolerance', 'backend'),
('Systems Engineer', 'Develops low-level systems software, focusing on performance and reliability', 'systems');

-- Infrastructure/Platform Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Platform Engineer', 'Builds internal platforms and tools that enable other engineers to ship faster', 'infrastructure'),
('Infrastructure Engineer', 'Designs and maintains infrastructure systems including servers, networks, and cloud resources', 'infrastructure'),
('Cloud Engineer', 'Builds and maintains cloud infrastructure on AWS, Azure, or GCP', 'infrastructure'),
('Site Reliability Engineer (SRE)', 'Ensures systems are reliable, scalable, and efficient through automation and monitoring', 'infrastructure'),
('DevOps Engineer', 'Bridges development and operations, automating deployment pipelines and infrastructure', 'infrastructure'),
('Kubernetes Engineer', 'Specializes in container orchestration, deploying and managing Kubernetes clusters at scale', 'infrastructure'),
('Container Platform Engineer', 'Builds container orchestration platforms and tooling for containerized applications', 'infrastructure'),
('CI/CD Engineer', 'Develops and maintains continuous integration and deployment pipelines', 'infrastructure'),
('Build Engineer', 'Optimizes build systems and tooling to improve developer productivity', 'infrastructure'),
('Release Engineer', 'Manages software releases, deployment processes, and release automation', 'infrastructure');

-- Data Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Data Engineer', 'Builds data pipelines and infrastructure to collect, store, and process large datasets', 'data'),
('Analytics Engineer', 'Builds data models and transformations to enable business intelligence and analytics', 'data'),
('Data Platform Engineer', 'Develops infrastructure and tooling for data pipelines, warehouses, and data systems', 'data'),
('ETL Developer', 'Builds extract, transform, load pipelines to move data between systems', 'data'),
('Data Pipeline Engineer', 'Develops automated data pipelines for processing and transforming data at scale', 'data'),
('Streaming Data Engineer', 'Builds real-time data streaming systems using Kafka, Flink, or similar technologies', 'data'),
('Data Warehouse Engineer', 'Designs and maintains data warehouses for analytics and business intelligence', 'data');

-- Database Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Database Engineer', 'Designs, implements, and optimizes databases for performance and scalability', 'database'),
('Database Administrator (DBA)', 'Manages and maintains database systems, ensuring availability and performance', 'database'),
('SQL Developer', 'Specializes in writing complex SQL queries and database-driven applications', 'database'),
('NoSQL Engineer', 'Works with NoSQL databases like MongoDB, Cassandra, or DynamoDB', 'database'),
('Search Engineer', 'Builds search infrastructure using Elasticsearch, Solr, or similar search engines', 'database');

-- Machine Learning/AI Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Machine Learning Engineer', 'Builds and deploys machine learning models into production systems', 'ml'),
('ML Platform Engineer', 'Develops infrastructure and tooling to support ML model training and deployment', 'ml'),
('MLOps Engineer', 'Automates ML workflows, focusing on model deployment, monitoring, and retraining', 'ml'),
('ML Research Engineer', 'Bridges research and production by implementing and scaling research prototypes into production systems', 'ml'),
('Applied Machine Learning Engineer', 'Applies ML techniques to solve real-world business problems', 'ml'),
('Computer Vision Engineer', 'Develops systems for image and video analysis using deep learning, object detection, and image recognition', 'ml'),
('NLP Engineer', 'Builds natural language processing systems for text analysis, language understanding, and generation', 'ml'),
('Deep Learning Engineer', 'Specializes in building and training deep neural networks for complex ML tasks', 'ml'),
('Generative AI Engineer', 'Builds systems using generative AI models like GPT, DALL-E, or Stable Diffusion', 'ml'),
('LLM Engineer', 'Develops applications and systems using large language models', 'ml'),
('AI Engineer', 'Builds AI-powered applications and systems across various domains', 'ml'),
('Research Scientist', 'Conducts research to advance the state of the art in AI, ML, or computer science', 'research'),
('Research Engineer', 'Implements and validates research ideas through experimentation and prototyping', 'research');

-- Security Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Security Engineer', 'Protects systems and data by implementing security controls and monitoring threats', 'security'),
('Application Security Engineer', 'Identifies and fixes security vulnerabilities in applications through code review and pentesting', 'security'),
('Cloud Security Engineer', 'Secures cloud infrastructure and ensures compliance with security best practices', 'security'),
('DevSecOps Engineer', 'Integrates security practices into CI/CD pipelines and development workflows', 'security'),
('Infrastructure Security Engineer', 'Secures infrastructure systems including networks, servers, and cloud platforms', 'security'),
('Network Security Engineer', 'Designs and maintains secure network architectures and monitors network threats', 'security'),
('Penetration Tester', 'Tests systems for vulnerabilities by simulating real-world attacks', 'security'),
('Security Researcher', 'Discovers new vulnerabilities and develops novel security techniques', 'security');

-- QA/Testing Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('QA Engineer', 'Tests software to ensure quality, finding bugs and verifying functionality', 'qa'),
('Test Automation Engineer', 'Develops automated test suites for web and mobile applications using testing frameworks', 'qa'),
('Software Test Engineer (SDET)', 'Combines software development and testing skills to build testing infrastructure', 'qa'),
('Test Infrastructure Engineer', 'Builds testing infrastructure, frameworks, and tooling to support quality engineering teams', 'qa'),
('Performance Test Engineer', 'Tests system performance under load to identify bottlenecks and scalability issues', 'qa'),
('Mobile QA Engineer', 'Specializes in testing mobile applications across devices and platforms', 'qa');

-- Blockchain/Web3 Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Blockchain Engineer', 'Builds blockchain infrastructure, protocols, and decentralized systems', 'blockchain'),
('Smart Contract Engineer', 'Develops and audits smart contracts for blockchain platforms using Solidity or similar languages', 'blockchain'),
('Web3 Developer', 'Builds decentralized applications (dApps) using Web3 technologies and blockchain', 'blockchain'),
('Blockchain Developer', 'Builds decentralized applications and blockchain protocols using technologies like Ethereum, Solidity, and Web3', 'blockchain');

-- Game Development
INSERT INTO tech_roles (name, description, category) VALUES
('Game Developer', 'Creates video games using engines like Unity or Unreal, focusing on gameplay and systems', 'gaming'),
('Game Engine Programmer', 'Develops game engine technology and core systems for game development', 'gaming'),
('Unity Developer', 'Specializes in game development using Unity engine with C# programming', 'gaming'),
('Unreal Engine Developer', 'Builds games and interactive experiences using Unreal Engine and C++', 'gaming'),
('Graphics Engineer', 'Develops rendering systems and graphics technology for games or applications', 'gaming'),
('Gameplay Engineer', 'Implements game mechanics, systems, and player interactions', 'gaming');

-- Embedded/IoT Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Embedded Software Engineer', 'Develops software for embedded systems and microcontrollers', 'embedded'),
('Firmware Engineer', 'Writes low-level firmware for hardware devices and embedded systems', 'embedded'),
('IoT Engineer', 'Builds Internet of Things systems connecting physical devices to cloud platforms', 'iot'),
('Robotics Engineer', 'Develops software for robots, including perception, planning, and control systems', 'robotics'),
('Real-Time Systems Engineer', 'Builds systems with strict timing requirements like automotive or aerospace software', 'embedded');

-- Growth/Product Engineering
INSERT INTO tech_roles (name, description, category) VALUES
('Growth Engineer', 'Builds experiments and features focused on user acquisition, activation, and retention using A/B testing', 'growth'),
('Product Engineer', 'Works on user-facing features with a product mindset, bridging engineering and product management', 'product'),
('Experimentation Engineer', 'Builds A/B testing infrastructure and runs experiments to optimize product metrics', 'growth'),
('A/B Testing Engineer', 'Specializes in designing and implementing A/B tests and analyzing results', 'growth');

-- Developer Experience/Tools
INSERT INTO tech_roles (name, description, category) VALUES
('Developer Tools Engineer', 'Builds tools and infrastructure to improve developer productivity', 'devtools'),
('Developer Experience Engineer (DevEx)', 'Focuses on improving the developer experience through tooling and documentation', 'devtools'),
('SDK Engineer', 'Develops software development kits (SDKs) for platforms and APIs', 'devtools'),
('Developer Advocate', 'Represents developers, creates content, and builds relationships with developer communities', 'devrel'),
('Developer Relations Engineer', 'Advocates for developer tools, creates content, and builds relationships with developer communities', 'devrel');

-- Specialized Systems
INSERT INTO tech_roles (name, description, category) VALUES
('Compiler Engineer', 'Develops compilers and programming language tooling', 'specialized'),
('Protocol Engineer', 'Designs and implements network protocols and distributed systems protocols', 'specialized'),
('Observability Engineer', 'Builds monitoring, logging, and tracing systems to understand system behavior', 'infrastructure'),
('Reliability Engineer', 'Ensures systems are reliable and resilient through monitoring and incident response', 'infrastructure');

-- Verify the updates
SELECT type_code, name, tagline, category FROM personality_profiles ORDER BY type_code;
SELECT name, category FROM tech_roles ORDER BY category, name;
