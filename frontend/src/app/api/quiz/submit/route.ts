import { NextRequest, NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase';
import { calculateScores, generatePersonalityType, validateResponses } from '@/lib/scoring';
import { QuizSubmitRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: QuizSubmitRequest = await request.json();
    const { responses, quiz_version_id, user_id } = body;

    const supabase = await createServerActionClient();

    // Fetch quiz version to get questions
    const { data: quizVersion, error: versionError } = await supabase
      .from('quiz_versions')
      .select('questions')
      .eq('id', quiz_version_id)
      .single();

    if (versionError || !quizVersion) {
      return NextResponse.json(
        { error: 'Invalid quiz version' },
        { status: 400 }
      );
    }

    const questions = quizVersion.questions.questions;

    // Validate responses
    const validation = validateResponses(responses, questions.length);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Calculate scores
    const scores = calculateScores(responses, questions);

    // Generate personality type
    const personalityType = generatePersonalityType(scores);

    // Insert quiz result
    const { data: result, error: insertError } = await supabase
      .from('quiz_results')
      .insert({
        user_id: user_id || null,
        quiz_version_id,
        focus_score: scores.focus_score,
        interface_score: scores.interface_score,
        change_score: scores.change_score,
        decision_score: scores.decision_score,
        execution_score: scores.execution_score,
        personality_type: personalityType,
        responses: responses,
        is_public: false,
      })
      .select()
      .single();

    if (insertError || !result) {
      console.error('Error inserting quiz result:', insertError);
      return NextResponse.json(
        { error: 'Failed to save quiz result' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result_id: result.id,
      personality_type: personalityType,
      scores,
    });
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
