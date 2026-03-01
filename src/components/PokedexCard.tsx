import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { CohortMember } from '../data/cohort';
import { cn } from '../lib/utils';
import { getTypeColor } from '../lib/colors';

interface PokedexCardProps {
  member: CohortMember;
  onClick: () => void;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ member, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${member.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
    >
      <div className="relative bg-white border-4 border-zinc-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
        <div className="aspect-square relative bg-zinc-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10" />
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ objectPosition: member.imagePosition || 'center' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 z-20">
            <img 
              src={member.ballUrl} 
              alt="Pokeball" 
              className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="p-4 bg-white">
          <div className="flex flex-col gap-1 mb-3">
            <h3 className="font-pixel text-[14px] text-zinc-900 leading-tight uppercase tracking-tight">{member.name}</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            <span 
              className="type-badge font-pixel text-[10px] px-2.5 py-1.5 text-white rounded shadow-sm"
              style={{ backgroundColor: getTypeColor(member.type1) }}
            >
              {member.type1}
            </span>
            {member.type2 && (
              <span 
                className="type-badge font-pixel text-[10px] px-2.5 py-1.5 text-white rounded shadow-sm"
                style={{ backgroundColor: getTypeColor(member.type2) }}
              >
                {member.type2}
              </span>
            )}
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <div className="text-[10px] font-pixel text-zinc-700 line-clamp-2 uppercase">
              {member.cardDescription}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
