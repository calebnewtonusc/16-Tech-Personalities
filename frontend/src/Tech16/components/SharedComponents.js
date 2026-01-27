import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Button
export const Button = styled.button`
  padding: ${({ size }) => {
    if (size === 'small') return '0.625rem 1.25rem';
    if (size === 'large') return '1rem 2.5rem';
    return '0.875rem 1.75rem';
  }};
  background: ${({ variant, theme }) => {
    if (variant === 'secondary') return theme.card || '#ffffff';
    if (variant === 'outline') return 'transparent';
    return `linear-gradient(135deg, ${theme.primary}, ${theme.primary}dd)`;
  }};
  color: ${({ variant, theme }) => {
    if (variant === 'secondary' || variant === 'outline') return theme.text_primary;
    return 'white';
  }};
  border: ${({ variant, theme }) => {
    if (variant === 'outline') return `2px solid ${theme.text_primary}30`;
    if (variant === 'secondary') return `2px solid ${theme.text_primary}15`;
    return 'none';
  }};
  border-radius: 10px;
  font-weight: 600;
  font-size: ${({ size }) => {
    if (size === 'small') return '0.875rem';
    if (size === 'large') return '1.0625rem';
    return '1rem';
  }};
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${({ variant }) => {
    if (variant === 'outline' || variant === 'secondary') return '0 2px 8px rgba(0, 0, 0, 0.06)';
    return '0 4px 12px rgba(52, 152, 219, 0.25)';
  }};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ variant, theme }) => {
      if (variant === 'outline') return `linear-gradient(135deg, ${theme.primary}15, ${theme.primary}08)`;
      return 'rgba(255, 255, 255, 0.15)';
    }};
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    background: ${({ variant, theme }) => {
      if (variant === 'secondary') return theme.text_primary + '08';
      if (variant === 'outline') return 'transparent';
      return `linear-gradient(135deg, ${theme.primary}ee, ${theme.primary}cc)`;
    }};
    transform: translateY(-2px);
    box-shadow: ${({ variant, theme }) => {
      if (variant === 'outline' || variant === 'secondary') return '0 6px 20px rgba(0, 0, 0, 0.1)';
      return `0 8px 24px ${theme.primary}40`;
    }};
    border-color: ${({ variant, theme }) => {
      if (variant === 'outline') return `${theme.primary}50`;
      if (variant === 'secondary') return `${theme.text_primary}25`;
      return 'transparent';
    }};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Card - Professional, clean design
export const Card = styled.div`
  background: ${({ theme }) => theme.card || '#ffffff'};
  border: 1px solid ${({ theme }) => 'rgba(0, 0, 0, 0.08)'};
  border-radius: 16px;
  padding: ${({ padding }) => padding || '1.5rem'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        border-color: rgba(52, 152, 219, 0.3);
      }
    `}

  ${({ gradient, theme }) =>
    gradient &&
    css`
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(155, 89, 182, 0.05));
      border: 1px solid rgba(52, 152, 219, 0.15);
    `}
`;

// Badge
export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ variant, theme }) => {
    if (variant === 'success') return theme.primary + '20';
    if (variant === 'primary') return theme.primary + '20';
    return theme.text_secondary + '20';
  }};
  color: ${({ variant, theme }) => {
    if (variant === 'success' || variant === 'primary') return theme.primary;
    return theme.text_secondary;
  }};
  display: inline-block;
`;

// Progress Bar
const ProgressBarContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || '8px'};
  background: ${({ theme }) => theme.text_primary + '20'};
  border-radius: ${({ height }) => (height ? `calc(${height} / 2)` : '4px')};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme, variant }) => {
    if (variant === 'gradient') {
      return `linear-gradient(90deg, ${theme.primary}, ${theme.primary}aa)`;
    }
    return theme.primary;
  }};
  width: ${({ progress }) => Math.min(100, Math.max(0, progress))}%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: inherit;
  position: relative;
  overflow: hidden;

  ${({ animated }) =>
    animated &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: ${pulse} 2s ease-in-out infinite;
      }
    `}
`;

export const ProgressBar = ({ progress, height, variant, animated, showLabel }) => {
  return (
    <div style={{ width: '100%' }}>
      <ProgressBarContainer height={height}>
        <ProgressFill progress={progress} variant={variant} animated={animated} />
      </ProgressBarContainer>
      {showLabel && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'inherit' }}>
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Modal
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 2rem;
  max-width: ${({ maxWidth }) => maxWidth || '600px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease;
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text_primary + '10'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

// Tooltip
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  position: absolute;
  z-index: 1000;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.card} transparent transparent transparent;
  }
`;

export const Tooltip = ({ children, text }) => {
  const [show, setShow] = React.useState(false);

  return (
    <TooltipContainer onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <TooltipText show={show}>{text}</TooltipText>
    </TooltipContainer>
  );
};

// Radar Chart Component
const ChartContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || '400px'};
  animation: ${fadeIn} 0.6s ease;
`;

export const RadarChartComponent = ({ data, height }) => {
  return (
    <ChartContainer height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#00000020" />
          <PolarAngleAxis
            dataKey="dimension"
            stroke="#000000"
            tick={{ fill: '#000000', fontSize: 14, fontWeight: 600 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke="#00000040"
            tick={{ fill: '#000000AA', fontSize: 11 }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#3498db"
            fill="#3498db"
            fillOpacity={0.5}
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Spectrum Slider (for displaying scores)
const SpectrumContainer = styled.div`
  margin: 1.5rem 0;
`;

const SpectrumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SpectrumName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SpectrumPoles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Pole = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme, dominant, $color }) => {
    if (dominant && $color) return $color;
    if (dominant) return theme.primary;
    return theme.text_secondary;
  }};
  transition: all 0.3s ease;
`;

const SpectrumBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme, $leftColor, $rightColor }) => {
    if ($leftColor && $rightColor) {
      return `linear-gradient(90deg, ${$leftColor}60, ${theme.text_primary}15, ${$rightColor}60)`;
    }
    return `linear-gradient(90deg, ${theme.primary}40, ${theme.text_primary}20, ${theme.primary}40)`;
  }};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

const SpectrumMarker = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position}%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${({ theme, $markerColor }) => $markerColor || theme.primary};
  border: 3px solid ${({ theme }) => theme.card};
  border-radius: 50%;
  box-shadow: 0 0 12px ${({ $markerColor, theme }) => ($markerColor ? `${$markerColor}80` : `${theme.primary}80`)};
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SpectrumDisplay = ({ name, leftPole, rightPole, leftPercent, rightPercent, leftColor, rightColor }) => {
  const markerPosition = rightPercent; // Position based on right pole percentage (0% = left, 100% = right)
  const dominantSide = rightPercent >= 50 ? 'right' : 'left';
  const markerColor = dominantSide === 'right' ? rightColor : leftColor;

  return (
    <SpectrumContainer>
      <SpectrumName>{name}</SpectrumName>
      <SpectrumPoles>
        <Pole dominant={dominantSide === 'left'} $color={leftColor}>
          {leftPole} ({leftPercent}%)
        </Pole>
        <Pole dominant={dominantSide === 'right'} $color={rightColor}>
          {rightPole} ({rightPercent}%)
        </Pole>
      </SpectrumPoles>
      <SpectrumBar $leftColor={leftColor} $rightColor={rightColor}>
        <SpectrumMarker position={markerPosition} $markerColor={markerColor} />
      </SpectrumBar>
    </SpectrumContainer>
  );
};

// Colored Personality Code Component
export const ColoredCodeContainer = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
`;

export const ColoredLetter = styled.span`
  color: ${({ $color }) => $color || '#333'};
  text-shadow: 0 1px 3px ${({ $color }) => $color ? `${$color}40` : 'rgba(0,0,0,0.2)'};
`;

export const CodeDivider = styled.span`
  color: ${({ theme }) => theme.text_secondary || '#999'};
  opacity: 0.5;
`;

// Colored Personality Code Component
export const ColoredPersonalityCode = ({ code, fontSize = '1em', className }) => {
  // Import getLetterColor locally to avoid circular dependency
  const getLetterColor = (letter, position) => {
    const colors = {
      B: '#00bcd4',
      A_FOCUS: '#7b1fa2',
      U: '#2196f3',
      S: '#37474f',
      E: '#4caf50',
      O: '#795548',
      V: '#e91e63',
      L: '#c62828',
      A_EXEC: '#ff9800',
      T: '#5d4037',
    };

    if (letter === 'A') {
      return position === 0 ? colors.A_FOCUS : colors.A_EXEC;
    }

    const colorMap = {
      B: colors.B,
      U: colors.U,
      S: colors.S,
      E: colors.E,
      O: colors.O,
      V: colors.V,
      L: colors.L,
      T: colors.T,
    };

    return colorMap[letter] || '#333333';
  };

  if (!code) return null;

  const letters = code.split('-');

  return (
    <ColoredCodeContainer className={className} style={{ fontSize }}>
      {letters.map((letter, index) => (
        <React.Fragment key={index}>
          <ColoredLetter $color={getLetterColor(letter, index)}>
            {letter}
          </ColoredLetter>
          {index < letters.length - 1 && <CodeDivider>-</CodeDivider>}
        </React.Fragment>
      ))}
    </ColoredCodeContainer>
  );
};

// Gradient Background - Clean, professional design
export const GradientBackground = styled.div`
  background: ${({ theme }) => theme.bg || '#f8f9fa'};
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: linear-gradient(180deg, rgba(52, 152, 219, 0.03) 0%, transparent 100%);
    pointer-events: none;
  }
`;

// Content Container
export const Container = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Grid Layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns || 3}, 1fr)`};
  gap: ${({ gap }) => gap || '1.5rem'};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Loading Spinner
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.text_primary + '20'};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

// Empty State
const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

export const EmptyState = ({ icon, message }) => (
  <EmptyStateContainer>
    {icon && <EmptyStateIcon>{icon}</EmptyStateIcon>}
    <EmptyStateText>{message}</EmptyStateText>
  </EmptyStateContainer>
);
