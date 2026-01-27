import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuizProgress } from './scoringSupabase';
import { Button, Card, ProgressBar, GradientBackground, Container } from './components/SharedComponents';
import { supabase } from '../supabase';

const PageWrapper = styled.div`
  margin: -8px -8px 0 -8px;
  padding: 0;
`;

const QuizContainer = styled.div`
  min-height: 100vh;
  padding: 1rem 0 3rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.0625rem;
  color: #5a6c7d;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const ProgressSection = styled.div`
  margin-bottom: 2rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  color: #5a6c7d;
  font-weight: 600;
`;

const QuestionCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 2.5rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  border: 1.5px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

const QuestionNumber = styled.div`
  font-size: 0.8125rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const QuestionText = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.1875rem;
  }
`;

const LikertScale = styled.div`
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const LikertOption = styled.button`
  flex: 1;
  padding: 1.25rem 0.75rem;
  background: ${({ selected }) => (selected ? 'linear-gradient(135deg, #3498db, #2980b9)' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#2c3e50')};
  border: 2px solid ${({ selected }) => (selected ? '#3498db' : 'rgba(0, 0, 0, 0.12)')};
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  box-shadow: ${({ selected }) => (selected ? '0 4px 12px rgba(52, 152, 219, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.06)')};

  &:hover {
    background: ${({ selected }) => (selected ? 'linear-gradient(135deg, #3498db, #2980b9)' : 'linear-gradient(135deg, rgba(52, 152, 219, 0.08), rgba(52, 152, 219, 0.04))')};
    border-color: #3498db;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.25);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }
`;

const OptionNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const OptionLabel = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    flex: 1;
  }
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 0.8125rem;
  color: #7f8c8d;
  font-weight: 600;
  font-style: italic;

  span:first-child {
    color: #e74c3c;
  }

  span:last-child {
    color: #3498db;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const QuestionDot = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ answered, current }) => {
    if (current) return 'linear-gradient(135deg, #3498db, #2980b9)';
    if (answered) return 'linear-gradient(135deg, rgba(52, 152, 219, 0.3), rgba(52, 152, 219, 0.15))';
    return 'rgba(0, 0, 0, 0.06)';
  }};
  border: 2px solid ${({ current, answered }) => {
    if (current) return '#3498db';
    if (answered) return 'rgba(52, 152, 219, 0.4)';
    return 'rgba(0, 0, 0, 0.1)';
  }};
  color: ${({ answered, current }) => {
    if (current) return '#ffffff';
    if (answered) return '#2c3e50';
    return '#95a5a6';
  }};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.8125rem;
  font-weight: 700;
  box-shadow: ${({ current, answered }) => {
    if (current) return '0 4px 12px rgba(52, 152, 219, 0.4)';
    if (answered) return '0 2px 6px rgba(52, 152, 219, 0.15)';
    return '0 1px 3px rgba(0, 0, 0, 0.08)';
  }};

  &:hover {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #ffffff;
    border-color: #3498db;
    transform: scale(1.12);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.35);
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 0.75rem;
  }
`;

const SaveIndicator = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  font-style: italic;
`;

const Quiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizVersionId, setQuizVersionId] = useState(null);

  // Load questions from Supabase
  useEffect(() => {
    async function loadQuestions() {
      try {
        const { data: quizVersion, error } = await supabase
          .from('quiz_versions')
          .select('*')
          .eq('is_active', true)
          .order('version', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (quizVersion && quizVersion.questions) {
          const quizQuestions = quizVersion.questions.questions || [];
          setQuestions(quizQuestions);
          setQuizVersionId(quizVersion.id);
        } else {
          console.warn('No quiz version found or invalid format');
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
        });
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  // Load saved responses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tech16_quiz_responses');
    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved responses');
      }
    }
  }, []);

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem('tech16_quiz_responses', JSON.stringify(responses));
      setSavedIndicator(true);
      const timer = setTimeout(() => setSavedIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [responses]);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
  const progress = questions.length > 0 ? getQuizProgress(responses, questions.length) : 0;
  const answeredCount = Object.keys(responses).length;

  const handleAnswer = (questionId, optionIndex) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (answeredCount === questions.length) {
      // Clear saved data
      localStorage.removeItem('tech16_quiz_responses');
      onComplete({ responses, questions });
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canSubmit = answeredCount === questions.length;

  if (loading) {
    return (
      <PageWrapper>
        <GradientBackground>
          <QuizContainer>
            <Container maxWidth="900px">
              <Header>
                <Title>Loading Quiz...</Title>
                <Subtitle>Please wait while we load the questions</Subtitle>
              </Header>
            </Container>
          </QuizContainer>
        </GradientBackground>
      </PageWrapper>
    );
  }

  if (!currentQuestion) {
    return (
      <PageWrapper>
        <GradientBackground>
          <QuizContainer>
            <Container maxWidth="900px">
              <Header>
                <Title>Error Loading Quiz</Title>
                <Subtitle>Please refresh the page to try again</Subtitle>
              </Header>
            </Container>
          </QuizContainer>
        </GradientBackground>
      </PageWrapper>
    );
  }

  // Get options for current question
  const questionOptions = currentQuestion.options || [];

  return (
    <PageWrapper>
      <GradientBackground>
        <QuizContainer>
          <Container maxWidth="900px">
            <ProgressSection>
              <ProgressLabel>
                <span>Progress: {answeredCount} / {questions.length}</span>
                <span>
                  {savedIndicator ? 'Progress saved automatically' : `${progress}%`}
                </span>
              </ProgressLabel>
              <ProgressBar progress={progress} variant="gradient" animated />
            </ProgressSection>

            <QuestionCard>
              <QuestionNumber>
                Question {currentQuestionIndex + 1} of {questions.length}
              </QuestionNumber>
              <QuestionText>{currentQuestion.text}</QuestionText>

              <LikertScale>
                {questionOptions.map((option, index) => (
                  <LikertOption
                    key={index}
                    selected={responses[currentQuestion.id] === index}
                    onClick={() => handleAnswer(currentQuestion.id, index)}
                  >
                    <OptionLabel>{typeof option === 'string' ? option : option.text}</OptionLabel>
                  </LikertOption>
                ))}
              </LikertScale>

              <NavigationButtons>
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  size="large"
                >
                  Previous
                </Button>

                {!isLastQuestion && (
                  <Button onClick={handleNext} size="large">
                    Next
                  </Button>
                )}

                {isLastQuestion && (
                  <Button onClick={handleSubmit} disabled={!canSubmit} size="large">
                    {canSubmit ? 'View Results' : `Answer All Questions (${answeredCount}/${questions.length})`}
                  </Button>
                )}
              </NavigationButtons>
            </QuestionCard>

            <QuestionGrid>
              {questions.map((q, idx) => (
                <QuestionDot
                  key={q.id}
                  answered={responses[q.id] !== undefined}
                  current={idx === currentQuestionIndex}
                  onClick={() => handleJumpToQuestion(idx)}
                  title={`Question ${idx + 1}${responses[q.id] !== undefined ? ' (answered)' : ''}`}
                >
                  {idx + 1}
                </QuestionDot>
              ))}
            </QuestionGrid>
          </Container>
        </QuizContainer>
      </GradientBackground>
    </PageWrapper>
  );
};

export default Quiz;
