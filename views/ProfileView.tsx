import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserProgress } from '../types';
import Button from '../components/Button';
import { ArrowLeft, Lock } from 'lucide-react';

interface ProfileViewProps {
  user: UserProgress;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onBack }) => {
  const [parentMode, setParentMode] = React.useState(false);

  const data = Object.entries(user.bestTestScores).map(([key, score]) => ({
    name: key === 'basic' ? 'Cơ bản' : key === 'mixed' ? 'Hỗn hợp' : 'Sprint',
    score: score,
  }));

  const COLORS = ['#BFE7FF', '#CFFFE0', '#FFE8D6'];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center mb-6 shrink-0">
        <Button variant="ghost" size="lg" onClick={onBack} icon={<ArrowLeft size={32} />}>
           <span className="text-2xl font-bold">Home</span>
        </Button>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-700 ml-4">Hồ Sơ Của Bé</h2>
      </div>

      {/* 2 Column Layout filling height */}
      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0 pb-4">
          {/* Kid View / Left Column */}
          <div className="bg-white rounded-[3rem] p-12 shadow-lg text-center h-full flex flex-col justify-center items-center border-4 border-white ring-4 ring-gray-50">
            <div className="w-64 h-64 bg-yellow-100 rounded-full mx-auto mb-10 flex items-center justify-center text-[8rem] border-[12px] border-yellow-200 shadow-inner">
              🦁
            </div>
            <h3 className="text-6xl font-extrabold text-gray-800 mb-4">{user.name}</h3>
            <p className="text-gray-400 text-3xl font-medium mb-12">Học sinh lớp {user.grade}</p>
            
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="bg-blue-50 rounded-3xl p-8 border-2 border-blue-100">
                  <div className="text-6xl font-black text-blue-500">{user.stars}</div>
                  <div className="text-xl text-blue-400 font-bold uppercase mt-2 tracking-wide">Ngôi sao</div>
              </div>
              <div className="bg-purple-50 rounded-3xl p-8 border-2 border-purple-100">
                  <div className="text-6xl font-black text-purple-500">{user.totalQuestionsAnswered}</div>
                  <div className="text-xl text-purple-400 font-bold uppercase mt-2 tracking-wide">Câu hỏi</div>
              </div>
            </div>
          </div>

          {/* Right Column (Parent Mode Area) */}
          <div className="flex flex-col gap-8 h-full">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 shrink-0">
                <button 
                  onClick={() => setParentMode(!parentMode)}
                  className="flex items-center justify-center text-gray-400 text-2xl font-semibold hover:text-gray-600 w-full py-4"
                >
                  <Lock size={32} className="mr-4"/>
                  {parentMode ? 'Thoát chế độ Phụ huynh' : 'Mở chế độ Phụ huynh'}
                </button>
            </div>

            {parentMode ? (
              <div className="animate-fade-in bg-white p-10 rounded-[3rem] shadow-lg border-2 border-gray-100 flex-1 flex flex-col">
                <h4 className="font-bold text-3xl text-gray-700 mb-8">Biểu đồ tiến độ học tập</h4>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" tick={{fontSize: 16, fill: '#9CA3AF', fontWeight: 'bold'}} axisLine={false} tickLine={false} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{fill: '#F3F4F6', radius: 8}} 
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px 20px'}}
                        itemStyle={{fontWeight: 'bold', color: '#4B5563', fontSize: '18px'}} 
                      />
                      <Bar dataKey="score" radius={[16, 16, 16, 16]} barSize={80}>
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xl text-gray-400 mt-8 text-center font-medium">Điểm số cao nhất qua các bài kiểm tra gần đây</p>
              </div>
            ) : (
               <div className="flex-1 bg-white/50 rounded-[3rem] border-4 border-dashed border-gray-200 flex items-center justify-center">
                  <p className="text-gray-400 text-2xl font-medium">Chế độ phụ huynh đang khóa</p>
               </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default ProfileView;