import { TestSet } from './types';

export const MULTIPLICATION_TABLES = [2, 3, 4, 5, 6, 7, 8, 9];

export const TEST_SETS: TestSet[] = [
  {
    id: 'basic',
    title: 'Cơ bản (Basic)',
    description: 'Làm quen nhẹ nhàng, không giới hạn thời gian.',
    questionCount: 10,
    timeLimitSeconds: 0,
    minPassScore: 80,
    difficulty: 'easy'
  },
  {
    id: 'mixed',
    title: 'Hỗn hợp (Mixed)',
    description: 'Tổng hợp các bảng đã học. Cố gắng nhé!',
    questionCount: 15,
    timeLimitSeconds: 0,
    minPassScore: 85,
    difficulty: 'medium'
  },
  {
    id: 'sprint',
    title: 'Tốc độ (Sprint)',
    description: 'Thử thách 60 giây! Bạn làm được bao nhiêu câu?',
    questionCount: 20,
    timeLimitSeconds: 60,
    minPassScore: 90,
    difficulty: 'hard'
  }
];

export const THEME_COLORS = [
  'bg-pastel-blue',
  'bg-pastel-mint',
  'bg-pastel-peach',
  'bg-pastel-lavender',
  'bg-pastel-yellow',
];

export const MOTIVATIONAL_QUOTES = [
  "Tuyệt vời!",
  "Làm tốt lắm!",
  "Siêu sao toán học!",
  "Cố lên nào!",
  "Gần đúng rồi, thử lại nhé!"
];