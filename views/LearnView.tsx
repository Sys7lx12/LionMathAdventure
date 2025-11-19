import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import Button from '../components/Button';
import { MULTIPLICATION_TABLES } from '../constants';
import { LionMood } from '../types';

interface LearnViewProps {
  setMood: (m: LionMood) => void;
  onBack: () => void;
}

const LearnView: React.FC<LearnViewProps> = ({ setMood, onBack }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Reset step when table changes
  React.useEffect(() => {
    if (selectedTable) {
      setMood(LionMood.HAPPY);
      setCurrentStep(1);
    } else {
      setMood(LionMood.NEUTRAL);
    }
  }, [selectedTable, setMood]);

  if (!selectedTable) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6 shrink-0">
          <Button variant="ghost" size="lg" onClick={onBack} icon={<ArrowLeft size={32} />}>
            <span className="text-2xl font-bold">Home</span>
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 ml-6">Chọn Bảng Cửu Chương</h2>
        </div>
        
        {/* 4x2 Grid for Tablet Landscape */}
        <div className="grid grid-cols-4 gap-8 flex-1">
          {MULTIPLICATION_TABLES.map(num => (
            <button
              key={num}
              onClick={() => setSelectedTable(num)}
              className="rounded-[2.5rem] bg-white border-b-8 border-pastel-blue text-6xl md:text-9xl font-black text-blue-400 hover:bg-blue-50 hover:translate-y-1 hover:border-b-4 transition-all shadow-lg flex flex-col items-center justify-center h-full"
            >
              <span>{num}</span>
              <span className="text-2xl text-gray-400 font-bold mt-4">Bảng {num}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Lesson Logic
  const maxStep = 10;

  const nextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep(p => p + 1);
      setMood(LionMood.THINKING);
      setTimeout(() => setMood(LionMood.HAPPY), 500);
    } else {
      setMood(LionMood.CHEERING);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(p => p - 1);
  };

  const Visualizer = () => {
    // Simple visualization: Groups of dots
    const groups = Array(selectedTable).fill(0);
    return (
      <div className="grid content-center gap-6 p-8 w-full h-full overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {groups.map((_, i) => (
            <div key={i} className="border-4 border-dashed border-pastel-blue rounded-2xl p-4 bg-blue-50 flex items-center justify-center min-w-[120px] min-h-[120px]">
              <div className="grid grid-cols-3 gap-2">
                {Array(currentStep).fill(0).map((_, j) => (
                  <div key={j} className="w-6 h-6 rounded-full bg-red-400 shadow-sm animate-bounce" style={{ animationDelay: `${j * 0.05}s`}} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
       {/* Header */}
       <div className="flex items-center justify-between mb-4 shrink-0">
          <Button variant="ghost" onClick={() => setSelectedTable(null)} icon={<ArrowLeft size={32} />}>
             <span className="text-2xl font-bold text-gray-500">Chọn lại</span>
          </Button>
          <div className="flex gap-2">
             {Array(10).fill(0).map((_, i) => (
               <div 
                 key={i} 
                 className={`w-4 h-4 md:w-6 md:h-6 rounded-full transition-colors ${i < currentStep ? 'bg-blue-400' : 'bg-gray-200'}`} 
               />
             ))}
          </div>
       </div>

       {/* Main Split Content */}
       <div className="flex-1 bg-white rounded-[3rem] shadow-xl flex overflow-hidden border-4 border-white ring-4 ring-blue-50">
          
          {/* Left: Text & Explanation */}
          <div className="w-2/5 bg-white p-8 flex flex-col items-center justify-center text-center border-r-2 border-gray-100 z-10 relative shadow-sm">
            <div className="space-y-8">
              <p className="text-3xl text-gray-400 font-bold">
                 {selectedTable} nhóm, mỗi nhóm {currentStep}
              </p>
              <h3 className="text-8xl md:text-9xl font-black text-slate-700 leading-tight">
                {selectedTable} <span className="text-gray-300 font-light">×</span> {currentStep}
                <br/>
                <span className="text-gray-300 font-light">=</span> <span className="text-blue-500">{selectedTable * currentStep}</span>
              </h3>
              <button className="p-8 rounded-full bg-yellow-50 text-yellow-500 hover:bg-yellow-100 transition-colors">
                  <Volume2 size={48} />
               </button>
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="w-3/5 bg-slate-50 relative">
             <div className="absolute inset-0">
                <Visualizer />
             </div>
          </div>
       </div>

       {/* Bottom Controls */}
       <div className="h-24 mt-6 flex justify-between items-center shrink-0 px-8">
           <Button variant="secondary" size="lg" onClick={prevStep} disabled={currentStep === 1} className="w-48 h-16 text-xl">
             <ArrowLeft className="w-8 h-8 mr-2" /> Trước
           </Button>

           <Button variant="primary" size="lg" onClick={nextStep} disabled={currentStep > 10} className="w-48 h-16 text-xl">
             {currentStep === 10 ? 'Xong!' : <div className="flex items-center">Tiếp <ArrowRight className="w-8 h-8 ml-2" /></div>}
           </Button>
       </div>
    </div>
  );
};

export default LearnView;