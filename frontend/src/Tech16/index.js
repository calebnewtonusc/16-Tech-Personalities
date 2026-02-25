import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BarChart3, Target, Briefcase, Map, AlertTriangle } from 'lucide-react';
import Quiz from './Quiz';
import Results from './Results';
import PersonalityTypesGallery from './PersonalityTypesGallery';
import PersonalityTypeDetail from './PersonalityTypeDetail';
import AllRolesRanked from './AllRolesRanked';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { spectrums } from './data/questions';
import { getAllPersonalityCodes } from './data/personalities';
import { getPersonalityColor } from './theme';
import { Button, Card, GradientBackground, Container, Grid, ColoredPersonalityCode } from './components/SharedComponents';
import { supabase } from '../supabase';

// Tech16-specific theme with Apple-inspired design
const tech16Theme = {
  bg: "#f2f2f7",
  bgLight: "#ffffff",
  primary: "#007AFF",
  primaryLight: "#e8f0fe",
  text_primary: "#1c1c1e",
  text_secondary: "#3a3a3c",
  text_muted: "#8e8e93",
  card: "#ffffff",
  card_light: "#f2f2f7",
  button: "#007AFF",
  white: "#FFFFFF",
  black: "#1c1c1e",
  border: "rgba(60,60,67,0.12)",
  separator: "rgba(60,60,67,0.08)",
  shadow_sm: "0 1px 6px rgba(0,0,0,0.07)",
  shadow_md: "0 4px 24px rgba(0,0,0,0.10)",
};

const PageWrapper = styled.div`
  margin: -8px -8px 0 -8px;
  padding: 0;
  background: #f2f2f7;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(242, 242, 247, 0.88);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.15);
  box-shadow: none;
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HeaderLogoImage = styled.img`
  height: 60px;
  width: auto;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const HeaderLogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1c1c1e;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
  letter-spacing: -0.4px;

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
  color: ${({ $active }) => $active ? '#007AFF' : '#8e8e93'};
  font-size: 1rem;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  &:hover {
    color: #007AFF;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const HeaderCTA = styled(Button)`
  background: #007AFF !important;
  border-radius: 12px !important;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif !important;
  font-weight: 600 !important;
  border: none !important;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  padding: 0 0 4rem 0;
  background: transparent;
`;

const Hero = styled.div`
  text-align: center;
  margin: 0;
  padding: 2.5rem 2rem 6rem 2rem;
  background: transparent;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 4rem 1.5rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoImage = styled.img`
  width: 180px;
  height: 180px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Logo = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1c1c1e;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: -0.6px;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1c1c1e;
  margin-bottom: 1.25rem;
  line-height: 1.15;
  letter-spacing: -0.6px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  color: #3a3a3c;
  margin-bottom: 2.5rem;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 28px 32px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding: 20px 20px;
    border-radius: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #1c1c1e;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.4px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.0625rem;
  color: #3a3a3c;
  text-align: center;
  max-width: 620px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const SpectrumCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  height: 100%;
  border: none;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  background: #ffffff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SpectrumName = styled.h3`
  font-size: 1.1875rem;
  font-weight: 800;
  color: ${({ $color }) => $color || '#007AFF'};
  margin-bottom: 1.25rem;
  letter-spacing: -0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
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
  color: ${({ $color }) => $color || '#007AFF'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  margin-bottom: 0.5rem;
  letter-spacing: -0.3px;
`;

const PoleName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1c1c1e;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const Divider = styled.div`
  font-size: 1.375rem;
  color: #8e8e93;
  font-weight: 300;
`;

const SpectrumDescription = styled.p`
  font-size: 0.9375rem;
  color: #3a3a3c;
  line-height: 1.7;
  margin-top: 1.25rem;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin: 1rem 0;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 2.25rem 1.75rem;
  background: #ffffff;
  border: none;
  border-radius: 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #007AFF;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #8e8e93;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
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
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #ffffff;
  border-radius: 16px;
  border: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.25rem;
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.0625rem;
  font-weight: 700;
  color: #1c1c1e;
  margin-bottom: 0.5rem;
  letter-spacing: -0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const FeatureDescription = styled.p`
  font-size: 0.9375rem;
  color: #3a3a3c;
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
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
  transition: all 0.3s ease;
  background: #ffffff;
  border: none;
  border-radius: 14px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }
`;

const TypeCode = styled.div`
  font-size: 1.375rem;
  font-weight: 800;
  color: ${({ $color }) => $color ? $color.primary : '#007AFF'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  margin-bottom: 0.625rem;
  letter-spacing: -0.3px;
`;

const TypeName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1c1c1e;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const Footer = styled.div`
  margin-top: 2rem;
  padding: 3rem 2rem;
  background: #f2f2f7;
  border-top: 0.5px solid rgba(60, 60, 67, 0.15);
  border-radius: 20px 20px 0 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FooterMain = styled.div`
  text-align: center;
  color: #3a3a3c;
  font-size: 0.9375rem;
  line-height: 1.8;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1c1c1e;
  margin-bottom: 0.75rem;
  letter-spacing: -0.3px;
`;

const FooterDescription = styled.p`
  margin: 0.5rem 0;
  color: #8e8e93;
`;

const BuiltBySection = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.75rem;
  background: #ffffff;
  border-radius: 980px;
  border: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }
`;

const CreatorImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.10);
  border: 2px solid rgba(60, 60, 67, 0.08);
`;

const CreatorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const BuiltByLabel = styled.span`
  font-size: 11px;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const CreatorName = styled.span`
  font-size: 1rem;
  color: #1c1c1e;
  font-weight: 700;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const FooterNote = styled.small`
  display: block;
  margin-top: 1rem;
  color: #8e8e93;
  font-size: 0.8125rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: #007AFF;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  &:hover {
    color: #0056CC;
  }
`;

const DisclaimerSection = styled.div`
  background: rgba(255, 59, 48, 0.06);
  border: 0.5px solid rgba(255, 59, 48, 0.25);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  text-align: center;
`;

const DisclaimerTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #ff3b30;
  margin-bottom: 0.75rem;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const DisclaimerText = styled.p`
  font-size: 0.9375rem;
  color: #3a3a3c;
  line-height: 1.7;
  margin: 0.4rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const Tech16 = () => {
  const [view, setView] = useState('landing'); // 'landing', 'quiz', 'results', 'types', 'type-detail', 'all-roles', 'privacy', 'terms'
  const [quizData, setQuizData] = useState(null); // { responses, questions }
  const [selectedTypeCode, setSelectedTypeCode] = useState(null);
  const [roleCount, setRoleCount] = useState(null); // Actual role count from database
  const [personalityCode, setPersonalityCode] = useState(null); // Store for all-roles view
  const [personalityScores, setPersonalityScores] = useState(null); // Store scores for role matching

  // Fetch role count from database on mount
  useEffect(() => {
    async function fetchRoleCount() {
      try {
        const { count, error } = await supabase
          .from('tech_roles')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setRoleCount(count || 42); // Use 42 if count is undefined
      } catch (error) {
        console.error('Error fetching role count:', error);
        setRoleCount(42); // Fallback after role consolidation
      }
    }
    fetchRoleCount();
  }, []);

  // Check for saved progress on mount
  useEffect(() => {
    const savedResponses = localStorage.getItem('tech16_quiz_responses');
    if (savedResponses && view === 'landing') {
      // Could prompt user to resume
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

  const handleViewAllRoles = (personalityCodeParam, scoresParam) => {
    setPersonalityCode(personalityCodeParam);
    setPersonalityScores(scoresParam);
    setView('all-roles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToResults = () => {
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPrivacy = () => {
    setView('privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTerms = () => {
    setView('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header component
  const Header = () => (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderLogo onClick={handleBackToLanding}>
          <HeaderLogoImage src="/tech16-logo.png" alt="Tech 16 Personalities" />
          <HeaderLogoText>TECH 16</HeaderLogoText>
        </HeaderLogo>
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

  if (view === 'all-roles' && personalityCode && personalityScores) {
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <AllRolesRanked
            personalityCode={personalityCode}
            scores={personalityScores}
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

  if (view === 'privacy') {
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <GradientBackground>
            <PrivacyPolicy onBack={handleBackToLanding} />
          </GradientBackground>
        </PageWrapper>
      </ThemeProvider>
    );
  }

  if (view === 'terms') {
    return (
      <ThemeProvider theme={tech16Theme}>
        <PageWrapper>
          <Header />
          <GradientBackground>
            <TermsOfService onBack={handleBackToLanding} />
          </GradientBackground>
        </PageWrapper>
      </ThemeProvider>
    );
  }


  // Landing page
  // Show all 5 personality dimensions
  // Code format: [Interface]-[Change]-[Decision]-[Execution]-[Focus]
  // Focus (position 5) is shown separately as a suffix modifier
  // The 4 core dimensions (positions 1-4) are: Interface, Change, Decision, Execution
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

  // Example types - one from each category to showcase all 4 colors
  // Format: Interface-Change-Decision-Execution (4 core dimensions, Focus is the 5th modifier)
  const exampleTypes = [
    { code: 'U-E-V-A', name: 'The Innovator', fullCode: 'U-E-V-A' }, // Innovators (purple)
    { code: 'S-O-L-T', name: 'The Site Reliability Engineer', fullCode: 'S-O-L-T' }, // Engineers (orange)
    { code: 'U-O-V-A', name: 'The Product Designer', fullCode: 'U-O-V-A' }, // Crafters (green)
    { code: 'S-E-V-A', name: 'The Infrastructure Pioneer', fullCode: 'S-E-V-A' }, // Architects (blue)
  ];

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: '40 Thoughtful Questions',
      description: 'Scenario-based questions that reveal your natural working style and preferences.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: '5 Personality Dimensions',
      description:
        'Measure your position on 4 core dimensions (Interface, Change Style, Decision Driver, Execution) plus a Focus tendency suffix modifier.',
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Engineering Role Recommendations',
      description:
        `Discover your best-fit engineering roles from ${roleCount || '42'}+ hands-on positions across frontend, backend, mobile, data, ML, security, and more.`,
    },
    {
      icon: <Map className="w-6 h-6" />,
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
              <LogoSection>
                <LogoImage src="/tech16-logo.png" alt="Tech 16 Personalities" />
                <Logo>TECH 16</Logo>
              </LogoSection>
              <Title>Discover Your Tech Personality</Title>
            <Tagline>
              Take the quiz to find your developer personality type and get personalized engineering role recommendations
            </Tagline>

            <DisclaimerSection>
              <DisclaimerTitle><AlertTriangle className="w-5 h-5 inline" /> Important Disclaimer</DisclaimerTitle>
              <DisclaimerText>
                <strong>For entertainment and educational purposes only.</strong> This is a student portfolio project and is NOT a scientifically validated psychometric instrument.
              </DisclaimerText>
              <DisclaimerText>
                This tool is not a substitute for professional career counseling and should not be used for hiring decisions.
              </DisclaimerText>
            </DisclaimerSection>

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
            <StatCard $color="#007AFF">
              <StatNumber $color="#007AFF">{coreSpectrumKeys.length}</StatNumber>
              <StatLabel>Core Dimensions</StatLabel>
            </StatCard>
            <StatCard $color="#007AFF">
              <StatNumber $color="#007AFF">{roleCount ? `${roleCount}+` : '42+'}</StatNumber>
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
            <SectionTitle>The Focus Modifier: Builder vs Analyzer</SectionTitle>
            <SectionDescription>
              In addition to your 4-letter core type, you'll receive a Focus modifier (Builder or Analyzer) shown as the 5th letter (suffix). This modifier reveals your fundamental approach to problem-solving - whether you prefer rapid prototyping and iteration (Builder) or thorough analysis and systematic design (Analyzer).
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
            <FooterContent>
              <BuiltBySection href="https://calebnewton.me" target="_blank" rel="noopener noreferrer">
                <CreatorImage
                  src="/caleb-usc.jpg"
                  alt="Caleb Newton at USC"
                />
                <CreatorInfo>
                  <BuiltByLabel>Built by</BuiltByLabel>
                  <CreatorName>Caleb Newton</CreatorName>
                </CreatorInfo>
              </BuiltBySection>

              <FooterMain>
                <FooterTitle>Tech 16 Personalities</FooterTitle>
                <FooterDescription>
                  Discover your developer personality type and ideal engineering role
                </FooterDescription>
                <FooterDescription>
                  Focused on hands-on technical roles across {roleCount || '42'}+ engineering positions
                </FooterDescription>
                <FooterDescription style={{ fontSize: '0.8125rem', marginTop: '1rem', fontStyle: 'italic' }}>
                  <strong>Disclaimer:</strong> For entertainment and educational purposes only. Not a validated psychometric instrument.
                </FooterDescription>
                <FooterLinks>
                  <FooterLink onClick={handleViewPrivacy}>Privacy Policy</FooterLink>
                  <FooterLink onClick={handleViewTerms}>Terms of Service</FooterLink>
                </FooterLinks>
                <FooterNote>
                  Built with React, styled-components, and Recharts
                </FooterNote>
              </FooterMain>
            </FooterContent>
          </Footer>
        </Container>
      </LandingContainer>
    </GradientBackground>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Tech16;
