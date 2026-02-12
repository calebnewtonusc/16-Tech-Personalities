import React from 'react';
import styled from 'styled-components';
import { Button, Card, Container } from './components/SharedComponents';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0 4rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 0.875rem;
  margin-bottom: 3rem;
  font-style: italic;
`;

const ContentCard = styled(Card)`
  padding: 3rem;
  max-width: 900px;
  margin: 0 auto 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #5a6c7d;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 2rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #5a6c7d;
  line-height: 1.8;
  margin-bottom: 0.5rem;
`;

const BackButton = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const PrivacyPolicy = ({ onBack }) => {
  return (
    <PageContainer>
      <Container maxWidth="1200px">
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: February 12, 2026</LastUpdated>

        <ContentCard>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <Paragraph>
              Tech 16 Personalities is a student portfolio project created for educational and entertainment purposes.
              This Privacy Policy explains how we collect, use, and protect your information when you use our website.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Information We Collect</SectionTitle>
            <Paragraph>
              We collect minimal information to provide our service:
            </Paragraph>
            <List>
              <ListItem>
                <strong>Quiz Responses:</strong> Your answers to the 40-question personality quiz are stored locally
                in your browser's localStorage to save your progress. This data is not transmitted to our servers.
              </ListItem>
              <ListItem>
                <strong>Usage Data:</strong> We may collect anonymous analytics data (page views, button clicks)
                through standard web analytics tools to improve the user experience.
              </ListItem>
              <ListItem>
                <strong>No Personal Information:</strong> We do not collect names, email addresses, phone numbers,
                or any personally identifiable information. You can use this tool completely anonymously.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>How We Use Your Information</SectionTitle>
            <Paragraph>
              Your quiz responses are used solely to:
            </Paragraph>
            <List>
              <ListItem>Calculate your personality type based on our rule-based algorithm</ListItem>
              <ListItem>Generate career recommendations</ListItem>
              <ListItem>Save your progress locally so you can resume the quiz later</ListItem>
            </List>
            <Paragraph>
              Your data is never shared with third parties, sold, or used for marketing purposes.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Data Storage and Security</SectionTitle>
            <List>
              <ListItem>
                <strong>Local Storage:</strong> Quiz responses are stored in your browser's localStorage.
                You can clear this data at any time through your browser settings.
              </ListItem>
              <ListItem>
                <strong>No Server Storage:</strong> We do not store your quiz responses on our servers or in any database.
              </ListItem>
              <ListItem>
                <strong>No Account Required:</strong> There is no user account system, login, or registration.
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Cookies and Tracking</SectionTitle>
            <Paragraph>
              We may use standard web cookies and analytics tools (such as Google Analytics) to understand how
              visitors use our site. These tools collect anonymous information such as page views, time spent on site,
              and general geographic location (country/city level).
            </Paragraph>
            <Paragraph>
              You can disable cookies in your browser settings if you prefer not to be tracked.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Third-Party Services</SectionTitle>
            <Paragraph>
              Our website is hosted on Vercel and may use their infrastructure services. We may also use:
            </Paragraph>
            <List>
              <ListItem>Supabase for data storage (personality profiles, role data)</ListItem>
              <ListItem>Google Analytics or similar analytics services (optional)</ListItem>
            </List>
            <Paragraph>
              These services have their own privacy policies and data handling practices.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Your Rights</SectionTitle>
            <Paragraph>
              Since we do not collect personal information, there is no data to access, modify, or delete from our servers.
              You can clear your locally stored quiz responses at any time by:
            </Paragraph>
            <List>
              <ListItem>Clearing your browser's localStorage</ListItem>
              <ListItem>Using your browser's "Clear browsing data" feature</ListItem>
              <ListItem>Opening your browser's developer console and running: <code>localStorage.clear()</code></ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Children's Privacy</SectionTitle>
            <Paragraph>
              This website is intended for users aged 13 and older. We do not knowingly collect information from children
              under 13. If you are a parent or guardian and believe your child has used this service, please clear their
              browser's localStorage.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Changes to This Policy</SectionTitle>
            <Paragraph>
              We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will
              reflect the most recent changes.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Contact</SectionTitle>
            <Paragraph>
              This is a student portfolio project. For questions about this Privacy Policy, please visit the project's
              GitHub repository or contact the creator through their portfolio website.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Disclaimer</SectionTitle>
            <Paragraph>
              <strong>Important:</strong> This tool is for entertainment and educational purposes only. It is not a
              scientifically validated psychometric instrument and should not be used for professional career counseling
              or hiring decisions.
            </Paragraph>
          </Section>
        </ContentCard>

        <BackButton>
          <Button onClick={onBack} variant="outline" size="large">
            Back to Home
          </Button>
        </BackButton>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPolicy;
