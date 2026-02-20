import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getQuizProgress } from './scoringSupabase';
import { Button, Card, ProgressBar, GradientBackground, Container } from './components/SharedComponents';
import { supabase } from '../supabase';
import { questions as localQuestions } from './data/questions';

// --- Animations ---
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(52, 152, 219, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// --- Styled Components ---
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
  margin-bottom: 2rem;
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
  margin-bottom: 1.75rem;
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

const ProgressPercentBadge = styled.span`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
`;

const QuestionCardWrapper = styled.div`
  ${({ $direction }) =>
    $direction === 'forward' &&
    css`
      animation: ${slideInFromRight} 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    `}
  ${({ $direction }) =>
    $direction === 'backward' &&
    css`
      animation: ${slideInFromLeft} 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    `}
  ${({ $direction }) =>
    !$direction &&
    css`
      animation: ${fadeInUp} 0.3s ease;
    `}
`;

const QuestionCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 2.5rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  border: 1.5px solid rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
  }
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const QuestionNumber = styled.div`
  font-size: 0.8125rem;
  font-weight: 700;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const QuestionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $answered }) => ($answered ? '#27ae60' : '#95a5a6')};
  background: ${({ $answered }) => ($answered ? 'rgba(39, 174, 96, 0.1)' : 'rgba(149, 165, 166, 0.1)')};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  border: 1px solid ${({ $answered }) => ($answered ? 'rgba(39, 174, 96, 0.3)' : 'rgba(149, 165, 166, 0.2)')};
  transition: all 0.3s ease;
`;

const QuestionText = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  line-height: 1.6;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.875rem;
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
  }
`;

const LikertScale = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.625rem;
  }
`;

const OPTION_COLORS = [
  { bg: '#e74c3c', hover: '#c0392b', text: '#fff', label: 'Strongly Disagree' },
  { bg: '#e67e22', hover: '#d35400', text: '#fff', label: 'Disagree' },
  { bg: '#95a5a6', hover: '#7f8c8d', text: '#fff', label: 'Neutral' },
  { bg: '#2ecc71', hover: '#27ae60', text: '#fff', label: 'Agree' },
  { bg: '#3498db', hover: '#2980b9', text: '#fff', label: 'Strongly Agree' },
];

const LikertOption = styled.button`
  flex: 1;
  padding: 1.25rem 0.5rem;
  background: ${({ $selected, $color }) =>
    $selected ? $color : '#ffffff'};
  color: ${({ $selected }) => ($selected ? '#ffffff' : '#2c3e50')};
  border: 2px solid ${({ $selected, $color }) =>
    $selected ? $color : 'rgba(0, 0, 0, 0.12)'};
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  box-shadow: ${({ $selected, $color }) =>
    $selected ? `0 4px 14px ${$color}55` : '0 2px 6px rgba(0,0,0,0.06)'};
  position: relative;
  outline: none;
  min-height: 72px;

  &:hover {
    background: ${({ $selected, $color }) =>
      $selected ? $color : `${$color}18`};
    border-color: ${({ $color }) => $color};
    transform: translateY(-3px) scale(1.03);
    box-shadow: ${({ $color }) => `0 8px 20px ${$color}40`};
    color: ${({ $selected, $color }) => ($selected ? '#ffffff' : $color)};
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  &:focus-visible {
    outline: 3px solid #3498db;
    outline-offset: 2px;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      animation: ${pulseRing} 0.5s ease;
    `}

  @media (max-width: 768px) {
    padding: 1.125rem 1rem;
    flex-direction: row;
    justify-content: flex-start;
    min-height: 56px;
    text-align: left;
  }
`;

const OptionNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const OptionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    flex: 1;
    font-size: 0.875rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const NavButton = styled(Button)`
  min-width: 120px;

  @media (max-width: 768px) {
    min-width: 0;
    flex: 1;
    padding: 1rem 0.75rem;
    font-size: 1rem;
  }
`;

const KeyboardHint = styled.div`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: #95a5a6;
  font-style: italic;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.4s ease;

  @media (max-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const QuestionDot = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $answered, $current }) => {
    if ($current) return 'linear-gradient(135deg, #3498db, #2980b9)';
    if ($answered) return 'linear-gradient(135deg, rgba(39, 174, 96, 0.35), rgba(39, 174, 96, 0.2))';
    return 'rgba(0, 0, 0, 0.06)';
  }};
  border: 2px solid ${({ $current, $answered }) => {
    if ($current) return '#3498db';
    if ($answered) return 'rgba(39, 174, 96, 0.5)';
    return 'rgba(0, 0, 0, 0.1)';
  }};
  color: ${({ $answered, $current }) => {
    if ($current) return '#ffffff';
    if ($answered) return '#1a7340';
    return '#95a5a6';
  }};
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: ${({ $current, $answered }) => {
    if ($current) return '0 4px 12px rgba(52, 152, 219, 0.4)';
    if ($answered) return '0 2px 6px rgba(39, 174, 96, 0.2)';
    return '0 1px 3px rgba(0, 0, 0, 0.08)';
  }};
  outline: none;

  &:hover {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #ffffff;
    border-color: #3498db;
    transform: scale(1.15);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.35);
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 0.6875rem;
  }
`;

const SaveIndicator = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #27ae60;
  font-weight: 600;
  font-style: italic;
  transition: opacity 0.3s ease;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  gap: 1.5rem;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1.0625rem;
  color: #5a6c7d;
  font-weight: 500;
  text-align: center;
`;

// --- Quiz Component ---
const Quiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [quizVersionId, setQuizVersionId] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [cardKey, setCardKey] = useState(0); // Used to re-trigger animation
  const cardRef = useRef(null);

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

        if (error || !quizVersion || !quizVersion.questions) {
          console.log('Using local questions data (Supabase not configured)');
          const questionsWithOptions = localQuestions.map(q => ({
            ...q,
            options: [
              'Strongly Disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly Agree',
            ],
          }));
          setQuestions(questionsWithOptions);
        } else {
          const quizQuestions = quizVersion.questions.questions || [];
          setQuestions(quizQuestions);
          setQuizVersionId(quizVersion.id);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        const questionsWithOptions = localQuestions.map(q => ({
          ...q,
          options: [
            'Strongly Disagree',
            'Disagree',
            'Neutral',
            'Agree',
            'Strongly Agree',
          ],
        }));
        setQuestions(questionsWithOptions);
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

  const handleAnswer = useCallback((questionId, optionIndex) => {
    setResponses(prev => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const navigateTo = useCallback((newIndex, direction) => {
    setTransitionDirection(direction);
    setCardKey(k => k + 1);
    setCurrentQuestionIndex(newIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      navigateTo(currentQuestionIndex + 1, 'forward');
    }
  }, [currentQuestionIndex, questions.length, navigateTo]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      navigateTo(currentQuestionIndex - 1, 'backward');
    }
  }, [currentQuestionIndex, navigateTo]);

  const handleJumpToQuestion = useCallback((index) => {
    const direction = index > currentQuestionIndex ? 'forward' : 'backward';
    navigateTo(index, direction);
  }, [currentQuestionIndex, navigateTo]);

  const handleSubmit = useCallback(() => {
    if (answeredCount === questions.length) {
      localStorage.removeItem('tech16_quiz_responses');
      onComplete({ responses, questions });
    }
  }, [answeredCount, questions, responses, onComplete]);

  // Keyboard navigation
  useEffect(() => {
    if (!currentQuestion) return;

    const handleKeyDown = (e) => {
      // Number keys 1-5 select answers
      if (e.key >= '1' && e.key <= '5') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < (currentQuestion.options || []).length) {
          handleAnswer(currentQuestion.id, optionIndex);
        }
        return;
      }

      // Arrow keys / Enter for navigation
      if (e.key === 'ArrowRight' || (e.key === 'Enter' && !isLastQuestion)) {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
        return;
      }
      // Enter on last question tries to submit
      if (e.key === 'Enter' && isLastQuestion && canSubmit) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, handleAnswer, handleNext, handlePrevious, handleSubmit, isLastQuestion, canSubmit]);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canSubmit = answeredCount === questions.length;

  if (loading) {
    return (
      <PageWrapper>
        <GradientBackground>
          <QuizContainer>
            <Container maxWidth="900px">
              <LoadingContainer>
                <LoadingSpinner aria-label="Loading quiz questions" />
                <LoadingText>Loading your quiz questions...</LoadingText>
              </LoadingContainer>
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

  const questionOptions = currentQuestion.options || [];
  const isAnswered = responses[currentQuestion.id] !== undefined;

  return (
    <PageWrapper>
      <GradientBackground>
        <QuizContainer>
          <Container maxWidth="900px">
            {/* Progress Section */}
            <ProgressSection>
              <ProgressLabel>
                <span>
                  Question <strong>{currentQuestionIndex + 1}</strong> of <strong>{questions.length}</strong>
                  &nbsp;&nbsp;({answeredCount} answered)
                </span>
                <span>
                  {savedIndicator
                    ? <span style={{ color: '#27ae60', fontWeight: 700 }}>Progress saved</span>
                    : <ProgressPercentBadge>{progress}% complete</ProgressPercentBadge>
                  }
                </span>
              </ProgressLabel>
              <ProgressBar
                progress={progress}
                variant="gradient"
                animated
                height="10px"
                aria-label={`Quiz progress: ${progress}% complete`}
              />
              <SaveIndicator $show={savedIndicator} role="status" aria-live="polite">
                Progress saved automatically
              </SaveIndicator>
            </ProgressSection>

            {/* Question Card with transition animation */}
            <QuestionCardWrapper key={cardKey} $direction={transitionDirection} ref={cardRef}>
              <QuestionCard>
                <QuestionMeta>
                  <QuestionNumber aria-label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}>
                    Question {currentQuestionIndex + 1} / {questions.length}
                  </QuestionNumber>
                  <QuestionBadge $answered={isAnswered} aria-live="polite">
                    {isAnswered ? (
                      <>
                        <span aria-hidden="true">&#10003;</span> Answered
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">&#9675;</span> Unanswered
                      </>
                    )}
                  </QuestionBadge>
                </QuestionMeta>

                <QuestionText id={`question-${currentQuestion.id}`}>
                  {currentQuestion.text}
                </QuestionText>

                <ScaleLabels aria-hidden="true">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </ScaleLabels>

                <LikertScale
                  role="group"
                  aria-labelledby={`question-${currentQuestion.id}`}
                >
                  {questionOptions.map((option, index) => {
                    const colorInfo = OPTION_COLORS[index] || OPTION_COLORS[2];
                    const optionText = typeof option === 'string' ? option : option.text;
                    const isSelected = responses[currentQuestion.id] === index;

                    return (
                      <LikertOption
                        key={index}
                        $selected={isSelected}
                        $color={colorInfo.bg}
                        onClick={() => handleAnswer(currentQuestion.id, index)}
                        aria-label={`${optionText} (press ${index + 1})`}
                        aria-pressed={isSelected}
                        title={`${optionText} — press key ${index + 1}`}
                      >
                        <OptionNumber aria-hidden="true">{index + 1}</OptionNumber>
                        <OptionLabel>{optionText}</OptionLabel>
                      </LikertOption>
                    );
                  })}
                </LikertScale>

                <NavigationButtons>
                  <NavButton
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                    size="large"
                    aria-label="Go to previous question"
                  >
                    &larr; Previous
                  </NavButton>

                  {!isLastQuestion && (
                    <NavButton
                      onClick={handleNext}
                      size="large"
                      aria-label="Go to next question"
                    >
                      Next &rarr;
                    </NavButton>
                  )}

                  {isLastQuestion && (
                    <NavButton
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      size="large"
                      aria-label={
                        canSubmit
                          ? 'Submit quiz and view results'
                          : `Answer all questions first. ${answeredCount} of ${questions.length} answered`
                      }
                    >
                      {canSubmit
                        ? 'View My Results'
                        : `${answeredCount}/${questions.length} Answered`}
                    </NavButton>
                  )}
                </NavigationButtons>

                <KeyboardHint aria-hidden="true">
                  Press <kbd>1</kbd>–<kbd>5</kbd> to select &nbsp;|&nbsp; <kbd>&larr;</kbd> <kbd>&rarr;</kbd> to navigate
                </KeyboardHint>
              </QuestionCard>
            </QuestionCardWrapper>

            {/* Question Navigation Grid */}
            <QuestionGrid role="navigation" aria-label="Question navigation">
              {questions.map((q, idx) => (
                <QuestionDot
                  key={q.id}
                  $answered={responses[q.id] !== undefined}
                  $current={idx === currentQuestionIndex}
                  onClick={() => handleJumpToQuestion(idx)}
                  aria-label={`Jump to question ${idx + 1}${responses[q.id] !== undefined ? ', answered' : ', unanswered'}`}
                  aria-current={idx === currentQuestionIndex ? 'step' : undefined}
                  title={`Question ${idx + 1}${responses[q.id] !== undefined ? ' (answered)' : ''}`}
                >
                  {idx + 1}
                </QuestionDot>
              ))}
            </QuestionGrid>

            {/* Completion banner when all answered */}
            {canSubmit && !isLastQuestion && (
              <div
                role="status"
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(46, 204, 113, 0.05))',
                  border: '2px solid rgba(39, 174, 96, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  animation: `${fadeInUp} 0.4s ease`,
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#27ae60' }}>
                  All questions answered! Navigate to the last question to submit.
                </span>
              </div>
            )}
          </Container>
        </QuizContainer>
      </GradientBackground>
    </PageWrapper>
  );
};

export default Quiz;
