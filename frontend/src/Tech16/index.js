import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BarChart3, Target, Briefcase, Map } from 'lucide-react';
import Quiz from './Quiz';
import Results from './Results';
import PersonalityTypesGallery from './PersonalityTypesGallery';
import PersonalityTypeDetail from './PersonalityTypeDetail';
import AllRolesRanked from './AllRolesRanked';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { spectrums } from './data/questions';
import { getAllPersonalityCodes } from './data/personalities';
import { GradientBackground, ColoredPersonalityCode } from './components/SharedComponents';
import { supabase } from '../supabase';

// ─── Global Animations ────────────────────────────────────────────────────────

const GlobalAnimations = createGlobalStyle`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

// ─── Theme ─────────────────────────────────────────────────────────────────────

const tech16Theme = {
  bg: '#f2f2f7',
  bgLight: '#ffffff',
  primary: '#007AFF',
  primaryLight: '#e8f0fe',
  text_primary: '#1c1c1e',
  text_secondary: '#3a3a3c',
  text_muted: '#8e8e93',
  card: '#ffffff',
  card_light: '#f2f2f7',
  button: '#007AFF',
  white: '#FFFFFF',
  black: '#1c1c1e',
  border: 'rgba(60,60,67,0.12)',
  separator: 'rgba(60,60,67,0.08)',
  shadow_sm: '0 1px 6px rgba(0,0,0,0.07)',
  shadow_md: '0 4px 24px rgba(0,0,0,0.10)',
};

// ─── Page Shell ────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  margin: -8px -8px 0 -8px;
  padding: 0;
  background: #f2f2f7;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
`;

// ─── Header ────────────────────────────────────────────────────────────────────

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  background: rgba(242, 242, 247, 0.88);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.15);
  box-shadow: none;
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
`;

const HeaderLogoImage = styled.img`
  height: 32px;
  width: auto;
`;

const HeaderLogoText = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: #1c1c1e;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
  letter-spacing: -0.5px;
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 1.75rem;
  align-items: center;

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? '#007AFF' : '#8e8e93')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  line-height: 1;

  &:hover {
    color: #007AFF;
  }
`;

const HeaderCTA = styled.button`
  background: #007AFF;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: background 0.2s ease, transform 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #0066d6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ─── Hero ──────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem 5rem;
  background: #f2f2f7;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 3rem 1.5rem 4rem;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 720px;
  width: 100%;
`;

const HeroLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8e8e93;
  margin: 0 0 1.5rem;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.05s;
`;

const HeroTitle = styled.h1`
  font-size: clamp(48px, 7vw, 68px);
  font-weight: 900;
  letter-spacing: -2.5px;
  line-height: 1.0;
  color: #1c1c1e;
  margin: 0 0 0.15em;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.12s;
`;

const HeroTitleAccent = styled.h1`
  font-size: clamp(48px, 7vw, 68px);
  font-weight: 900;
  letter-spacing: -2.5px;
  line-height: 1.0;
  margin: 0 0 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.2s;

  span.blue {
    color: #007AFF;
  }
  span.dark {
    color: #1c1c1e;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #3a3a3c;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 2.25rem;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.28s;
`;

const HeroCTARow = styled.div`
  display: flex;
  gap: 0.875rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.36s;
`;

const CTAPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 56px;
  padding: 0 32px;
  background: #007AFF;
  color: #ffffff;
  border: none;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
  white-space: nowrap;

  &:hover {
    background: #0066d6;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 122, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CTAGhost = styled.button`
  display: inline-flex;
  align-items: center;
  height: 56px;
  padding: 0 32px;
  background: transparent;
  color: #007AFF;
  border: 1.5px solid #007AFF;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: background 0.2s ease, transform 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 122, 255, 0.06);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HeroTrustLine = styled.p`
  font-size: 13px;
  color: #8e8e93;
  margin: 1.25rem 0 0;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.44s;
`;

const ResumeCard = styled.div`
  margin: 1.5rem auto 0;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border-radius: 16px;
  padding: 0.875rem 1.5rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  animation: fadeInUp 0.5s ease both;
  animation-delay: 0.5s;

  &:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const ResumeCardText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #007AFF;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const ResumeCardSub = styled.span`
  font-size: 13px;
  color: #8e8e93;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

// ─── Content Wrapper ───────────────────────────────────────────────────────────

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 5rem;

  @media (max-width: 768px) {
    padding: 0 1rem 4rem;
  }
`;

// ─── Section Label + Title Pattern ────────────────────────────────────────────

const SectionLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8e8e93;
  text-align: center;
  margin: 0 0 0.625rem;
`;

const SectionHeading = styled.h2`
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  color: #1c1c1e;
  letter-spacing: -1px;
  line-height: 1.1;
  text-align: center;
  margin: 0 0 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const SectionSubheading = styled.p`
  font-size: 17px;
  color: #3a3a3c;
  line-height: 1.6;
  text-align: center;
  max-width: 560px;
  margin: 0 auto 2.5rem;
  font-weight: 400;
`;

const SectionBlock = styled.div`
  margin-bottom: 4rem;
`;

// ─── Stats Section ─────────────────────────────────────────────────────────────

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }
`;

const StatIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #007AFF;
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: #007AFF;
  letter-spacing: -1.5px;
  line-height: 1;
  margin-bottom: 0.375rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const StatName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1c1c1e;
  margin-bottom: 0.25rem;
`;

const StatDesc = styled.div`
  font-size: 13px;
  color: #8e8e93;
  line-height: 1.4;
`;

// ─── Features Section ──────────────────────────────────────────────────────────

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const FeatureIconCircle = styled.div`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
`;

const FeatureTitle = styled.h4`
  font-size: 17px;
  font-weight: 700;
  color: #1c1c1e;
  margin: 0 0 0.375rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const FeatureDescription = styled.p`
  font-size: 15px;
  color: #3a3a3c;
  line-height: 1.55;
  margin: 0;
`;

// ─── Spectrums Section ─────────────────────────────────────────────────────────

const SpectrumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpectrumCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }
`;

const SpectrumName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1c1c1e;
  margin: 0 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const SpectrumPolesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SpectrumPole = styled.div`
  flex: 1;
  text-align: ${({ $right }) => ($right ? 'right' : 'left')};
`;

const PoleCode = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${({ $color }) => $color || '#007AFF'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  letter-spacing: -0.5px;
  margin-bottom: 0.2rem;
`;

const PoleName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #3a3a3c;
`;

const SpectrumSeparator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const SpectrumLine = styled.div`
  width: 1px;
  height: 18px;
  background: rgba(60, 60, 67, 0.15);
`;

const SpectrumVs = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #8e8e93;
  text-transform: uppercase;
`;

const SpectrumDesc = styled.p`
  font-size: 14px;
  color: #3a3a3c;
  line-height: 1.55;
  margin: 0;
  padding-top: 0.875rem;
  border-top: 0.5px solid rgba(60, 60, 67, 0.12);
`;

// Focus modifier card (single, centered)
const FocusCardWrapper = styled.div`
  max-width: 520px;
  margin: 0 auto;
`;

// ─── Example Types ─────────────────────────────────────────────────────────────

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.13);
    transform: translateY(-4px);
  }
`;

const TypeCodeWrapper = styled.div`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const TypeNameLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1c1c1e;
  margin-bottom: 0.25rem;
`;

const TypeDescLabel = styled.div`
  font-size: 13px;
  color: #8e8e93;
`;

const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: #007AFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: opacity 0.2s ease;
  display: block;
  text-align: center;
  width: 100%;

  &:hover {
    opacity: 0.7;
  }
`;

// ─── CTA Bottom Section ────────────────────────────────────────────────────────

const CTABlock = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  background-image: radial-gradient(circle at 50% 0%, rgba(0, 122, 255, 0.04) 0%, transparent 60%);
  margin-bottom: 4rem;
`;

const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #1c1c1e;
  letter-spacing: -0.75px;
  margin: 0 0 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
`;

const CTASubtitle = styled.p`
  font-size: 17px;
  color: #3a3a3c;
  line-height: 1.6;
  margin: 0 auto 2rem;
  max-width: 480px;
`;

// ─── Footer ────────────────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  background: #f2f2f7;
  border-top: 0.5px solid rgba(60, 60, 67, 0.15);
  padding: 2.5rem 2rem;
`;

const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const BuiltByPill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border-radius: 980px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(60, 60, 67, 0.1);
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const CreatorImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  border: 1.5px solid rgba(60, 60, 67, 0.1);
`;

const CreatorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BuiltByLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #8e8e93;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const CreatorName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1c1c1e;
  letter-spacing: -0.2px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: #8e8e93;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: color 0.2s ease;

  &:hover {
    color: #007AFF;
  }
`;

const FooterDot = styled.span`
  color: rgba(60, 60, 67, 0.3);
  font-size: 12px;
`;

const FooterDisclaimer = styled.p`
  font-size: 12px;
  color: #8e8e93;
  text-align: center;
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
`;

// ─── Component ─────────────────────────────────────────────────────────────────

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
          <HeaderCTA onClick={handleStartQuiz}>
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
          <GlobalAnimations />
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
          <GlobalAnimations />
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
          <GlobalAnimations />
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
          <GlobalAnimations />
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
          <GlobalAnimations />
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
          <GlobalAnimations />
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
          <GlobalAnimations />
          <Header />
          <GradientBackground>
            <TermsOfService onBack={handleBackToLanding} />
          </GradientBackground>
        </PageWrapper>
      </ThemeProvider>
    );
  }

  // ─── Landing page data ──────────────────────────────────────────────────────

  // Code format: [Interface]-[Change]-[Decision]-[Execution]-[Focus]
  // The 4 core dimensions (positions 1-4): Interface, Change, Decision, Execution
  const coreSpectrumKeys = ['interface', 'changeStyle', 'decisionDriver', 'execution'];

  // Color mapping for each of the 10 letter codes
  const letterColors = {
    B: '#00bcd4',    // Bright Cyan - Builder
    A: '#7b1fa2',    // Deep Purple - Analyzer (Focus)
    U: '#2196f3',    // Bright Blue - User-Facing
    S: '#37474f',    // Dark Slate Gray - Systems-Facing
    E: '#4caf50',    // Bright Green - Exploratory
    O: '#795548',    // Brown - Operational
    V: '#e91e63',    // Hot Pink/Magenta - Vision-Led
    L: '#c62828',    // Deep Red - Logic-Led
    A_EXEC: '#ff9800', // Bright Orange - Adaptive (Execution)
    T: '#5d4037',    // Dark Brown - Structured
  };

  // Add color information to each spectrum
  const spectrumArray = coreSpectrumKeys.map((key) => ({
    key,
    ...spectrums[key],
    leftColor: letterColors[spectrums[key].poles.leftCode],
    rightColor: letterColors[spectrums[key].poles.rightCode],
  }));

  // Example types
  const exampleTypes = [
    { code: 'U-E-V-A', name: 'The Innovator',              desc: 'Exploratory · User-Facing', fullCode: 'U-E-V-A' },
    { code: 'S-O-L-T', name: 'The Site Reliability Eng.',  desc: 'Operational · Systems',     fullCode: 'S-O-L-T' },
    { code: 'U-O-V-A', name: 'The Product Designer',       desc: 'Crafted · User-Facing',     fullCode: 'U-O-V-A' },
    { code: 'S-E-V-A', name: 'The Infra Pioneer',          desc: 'Exploratory · Systems',     fullCode: 'S-E-V-A' },
  ];

  const features = [
    {
      icon: <BarChart3 size={20} />,
      title: '40 Thoughtful Questions',
      description: 'Scenario-based questions that reveal your natural working style and preferences.',
    },
    {
      icon: <Target size={20} />,
      title: '5 Personality Dimensions',
      description: 'Measure your position on 4 core dimensions plus a Focus tendency suffix modifier.',
    },
    {
      icon: <Briefcase size={20} />,
      title: 'Engineering Role Recommendations',
      description: `Discover best-fit roles from ${roleCount || '42'}+ hands-on positions across frontend, backend, ML, security, and more.`,
    },
    {
      icon: <Map size={20} />,
      title: 'Personalized Learning Paths',
      description: 'Comprehensive skill roadmaps with resources, courses, and recommended learning sequences.',
    },
  ];

  const hasSavedProgress = !!localStorage.getItem('tech16_quiz_responses');

  // ─── Landing JSX ───────────────────────────────────────────────────────────

  return (
    <ThemeProvider theme={tech16Theme}>
      <GlobalAnimations />
      <PageWrapper>
        <Header />

        {/* ── Hero ── */}
        <HeroSection>
          <HeroGlow />
          <HeroContent>
            <HeroLabel>Personality Assessment for Tech Careers</HeroLabel>
            <HeroTitle>Discover Your</HeroTitle>
            <HeroTitleAccent>
              <span className="blue">Tech</span> <span className="dark">Personality</span>
            </HeroTitleAccent>
            <HeroSubtitle>
              40 questions. 16 personality types. Find your perfect tech role.
            </HeroSubtitle>
            <HeroCTARow>
              <CTAPrimary onClick={handleStartQuiz}>Take the Quiz &rarr;</CTAPrimary>
              <CTAGhost onClick={handleViewAllTypes}>Explore Types</CTAGhost>
            </HeroCTARow>
            <HeroTrustLine>
              16 types &nbsp;&middot;&nbsp; {roleCount || 42} tech roles &nbsp;&middot;&nbsp; 40 questions &nbsp;&middot;&nbsp; Free forever
            </HeroTrustLine>
            {hasSavedProgress && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResumeCard onClick={handleResumeQuiz}>
                  <div>
                    <ResumeCardText>Continue Quiz &rarr;</ResumeCardText>
                    <br />
                    <ResumeCardSub>You have saved progress</ResumeCardSub>
                  </div>
                </ResumeCard>
              </div>
            )}
          </HeroContent>
        </HeroSection>

        <ContentWrapper>

          {/* ── Stats ── */}
          <StatsGrid>
            <StatCard>
              <StatIconCircle>
                <BarChart3 size={20} />
              </StatIconCircle>
              <StatNumber>{getAllPersonalityCodes().length}</StatNumber>
              <StatName>Personality Types</StatName>
              <StatDesc>Unique tech personality profiles mapped to real engineering roles</StatDesc>
            </StatCard>
            <StatCard>
              <StatIconCircle>
                <Target size={20} />
              </StatIconCircle>
              <StatNumber>{coreSpectrumKeys.length}</StatNumber>
              <StatName>Core Dimensions</StatName>
              <StatDesc>Behavioral axes that define your working style and preferences</StatDesc>
            </StatCard>
            <StatCard>
              <StatIconCircle>
                <Briefcase size={20} />
              </StatIconCircle>
              <StatNumber>{roleCount ? `${roleCount}+` : '42+'}</StatNumber>
              <StatName>Tech Roles</StatName>
              <StatDesc>Hands-on positions ranked and matched to your personality</StatDesc>
            </StatCard>
          </StatsGrid>

          {/* ── How It Works ── */}
          <SectionBlock>
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>The 5 Dimensions That Define You</SectionHeading>
            <SectionSubheading>
              Each question reveals a layer of how you think, build, and collaborate in tech environments.
            </SectionSubheading>
            <FeaturesGrid>
              {features.map((feature, idx) => (
                <FeatureCard key={idx}>
                  <FeatureIconCircle>{feature.icon}</FeatureIconCircle>
                  <div>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </div>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </SectionBlock>

          {/* ── 4 Core Dimensions ── */}
          <SectionBlock>
            <SectionLabel>The 4 Core Dimensions</SectionLabel>
            <SectionHeading>What Shapes Your Type Code</SectionHeading>
            <SectionSubheading>
              Your personality is defined by 4 dimensions that reveal your fundamental working style, preferences, and approach to engineering.
            </SectionSubheading>
            <SpectrumGrid>
              {spectrumArray.map((spectrum) => (
                <SpectrumCard key={spectrum.key}>
                  <SpectrumName>{spectrum.name}</SpectrumName>
                  <SpectrumPolesRow>
                    <SpectrumPole>
                      <PoleCode $color={spectrum.leftColor}>{spectrum.poles.leftCode}</PoleCode>
                      <PoleName>{spectrum.poles.left}</PoleName>
                    </SpectrumPole>
                    <SpectrumSeparator>
                      <SpectrumLine />
                      <SpectrumVs>vs</SpectrumVs>
                      <SpectrumLine />
                    </SpectrumSeparator>
                    <SpectrumPole $right>
                      <PoleCode $color={spectrum.rightColor}>{spectrum.poles.rightCode}</PoleCode>
                      <PoleName>{spectrum.poles.right}</PoleName>
                    </SpectrumPole>
                  </SpectrumPolesRow>
                  <SpectrumDesc>{spectrum.description}</SpectrumDesc>
                </SpectrumCard>
              ))}
            </SpectrumGrid>
          </SectionBlock>

          {/* ── Focus Modifier ── */}
          <SectionBlock>
            <SectionLabel>The Focus Modifier</SectionLabel>
            <SectionHeading>Builder vs Analyzer</SectionHeading>
            <SectionSubheading>
              In addition to your 4-letter core type, you'll receive a Focus modifier as the 5th letter, revealing your fundamental approach to problem-solving.
            </SectionSubheading>
            <FocusCardWrapper>
              <SpectrumCard>
                <SpectrumName>{spectrums.focus.name}</SpectrumName>
                <SpectrumPolesRow>
                  <SpectrumPole>
                    <PoleCode $color={letterColors.B}>{spectrums.focus.poles.leftCode}</PoleCode>
                    <PoleName>{spectrums.focus.poles.left}</PoleName>
                  </SpectrumPole>
                  <SpectrumSeparator>
                    <SpectrumLine />
                    <SpectrumVs>vs</SpectrumVs>
                    <SpectrumLine />
                  </SpectrumSeparator>
                  <SpectrumPole $right>
                    <PoleCode $color={letterColors.A}>{spectrums.focus.poles.rightCode}</PoleCode>
                    <PoleName>{spectrums.focus.poles.right}</PoleName>
                  </SpectrumPole>
                </SpectrumPolesRow>
                <SpectrumDesc>{spectrums.focus.description}</SpectrumDesc>
              </SpectrumCard>
            </FocusCardWrapper>
          </SectionBlock>

          {/* ── Example Types ── */}
          <SectionBlock>
            <SectionLabel>Example Types</SectionLabel>
            <SectionHeading>See Who You Might Be</SectionHeading>
            <SectionSubheading>
              A glimpse at four of the 16 unique tech personalities. Click any to explore strengths and ideal roles.
            </SectionSubheading>
            <TypesGrid>
              {exampleTypes.map((type) => {
                return (
                  <TypeCard
                    key={type.code}
                    onClick={() => handleViewTypeDetail(type.fullCode)}
                  >
                    <TypeCodeWrapper>
                      <ColoredPersonalityCode code={type.code} fontSize="24px" />
                    </TypeCodeWrapper>
                    <TypeNameLabel>{type.name}</TypeNameLabel>
                    <TypeDescLabel>{type.desc}</TypeDescLabel>
                  </TypeCard>
                );
              })}
            </TypesGrid>
            <ViewAllLink onClick={handleViewAllTypes}>
              View All 16 Types &rarr;
            </ViewAllLink>
          </SectionBlock>

          {/* ── Bottom CTA ── */}
          <CTABlock>
            <CTATitle>Ready to find your type?</CTATitle>
            <CTASubtitle>
              Take the 40-question quiz and get your personalized results, role recommendations, and learning roadmap.
            </CTASubtitle>
            <CTAPrimary onClick={handleStartQuiz}>Take the Quiz &rarr;</CTAPrimary>
          </CTABlock>

        </ContentWrapper>

        {/* ── Footer ── */}
        <FooterWrapper>
          <FooterInner>
            <BuiltByPill href="https://calebnewton.me" target="_blank" rel="noopener noreferrer">
              <CreatorImage src="/caleb-usc.jpg" alt="Caleb Newton at USC" />
              <CreatorInfo>
                <BuiltByLabel>Built by</BuiltByLabel>
                <CreatorName>Caleb Newton</CreatorName>
              </CreatorInfo>
            </BuiltByPill>
            <FooterLinks>
              <FooterLink onClick={handleViewPrivacy}>Privacy</FooterLink>
              <FooterDot>&middot;</FooterDot>
              <FooterLink onClick={handleViewTerms}>Terms</FooterLink>
            </FooterLinks>
            <FooterDisclaimer>
              For entertainment and educational purposes only. Not a scientifically validated psychometric instrument. Not a substitute for professional career counseling and should not be used for hiring decisions.
            </FooterDisclaimer>
          </FooterInner>
        </FooterWrapper>

      </PageWrapper>
    </ThemeProvider>
  );
};

export default Tech16;
