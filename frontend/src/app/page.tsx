import Link from 'next/link';
import { Sparkles, Brain, Rocket, Target, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
      {/* Navigation */}
      <nav className="border-b border-secondary-200 dark:border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-secondary-900 dark:text-white">
                Tech 16 Personalities
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
              >
                Login
              </Link>
              <Link
                href="/quiz"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-6 animate-bounce-slow">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              Discover Your Unique Tech Personality
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 dark:text-white mb-6 animate-fade-in">
            Find Your Perfect
            <span className="block text-primary-500">Tech Career Path</span>
          </h1>

          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto mb-10 animate-slide-up">
            Take our comprehensive 40-question assessment to uncover your tech personality type
            and get personalized career recommendations with learning roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link
              href="/quiz"
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Start Quiz Now
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white dark:bg-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-700 text-secondary-900 dark:text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all border-2 border-secondary-200 dark:border-secondary-700"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-6 text-sm text-secondary-500 dark:text-secondary-500">
            10-15 minutes • Free forever • No signup required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              40-Question Assessment
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Answer scenario-based questions on a 5-point Likert scale to reveal your true tech preferences and working style.
            </p>
          </div>

          <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              5 Core Spectrums
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Measure your position on Focus, Interface, Change Style, Decision Driver, and Execution dimensions.
            </p>
          </div>

          <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              Personalized Roadmaps
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Get top role recommendations with detailed learning paths from beginner to expert level.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            Three simple steps to discover your tech personality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              Take the Quiz
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Answer 40 questions about your work preferences, decision-making style, and technical approach.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              Get Your Type
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Receive your unique 4-letter tech personality type with detailed insights and strengths.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
              Explore Careers
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Discover your top role matches with learning roadmaps and share your results with others.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 dark:bg-primary-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your Tech Type?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of tech professionals who have found their ideal career path
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-secondary-50 text-primary-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Rocket className="w-5 h-5" />
            Take the Free Quiz
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary-200 dark:border-secondary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-secondary-600 dark:text-secondary-400">
            <p className="mb-4">
              &copy; 2026 Tech 16 Personalities. All rights reserved.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/about" className="hover:text-primary-500">
                About
              </Link>
              <Link href="/privacy" className="hover:text-primary-500">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary-500">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
