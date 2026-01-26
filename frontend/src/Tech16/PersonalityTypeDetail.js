import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase';
import { getBasePersonalityType } from './scoringSupabase';
import { getPersonalityColor, getRoleColor, getDisplayTypeCode, getPersonalityCategory } from './theme';
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

        if (profileError) throw profileError;
        setPersonality(profileData);

        // Load recommended roles
        const { data: roles, error: rolesError } = await supabase
          .from('tech_roles')
          .select('*');

        if (rolesError) throw rolesError;

        const { data: weights, error: weightsError } = await supabase
          .from('role_scoring_weights')
          .select('*')
          .eq('personality_type', baseTypeCode);

        if (weightsError) throw weightsError;

        const rolesWithScores = roles.map(role => {
          const weightEntry = weights?.find(w => w.role_id === role.id);
          const fitScore = weightEntry ? weightEntry.weight : 0;
          return { ...role, fitScore };
        });

        const sortedRoles = rolesWithScores.sort((a, b) => b.fitScore - a.fitScore);
        setTopRoles(sortedRoles.slice(0, 3));
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
                {personality.work_preferences?.map((pref, idx) => (
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
                    <FitBadge variant="success">{Math.round(role.fitScore * 100)}% Match</FitBadge>
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
