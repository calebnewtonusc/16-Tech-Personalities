import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase';
import { getBasePersonalityType, generateScoresFromType } from './scoringSupabase';
import { getPersonalityColor, getRoleColor, getDisplayTypeCode, getPersonalityCategory } from './theme';
import { rankRolesByMatch } from './roleMatching';
import { personalities } from './data/personalities';
import { getAllRoles } from './data/roles';
import {
  Button,
  Card,
  Badge,
  GradientBackground,
  Container,
  SectionTitle,
  Grid,
  ColoredPersonalityCode,
} from './components/SharedComponents';

const DetailContainer = styled.div`
  min-height: 100vh;
  padding: 1rem 0 3rem 0;
`;

const BackButton = styled(Button)`
  margin-bottom: 2rem;
`;

const HeroCard = styled(Card)`
  text-align: center;
  padding: 4rem 3rem;
  margin-bottom: 3rem;
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color.primary}20, ${$color.light}10)` :
    'transparent'
  };
  border: 3px solid ${({ $color, theme }) => $color ? `${$color.primary}60` : `${theme.primary}40`};
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
    animation: rotate 25s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    padding: 2.5rem 2rem;
  }
`;

const TypeCode = styled.div`
  font-size: 4.5rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color ? $color.primary : theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.15em;
  font-family: 'Courier New', monospace;
  position: relative;
  z-index: 1;
  text-shadow: 0 3px 15px ${({ $color, theme }) => $color ? `${$color.primary}50` : `${theme.primary}50`};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TypeName = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TypeTagline = styled.p`
  font-size: 1.5rem;
  color: ${({ $color, theme }) => $color ? $color.dark : theme.primary};
  font-style: italic;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: ${({ $color }) => $color ? `${$color}20` : 'rgba(255,255,255,0.1)'};
  border: 2px solid ${({ $color, theme }) => $color || theme.primary};
  border-radius: 24px;
  color: ${({ $color, theme }) => $color || theme.text_primary};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TypeDescription = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const StyledCard = styled(Card)`
  padding: 2.5rem;
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color}12, ${$color}05, transparent)` : 'rgba(255, 255, 255, 0.98)'
  };
  border: 2px solid ${({ $color, theme }) =>
    $color ? `${$color}30` : `${theme.text_primary}10`
  };
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ $color, theme }) =>
      $color ? `linear-gradient(90deg, ${$color}, ${$color}80)` : `linear-gradient(90deg, ${theme.primary}, ${theme.primary}80)`
    };
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px ${({ $color }) =>
      $color ? `${$color}20` : 'rgba(0, 0, 0, 0.12)'
    };
    border-color: ${({ $color, theme }) =>
      $color ? `${$color}60` : `${theme.primary}40`
    };
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.li`
  padding: 1rem 1.25rem;
  padding-left: 3rem;
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.0625rem;
  line-height: 1.7;
  background: ${({ theme, $color }) =>
    $color ? `linear-gradient(135deg, ${$color}08, transparent)` : `${theme.card}dd`
  };
  border-radius: 10px;
  border-left: 3px solid ${({ $color, theme }) => $color || theme.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateX(6px);
    box-shadow: 0 4px 12px ${({ $color, theme }) =>
      $color ? `${$color}25` : `${theme.primary}25`
    };
    border-left-width: 4px;
  }

  &::before {
    content: '✓';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: ${({ $color, theme }) => $color || theme.primary};
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    border-radius: 50%;
    box-shadow: 0 2px 6px ${({ $color, theme }) =>
      $color ? `${$color}40` : `${theme.primary}40`
    };
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
  transition: all 0.3s ease;

  &:hover {
    border-left-width: 6px;
    box-shadow: 0 8px 24px ${({ $roleColor }) => $roleColor ? `${$roleColor.primary}30` : 'rgba(52, 152, 219, 0.3)'};
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const RoleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
`;

const RoleDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const FitBadge = styled(Badge)`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  align-self: flex-start;
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 3rem;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FocusModifierCard = styled(Card)`
  padding: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.08), rgba(123, 31, 162, 0.08));
  border: 2px solid rgba(0, 188, 212, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FocusTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const FocusDescription = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FocusVariant = styled.div`
  padding: 2rem;
  background: ${({ $color }) => $color ? `${$color}12` : 'rgba(255, 255, 255, 0.5)'};
  border: 2px solid ${({ $color }) => $color || '#ccc'};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px ${({ $color }) => $color ? `${$color}30` : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const FocusVariantTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $color }) => $color || '#333'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FocusCode = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ $color }) => $color || '#333'};
  letter-spacing: 0.1em;
`;

const FocusVariantDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const FocusTraitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const FocusTrait = styled.li`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ $color }) => $color || '#333'};
    font-weight: 700;
  }
`;

const PersonalityTypeDetail = ({ typeCode, onBack, onTakeQuiz, onViewAllTypes }) => {
  const [personality, setPersonality] = useState(null);
  const [topRoles, setTopRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const typeColor = getPersonalityColor(typeCode);
  const category = getPersonalityCategory(typeCode);

  useEffect(() => {
    async function loadPersonalityData() {
      try {
        // Convert 5-letter code to 4-letter base code for database lookup
        // e.g., "B-U-E-V-A" -> "B-U-E-V"
        const baseTypeCode = getBasePersonalityType(typeCode);

        // Load personality profile
        const { data: profileData, error: profileError } = await supabase
          .from('personality_profiles')
          .select('*')
          .eq('type_code', baseTypeCode)
          .single();

        let personality = profileData;

        // If database is empty or unavailable, use local data
        if (!personality || profileError) {
          console.log('Using local personality data (Supabase not configured)');
          personality = {
            type_code: baseTypeCode,
            ...personalities[baseTypeCode]
          };
        }
        setPersonality(personality);

        // Load recommended roles and calculate matches dynamically
        const { data: rolesData, error: rolesError } = await supabase
          .from('tech_roles')
          .select('*');

        let roles = rolesData;

        // If database is empty or unavailable, use local data
        if (!roles || roles.length === 0 || rolesError) {
          console.log('Using local roles data (Supabase not configured)');
          const localRoles = getAllRoles();
          roles = localRoles.map((role, index) => ({
            id: index + 1,
            name: role.title,
            category: role.title.includes('Engineer') ? 'Engineering' : 'Technical',
            ...role
          }));
        }

        // Generate approximate scores for this personality type
        const typeScores = generateScoresFromType(baseTypeCode);

        // Use dynamic role matching algorithm (same as quiz results)
        const rankedRoles = rankRolesByMatch(typeScores, roles);

        setTopRoles(rankedRoles.slice(0, 3));
      } catch (error) {
        console.error('Error loading personality data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (typeCode) {
      loadPersonalityData();
    }
  }, [typeCode]);

  if (loading) {
    return (
      <GradientBackground>
        <DetailContainer>
          <Container>
            <BackButton onClick={onBack} variant="outline">
              ← Back
            </BackButton>
            <HeroCard>
              <TypeCode>Loading...</TypeCode>
            </HeroCard>
          </Container>
        </DetailContainer>
      </GradientBackground>
    );
  }

  if (!personality) {
    return (
      <GradientBackground>
        <DetailContainer>
          <Container>
            <BackButton onClick={onBack} variant="outline">
              ← Back
            </BackButton>
            <Card padding="3rem">
              <h2 style={{ textAlign: 'center' }}>Personality Type Not Found</h2>
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                The personality type "{typeCode}" could not be found.
              </p>
            </Card>
          </Container>
        </DetailContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <DetailContainer>
        <Container maxWidth="1200px">
          <BackButton onClick={onBack} variant="outline">
            ← Back to All Types
          </BackButton>

          <HeroCard $color={typeColor}>
            <TypeCode as="div">
              <ColoredPersonalityCode code={getDisplayTypeCode(personality.type_code)} fontSize="4.5rem" />
            </TypeCode>
            <TypeName>{personality.name}</TypeName>
            <TypeTagline $color={typeColor}>{personality.tagline}</TypeTagline>
            {category && (
              <CategoryBadge $color={category.color}>
                {category.name}
              </CategoryBadge>
            )}
            <TypeDescription>{personality.description}</TypeDescription>
          </HeroCard>

          <FocusModifierCard>
            <FocusTitle>The Focus Modifier: Your Problem-Solving Lens</FocusTitle>
            <FocusDescription>
              Your core personality type is represented by the 4-letter code above. When you take the quiz,
              you'll also receive a <strong>Focus modifier</strong> (Builder or Analyzer) as a 5th dimension.
              This acts as a lens through which you express your core traits, shaping whether you prefer rapid execution or deep analysis.
            </FocusDescription>

            <FocusGrid>
              <FocusVariant $color="#00bcd4">
                <FocusVariantTitle $color="#00bcd4">
                  <FocusCode $color="#00bcd4">B</FocusCode> Builder Focus
                </FocusVariantTitle>
                <FocusVariantDescription>
                  As a <strong>Builder-focused {personality.name}</strong>, you emphasize rapid execution and tangible results.
                  You prefer learning by doing and iterating quickly on real implementations.
                </FocusVariantDescription>
                <FocusTraitsList>
                  <FocusTrait $color="#00bcd4">Ships working code fast, refines iteratively</FocusTrait>
                  <FocusTrait $color="#00bcd4">Prefers hands-on experimentation over extensive planning</FocusTrait>
                  <FocusTrait $color="#00bcd4">Motivated by seeing immediate, tangible progress</FocusTrait>
                  <FocusTrait $color="#00bcd4">Comfortable with "good enough" solutions that can be improved later</FocusTrait>
                </FocusTraitsList>
              </FocusVariant>

              <FocusVariant $color="#7b1fa2">
                <FocusVariantTitle $color="#7b1fa2">
                  <FocusCode $color="#7b1fa2">A</FocusCode> Analyzer Focus
                </FocusVariantTitle>
                <FocusVariantDescription>
                  As an <strong>Analyzer-focused {personality.name}</strong>, you emphasize thorough understanding and systematic design.
                  You prefer researching thoroughly before implementation and optimizing for long-term maintainability.
                </FocusVariantDescription>
                <FocusTraitsList>
                  <FocusTrait $color="#7b1fa2">Researches extensively before writing code</FocusTrait>
                  <FocusTrait $color="#7b1fa2">Prefers understanding system architecture deeply first</FocusTrait>
                  <FocusTrait $color="#7b1fa2">Motivated by solving complex problems elegantly</FocusTrait>
                  <FocusTrait $color="#7b1fa2">Focuses on optimal solutions from the start</FocusTrait>
                </FocusTraitsList>
              </FocusVariant>
            </FocusGrid>
          </FocusModifierCard>

          <Section>
            <Grid columns={2}>
              <StyledCard $color="#3498db">
                <SectionTitle style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                  Strengths
                </SectionTitle>
                <List>
                  {personality.strengths?.map((strength, idx) => (
                    <ListItem key={idx} $color="#3498db">{strength}</ListItem>
                  ))}
                </List>
              </StyledCard>

              <StyledCard $color="#9b59b6">
                <SectionTitle style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                  Potential Challenges
                </SectionTitle>
                <List>
                  {personality.challenges?.map((challenge, idx) => (
                    <ListItem key={idx} $color="#9b59b6">{challenge}</ListItem>
                  ))}
                </List>
              </StyledCard>
            </Grid>
          </Section>

          <Section>
            <StyledCard $color="#e67e22">
              <SectionTitle style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                Work Preferences
              </SectionTitle>
              <List>
                {(personality.work_preferences || personality.workPreferences || []).map((pref, idx) => (
                  <ListItem key={idx} $color="#e67e22">{pref}</ListItem>
                ))}
              </List>
            </StyledCard>
          </Section>

          <Section>
            <SectionTitle style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Top Career Paths
            </SectionTitle>
            <Grid columns={1}>
              {topRoles.map((role, idx) => {
                const roleColor = getRoleColor(role.name);
                return (
                  <RoleCard key={role.id} $roleColor={roleColor}>
                    <RoleTitle>#{idx + 1} {role.name}</RoleTitle>
                    <FitBadge variant="success">{role.matchPercentage ?? 15}% Match</FitBadge>
                    <RoleDescription>{role.description}</RoleDescription>
                  </RoleCard>
                );
              })}
            </Grid>
          </Section>

          <CTASection>
            <SectionTitle style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Is This Your Type?
            </SectionTitle>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'inherit' }}>
              Take our quiz to confirm your personality type and get a personalized analysis with detailed career recommendations.
            </p>
            <ButtonGroup>
              <Button onClick={onTakeQuiz} size="large">
                Take the Quiz
              </Button>
              <Button onClick={onViewAllTypes} variant="outline" size="large">
                View All Types
              </Button>
            </ButtonGroup>
          </CTASection>
        </Container>
      </DetailContainer>
    </GradientBackground>
  );
};

export default PersonalityTypeDetail;
