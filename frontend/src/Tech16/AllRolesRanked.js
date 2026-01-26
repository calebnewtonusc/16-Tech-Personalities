import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase';
import { getRoleColor } from './theme';
import { Button, Card, GradientBackground, Container } from './components/SharedComponents';

const AllRolesContainer = styled.div`
  min-height: 100vh;
  padding: 1rem 0 3rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: #5a6c7d;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const PersonalityBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: ${({ $color }) => $color ? `${$color}15` : 'rgba(52, 152, 219, 0.15)'};
  color: ${({ $color }) => $color || '#3498db'};
  border-radius: 24px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  font-size: 1.125rem;
  letter-spacing: 0.12em;
  border: 1.5px solid ${({ $color }) => $color ? `${$color}40` : 'rgba(52, 152, 219, 0.4)'};
`;

const RolesList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const RoleCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid ${({ $matchLevel }) => {
    if ($matchLevel === 'excellent') return 'rgba(46, 204, 113, 0.3)';
    if ($matchLevel === 'great') return 'rgba(52, 152, 219, 0.3)';
    if ($matchLevel === 'good') return 'rgba(155, 89, 182, 0.3)';
    return 'rgba(0, 0, 0, 0.08)';
  }};
  background: ${({ $matchLevel }) => {
    if ($matchLevel === 'excellent') return 'linear-gradient(135deg, rgba(46, 204, 113, 0.05), rgba(46, 204, 113, 0.02))';
    if ($matchLevel === 'great') return 'linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(52, 152, 219, 0.02))';
    if ($matchLevel === 'good') return 'linear-gradient(135deg, rgba(155, 89, 182, 0.05), rgba(155, 89, 182, 0.02))';
    return '#ffffff';
  }};

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: ${({ $matchLevel }) => {
      if ($matchLevel === 'excellent') return 'rgba(46, 204, 113, 0.6)';
      if ($matchLevel === 'great') return 'rgba(52, 152, 219, 0.6)';
      if ($matchLevel === 'good') return 'rgba(155, 89, 182, 0.6)';
      return 'rgba(0, 0, 0, 0.15)';
    }};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
  }
`;

const RankBadge = styled.div`
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $rank }) => {
    if ($rank === 1) return 'linear-gradient(135deg, #f1c40f, #f39c12)';
    if ($rank === 2) return 'linear-gradient(135deg, #bdc3c7, #95a5a6)';
    if ($rank === 3) return 'linear-gradient(135deg, #e67e22, #d35400)';
    return 'rgba(0, 0, 0, 0.06)';
  }};
  color: ${({ $rank }) => $rank <= 3 ? '#fff' : '#5a6c7d'};
  border-radius: 50%;
  font-weight: 800;
  font-size: 1.125rem;
  box-shadow: ${({ $rank }) => $rank <= 3 ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const RoleInfo = styled.div`
  flex: 1;
`;

const RoleName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.375rem;
  letter-spacing: -0.01em;
`;

const RoleCategory = styled.div`
  font-size: 0.875rem;
  color: #5a6c7d;
  font-weight: 500;
`;

const MatchScore = styled.div`
  text-align: right;
  min-width: 80px;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
  }
`;

const MatchPercentage = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ $matchLevel }) => {
    if ($matchLevel === 'excellent') return '#16a085';
    if ($matchLevel === 'great') return '#3498db';
    if ($matchLevel === 'good') return '#9b59b6';
    return '#95a5a6';
  }};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.25rem;
`;

const MatchLabel = styled.div`
  font-size: 0.75rem;
  color: #5a6c7d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const BackButton = styled(Button)`
  margin-bottom: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #5a6c7d;
  font-size: 1.125rem;
`;

const AllRolesRanked = ({ personalityCode, onBack }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAndRankRoles() {
      try {
        // Load all roles
        const { data: rolesData, error: rolesError } = await supabase
          .from('tech_roles')
          .select('*');

        if (rolesError) throw rolesError;

        // Load scoring weights for this personality type
        const { data: weights, error: weightsError } = await supabase
          .from('role_scoring_weights')
          .select('*')
          .eq('personality_type', personalityCode);

        if (weightsError) throw weightsError;

        // Calculate fit score for each role
        const weightMap = {};
        weights.forEach(w => {
          weightMap[w.role_id] = w.weight;
        });

        const rolesWithScores = rolesData.map(role => ({
          ...role,
          fitScore: weightMap[role.id] || 0,
          matchPercentage: Math.round((weightMap[role.id] || 0) * 100),
        }));

        // Sort by fit score (highest first)
        const sortedRoles = rolesWithScores.sort((a, b) => b.fitScore - a.fitScore);
        setRoles(sortedRoles);
      } catch (error) {
        console.error('Error loading roles:', error);
      } finally {
        setLoading(false);
      }
    }

    if (personalityCode) {
      loadAndRankRoles();
    }
  }, [personalityCode]);

  const getMatchLevel = (percentage) => {
    if (percentage >= 85) return 'excellent';
    if (percentage >= 70) return 'great';
    if (percentage >= 55) return 'good';
    return 'fair';
  };

  const personalityColor = '#3498db'; // Could import getPersonalityColor if needed

  if (loading) {
    return (
      <GradientBackground>
        <AllRolesContainer>
          <Container maxWidth="900px">
            <LoadingMessage>Loading role recommendations...</LoadingMessage>
          </Container>
        </AllRolesContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <AllRolesContainer>
        <Container maxWidth="900px">
          <BackButton onClick={onBack} variant="outline">
            ← Back to Results
          </BackButton>

          <Header>
            <Title>All Career Paths Ranked</Title>
            <Subtitle>
              All {roles.length} engineering roles ranked by match with your personality type
            </Subtitle>
            <PersonalityBadge $color={personalityColor}>
              {personalityCode.split('-').slice(1).join('-')}
            </PersonalityBadge>
          </Header>

          <RolesList>
            {roles.map((role, index) => {
              const matchLevel = getMatchLevel(role.matchPercentage);
              return (
                <RoleCard key={role.id} $matchLevel={matchLevel}>
                  <RankBadge $rank={index + 1}>{index + 1}</RankBadge>
                  <RoleInfo>
                    <RoleName>{role.name}</RoleName>
                    <RoleCategory>{role.category || 'Engineering'}</RoleCategory>
                  </RoleInfo>
                  <MatchScore>
                    <MatchPercentage $matchLevel={matchLevel}>
                      {role.matchPercentage}%
                    </MatchPercentage>
                    <MatchLabel>Match</MatchLabel>
                  </MatchScore>
                </RoleCard>
              );
            })}
          </RolesList>
        </Container>
      </AllRolesContainer>
    </GradientBackground>
  );
};

export default AllRolesRanked;
