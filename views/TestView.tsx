import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Clock, Delete, CornerDownLeft } from 'lucide-react';
import Button from '../components/Button';
import { TEST_SETS, MULTIPLICATION_TABLES } from '../constants';
import { generateTest } from '../services/mathService';
import { Question, TestSet, LionMood, UserProgress, QuestionType } from '../types';

interface TestViewProps {
  user: UserProgress;
  setMood: (m: LionMood) => void;
  onBack: () => void;
  onComplete: (score: number, passed: boolean) => void;
}

const TestView: React.FC<TestViewProps> = ({ user, setMood, onBack, onComplete }) => {
  const [selectedSet, setSelectedSet] = useState<TestSet | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizState, setQuizState] = useState<'MENU' | 'RUNNING' | 'RESULT'>('MENU');
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);
  
  // State for Fill Mode input
  const [fillInput, setFillInput] = useState<string>('');

  // Initialize Quiz
  const startQuiz = (set: TestSet) => {
    setSelectedSet(set);
    const qs = generateTest(MULTIPLICATION_TABLES, set.questionCount);
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setQuizState('RUNNING');
    setMood(LionMood.NEUTRAL);
    setFillInput('');
    if (set.timeLimitSeconds > 0) {
      setTimeLeft(set.timeLimitSeconds);
    }
  };

  // Timer Logic
  useEffect(() => {
    if (quizState === 'RUNNING' && selectedSet?.timeLimitSeconds && selectedSet.timeLimitSeconds > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState, selectedSet]);

  // Common logic to process an answer check
  const processResult = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('CORRECT');
      setMood(LionMood.CHEERING);
    } else {
      setFeedback('WRONG');
      setMood(LionMood.THINKING);
    }

    setTimeout(() => {
      setFeedback(null);
      setMood(LionMood.NEUTRAL);
      setFillInput(''); // Reset input
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(p => p + 1);
      } else {
        finishQuiz(isCorrect ? score + 1 : score);
      }
    }, 1000);
  };

  const handleMCQAnswer = (val: number) => {
    const currentQ = questions[currentIndex];
    processResult(val === currentQ.answer);
  };

  const handleFillSubmit = () => {
    if (!fillInput) return;
    const val = parseInt(fillInput, 10);
    const currentQ = questions[currentIndex];
    processResult(val === currentQ.answer);
  };

  const handleNumpadPress = (num: number) => {
    if (fillInput.length < 3) {
      setFillInput(prev => prev + num.toString());
    }
  };

  const handleBackspace = () => {
    setFillInput(prev => prev.slice(0, -1));
  };

  const finishQuiz = (finalScore?: number) => {
    setQuizState('RESULT');
    const actualScore = finalScore !== undefined ? finalScore : score;
    const passed = selectedSet ? (actualScore / selectedSet.questionCount) * 100 >= selectedSet.minPassScore : false;
    
    if (passed) {
      setMood(LionMood.CHEERING);
    } else {
      setMood(LionMood.SLEEPY);
    }
  };

  if (quizState === 'MENU') {
    return (
      <div className="flex flex-col h-full">
         <div className="flex items-center mb-6 shrink-0">
            <Button variant="ghost" onClick={onBack} icon={<ArrowLeft size={32} />}>
                <span className="text-2xl font-bold">Thoát</span>
            </Button>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 ml-6">Chọn Bộ Đề</h2>
         </div>
         
         {/* Menu Grid */}
         <div className="grid grid-cols-3 gap-8 flex-1 min-h-0">
           {TEST_SETS.map(set => (
             <div key={set.id} className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-transparent hover:border-pastel-blue transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full hover:scale-[1.01]" onClick={() => startQuiz(set)}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-extrabold text-4xl text-gray-700">{set.title}</h3>
                     {set.difficulty === 'easy' && <span className="bg-green-100 text-green-600 text-xl font-bold px-4 py-2 rounded-full">Dễ</span>}
                     {set.difficulty === 'medium' && <span className="bg-yellow-100 text-yellow-600 text-xl font-bold px-4 py-2 rounded-full">Vừa</span>}
                     {set.difficulty === 'hard' && <span className="bg-red-100 text-red-600 text-xl font-bold px-4 py-2 rounded-full">Khó</span>}
                  </div>
                  <p className="text-gray-500 text-2xl leading-relaxed">{set.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-8 text-2xl text-gray-400 font-semibold">
                   <span className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">📝 {set.questionCount} câu</span>
                   <span className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">⏱️ {set.timeLimitSeconds > 0 ? `${set.timeLimitSeconds}s` : 'Vô hạn'}</span>
                </div>
             </div>
           ))}
         </div>
      </div>
    );
  }

  if (quizState === 'RESULT') {
     const percentage = Math.round((score / questions.length) * 100);
     const passed = selectedSet ? percentage >= selectedSet.minPassScore : false;

     return (
       <div className="h-full flex flex-col items-center justify-center">
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl text-center max-w-3xl w-full">
              <h2 className="text-6xl font-black text-gray-700 mb-8">Kết Quả</h2>
              
              <div className={`w-64 h-64 rounded-full flex items-center justify-center text-8xl font-bold mb-10 mx-auto border-[16px] ${passed ? 'border-green-200 bg-green-50 text-green-600' : 'border-red-200 bg-red-50 text-red-600'}`}>
                 {percentage}%
              </div>
              
              <p className="text-4xl text-gray-600 font-bold mb-12">
                 {passed ? "Xuất sắc! Bạn đã làm rất tốt." : "Cố lên! Thử lại lần nữa nhé."}
              </p>

              <div className="grid grid-cols-2 gap-8 w-full mb-12">
                 <div className="bg-gray-50 p-8 rounded-3xl">
                    <div className="text-gray-400 text-2xl font-medium">Số câu đúng</div>
                    <div className="text-6xl font-bold text-gray-700 mt-2">{score}/{questions.length}</div>
                 </div>
                 <div className="bg-gray-50 p-8 rounded-3xl">
                    <div className="text-gray-400 text-2xl font-medium">Trạng thái</div>
                    <div className="text-6xl font-bold text-gray-700 mt-2">{passed ? 'Đạt' : 'Chưa Đạt'}</div>
                 </div>
              </div>

              <div className="flex gap-6">
                 <Button variant="ghost" onClick={() => setQuizState('MENU')} size="lg" className="flex-1 text-2xl py-8 bg-gray-100">
                    Chọn đề khác
                 </Button>
                 <Button variant="primary" onClick={() => onComplete(percentage, passed)} size="lg" className="flex-1 text-2xl py-8 shadow-xl">
                    Hoàn thành
                 </Button>
              </div>
          </div>
       </div>
     );
  }

  const currentQ = questions[currentIndex];
  const isMCQ = currentQ.type === QuestionType.MCQ && currentQ.options && currentQ.options.length > 0;
  
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
       {/* Header Bar */}
       <div className="flex justify-between items-center mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-gray-500 text-2xl border-2 border-gray-100">
               {currentIndex + 1}
             </div>
             <span className="text-gray-400 text-2xl font-medium">/ {questions.length}</span>
          </div>
          
          {selectedSet?.timeLimitSeconds ? (
             <div className={`flex items-center px-8 py-3 rounded-full shadow-sm ${timeLeft < 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-blue-600'}`}>
                <Clock size={32} className="mr-3"/>
                <span className="font-mono font-bold text-4xl">{timeLeft}s</span>
             </div>
          ) : null}
       </div>

       {/* Main Content Area */}
       <div className="flex-1 flex gap-8 w-full min-h-0">
          
          {/* Question Display (Always visible) */}
          <div className={`bg-white rounded-[3rem] shadow-xl p-10 text-center border-4 border-white ring-4 ring-gray-50 flex-1 flex flex-col justify-center items-center relative overflow-hidden transition-all ${isMCQ ? 'w-full' : 'w-1/2'}`}>
             {feedback && (
               <div className={`absolute inset-0 flex items-center justify-center z-10 bg-opacity-95 backdrop-blur-sm ${feedback === 'CORRECT' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {feedback === 'CORRECT' ? <Check size={160} className="text-green-500 animate-bounce" /> : <X size={160} className="text-red-500 animate-wiggle" />}
               </div>
             )}
             <h3 className="text-[6rem] md:text-[9rem] font-black text-gray-700 tracking-tight leading-none">
                {currentQ.factor1} × {currentQ.factor2}
             </h3>
             <div className="text-gray-300 text-6xl font-bold mt-8 flex items-center justify-center gap-4">
               <span>=</span> 
               {/* If Fill mode, show the input box here */}
               {!isMCQ ? (
                 <div className={`w-48 h-24 border-b-8 ${fillInput ? 'text-blue-600 border-blue-400' : 'text-gray-200 border-gray-200'} text-7xl font-mono flex items-center justify-center`}>
                    {fillInput || '?'}
                 </div>
               ) : (
                 <span>?</span>
               )}
             </div>
          </div>

          {/* Interaction Area (Splits based on type) */}
          {isMCQ ? (
             /* MCQ Layout - Bottom Grid usually, but for landscape let's put it below or use the whole right side? 
                Current design: Top/Bottom split. Let's stick to that for MCQ but make the grid huge.
             */
             null 
          ) : (
             /* Fill Layout - Numpad on the right */
             <div className="w-1/2 bg-white p-6 rounded-[3rem] shadow-lg border-4 border-gray-50 flex flex-col h-full">
                <div className="grid grid-cols-3 gap-4 h-full">
                    {[1,2,3,4,5,6,7,8,9].map(n => (
                        <button 
                          key={n} 
                          onClick={() => handleNumpadPress(n)} 
                          className="text-5xl font-bold bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 active:scale-95 transition-all shadow-[0_4px_0_#DBEAFE] active:shadow-none active:translate-y-1"
                        >
                        {n}
                        </button>
                    ))}
                    <button onClick={handleBackspace} className="text-red-400 bg-red-50 rounded-2xl hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center">
                       <Delete size={40} />
                    </button>
                    <button onClick={() => handleNumpadPress(0)} className="text-5xl font-bold bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 active:scale-95 transition-all shadow-[0_4px_0_#DBEAFE] active:shadow-none active:translate-y-1">
                       0
                    </button>
                    <button 
                       onClick={handleFillSubmit} 
                       className={`rounded-2xl flex items-center justify-center transition-all shadow-[0_4px_0_#86EFAC] active:shadow-none active:translate-y-1 ${fillInput ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-gray-100 text-gray-300'}`}
                    >
                       <CornerDownLeft size={40} />
                    </button>
                </div>
             </div>
          )}
       </div>
       
       {/* MCQ Buttons Area (Only if MCQ) */}
       {isMCQ && (
         <div className="h-1/3 mt-8 shrink-0">
            <div className="grid grid-cols-4 gap-6 w-full h-full">
            {currentQ.options!.map((opt, idx) => (
                <button
                key={idx}
                onClick={() => !feedback && handleMCQAnswer(opt)}
                className="bg-white border-b-[8px] border-gray-200 active:border-b-0 active:translate-y-2 hover:bg-blue-50 rounded-[2.5rem] text-7xl font-bold text-gray-600 shadow-lg transition-all disabled:opacity-50 h-full"
                disabled={!!feedback}
                >
                {opt}
                </button>
            ))}
            </div>
         </div>
       )}
    </div>
  );
};

export default TestView;