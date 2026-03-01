import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Info, Github } from 'lucide-react';
import { COHORT_DATA, CohortMember } from './data/cohort';
import { PokedexCard } from './components/PokedexCard';
import { PokedexModal } from './components/PokedexModal';

export default function App() {
  const [cohort, setCohort] = useState<CohortMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<CohortMember | null>(null);
  const [canEdit, setCanEdit] = useState(true);
  const [isModalEditing, setIsModalEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cohort');
        if (response.ok) {
          const data = await response.json();
          setCohort(data);
        }
      } catch (error) {
        console.error("Failed to fetch cohort data:", error);
        // Fallback to default if API fails
        setCohort(COHORT_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMember || isModalEditing) return;

      const currentIndex = cohort.findIndex(m => m.id === selectedMember.id);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % cohort.length;
        setSelectedMember(cohort[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + cohort.length) % cohort.length;
        setSelectedMember(cohort[prevIndex]);
      } else if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, cohort, isModalEditing]);

  const handleUpdateMember = async (updatedMember: CohortMember) => {
    // Optimistic update
    setCohort(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setSelectedMember(updatedMember);

    try {
      const response = await fetch(`/api/cohort/${updatedMember.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save update to server');
      }
    } catch (error) {
      console.error("Error updating member:", error);
      // Revert or show error if needed
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pokedex-red flex flex-col items-center justify-center text-white font-pixel">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner border-4 border-zinc-200 mb-4 animate-spin">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
            alt="Loading" 
            className="w-12 h-12"
          />
        </div>
        <p className="text-sm uppercase tracking-widest">Loading Pokedex...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 selection:bg-pokedex-red selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-pokedex-red border-b-4 border-black/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner border-4 border-zinc-200 translate-y-1">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                alt="Pokeball" 
                className="w-10 h-10 animate-bounce"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-pixel text-xs md:text-sm tracking-tighter text-white drop-shadow-md uppercase">MSTP M1 Cohort</h1>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">Gotta Research 'Em All</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-black/20 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
                alt="Pikachu" 
                className="w-8 h-8 -my-2"
                referrerPolicy="no-referrer"
              />
              <span className="font-pixel text-[8px] text-white/80 uppercase">Cohort Size: {cohort.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cohort.map((member) => (
            <PokedexCard
              key={member.id}
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-pokedex-red" />
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" 
          alt="Snorlax" 
          className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" 
                alt="Ultra Ball" 
                className="w-8 h-8"
                referrerPolicy="no-referrer"
              />
              <h2 className="font-pixel text-xs">MSTP Pokedex</h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono max-w-xs text-center md:text-left">
              The definitive guide to the M1 MSTP cohort.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <span className="text-zinc-500 font-pixel text-[8px]">Stanford Region</span>
              <span className="text-zinc-500 font-pixel text-[8px]">M1 Class</span>
            </div>
            <div className="text-[10px] text-pokedex-blue font-black uppercase tracking-[0.2em] flex items-center gap-4">
              <span>© 1996-2026 Pokémon / MSTP</span>
              <button 
                onClick={() => setCanEdit(!canEdit)}
                className="w-2 h-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                title="Toggle Edit Mode"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <PokedexModal
        member={selectedMember}
        canEdit={canEdit}
        onClose={() => {
          setSelectedMember(null);
          setIsModalEditing(false);
        }}
        onUpdate={handleUpdateMember}
        onEditChange={setIsModalEditing}
      />
    </div>
  );
}
