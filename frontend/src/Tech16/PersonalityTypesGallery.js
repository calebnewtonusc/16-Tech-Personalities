import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase';
import { getPersonalityColor, getDisplayTypeCode, getPersonalityCategory, personalityCategories } from './theme';
import { Button, Card, GradientBackground, Container, SectionTitle, Grid, ColoredPersonalityCode } from './components/SharedComponents';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0 4rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3498db, #9b59b6, #e67e22);
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
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const CategorySection = styled.div`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.primary};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CategoryDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TypeCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ $color }) =>
    $color ? `linear-gradient(135deg, ${$color.lighter}, transparent)` : 'transparent'
  };
  border: 2px solid ${({ $color, theme }) => $color ? `${$color.primary}40` : `${theme.text_primary}12`};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ $color, theme }) => $color ? $color.primary : theme.primary};
    box-shadow: 0 12px 32px ${({ $color }) => $color ? `${$color.primary}40` : 'rgba(0,0,0,0.3)'};
  }
`;

const TypeCode = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color ? $color.primary : theme.primary};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
`;

const TypeName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
`;

const TypeTagline = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const TypeBadge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${({ $color }) => $color ? `${$color.primary}20` : '#e0e0e0'};
  color: ${({ $color, theme }) => $color ? $color.dark : theme.text_secondary};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: auto;
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 3rem;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const PersonalityTypesGallery = ({ onNavigateToType, onNavigateToQuiz }) => {
  const [personalities, setPersonalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPersonalities() {
      try {
        const { data, error } = await supabase
          .from('personality_profiles')
          .select('*')
          .order('type_code');

        if (error) throw error;
        setPersonalities(data || []);
      } catch (error) {
        console.error('Error loading personalities:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPersonalities();
  }, []);

  // Group personalities by category
  const categorizedPersonalities = {};
  Object.keys(personalityCategories).forEach(categoryKey => {
    categorizedPersonalities[categoryKey] = [];
  });

  personalities.forEach(personality => {
    const category = getPersonalityCategory(personality.type_code);
    if (category && categorizedPersonalities[category.key]) {
      categorizedPersonalities[category.key].push(personality);
    }
  });

  if (loading) {
    return (
      <GradientBackground>
        <GalleryContainer>
          <Container>
            <Header>
              <Title>Loading Personality Types...</Title>
            </Header>
          </Container>
        </GalleryContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <GalleryContainer>
        <Container maxWidth="1400px">
          <Header>
            <Title>16 Tech Personalities</Title>
            <Subtitle>
              Explore all 16 unique developer personality types, organized into 4 distinct categories. Each type has unique strengths, working styles, and ideal career paths.
            </Subtitle>
          </Header>

          {Object.entries(personalityCategories).map(([categoryKey, category]) => {
            const categoryPersonalities = categorizedPersonalities[categoryKey] || [];
            if (categoryPersonalities.length === 0) return null;

            return (
              <CategorySection key={categoryKey}>
                <CategoryHeader>
                  <CategoryTitle $color={category.color}>
                    {category.name}
                  </CategoryTitle>
                  <CategoryDescription>
                    {category.description}
                  </CategoryDescription>
                </CategoryHeader>

                <Grid columns={4}>
                  {categoryPersonalities.map((personality) => {
                    const typeColor = getPersonalityColor(personality.type_code);
                    // Show only the 4-letter display code (without Focus)
                    const displayCode = getDisplayTypeCode(personality.type_code);

                    return (
                      <TypeCard
                        key={personality.type_code}
                        $color={typeColor}
                        onClick={() => onNavigateToType(personality.type_code)}
                      >
                        <div>
                          <TypeCode as="div">
                            <ColoredPersonalityCode code={displayCode} fontSize="2rem" />
                          </TypeCode>
                          <TypeName>{personality.name}</TypeName>
                          <TypeTagline>{personality.tagline}</TypeTagline>
                        </div>
                        <TypeBadge $color={typeColor}>
                          {category.name}
                        </TypeBadge>
                      </TypeCard>
                    );
                  })}
                </Grid>
              </CategorySection>
            );
          })}

          <CTASection>
            <SectionTitle style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Not Sure Which Type You Are?
            </SectionTitle>
            <Subtitle style={{ marginBottom: '2rem' }}>
              Take our comprehensive 40-question quiz to discover your personality type and get personalized career recommendations.
            </Subtitle>
            <Button onClick={onNavigateToQuiz} size="large">
              Take the Quiz Now
            </Button>
          </CTASection>
        </Container>
      </GalleryContainer>
    </GradientBackground>
  );
};

export default PersonalityTypesGallery;
