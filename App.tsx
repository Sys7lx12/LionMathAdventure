import React, { useState, useEffect } from 'react';
import { ViewState, LionMood, UserProgress } from './types';
import LionAvatar from './components/LionAvatar';
import HomeView from './views/HomeView';
import LearnView from './views/LearnView';
import TestView from './views/TestView';
import ProfileView from './views/ProfileView';
import { User } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mood, setMood] = useState<LionMood>(LionMood.HAPPY);
  const [user, setUser] = useState<UserProgress>({
    name: 'Bé Ngoan',
    grade: 2,
    stars: 12,
    unlockedTables: [2],
    bestTestScores: {},
    totalQuestionsAnswered: 45,
    avatarSkin: 'default'
  });

  // Simulate onboarding check (simplified)
  useEffect(() => {
    // In real app, check localstorage
  }, []);

  const handleNavigate = (target: string) => {
    switch (target) {
      case 'HOME': setView(ViewState.HOME); setMood(LionMood.HAPPY); break;
      case 'LEARN': setView(ViewState.LEARN_LESSON); setMood(LionMood.HAPPY); break;
      case 'PRACTICE': setView(ViewState.TEST_MENU); setMood(LionMood.CHEERING); break; // Reusing test menu for practice simplified MVP
      case 'TEST': setView(ViewState.TEST_MENU); setMood(LionMood.THINKING); break;
      case 'PROFILE': setView(ViewState.PROFILE); setMood(LionMood.HAPPY); break;
      default: setView(ViewState.HOME);
    }
  };

  const handleTestComplete = (percentage: number, passed: boolean) => {
    if (passed) {
      setUser(prev => ({
        ...prev,
        stars: prev.stars + 5,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 10 // approximated
      }));
    }
    // Stay on result screen, handled inside TestView
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] flex flex-col items-center font-sans text-slate-700 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pastel-blue rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-pastel-peach rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Header / Lion Area - Fixed Top - Balanced Spacing */}
      <header className="w-full z-20 pt-8 pb-4 flex justify-between items-center px-12 shrink-0 h-32">
        {/* Left: User Profile */}
        <div className="flex flex-col justify-center">
           <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Lion Math</span>
           <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors active:scale-95" onClick={() => handleNavigate('PROFILE')}>
              <div className="bg-blue-100 p-1 rounded-full">
                 <User size={20} className="text-blue-500"/>
              </div>
              <span className="text-xl font-bold text-gray-600">{user.name}</span>
           </div>
        </div>

        {/* Right: Avatar - Anchored correctly to match left padding */}
        <div className="relative flex items-center justify-center">
           <div className="transform scale-125 md:scale-150 origin-center hover:scale-[1.6] transition-transform cursor-pointer" onClick={() => setMood(LionMood.CHEERING)}>
              <LionAvatar mood={mood} size="md" />
           </div>
        </div>
      </header>

      {/* Main Content Area - Fills remaining height */}
      <main className="w-full flex-1 flex flex-col z-10 pb-8 px-12 overflow-hidden">
        <div className="flex-1 w-full relative h-full">
            {view === ViewState.HOME && (
              <HomeView user={user} onNavigate={handleNavigate} />
            )}
            
            {view === ViewState.LEARN_LESSON && (
              <LearnView 
                setMood={setMood} 
                onBack={() => handleNavigate('HOME')} 
              />
            )}

            {(view === ViewState.TEST_MENU || view === ViewState.TEST_SESSION) && (
              <TestView 
                user={user} 
                setMood={setMood} 
                onBack={() => handleNavigate('HOME')}
                onComplete={handleTestComplete}
              />
            )}

            {view === ViewState.PROFILE && (
              <ProfileView user={user} onBack={() => handleNavigate('HOME')} />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;