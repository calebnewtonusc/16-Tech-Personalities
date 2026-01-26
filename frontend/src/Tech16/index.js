import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Quiz from './Quiz';
import Results from './Results';
import PersonalityTypesGallery from './PersonalityTypesGallery';
import PersonalityTypeDetail from './PersonalityTypeDetail';
import AllRolesRanked from './AllRolesRanked';
import { spectrums, questions } from './data/questions';
import { getAllPersonalityCodes } from './data/personalities';
import { getPersonalityColor } from './theme';
import { Button, Card, Badge, GradientBackground, Container, Grid, ColoredPersonalityCode } from './components/SharedComponents';
import { supabase } from '../supabase';

// Tech16-specific theme with blue colors
const tech16Theme = {
  bg: "#ffffff",
  bgLight: "#f5f5f5",
  primary: "#3498db", // Blue
  text_primary: "#2c3e50",
  text_secondary: "#5a6c7d",
  card: "#ffffff",
  card_light: '#f8f9fa',
  button: "#3498db",
  white: "#FFFFFF",
  black: "#000000",
  border: "#e0e0e0",
};

const PageWrapper = styled.div`
  margin: -8px -8px 0 -8px;
  padding: 0;
`;

const HeaderWrapper = styled.header`
  position: relative;
  z-index: 100;
  background: ${({ theme }) => theme.card || 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.text_primary || '#000'}15;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #9b59b6, #3498db, #3498db, #e67e22);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme, $active }) => $active ? theme.primary || '#3498db' : theme.text_secondary || '#666'};
  font-size: 1rem;
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => $active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.primary || '#3498db'};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary || '#3498db'};

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeaderCTA = styled(Button)`
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  padding: 0 0 4rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: linear-gradient(180deg,
      rgba(52, 152, 219, 0.08) 0%,
      rgba(155, 89, 182, 0.06) 8%,
      rgba(155, 89, 182, 0.04) 15%,
      rgba(155, 89, 182, 0.03) 22%,
      rgba(155, 89, 182, 0.02) 30%,
      rgba(155, 89, 182, 0.015) 38%,
      rgba(155, 89, 182, 0.01) 46%,
      rgba(155, 89, 182, 0.007) 54%,
      rgba(155, 89, 182, 0.004) 62%,
      rgba(155, 89, 182, 0.002) 70%,
      rgba(155, 89, 182, 0.001) 80%,
      rgba(155, 89, 182, 0.0005) 90%,
      transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Hero = styled.div`
  text-align: center;
  margin: 0;
  padding: 2.5rem 2rem 8rem 2rem;
  background: transparent;
  position: relative;

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 6rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #9b59b6, #3498db, #3498db, #e67e22, #9b59b6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.2em;
  animation: gradientShift 8s ease infinite;

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: 0.15em;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  color: #5a6c7d;
  margin-bottom: 2.5rem;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin: 2.5rem 0;

  & > div > ${Button}:first-child {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background: ${({ theme }) => theme.primary || '#3498db'};
      opacity: 0.3;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.15);
      }
    }
  }
`;

const Section = styled.div`
  margin-bottom: 5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 3.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.0625rem;
  color: #5a6c7d;
  text-align: center;
  max-width: 620px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const SpectrumCard = styled(Card)`
  padding: 2.25rem 2rem;
  text-align: center;
  height: 100%;
  border: 2px solid transparent;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: ${({ $leftColor, $rightColor }) =>
    `linear-gradient(135deg, ${$leftColor}15 0%, ${$leftColor}08 25%, transparent 50%, ${$rightColor}08 75%, ${$rightColor}15 100%)`
  };

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $leftColor, $rightColor }) =>
      `linear-gradient(135deg, ${$leftColor}20 0%, transparent 50%, ${$rightColor}20 100%)`
    };
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: ${({ $leftColor }) => `${$leftColor}60`};

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem;
  }
`;

const SpectrumName = styled.h3`
  font-size: 1.1875rem;
  font-weight: 800;
  color: ${({ $color }) => $color || '#3498db'};
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
`;

const SpectrumPoles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1.75rem 0;
  gap: 1.5rem;
`;

const Pole = styled.div`
  flex: 1;
`;

const PoleCode = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ $color }) => $color || '#3498db'};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
  letter-spacing: 0.08em;
`;

const PoleName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: -0.01em;
`;

const Divider = styled.div`
  font-size: 1.375rem;
  color: #95a5a6;
  font-weight: 400;
`;

const SpectrumDescription = styled.p`
  font-size: 0.9375rem;
  color: #5a6c7d;
  line-height: 1.7;
  margin-top: 1.25rem;
  font-weight: 400;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 4rem 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 3rem 0;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 2.25rem 1.75rem;
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color}20, ${$color}10, transparent)` :
    `linear-gradient(135deg, rgba(52, 152, 219, 0.20), rgba(52, 152, 219, 0.10), transparent)`
  };
  border: 2px solid ${({ $color }) => $color ? `${$color}40` : 'rgba(52, 152, 219, 0.4)'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: ${({ $color }) =>
      $color ? `radial-gradient(circle, ${$color}25, transparent 70%)` : 'transparent'
    };
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 48px ${({ $color }) => $color ? `${$color}35` : 'rgba(52, 152, 219, 0.35)'};
    border-color: ${({ $color }) => $color ? `${$color}70` : 'rgba(52, 152, 219, 0.7)'};

    &::before {
      opacity: 1;
      animation: rotate 3s linear infinite;
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ $color }) => $color || '#3498db'};
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9375rem;
  color: #5a6c7d;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const FeaturesList = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: start;
  gap: 1.25rem;
  padding: 1.75rem;
  margin-bottom: 1.25rem;
  background: ${({ theme }) => theme.card || '#ffffff'};
  border-radius: 14px;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(180deg, #3498db, #3498db);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    transform: translateX(12px);
    border-color: rgba(52, 152, 219, 0.4);
    box-shadow: 0 8px 24px rgba(52, 152, 219, 0.15);

    &::before {
      transform: scaleY(1);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.25rem;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.0625rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const FeatureDescription = styled.p`
  font-size: 0.9375rem;
  color: #5a6c7d;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
`;

const ExampleTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled(Card)`
  padding: 1.75rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color.primary}15, ${$color.primary}08, transparent)` : 'rgba(255, 255, 255, 1)'
  };
  border: 2px solid ${({ $color }) => $color ? `${$color.primary}40` : 'rgba(0, 0, 0, 0.08)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ $color }) =>
      $color ? `linear-gradient(90deg, transparent, ${$color.primary}20, transparent)` : 'transparent'
    };
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: ${({ $color }) => $color ? `${$color.primary}80` : 'rgba(52, 152, 219, 0.8)'};
    box-shadow: 0 16px 40px ${({ $color }) => $color ? `${$color.primary}35` : 'rgba(52, 152, 219, 0.35)'};

    &::before {
      left: 100%;
    }
  }
`;

const TypeCode = styled.div`
  font-size: 1.375rem;
  font-weight: 800;
  color: ${({ $color }) => $color ? $color.primary : '#3498db'};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.625rem;
  letter-spacing: 0.12em;
`;

const TypeName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: -0.01em;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 5rem;
  padding: 2.5rem 2rem;
  color: #5a6c7d;
  font-size: 0.875rem;
  line-height: 1.8;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const Tech16 = () => {
  const [view, setView] = useState('landing'); // 'landing', 'quiz', 'results', 'types', 'type-detail', 'all-roles'
  const [quizData, setQuizData] = useState(null); // { responses, questions }
  const [selectedTypeCode, setSelectedTypeCode] = useState(null);
  const [roleCount, setRoleCount] = useState(null); // Actual role count from database
  const [personalityCode, setPersonalityCode] = useState(null); // Store for all-roles view

  // Fetch role count from database on mount
  useEffect(() => {
    async function fetchRoleCount() {
      try {
        const { count, error } = await supabase
          .from('tech_roles')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setRoleCount(count);
      } catch (error) {
        console.error('Error fetching role count:', error);
        setRoleCount(95); // Fallback to 95 if fetch fails
      }
    }
    fetchRoleCount();
  }, []);

  // Check for saved progress on mount
  useEffect(() => {
    const savedResponses = localStorage.getItem('tech16_quiz_responses');
    if (savedResponses && view === 'landing') {
      // Could prompt user to resume
      console.log('Found saved quiz progress');
    }
  }, [view]);

  const handleStartQuiz = () => {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeQuiz = () => {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (data) => {
    setQuizData(data);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllTypes = () => {
    setView('types');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTypeDetail = (typeCode) => {
    setSelectedTypeCode(typeCode);
    setView('type-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setView('landing');
    setSelectedTypeCode(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setQuizData(null);
    localStorage.removeItem('tech16_quiz_responses');
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllRoles = (personalityCodeParam) => {
    setPersonalityCode(personalityCodeParam);
    setView('all-roles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToResults = () => {
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header component
  const Header = () => (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderLogo onClick={handleBackToLanding}>TECH 16</HeaderLogo>
        <HeaderNav>
          <NavLink onClick={handleBackToLanding} $active={view === 'landing'}>
            Home
          </NavLink>
          <NavLink onClick={handleViewAllTypes} $active={view === 'types' || view === 'type-detail'}>
            Types
          </NavLink>
          <NavLink onClick={() => view === 'quiz' ? null : handleStartQuiz()} $active={view === 'quiz'}>
            Quiz
          </NavLink>
          <HeaderCTA onClick={handleStartQuiz} size="small">
            Take Quiz
          </HeaderCTA>
        </HeaderNav>
      </HeaderContainer>
    </HeaderWrapper>
  );

  if (view === 'quiz') {
    console.log('Rendering Quiz component');
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <GradientBackground>
            <Quiz onComplete={handleQuizComplete} />
          </GradientBackground>
        </PageWrapper>
      </ThemeProvider>
    );
  }

  if (view === 'results' && quizData) {
    console.log('Rendering Results component');
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <Results
            responses={quizData.responses}
            questions={quizData.questions}
            onRetake={handleRetakeQuiz}
            onViewAllRoles={handleViewAllRoles}
          />
        </PageWrapper>
      </ThemeProvider>
    );
  }

  if (view === 'all-roles' && personalityCode) {
    console.log('Rendering AllRolesRanked component');
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <AllRolesRanked
            personalityCode={personalityCode}
            onBack={handleBackToResults}
          />
        </PageWrapper>
      </ThemeProvider>
    );
  }

  if (view === 'types') {
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <PersonalityTypesGallery
            onNavigateToType={handleViewTypeDetail}
            onNavigateToQuiz={handleStartQuiz}
          />
        </PageWrapper>
      </ThemeProvider>
    );
  }

  if (view === 'type-detail' && selectedTypeCode) {
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <PersonalityTypeDetail
            typeCode={selectedTypeCode}
            onBack={handleViewAllTypes}
            onTakeQuiz={handleStartQuiz}
            onViewAllTypes={handleViewAllTypes}
          />
        </PageWrapper>
      </ThemeProvider>
    );
  }

  console.log('Rendering landing page');

  // Landing page
  // Show all 5 personality dimensions
  // Code format: [Focus]-[Interface]-[Change]-[Decision]-[Execution]
  // Focus (position 1) is shown separately as a prefix modifier
  // The 4 core dimensions (positions 2-5) are: Interface, Change, Decision, Execution
  const coreSpectrumKeys = ['interface', 'changeStyle', 'decisionDriver', 'execution'];

  // Color mapping for each of the 10 letter codes - highly distinct colors
  const letterColors = {
    // Focus dimension
    B: '#00bcd4', // Bright Cyan - Builder
    A: '#7b1fa2', // Deep Purple - Analyzer (Focus)
    // Interface dimension
    U: '#2196f3', // Bright Blue - User-Facing
    S: '#37474f', // Dark Slate Gray - Systems-Facing
    // Change/Scope dimension
    E: '#4caf50', // Bright Green - Exploratory
    O: '#795548', // Brown - Operational (very different from green)
    // Decision dimension
    V: '#e91e63', // Hot Pink/Magenta - Vision-Led (very different from red)
    L: '#c62828', // Deep Red - Logic-Led
    // Execution dimension
    A_EXEC: '#ff9800', // Bright Orange - Adaptive (Execution)
    T: '#5d4037', // Dark Brown - Structured
  };

  // Add color information to each spectrum based on letter codes
  const spectrumArray = coreSpectrumKeys.map((key) => ({
    key,
    ...spectrums[key],
    leftColor: letterColors[spectrums[key].poles.leftCode],
    rightColor: letterColors[spectrums[key].poles.rightCode],
  }));

  const exampleTypes = [
    { code: 'U-E-V-A', name: 'The Innovator', fullCode: 'B-U-E-V' },
    { code: 'S-O-L-T', name: 'The Site Reliability Engineer', fullCode: 'B-S-O-L' },
    { code: 'U-O-L-T', name: 'The Frontend Specialist', fullCode: 'B-U-O-L' },
    { code: 'S-E-V-T', name: 'The Infrastructure Pioneer', fullCode: 'B-S-E-V' },
  ];

  const features = [
    {
      icon: '📊',
      title: '40 Thoughtful Questions',
      description: 'Scenario-based questions that reveal your natural working style and preferences.',
    },
    {
      icon: '🎯',
      title: '5 Personality Dimensions',
      description:
        'Measure your position on 4 core dimensions (Interface, Change Style, Decision Driver, Execution) plus a Focus tendency prefix modifier.',
    },
    {
      icon: '💼',
      title: 'Engineering Role Recommendations',
      description:
        `Discover your best-fit engineering roles from ${roleCount || '95'}+ hands-on positions across frontend, backend, mobile, data, ML, security, and more.`,
    },
    {
      icon: '🗺️',
      title: 'Personalized Learning Paths',
      description:
        'Comprehensive skill roadmaps with resources, courses, and recommended learning sequences.',
    },
  ];

  return (
    <ThemeProvider theme={tech16Theme}>
      <PageWrapper>
        <Header />
        <GradientBackground>
          <LandingContainer>
            <Container maxWidth="1200px">
            <Hero>
              <Logo>TECH 16</Logo>
              <Title>Discover Your Tech Personality</Title>
            <Tagline>
              Take the quiz to find your developer personality type and get personalized engineering role recommendations
            </Tagline>

            <CTASection>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button onClick={handleStartQuiz} size="large">
                  Take the Quiz
                </Button>
                <Button onClick={handleViewAllTypes} variant="outline" size="large">
                  Browse All 16 Types
                </Button>
              </div>
              {localStorage.getItem('tech16_quiz_responses') && (
                <div style={{ marginTop: '1rem' }}>
                  <Button onClick={handleResumeQuiz} variant="secondary" size="large">
                    Resume Saved Progress
                  </Button>
                </div>
              )}
            </CTASection>
          </Hero>

          <StatsSection>
            <StatCard $color="#9b59b6">
              <StatNumber $color="#9b59b6">{getAllPersonalityCodes().length}</StatNumber>
              <StatLabel>Personality Types</StatLabel>
            </StatCard>
            <StatCard $color="#3498db">
              <StatNumber $color="#3498db">{coreSpectrumKeys.length}</StatNumber>
              <StatLabel>Core Dimensions</StatLabel>
            </StatCard>
            <StatCard $color="#3498db">
              <StatNumber $color="#3498db">{roleCount !== null ? `${roleCount}+` : '...'}</StatNumber>
              <StatLabel>Tech Roles</StatLabel>
            </StatCard>
          </StatsSection>

          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <FeaturesList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              ))}
            </FeaturesList>
          </Section>

          <Section>
            <SectionTitle>The 4 Core Dimensions</SectionTitle>
            <SectionDescription>
              Your tech personality is defined by 4 core dimensions that shape your unique type code. These represent your fundamental working style, preferences, and approach to engineering.
            </SectionDescription>
            <Grid columns={1}>
              {spectrumArray.map((spectrum) => (
                <SpectrumCard
                  key={spectrum.key}
                  $leftColor={spectrum.leftColor}
                  $rightColor={spectrum.rightColor}
                >
                  <SpectrumName $color={spectrum.leftColor}>{spectrum.name}</SpectrumName>
                  <SpectrumPoles>
                    <Pole>
                      <PoleCode $color={spectrum.leftColor}>{spectrum.poles.leftCode}</PoleCode>
                      <PoleName>{spectrum.poles.left}</PoleName>
                    </Pole>
                    <Divider>↔</Divider>
                    <Pole>
                      <PoleCode $color={spectrum.rightColor}>{spectrum.poles.rightCode}</PoleCode>
                      <PoleName>{spectrum.poles.right}</PoleName>
                    </Pole>
                  </SpectrumPoles>
                  <SpectrumDescription>{spectrum.description}</SpectrumDescription>
                </SpectrumCard>
              ))}
            </Grid>
          </Section>

          <Section>
            <SectionTitle>The Focus Prefix: Builder vs Analyzer</SectionTitle>
            <SectionDescription>
              In addition to your 4-letter core type, you'll receive a Focus prefix (Builder or Analyzer) shown as the first letter. This prefix reveals your fundamental approach to problem-solving - whether you prefer rapid prototyping and iteration (Builder) or thorough analysis and systematic design (Analyzer).
            </SectionDescription>
            <Grid columns={1} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <SpectrumCard
                $leftColor={letterColors.B}
                $rightColor={letterColors.A}
                style={{ transform: 'scale(0.95)' }}
              >
                <SpectrumName $color={letterColors.B}>{spectrums.focus.name}</SpectrumName>
                <SpectrumPoles>
                  <Pole>
                    <PoleCode $color={letterColors.B}>{spectrums.focus.poles.leftCode}</PoleCode>
                    <PoleName>{spectrums.focus.poles.left}</PoleName>
                  </Pole>
                  <Divider>↔</Divider>
                  <Pole>
                    <PoleCode $color={letterColors.A}>{spectrums.focus.poles.rightCode}</PoleCode>
                    <PoleName>{spectrums.focus.poles.right}</PoleName>
                  </Pole>
                </SpectrumPoles>
                <SpectrumDescription>{spectrums.focus.description}</SpectrumDescription>
              </SpectrumCard>
            </Grid>
          </Section>

          <Section>
            <SectionTitle>Example Personality Types</SectionTitle>
            <SectionDescription>
              Explore a few examples from our 16 unique tech personalities. Click any type to learn more about their strengths and ideal engineering roles.
            </SectionDescription>
            <ExampleTypes>
              {exampleTypes.map((type) => {
                const typeColor = getPersonalityColor(type.fullCode);
                return (
                  <TypeCard
                    key={type.code}
                    clickable
                    $color={typeColor}
                    onClick={() => handleViewTypeDetail(type.fullCode)}
                  >
                    <TypeCode as="div">
                      <ColoredPersonalityCode code={type.code} fontSize="1.375rem" />
                    </TypeCode>
                    <TypeName>{type.name}</TypeName>
                  </TypeCard>
                );
              })}
            </ExampleTypes>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button onClick={handleViewAllTypes} variant="outline" size="large">
                View All 16 Personality Types
              </Button>
            </div>
          </Section>

          <CTASection style={{ marginTop: '4rem' }}>
            <Card padding="3rem">
              <SectionTitle>Ready to Discover Your Type?</SectionTitle>
              <SectionDescription>
                Take the 40-question quiz to get your personalized results, engineering role recommendations, and learning
                roadmap for hands-on technical positions.
              </SectionDescription>
              <Button onClick={handleStartQuiz} size="large">
                Take the Quiz Now
              </Button>
            </Card>
          </CTASection>

          <Footer>
            <p>
              Tech 16 Personalities - Discover your developer personality type and ideal engineering role
              <br />
              Focused on hands-on technical roles across {roleCount || '95'}+ engineering positions (not management or executive roles)
              <br />
              <small style={{ opacity: 0.7 }}>Built with React, styled-components, and Recharts</small>
            </p>
          </Footer>
        </Container>
      </LandingContainer>
    </GradientBackground>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Tech16;
