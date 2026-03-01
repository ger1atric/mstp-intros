import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { X, Zap, Code, FlaskConical, Stethoscope, Shield, Monitor, FileText, Settings, Circle, Edit3, Save, Upload, Info } from 'lucide-react';
import { CohortMember } from '../data/cohort';
import { cn } from '../lib/utils';
import { getTypeColor } from '../lib/colors';

interface PokedexModalProps {
  member: CohortMember | null;
  canEdit: boolean;
  onClose: () => void;
  onUpdate: (updatedMember: CohortMember) => void;
  onEditChange?: (isEditing: boolean) => void;
}

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex border-b border-black/5 last:border-0 py-3 px-5 items-center min-h-[56px]">
    <div className="w-[30%] text-[12px] font-pixel text-zinc-500 uppercase leading-tight pr-4 shrink-0">{label}</div>
    <div className="w-[70%] text-[14px] font-pixel text-zinc-900 uppercase flex flex-wrap gap-2 items-center break-words">{value}</div>
  </div>
);

export const PokedexModal: React.FC<PokedexModalProps> = ({ member, canEdit, onClose, onUpdate, onEditChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    onEditChange?.(isEditing);
  }, [isEditing, onEditChange]);
  const [editedMember, setEditedMember] = useState<CohortMember | null>(null);
  const [naturalAspect, setNaturalAspect] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth dragging
  const posX = useMotionValue(50);
  const posY = useMotionValue(50);
  const objectPosition = useTransform([posX, posY], ([x, y]) => `${x}% ${y}%`);

  useEffect(() => {
    if (member) {
      setEditedMember(member);
      setIsEditing(false);
      setNaturalAspect(null);
      
      const { x, y } = parsePosition(member.imagePosition);
      posX.set(x);
      posY.set(y);
    }
  }, [member]);

  // Sync state to motion values when imagePosition changes (e.g. from buttons)
  useEffect(() => {
    if (editedMember?.imagePosition) {
      const { x, y } = parsePosition(editedMember.imagePosition);
      posX.set(x);
      posY.set(y);
    }
  }, [editedMember?.imagePosition]);

  if (!member || !editedMember) return null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalAspect(img.naturalWidth / img.naturalHeight);
  };

  function parsePosition(pos: string | undefined): { x: number, y: number } {
    if (!pos || pos === 'center') return { x: 50, y: 50 };
    if (pos === 'top') return { x: 50, y: 0 };
    if (pos === 'bottom') return { x: 50, y: 100 };
    
    const matches = pos.match(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
    if (matches) {
      return { x: parseFloat(matches[1]), y: parseFloat(matches[2]) };
    }
    return { x: 50, y: 50 };
  }

  const handlePan = (_: any, info: any) => {
    if (!isEditing || !containerRef.current || !naturalAspect) return;

    const container = containerRef.current;
    const containerAspect = container.offsetWidth / container.offsetHeight;
    
    const currentX = posX.get();
    const currentY = posY.get();

    let newX = currentX;
    let newY = currentY;

    if (naturalAspect > containerAspect) {
      const effectiveWidth = container.offsetHeight * naturalAspect;
      const overflowX = effectiveWidth - container.offsetWidth;
      if (overflowX > 0) {
        const deltaXPercent = (info.delta.x / overflowX) * 100;
        newX = Math.max(0, Math.min(100, currentX - deltaXPercent));
      }
    } else {
      const effectiveHeight = container.offsetWidth / naturalAspect;
      const overflowY = effectiveHeight - container.offsetHeight;
      if (overflowY > 0) {
        const deltaYPercent = (info.delta.y / overflowY) * 100;
        newY = Math.max(0, Math.min(100, currentY - deltaYPercent));
      }
    }

    posX.set(newX);
    posY.set(newY);
    handleChange('imagePosition', `${newX.toFixed(2)}% ${newY.toFixed(2)}%`);
  };

  const handlePanEnd = () => {
    // Already updated in handlePan for real-time preview
  };

  const handleSave = () => {
    onUpdate(editedMember);
    setIsEditing(false);
  };

  const handleChange = (field: keyof CohortMember, value: any) => {
    setEditedMember(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleStatChange = (stat: keyof CohortMember['stats'], value: number) => {
    setEditedMember(prev => prev ? {
      ...prev,
      stats: { ...prev.stats, [stat]: value }
    } : null);
  };

  const handleStatLabelChange = (stat: keyof CohortMember['statLabels'], value: string) => {
    setEditedMember(prev => prev ? {
      ...prev,
      statLabels: { ...prev.statLabels, [stat]: value }
    } : null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = async () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension of 800px
          const MAX_DIM = 800;
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            try {
              // Upload to Vercel Blob via our API
              const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  filename: `cohort-${editedMember.id}-${Date.now()}.jpg`,
                  contentType: 'image/jpeg',
                  content: dataUrl
                })
              });

              if (!response.ok) throw new Error('Upload failed');
              
              const blob = await response.json();
              handleChange('imageUrl', blob.url);
            } catch (error) {
              console.error("Upload error:", error);
              alert("Failed to upload image to Vercel Blob. Check your BLOB_READ_WRITE_TOKEN.");
            } finally {
              setIsUploading(false);
            }
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          layoutId={`card-${member.id}`}
          className="relative w-full max-w-5xl bg-[#80deea] rounded-[2rem] overflow-hidden border-[12px] border-white shadow-2xl flex flex-col"
        >
          {/* Top Bar / Tabs */}
          <div className="bg-white/30 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={member.ballUrl} 
                alt="Member Ball" 
                className="w-8 h-8"
                referrerPolicy="no-referrer"
              />
              <h2 className="ml-2 font-pixel text-[12px] text-zinc-800 tracking-tight uppercase">
                {isEditing ? 'Editing Profile' : 'Cohort Member Details'}
              </h2>
            </div>
            <div className="flex gap-2 items-center">
              {canEdit && (
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all",
                    isEditing ? "bg-green-500 text-white hover:bg-green-600" : "bg-white text-zinc-700 hover:bg-zinc-50 border-2 border-zinc-200"
                  )}
                >
                  {isEditing ? <><Save className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit</>}
                </button>
              )}
              <img 
                src={member.spriteUrl} 
                alt="Member Sprite" 
                className="w-10 h-10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 p-4 gap-4 overflow-y-auto max-h-[85vh]">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {/* Left Panel: Info Table & Stats */}
              <div className="w-full md:w-[45%] flex flex-col gap-3">
                <div className="bg-[#e8f5e9] rounded-2xl border-2 border-[#4caf50] overflow-hidden shadow-sm">
                  <InfoRow label="Name" value={
                    isEditing ? (
                      <input 
                        className="w-full bg-white/50 border border-zinc-300 rounded px-2 py-1"
                        value={editedMember.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    ) : member.name
                  } />
                  <InfoRow label="Type" value={
                    isEditing ? (
                      <div className="flex gap-2">
                        <input 
                          className="w-1/2 bg-white/50 border border-zinc-300 rounded px-2 py-1"
                          value={editedMember.type1}
                          onChange={(e) => handleChange('type1', e.target.value)}
                        />
                        <input 
                          className="w-1/2 bg-white/50 border border-zinc-300 rounded px-2 py-1"
                          value={editedMember.type2 || ''}
                          onChange={(e) => handleChange('type2', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <span 
                          className="type-badge font-pixel text-[10px] px-3 py-1.5 leading-none text-white rounded shadow-sm"
                          style={{ backgroundColor: getTypeColor(member.type1) }}
                        >
                          {member.type1}
                        </span>
                        {member.type2 && (
                          <span 
                            className="type-badge font-pixel text-[10px] px-3 py-1.5 leading-none text-white rounded shadow-sm"
                            style={{ backgroundColor: getTypeColor(member.type2) }}
                          >
                            {member.type2}
                          </span>
                        )}
                      </div>
                    )
                  } />
                  <InfoRow label="Home Region" value={
                    isEditing ? (
                      <input 
                        className="w-full bg-white/50 border border-zinc-300 rounded px-2 py-1"
                        value={editedMember.hometown}
                        onChange={(e) => handleChange('hometown', e.target.value)}
                        placeholder="City, State"
                      />
                    ) : member.hometown
                  } />
                  {isEditing && (
                    <InfoRow label="Card Desc" value={
                      <input 
                        className="w-full bg-white/50 border border-zinc-300 rounded px-2 py-1 text-[10px] font-pixel"
                        value={editedMember.cardDescription}
                        onChange={(e) => handleChange('cardDescription', e.target.value)}
                        placeholder="Short description for card..."
                      />
                    } />
                  )}
                </div>

                <div className="bg-[#fffde7] rounded-2xl border-2 border-[#fbc02d] overflow-hidden shadow-sm">
                  <div className="p-4">
                    <h4 className="text-[10px] uppercase font-pixel text-zinc-400 mb-3 tracking-widest">Base Stats</h4>
                    <div className="space-y-2.5">
                      {[
                        { key: 'caffeine', color: 'bg-orange-400' },
                        { key: 'coding', color: 'bg-blue-400' },
                        { key: 'wetLab', color: 'bg-emerald-400' },
                        { key: 'clinical', color: 'bg-rose-400' },
                        { key: 'ankiConsistency', color: 'bg-purple-400' },
                      ].map(stat => (
                        <div key={stat.key} className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            {isEditing ? (
                              <input 
                                className="w-32 text-[14px] font-pixel text-zinc-600 uppercase bg-white/50 border border-zinc-200 rounded px-1"
                                value={editedMember.statLabels[stat.key as keyof CohortMember['statLabels']]}
                                onChange={(e) => handleStatLabelChange(stat.key as keyof CohortMember['statLabels'], e.target.value)}
                              />
                            ) : (
                              <div className="w-32 text-[14px] font-pixel text-zinc-600 uppercase text-right truncate shrink-0">
                                {member.statLabels[stat.key as keyof CohortMember['statLabels']]}
                              </div>
                            )}
                            <div className="flex-1 h-4 bg-zinc-200 rounded-sm overflow-hidden border border-black/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${editedMember.stats[stat.key as keyof CohortMember['stats']]}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn("h-full", stat.color)}
                              />
                            </div>
                            <div className="w-12 text-[14px] font-pixel text-zinc-900 shrink-0">
                              {editedMember.stats[stat.key as keyof CohortMember['stats']]}
                            </div>
                          </div>
                          {isEditing && (
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              className="w-full h-1 accent-zinc-500"
                              value={editedMember.stats[stat.key as keyof CohortMember['stats']]}
                              onChange={(e) => handleStatChange(stat.key as keyof CohortMember['stats'], parseInt(e.target.value))}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-black/5 p-4 shadow-sm relative overflow-hidden min-h-[120px]">
                  <img 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
                    alt="Bulbasaur" 
                    className="absolute -right-4 -bottom-4 w-16 opacity-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] uppercase font-pixel text-zinc-400 tracking-widest">Move Set</h4>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <label className="text-[10px] font-pixel text-zinc-400 uppercase">Slot {i + 1}</label>
                            <input 
                              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-[12px] font-pixel"
                              value={editedMember.moves[i] || ''}
                              placeholder="---"
                              onChange={(e) => {
                                const newMoves = [...editedMember.moves];
                                newMoves[i] = e.target.value;
                                handleChange('moves', newMoves);
                              }}
                            />
                          </div>
                        ))}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-pixel text-pokedex-red uppercase">Special</label>
                          <input 
                            className="w-full bg-pokedex-red/5 border border-pokedex-red/20 rounded px-3 py-2 text-[12px] font-pixel text-pokedex-red"
                            value={editedMember.specialAttack}
                            onChange={(e) => handleChange('specialAttack', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {/* Combine first 3 moves and special attack into a strict 2x2 grid */}
                      {[...member.moves.slice(0, 3), member.specialAttack].map((move, i) => {
                        const isSpecial = i === 3;
                        const colors = [
                          'from-zinc-100 to-zinc-200 border-zinc-300',
                          'from-blue-50 to-blue-100 border-blue-200',
                          'from-emerald-50 to-emerald-100 border-emerald-200'
                        ];
                        
                        return (
                          <motion.div 
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              "relative h-20 rounded-lg border-b-4 bg-gradient-to-br overflow-hidden cursor-pointer group",
                              isSpecial 
                                ? "from-pokedex-red/10 to-pokedex-red/20 border-pokedex-red/30" 
                                : (move ? colors[i % colors.length] : "bg-zinc-50 border-zinc-100 opacity-40")
                            )}
                          >
                            {move ? (
                              <>
                                <div className="p-4 flex flex-col justify-between h-full">
                                  <div className={cn(
                                    "text-[12px] font-pixel uppercase leading-tight tracking-tight break-words",
                                    isSpecial ? "text-pokedex-red" : "text-zinc-800"
                                  )}>
                                    {move}
                                  </div>
                                  <div className="flex items-center justify-end gap-2">
                                    <div className={cn(
                                      "text-[10px] font-pixel whitespace-nowrap",
                                      isSpecial ? "text-pokedex-red" : "text-zinc-500"
                                    )}>
                                      PP {isSpecial ? "5" : 15 + (i * 5)}
                                    </div>
                                  </div>
                                </div>
                                <div className={cn(
                                  "absolute right-0 top-0 bottom-0 w-8 -skew-x-12 translate-x-4",
                                  isSpecial ? "bg-pokedex-red/5" : "bg-black/5"
                                )} />
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-full text-[12px] font-pixel text-zinc-300 uppercase">
                                ---
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel: Image */}
              <div className="w-full md:w-[55%] flex flex-col">
                <div className="relative flex-1 min-h-[350px] md:min-h-0" ref={containerRef}>
                  <div className={cn(
                    "w-full h-full md:absolute md:inset-0 pokedex-gradient-bg rounded-3xl border-4 border-white shadow-inner overflow-hidden flex items-center justify-center",
                    isEditing && "cursor-move active:cursor-grabbing"
                  )}>
                    <div className="absolute top-4 right-6 flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-white shadow-sm z-30 pointer-events-none">
                      <img 
                        src={member.ballUrl} 
                        alt="Pokeball" 
                        className="w-4 h-4"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-bold text-zinc-800">{member.name}</span>
                    </div>
                    
                    <motion.img
                      key={isEditing ? editedMember.imageUrl : member.imageUrl}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={isEditing ? editedMember.imageUrl : member.imageUrl}
                      alt={member.name}
                      draggable={false}
                      className="w-full h-full object-cover select-none"
                      style={{ 
                        objectPosition: objectPosition,
                        touchAction: isEditing ? 'none' : 'auto'
                      }}
                      onLoad={handleImageLoad}
                      onPan={handlePan}
                      onPanEnd={handlePanEnd}
                      referrerPolicy="no-referrer"
                    />

                    {isEditing && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
                        <div className="bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm text-[11px] text-white font-bold uppercase tracking-wider mb-1">
                          Drag image to reposition
                        </div>
                        <div className="flex gap-2 bg-black/60 p-2 rounded-xl backdrop-blur-md">
                          {['top', 'center', 'bottom'].map(pos => (
                            <button
                              key={pos}
                              onClick={() => handleChange('imagePosition', pos)}
                              className={cn(
                                "px-4 py-1.5 rounded text-[11px] font-bold uppercase transition-all",
                                editedMember.imagePosition === pos ? "bg-pokedex-red text-white" : "bg-white/20 text-white hover:bg-white/40"
                              )}
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {isEditing && (
                  <div className="mt-4 bg-white/50 p-3 rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Image Settings</h5>
                      <label className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded text-[11px] font-bold text-zinc-600 cursor-pointer hover:bg-zinc-50 transition-colors",
                        isUploading && "opacity-50 cursor-not-allowed"
                      )}>
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <h5 className="text-[11px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Image URL</h5>
                    <input 
                      className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-[12px]"
                      value={editedMember.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel: Description - Full Width */}
            <div className="w-full">
              <div className="bg-white rounded-2xl border-2 border-black/5 p-4 shadow-sm relative overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png" 
                  alt="Mew" 
                  className="absolute -right-10 -bottom-10 w-32 opacity-5"
                  referrerPolicy="no-referrer"
                />
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-pokedex-yellow px-4 py-1.5 rounded-md text-[12px] font-black uppercase tracking-widest">Pokedex Entry</div>
                </div>
                {isEditing ? (
                  <textarea 
                    className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-base italic min-h-[80px]"
                    value={editedMember.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                ) : (
                  <p className="text-zinc-700 leading-relaxed text-base font-medium italic">
                    "{member.description}"
                  </p>
                )}
                <div className="mt-4 flex gap-4">
                  <div className="w-full">
                    <h5 className="text-[10px] font-black text-zinc-400 uppercase mb-1.5 tracking-widest">Hobbies</h5>
                    {isEditing ? (
                      <input 
                        className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-[12px]"
                        value={editedMember.hobbies.join(', ')}
                        onChange={(e) => handleChange('hobbies', e.target.value.split(',').map(s => s.trim()))}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {member.hobbies.map(h => (
                          <span key={h} className="text-[12px] text-zinc-500 bg-zinc-50 px-3 py-1 rounded border border-zinc-100">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="bg-zinc-800 px-8 py-3 flex justify-between items-center text-white">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1 cursor-pointer hover:text-pokedex-red transition-colors" onClick={onClose}>
                <span className="text-[12px] font-bold uppercase tracking-widest">Close Entry</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" 
                alt="Great Ball" 
                className="w-5 h-5"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
