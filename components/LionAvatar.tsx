import React from 'react';
import { LionMood } from '../types';

interface LionAvatarProps {
  mood: LionMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LionAvatar: React.FC<LionAvatarProps> = ({ mood, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56'
  };

  const isHappy = mood === LionMood.HAPPY || mood === LionMood.CHEERING;
  const isThinking = mood === LionMood.THINKING;
  const isSleepy = mood === LionMood.SLEEPY;

  return (
    <div className={`${sizeClasses[size]} ${className} relative transition-all duration-500 select-none`}>
       
       {/* Thinking Bubbles */}
       {isThinking && (
         <div className="absolute -top-2 right-0 animate-bounce-slow opacity-90 z-20">
             <svg width="50" height="50" viewBox="0 0 50 50">
                <circle cx="10" cy="42" r="3" fill="#9CA3AF" />
                <circle cx="20" cy="32" r="5" fill="#9CA3AF" />
                <path d="M25 5 Q48 5 48 20 Q48 35 25 35 Q2 35 2 20 Q2 5 25 5" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2"/>
                <text x="25" y="25" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#4B5563">?</text>
             </svg>
         </div>
       )}

       {/* Sleepy Zzz */}
       {isSleepy && (
         <div className="absolute -top-4 right-4 animate-pulse z-20">
             <span className="text-2xl font-bold text-blue-400 absolute -top-4 right-0 animate-bounce" style={{animationDuration: '2s'}}>z</span>
             <span className="text-xl font-bold text-blue-300 absolute top-0 -right-4 animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>Z</span>
         </div>
       )}

       {/* Main SVG Container with Floating Animation */}
       <div className="w-full h-full animate-float drop-shadow-xl filter">
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            
            {/* Back Arms (for Cheering) */}
            {mood === LionMood.CHEERING && (
              <g className="origin-bottom animate-wiggle">
                <path d="M20 80 Q10 50 30 30" stroke="#FBBF24" strokeWidth="14" strokeLinecap="round" />
                <path d="M100 80 Q110 50 90 30" stroke="#FBBF24" strokeWidth="14" strokeLinecap="round" />
              </g>
            )}

            {/* Mane - Rotating slightly on happy/cheer */}
            <g className={`${mood === LionMood.CHEERING ? 'animate-spin-slow origin-center' : ''}`}>
               {/* Outer Mane Sun rays effect */}
               <circle cx="60" cy="60" r="52" fill="#F59E0B" />
               <path d="M60 8 L65 20 L75 10 L75 22 L88 15 L85 28 L98 25 L92 38 L105 38 L96 50 L110 55 L98 65 L110 75 L96 80 L105 92 L92 92 L98 105 L85 102 L88 115 L75 108 L75 120 L65 110 L60 122 L55 110 L45 120 L45 108 L32 115 L35 102 L22 105 L28 92 L15 92 L24 80 L10 75 L22 65 L10 55 L24 50 L15 38 L28 38 L22 25 L35 28 L32 15 L45 22 L45 10 L55 20 Z" fill="#F59E0B" />
               <circle cx="60" cy="60" r="42" fill="#FBBF24" />
            </g>

            {/* Ears with Wiggle Animation */}
            <g className="animate-ear-wiggle origin-center">
               {/* Left Ear */}
               <g transform="translate(0,0)"> 
                 <circle cx="25" cy="35" r="12" fill="#F59E0B" />
                 <circle cx="25" cy="35" r="7" fill="#FEF3C7" />
               </g>
               {/* Right Ear */}
               <g transform="translate(0,0)">
                 <circle cx="95" cy="35" r="12" fill="#F59E0B" />
                 <circle cx="95" cy="35" r="7" fill="#FEF3C7" />
               </g>
            </g>

            {/* Face Shape */}
            <circle cx="60" cy="65" r="34" fill="#FEF3C7" />

            {/* Cheeks (Only visible when happy/cheering) */}
            {(isHappy) && (
               <g>
                 <ellipse cx="40" cy="72" rx="6" ry="4" fill="#FCA5A5" opacity="0.6" />
                 <ellipse cx="80" cy="72" rx="6" ry="4" fill="#FCA5A5" opacity="0.6" />
               </g>
            )}

            {/* Eyes Container */}
            <g className={`${!isSleepy ? 'animate-blink origin-center' : ''}`} style={{transformBox: 'fill-box', transformOrigin: 'center'}}>
               {isSleepy ? (
                 // Sleepy Eyes
                 <g>
                   <path d="M38 55 Q45 60 52 55" stroke="#4B5563" strokeWidth="3" fill="none" strokeLinecap="round"/>
                   <path d="M68 55 Q75 60 82 55" stroke="#4B5563" strokeWidth="3" fill="none" strokeLinecap="round"/>
                 </g>
               ) : isThinking ? (
                 // Thinking Eyes (Look up/side)
                 <g>
                    <circle cx="42" cy="50" r="5" fill="#374151" />
                    <circle cx="78" cy="50" r="5" fill="#374151" />
                    {/* Brows */}
                    <path d="M38 42 Q42 38 46 42" stroke="#374151" strokeWidth="2" fill="none" />
                    <path d="M74 40 L82 38" stroke="#374151" strokeWidth="2" fill="none" />
                 </g>
               ) : (
                 // Happy/Normal Eyes
                 <g>
                   <circle cx="42" cy="55" r="5" fill="#374151" />
                   <circle cx="78" cy="55" r="5" fill="#374151" />
                   <circle cx="44" cy="53" r="2" fill="white" />
                   <circle cx="80" cy="53" r="2" fill="white" />
                 </g>
               )}
            </g>

            {/* Nose */}
            <path d="M54 62 Q60 66 66 62 L60 70 Z" fill="#EC4899" rx="2" />

            {/* Mouth */}
            <g>
              {isHappy ? (
                 <path d="M48 74 Q60 84 72 74" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />
              ) : isThinking ? (
                 <path d="M55 78 L65 78" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
              ) : isSleepy ? (
                 <circle cx="60" cy="78" r="4" fill="#374151" opacity="0.3" />
              ) : (
                 <path d="M48 76 Q60 80 72 76" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />
              )}
            </g>

            {/* Whiskers */}
            <g opacity="0.4">
              <line x1="30" y1="70" x2="10" y2="66" stroke="#F59E0B" strokeWidth="2" />
              <line x1="30" y1="75" x2="10" y2="78" stroke="#F59E0B" strokeWidth="2" />
              <line x1="90" y1="70" x2="110" y2="66" stroke="#F59E0B" strokeWidth="2" />
              <line x1="90" y1="75" x2="110" y2="78" stroke="#F59E0B" strokeWidth="2" />
            </g>

            {/* Thinking Hand (Paw on chin) */}
            {isThinking && (
               <path d="M75 95 Q85 80 70 75 Q60 80 65 95" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
            )}

          </svg>
       </div>
    </div>
  );
};

export default LionAvatar;