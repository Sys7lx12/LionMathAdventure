import React from 'react';
import { BookOpen, Award, Activity } from 'lucide-react';
import Button from '../components/Button';
import { UserProgress } from '../types';

interface HomeViewProps {
  user: UserProgress;
  onNavigate: (view: any) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, onNavigate }) => {
  return (
    <div className="flex flex-col h-full gap-6 justify-between">
      
      {/* Welcome Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg w-full text-center border-2 border-blue-50 relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pastel-blue via-pastel-mint to-pastel-peach" />
        <h2 className="text-4xl md:text-6xl font-extrabold text-pastel-dark mb-4 mt-2">
          Chào, {user.name}! 👋
        </h2>
        <div className="flex justify-center items-center gap-6">
             <p className="text-gray-500 text-xl md:text-2xl">Hôm nay chúng ta học gì nào?</p>
             <div className="flex items-center bg-yellow-50 px-5 py-2 rounded-full border border-yellow-100">
                <span className="text-yellow-500 mr-2 text-3xl">⭐</span>
                <span className="font-bold text-yellow-700 text-3xl">{user.stars}</span>
             </div>
        </div>
      </div>

      {/* Main Actions Grid - Fills remaining height */}
      <div className="grid grid-cols-3 gap-8 w-full flex-1 min-h-0">
        <Button 
          variant="primary" 
          size="lg"
          icon={<BookOpen className="w-16 h-16 md:w-20 md:h-20" />}
          onClick={() => onNavigate('LEARN')}
          className="bg-pastel-blue text-blue-900 h-full rounded-[3rem] text-3xl md:text-5xl flex-col gap-8 hover:scale-[1.01] transition-transform shadow-xl border-b-8 border-blue-300"
        >
          Học Tập
          <span className="text-xl md:text-2xl font-medium opacity-75">Bài học tương tác</span>
        </Button>

        <Button 
          variant="success" 
          size="lg"
          icon={<Activity className="w-16 h-16 md:w-20 md:h-20" />}
          onClick={() => onNavigate('PRACTICE')}
          className="bg-pastel-mint text-green-900 h-full rounded-[3rem] text-3xl md:text-5xl flex-col gap-8 hover:scale-[1.01] transition-transform shadow-xl border-b-8 border-green-300"
        >
          Luyện Tập
          <span className="text-xl md:text-2xl font-medium opacity-75">Trò chơi & thẻ nhớ</span>
        </Button>

        <Button 
          variant="danger" 
          size="lg"
          icon={<Award className="w-16 h-16 md:w-20 md:h-20" />}
          onClick={() => onNavigate('TEST')}
          className="bg-pastel-peach text-orange-900 h-full rounded-[3rem] text-3xl md:text-5xl flex-col gap-8 hover:scale-[1.01] transition-transform shadow-xl border-b-8 border-orange-300"
        >
          Kiểm Tra
          <span className="text-xl md:text-2xl font-medium opacity-75">Thử thách bản thân</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeView;