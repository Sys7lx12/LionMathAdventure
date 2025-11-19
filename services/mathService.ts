import { Question, QuestionType } from '../types';

export const generateQuestion = (tables: number[], type: QuestionType = QuestionType.MCQ): Question => {
  const factor1 = tables[Math.floor(Math.random() * tables.length)];
  const factor2 = Math.floor(Math.random() * 10) + 1; // 1-10
  const answer = factor1 * factor2;

  const question: Question = {
    id: `q-${Date.now()}-${Math.random()}`,
    type: type,
    factor1,
    factor2,
    answer,
  };

  if (type === QuestionType.MCQ) {
    const options = new Set<number>();
    options.add(answer);
    
    let attempts = 0;
    while (options.size < 4 && attempts < 50) {
      attempts++;
      // Generate distractors close to the answer
      const offset = Math.floor(Math.random() * 8) + 1; // 1-8 range
      const sign = Math.random() > 0.5 ? 1 : -1;
      const wrong = answer + (offset * sign);
      
      if (wrong > 0 && wrong !== answer) {
        options.add(wrong);
      }
    }
    
    // If we still don't have 4 options (rare edge case), add arbitrary ones
    while (options.size < 4) {
       options.add(answer + options.size + 10);
    }

    // Fisher-Yates Shuffle for uniform distribution
    const optionsArray = Array.from(options);
    for (let i = optionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }
    question.options = optionsArray;
  }

  return question;
};

export const generateTest = (tables: number[], count: number): Question[] => {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    // Mix types roughly: 60% MCQ, 40% Fill
    const type = Math.random() > 0.4 ? QuestionType.MCQ : QuestionType.FILL;
    questions.push(generateQuestion(tables, type));
  }
  return questions;
};