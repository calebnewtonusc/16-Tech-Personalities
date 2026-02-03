import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { calculateScores, generatePersonalityType, getSpectrumLabel, getSpectrumPercentage, getBasePersonalityType } from './scoringSupabase';
import { supabase } from '../supabase';
import { getPersonalityColor, getAccentColor, getRoleColor, getDisplayTypeCode } from './theme';
import { rankRolesByMatch } from './roleMatching';
import { getAllRoles } from './data/roles';
import { personalities } from './data/personalities';
import {
  Button,
  Card,
  Badge,
  GradientBackground,
  Container,
  SectionTitle,
  Grid,
  SpectrumDisplay,
  RadarChartComponent,
  ColoredPersonalityCode,
} from './components/SharedComponents';

const ResultsContainer = styled.div`
  min-height: 100vh;
  padding: 1rem 0 2rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const PersonalityCard = styled(Card)`
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color.primary}20, ${$color.light}10)` :
    `linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.primary}05)`
  };
  border: 2px solid ${({ $color, theme }) => $color ? `${$color.primary}60` : `${theme.primary}40`};
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
      $color ? `radial-gradient(circle, ${$color.lighter}30, transparent 70%)` :
      'transparent'
    };
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const PersonalityCode = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color ? $color.primary : theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.15em;
  font-family: 'Courier New', monospace;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px ${({ $color, theme }) => $color ? `${$color.primary}40` : `${theme.primary}40`};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PersonalityName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PersonalityTagline = styled.p`
  font-size: 1.125rem;
  color: ${({ $color, theme }) => $color ? $color.dark : theme.primary};
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const PersonalityDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FocusModifier = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ $color }) => $color ? `${$color.primary}15` : 'rgba(255,255,255,0.1)'};
  border: 2px solid ${({ $color, theme }) => $color ? `${$color.primary}50` : theme.primary};
  border-radius: 24px;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const FocusLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FocusValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color ? $color.primary : theme.primary};
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const SpectrumSection = styled.div`
  margin-bottom: 3rem;
`;

const ChartSection = styled.div`
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const ListSection = styled.div`
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  line-height: 1.6;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
  }
`;

const RoleCard = styled(Card)`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${({ $roleColor }) => $roleColor ? $roleColor.primary : '#3498db'};
  background: ${({ $roleColor }) =>
    $roleColor ? `linear-gradient(135deg, ${$roleColor.primary}08, transparent)` : 'transparent'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-left-width: 6px;
    box-shadow: 0 8px 24px ${({ $roleColor }) => $roleColor ? `${$roleColor.primary}30` : 'rgba(52, 152, 219, 0.2)'};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const RoleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const FitBadge = styled(Badge)`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
`;

const RoleDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const SkillsList = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled(Badge)`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary + '30'};
`;

const RoadmapSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.text_primary + '20'};
`;

const RoadmapPhase = styled.div`
  margin-bottom: 1rem;
`;

const PhaseTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const PhaseDuration = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.5rem;
`;

const PhaseItems = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};

  li {
    margin-bottom: 0.25rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const ShareSection = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const ModifierExplanation = styled(Card)`
  padding: 2rem;
  background: linear-gradient(135deg, rgba(155, 89, 182, 0.08), rgba(52, 152, 219, 0.08));
  border: 2px solid rgba(155, 89, 182, 0.3);
  margin-bottom: 3rem;
`;

const ModifierGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ModifierBox = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  border: 2px solid ${({ $color }) => $color || '#9b59b6'}40;
`;

const ModifierTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ $color }) => $color || '#9b59b6'};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModifierDescription = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ModifierValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ $color }) => $color ? `${$color}15` : 'rgba(155, 89, 182, 0.15)'};
  border: 1.5px solid ${({ $color }) => $color ? `${$color}40` : 'rgba(155, 89, 182, 0.4)'};
  border-radius: 20px;
  font-weight: 600;
  color: ${({ $color }) => $color || '#9b59b6'};
  font-size: 0.875rem;
`;

// 10-Letter Color System
const DIMENSION_COLORS = {
  builder: '#FF8C42',      // B - Warm Orange
  analyzer: '#4A90E2',     // A - Sky Blue
  userFacing: '#00D4FF',   // U - Bright Cyan
  systemsFacing: '#7B68EE', // S - Medium Slate Blue
  exploratory: '#9B59B6',  // E - Amethyst Purple
  operational: '#2ECC71',  // O - Emerald Green
  visionLed: '#F39C12',    // V - Golden Yellow
  logicLed: '#95A5A6',     // L - Cool Gray
  adaptive: '#E74C3C',     // A - Coral Red
  structured: '#8B4513',   // T - Saddle Brown
};

const Results = ({ responses, questions, onRetake, onViewAllRoles }) => {
  const resultsRef = useRef(null);
  const [personality, setPersonality] = useState(null);
  const [topRoles, setTopRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate scores and personality type
  const scores = calculateScores(responses, questions);
  const personalityCode = generatePersonalityType(scores);
  console.log('Results - Calculated personality:', personalityCode, 'Scores:', scores);

  // Get focus tendency as a modifier (like 16 Personalities' A/T)
  const focusTendency = scores.focus_score <= 50 ? 'Builder' : 'Analyzer';
  // Use the same percentage as shown in spectrum display
  const focusPercentage = focusTendency === 'Analyzer'
    ? Math.round(scores.focus_score)
    : Math.round(100 - scores.focus_score);

  // Get dynamic colors based on personality type
  const personalityColor = getPersonalityColor(personalityCode);
  const accentColor = getAccentColor(personalityCode);

  // Build spectrum breakdown for display
  const spectrumBreakdown = [
    {
      spectrum: 'focus',
      name: 'Technical Focus',
      leftPole: 'Builder',
      rightPole: 'Analyzer',
      score: scores.focus_score,
      leftPercent: Math.round(100 - scores.focus_score),
      rightPercent: Math.round(scores.focus_score),
      dominantPercent: Math.abs(scores.focus_score - 50) * 2,
      leftColor: DIMENSION_COLORS.builder,
      rightColor: DIMENSION_COLORS.analyzer,
    },
    {
      spectrum: 'interface',
      name: 'Interface Preference',
      leftPole: 'User-Facing',
      rightPole: 'Systems-Facing',
      score: scores.interface_score,
      leftPercent: Math.round(100 - scores.interface_score),
      rightPercent: Math.round(scores.interface_score),
      dominantPercent: Math.abs(scores.interface_score - 50) * 2,
      leftColor: DIMENSION_COLORS.userFacing,
      rightColor: DIMENSION_COLORS.systemsFacing,
    },
    {
      spectrum: 'change',
      name: 'Change Orientation',
      leftPole: 'Exploratory',
      rightPole: 'Operational',
      score: scores.change_score,
      leftPercent: Math.round(100 - scores.change_score),
      rightPercent: Math.round(scores.change_score),
      dominantPercent: Math.abs(scores.change_score - 50) * 2,
      leftColor: DIMENSION_COLORS.exploratory,
      rightColor: DIMENSION_COLORS.operational,
    },
    {
      spectrum: 'decision',
      name: 'Decision Style',
      leftPole: 'Vision-Led',
      rightPole: 'Logic-Led',
      score: scores.decision_score,
      leftPercent: Math.round(100 - scores.decision_score),
      rightPercent: Math.round(scores.decision_score),
      dominantPercent: Math.abs(scores.decision_score - 50) * 2,
      leftColor: DIMENSION_COLORS.visionLed,
      rightColor: DIMENSION_COLORS.logicLed,
    },
    {
      spectrum: 'execution',
      name: 'Execution Style',
      leftPole: 'Adaptive',
      rightPole: 'Structured',
      score: scores.execution_score,
      leftPercent: Math.round(100 - scores.execution_score),
      rightPercent: Math.round(scores.execution_score),
      dominantPercent: Math.abs(scores.execution_score - 50) * 2,
      leftColor: DIMENSION_COLORS.adaptive,
      rightColor: DIMENSION_COLORS.structured,
    },
  ];

  // Prepare data for radar chart
  const radarData = spectrumBreakdown.map((spectrum) => ({
    dimension: spectrum.name,
    value: spectrum.score,
  }));

  // Load personality profile from Supabase
  useEffect(() => {
    async function loadPersonality() {
      try {
        // Convert 5-letter code to 4-letter base code for database lookup
        // e.g., "B-U-E-V-A" -> "B-U-E-V"
        const baseTypeCode = getBasePersonalityType(personalityCode);
        console.log('Results - Loading personality for base type:', baseTypeCode);

        const { data, error } = await supabase
          .from('personality_profiles')
          .select('*')
          .eq('type_code', baseTypeCode)
          .single();

        let personality = data;

        // If database is empty or unavailable, use local data
        if (!personality || error) {
          console.log('Results - Using local personality data (Supabase not configured)');
          const localData = personalities[baseTypeCode];
          if (!localData) {
            console.error('Results - Personality not found in local data:', baseTypeCode);
            console.log('Results - Available personalities:', Object.keys(personalities));
            return;
          }
          personality = {
            type_code: baseTypeCode,
            ...localData
          };
        }
        console.log('Results - Loaded personality:', personality.name, personality.type_code);
        setPersonality(personality);
      } catch (error) {
        console.error('Error loading personality:', error);
        // Fallback to local data on error
        const baseTypeCode = getBasePersonalityType(personalityCode);
        const personality = {
          type_code: baseTypeCode,
          ...personalities[baseTypeCode]
        };
        setPersonality(personality);
      }
    }

    if (personalityCode) {
      loadPersonality();
    }
  }, [personalityCode]);

  // Load roles and calculate recommendations using dynamic trait-based matching
  useEffect(() => {
    async function loadRoles() {
      try {
        console.log('Results - Loading roles with personality:', personalityCode);
        // Try to load roles from database
        const { data: rolesData, error: rolesError } = await supabase
          .from('tech_roles')
          .select('*');

        let roles = rolesData;

        // If database is empty or unavailable, use local data
        if (!roles || roles.length === 0 || rolesError) {
          console.log('Results - Using local roles data (Supabase not configured)');
          const localRoles = getAllRoles();
          console.log('Results - Local roles count:', localRoles.length);
          // Map local data format to match database format
          roles = localRoles.map((role, index) => ({
            name: role.title,
            category: role.title.includes('Engineer') ? 'Engineering' : 'Technical',
            ...role
          }));
        }

        console.log('Results - Ranking roles for personality:', personalityCode);
        // Use dynamic trait-based matching instead of pre-defined weights
        // This adapts automatically when scoring algorithm changes
        const rankedRoles = rankRolesByMatch(scores, roles);
        console.log('Results - Top 3 roles:', rankedRoles.slice(0, 3).map(r => ({ name: r.name, match: r.matchPercentage })));

        // Convert matchPercentage (0-100) to fitScore (0-1) for display compatibility
        const top3 = rankedRoles.slice(0, 3).map(role => ({
          ...role,
          fitScore: (role.matchPercentage || 15) / 100, // Convert percentage to decimal
        }));

        setTopRoles(top3);
      } catch (error) {
        console.error('Results - Error loading roles:', error);
        console.error('Results - Error details:', error.message, error.stack);
      } finally {
        console.log('Results - Roles loading complete');
        setLoading(false);
      }
    }

    if (personalityCode && scores) {
      loadRoles();
    }
  }, [personalityCode, scores]);

  const handleShare = () => {
    if (!personality) return;

    const displayCode = getDisplayTypeCode(personalityCode);
    const shareText = `I just discovered my Tech 16 Personality: ${personality.name} (${displayCode})\n${focusTendency} Tendency (${focusPercentage}%)\n\nTop roles for me:\n${topRoles.map((r, i) => `${i + 1}. ${r.name} (${Math.round(r.fitScore * 100)}% fit)`).join('\n')}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'My Tech 16 Personality Results',
          text: shareText,
        })
        .catch(() => {});
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  const handleDownload = () => {
    if (!personality) return;

    const displayCode = getDisplayTypeCode(personalityCode);
    // Simple download as text file
    const content = `
Tech 16 Personalities Results
==============================

Personality Type: ${personality.name}
Code: ${displayCode}
Focus Tendency: ${focusTendency} (${focusPercentage}%)
Tagline: ${personality.tagline}

Description:
${personality.description}

Spectrum Breakdown:
${spectrumBreakdown.map((s) => `- ${s.name}: ${s.leftPole} (${s.leftPercent}%) ↔ ${s.rightPole} (${s.rightPercent}%)`).join('\n')}

Top Role Recommendations:
${topRoles.map((r, i) => `${i + 1}. ${r.name} (${Math.round(r.fitScore * 100)}% fit)\n   ${r.description}`).join('\n\n')}

Strengths:
${personality.strengths.map((s) => `- ${s}`).join('\n')}

Challenges:
${personality.challenges.map((c) => `- ${c}`).join('\n')}

Work Preferences:
${(personality.work_preferences || personality.workPreferences || []).map((w) => `- ${w}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech16-results-${displayCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <GradientBackground>
        <ResultsContainer>
          <Container>
            <Header>
              <Title>Loading Your Results...</Title>
              <Subtitle>Analyzing your personality profile</Subtitle>
            </Header>
          </Container>
        </ResultsContainer>
      </GradientBackground>
    );
  }

  if (!personality) {
    return (
      <GradientBackground>
        <ResultsContainer>
          <Container>
            <Header>
              <Title>Error Loading Results</Title>
              <Subtitle>Unable to find personality profile for {getDisplayTypeCode(personalityCode)}</Subtitle>
            </Header>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={onRetake}>Retake Quiz</Button>
            </div>
          </Container>
        </ResultsContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ResultsContainer ref={resultsRef}>
        <Container maxWidth="1200px">
          <Header>
            <Title>Your Results</Title>
            <Subtitle>Discover your tech personality and career path</Subtitle>
          </Header>

          <PersonalityCard $color={personalityColor}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ColoredPersonalityCode code={getDisplayTypeCode(personalityCode)} fontSize="3.5rem" />
            </div>
            <PersonalityName>{personality.name}</PersonalityName>
            <PersonalityTagline $color={personalityColor}>{personality.tagline}</PersonalityTagline>
            <FocusModifier $color={personalityColor}>
              <FocusLabel>Focus Tendency:</FocusLabel>
              <FocusValue $color={personalityColor}>
                {focusTendency} ({focusPercentage}%)
              </FocusValue>
            </FocusModifier>
            <PersonalityDescription>{personality.description}</PersonalityDescription>
          </PersonalityCard>

          <ModifierExplanation>
            <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              Understanding Your Full Personality Code
            </SectionTitle>
            <SectionDescription style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 1.5rem' }}>
              Your personality is defined by 4 core dimensions (Interface, Change, Decision, Execution) plus 1 modifier suffix (Focus) that shapes how you express your core type.
            </SectionDescription>
            <ModifierGrid>
              <ModifierBox $color={scores.focus_score < 50 ? '#00bcd4' : '#7b1fa2'}>
                <ModifierTitle $color={scores.focus_score < 50 ? '#00bcd4' : '#7b1fa2'}>
                  <span style={{ fontSize: '1.5rem', fontFamily: 'Courier New' }}>
                    {scores.focus_score < 50 ? 'B' : 'A'}
                  </span>
                  {' '}Focus Modifier (Position 5)
                </ModifierTitle>
                <ModifierDescription>
                  The Focus dimension ({focusTendency}) appears as the 5th position in your full code. It reveals your fundamental approach to problem-solving and acts as a lens through which you express your core personality:
                </ModifierDescription>
                <ModifierValue $color={scores.focus_score < 50 ? '#00bcd4' : '#7b1fa2'}>
                  {focusTendency}: {focusPercentage}% tendency
                </ModifierValue>
                <ModifierDescription style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                  <strong>Builders (B)</strong> prefer rapid prototyping, hands-on experimentation, and iterating quickly on real implementations. They learn by doing and prioritize tangible progress.
                </ModifierDescription>
                <ModifierDescription style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                  <strong>Analyzers (A)</strong> prefer thorough research, deep understanding of system architecture, and systematic design before implementation. They prioritize optimal solutions from the start.
                </ModifierDescription>
              </ModifierBox>
            </ModifierGrid>
          </ModifierExplanation>

          <Section>
            <SectionTitle>Your Personality Dimensions</SectionTitle>
            <SectionDescription style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
              Your personality is measured across 5 independent dimensions. The first 4 dimensions (Interface, Change, Decision, Execution) form your core type code. Focus acts as a 5th modifier dimension that influences how you express your core traits.
            </SectionDescription>
            <SpectrumSection>
              {spectrumBreakdown.map((spectrum) => (
                <SpectrumDisplay
                  key={spectrum.spectrum}
                  name={spectrum.name}
                  leftPole={spectrum.leftPole}
                  rightPole={spectrum.rightPole}
                  leftPercent={spectrum.leftPercent}
                  rightPercent={spectrum.rightPercent}
                  leftColor={spectrum.leftColor}
                  rightColor={spectrum.rightColor}
                />
              ))}
            </SpectrumSection>
          </Section>

          <Section>
            <SectionTitle>Personality Radar</SectionTitle>
            <ChartSection>
              <RadarChartComponent data={radarData} height="500px" />
            </ChartSection>
          </Section>

          <Section>
            <Grid columns={2}>
              <Card padding="2rem">
                <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strengths</SectionTitle>
                <List>
                  {personality.strengths.map((strength, idx) => (
                    <ListItem key={idx}>{strength}</ListItem>
                  ))}
                </List>
              </Card>

              <Card padding="2rem">
                <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Potential Challenges
                </SectionTitle>
                <List>
                  {personality.challenges.map((challenge, idx) => (
                    <ListItem key={idx}>{challenge}</ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Section>

          <Section>
            <Card padding="2rem">
              <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Work Preferences
              </SectionTitle>
              <List>
                {(personality.work_preferences || personality.workPreferences || []).map((pref, idx) => (
                  <ListItem key={idx}>{pref}</ListItem>
                ))}
              </List>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Top Role Recommendations</SectionTitle>
            <Grid columns={1}>
              {topRoles.map((role, idx) => {
                const roleColor = getRoleColor(role.name);
                return (
                  <RoleCard key={role.id} $roleColor={roleColor}>
                    <RoleHeader>
                      <RoleTitle>
                        #{idx + 1} {role.name}
                      </RoleTitle>
                      <FitBadge variant="success">{Math.round((role.fitScore ?? 0.15) * 100)}% Fit</FitBadge>
                    </RoleHeader>

                  <RoleDescription>{role.description}</RoleDescription>

                  {role.skills && Array.isArray(role.skills) && role.skills.length > 0 && (
                    <SkillsList>
                      <SkillsTitle>Key Skills</SkillsTitle>
                      <Skills>
                        {role.skills.slice(0, 8).map((skill, skillIdx) => (
                          <SkillTag key={skillIdx}>{skill}</SkillTag>
                        ))}
                      </Skills>
                    </SkillsList>
                  )}

                  {role.roadmap && typeof role.roadmap === 'object' && (
                    <RoadmapSection>
                      <SkillsTitle>Learning Roadmap</SkillsTitle>
                      {['beginner', 'intermediate', 'advanced'].map((level) => {
                        const items = role.roadmap[level];
                        if (!items || !Array.isArray(items) || items.length === 0) return null;
                        return (
                          <RoadmapPhase key={level}>
                            <PhaseTitle>{level.charAt(0).toUpperCase() + level.slice(1)}</PhaseTitle>
                            <PhaseItems>
                              {items.slice(0, 3).map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </PhaseItems>
                          </RoadmapPhase>
                        );
                      })}
                    </RoadmapSection>
                  )}
                </RoleCard>
                );
              })}
            </Grid>
            {onViewAllRoles && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button onClick={() => onViewAllRoles(personalityCode, scores)} variant="outline" size="large">
                  View All Roles Ranked by Match
                </Button>
              </div>
            )}
          </Section>

          <ShareSection>
            <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Share Your Results
            </SectionTitle>
            <ActionButtons>
              <Button onClick={handleShare} size="large">
                Share Results
              </Button>
              <Button onClick={handleDownload} variant="outline" size="large">
                Download Results
              </Button>
              <Button onClick={onRetake} variant="secondary" size="large">
                Retake Quiz
              </Button>
            </ActionButtons>
          </ShareSection>
        </Container>
      </ResultsContainer>
    </GradientBackground>
  );
};

export default Results;
