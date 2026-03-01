export const getTypeColor = (type: string) => {
  if (!type) return '#9ca3af';
  const typeLower = type.toLowerCase().trim();
  
  // Standard Pokemon types for consistency if they match
  const typeMap: Record<string, string> = {
    'fire': '#ef4444',
    'water': '#3b82f6',
    'grass': '#22c55e',
    'electric': '#eab308',
    'psychic': '#ec4899',
    'ice': '#06b6d4',
    'dragon': '#6366f1',
    'dark': '#374151',
    'fairy': '#f472b6',
    'normal': '#9ca3af',
    'fighting': '#f97316',
    'flying': '#818cf8',
    'poison': '#a855f7',
    'ground': '#d97706',
    'rock': '#b45309',
    'bug': '#84cc16',
    'ghost': '#7c3aed',
    'steel': '#64748b',
    'coding': '#3b82f6',
    'research': '#10b981',
    'clinical': '#f43f5e',
    'wet lab': '#059669',
    'dry lab': '#475569',
  };

  if (typeMap[typeLower]) return typeMap[typeLower];

  // Fallback to hash-based color
  let hash = 0;
  for (let i = 0; i < typeLower.length; i++) {
    hash = typeLower.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 65%, 45%)`;
};
