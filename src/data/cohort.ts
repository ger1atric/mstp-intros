export interface CohortMember {
  id: string;
  name: string;
  type1: string;
  type2?: string;
  moves: string[];
  specialAttack: string;
  hobbies: string[];
  description: string;
  cardDescription: string;
  stats: {
    caffeine: number;
    coding: number;
    wetLab: number;
    clinical: number;
    ankiConsistency: number;
  };
  statLabels: {
    caffeine: string;
    coding: string;
    wetLab: string;
    clinical: string;
    ankiConsistency: string;
  };
  imageUrl: string;
  imagePosition?: string; // e.g., "center", "top", "bottom"
  ballUrl: string;
  spriteUrl: string;
  hometown: string;
}

export const COHORT_DATA: CohortMember[] = [
  {
    id: "001",
    name: "Alex Rivera",
    type1: "Neuroscience",
    type2: "Computation",
    moves: ["Synaptic Strike", "Neural Network", "Opto-Blast"],
    specialAttack: "Deep Learning Overdrive",
    hobbies: ["Rock Climbing", "Chess", "Espresso Art"],
    description: "Alex spends more time debugging Python scripts than sleeping. Known for finding correlations in noise and the perfect bean-to-water ratio.",
    cardDescription: "Python wizard and espresso enthusiast.",
    stats: {
      caffeine: 95,
      coding: 88,
      wetLab: 45,
      clinical: 60,
      ankiConsistency: 75
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/alex/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif", // Pikachu
    hometown: "San Francisco, CA"
  },
  {
    id: "002",
    name: "Jordan Smith",
    type1: "Genetics",
    type2: "Immunology",
    moves: ["CRISPR Cut", "Gene Silencing", "Immune Surge"],
    specialAttack: "Epigenetic Remodel",
    hobbies: ["Baking", "Hiking", "Sci-Fi Novels"],
    description: "Can design a guide RNA in their sleep. Jordan's sourdough starter is technically a genetically modified organism at this point.",
    cardDescription: "CRISPR expert and sourdough scientist.",
    stats: {
      caffeine: 70,
      coding: 55,
      wetLab: 92,
      clinical: 65,
      ankiConsistency: 80
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/jordan/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif", // Eevee
    hometown: "Seattle, WA"
  },
  {
    id: "003",
    name: "Casey Chen",
    type1: "Cardiology",
    type2: "Bioengineering",
    moves: ["Heart Beat", "Stem Cell Pulse", "Vascular Flow"],
    specialAttack: "3D Organ Print",
    hobbies: ["Photography", "Running", "Playing Cello"],
    description: "Casey is obsessed with 3D printing organs. If it pulses, Casey wants to model it. Often found running marathons to study their own HR variability.",
    cardDescription: "3D organ printing pioneer.",
    stats: {
      caffeine: 60,
      coding: 72,
      wetLab: 85,
      clinical: 88,
      ankiConsistency: 70
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/casey/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/175.gif", // Togepi
    hometown: "Boston, MA"
  },
  {
    id: "004",
    name: "Taylor Vance",
    type1: "Bioinformatics",
    type2: "Epidemiology",
    moves: ["Data Crunch", "Viral Spread", "Spreadsheet Wall"],
    specialAttack: "Outbreak Prediction",
    hobbies: ["Board Games", "Cooking", "Bird Watching"],
    description: "Taylor sees the world in spreadsheets. They can predict a flu outbreak before the first sneeze. Don't challenge them to Settlers of Catan.",
    cardDescription: "Epidemiological data cruncher.",
    stats: {
      caffeine: 85,
      coding: 95,
      wetLab: 20,
      clinical: 50,
      ankiConsistency: 90
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/taylor/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif", // Jigpuff
    hometown: "Chicago, IL"
  },
  {
    id: "005",
    name: "Morgan Lee",
    type1: "Biochemistry",
    type2: "Structural Biology",
    moves: ["Protein Fold", "Cryo-Freeze", "Active Site Bind"],
    specialAttack: "De Novo Design",
    hobbies: ["Yoga", "Gardening", "Pottery"],
    description: "Morgan thinks in 3D. They can visualize a protein's active site while doing a headstand. Their plants are all named after amino acids.",
    cardDescription: "Structural biology visionary.",
    stats: {
      caffeine: 50,
      coding: 65,
      wetLab: 90,
      clinical: 40,
      ankiConsistency: 60
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/morgan/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif", // Mew
    hometown: "Austin, TX"
  },
  {
    id: "006",
    name: "Riley Quinn",
    type1: "Neuroscience",
    type2: "Psychiatry",
    moves: ["fMRI Scan", "Neural Pulse", "Mind Read"],
    specialAttack: "Behavioral Loop",
    hobbies: ["Painting", "Yoga", "Surfing"],
    description: "Riley can tell you what you're thinking just by looking at your BOLD signal. They find peace in the waves and on the canvas.",
    cardDescription: "fMRI specialist and surfer.",
    stats: {
      caffeine: 80,
      coding: 60,
      wetLab: 40,
      clinical: 95,
      ankiConsistency: 85
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/riley/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/417.gif", // Pachirisu
    hometown: "Denver, CO"
  },
  {
    id: "007",
    name: "Sam Rivera",
    type1: "Bioengineering",
    type2: "Chemistry",
    moves: ["Nano-Delivery", "Polymer Shield", "Chemical Bond"],
    specialAttack: "Targeted Release",
    hobbies: ["Sculpting", "Biking", "Coffee Roasting"],
    description: "Sam builds tiny robots to deliver medicine. They treat coffee roasting like a high-stakes chemical reaction.",
    cardDescription: "Nanotech and coffee roaster.",
    stats: {
      caffeine: 100,
      coding: 70,
      wetLab: 95,
      clinical: 30,
      ankiConsistency: 65
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/sam/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif", // Squirtle
    hometown: "Portland, OR"
  },
  {
    id: "008",
    name: "Jamie Chen",
    type1: "Virology",
    type2: "Immunology",
    moves: ["Viral Vector", "Antibody Shield", "Spike Bind"],
    specialAttack: "Vaccine Breakthrough",
    hobbies: ["Archery", "Gaming", "Cooking"],
    description: "Jamie tracks viruses like a predator. When not in the BSL-3 lab, they're likely hitting bullseyes or high scores.",
    cardDescription: "Virology hunter and gamer.",
    stats: {
      caffeine: 75,
      coding: 50,
      wetLab: 98,
      clinical: 45,
      ankiConsistency: 70
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/jamie/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif", // Bulbasaur
    hometown: "Atlanta, GA"
  },
  {
    id: "009",
    name: "Peyton Blair",
    type1: "Oncology",
    type2: "Genetics",
    moves: ["Tumor Target", "T-Cell Surge", "Gene Map"],
    specialAttack: "Precision Strike",
    hobbies: ["Gardening", "Reading", "Swimming"],
    description: "Peyton is on a mission to personalize cancer care. They find metaphors for cell growth in their prize-winning roses.",
    cardDescription: "Oncology researcher and gardener.",
    stats: {
      caffeine: 65,
      coding: 80,
      wetLab: 85,
      clinical: 90,
      ankiConsistency: 75
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/peyton/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heal-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/113.gif", // Chansey
    hometown: "Miami, FL"
  },
  {
    id: "010",
    name: "Dakota Sky",
    type1: "Endocrinology",
    type2: "Biochemistry",
    moves: ["Insulin Spike", "Lipid Burn", "Hormone Wave"],
    specialAttack: "Metabolic Reset",
    hobbies: ["Hiking", "Photography", "Star Gazing"],
    description: "Dakota understands the body's fuel like no one else. They spend their nights looking at galaxies and their days at glucose levels.",
    cardDescription: "Metabolic expert and stargazer.",
    stats: {
      caffeine: 40,
      coding: 55,
      wetLab: 90,
      clinical: 85,
      ankiConsistency: 60
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/dakota/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/216.gif", // Teddiursa
    hometown: "Phoenix, AZ"
  },
  {
    id: "011",
    name: "Skyler Reed",
    type1: "Orthopedics",
    type2: "Bioengineering",
    moves: ["Bone Graft", "Joint Flex", "Skeletal Rebuild"],
    specialAttack: "Regen-Marrow",
    hobbies: ["Woodworking", "Skiing", "Volleyball"],
    description: "Skyler builds better bones. When not in the lab, they're carving furniture or carving up the slopes. Known for having the strongest handshake in the cohort.",
    cardDescription: "Orthopedic engineer and woodworker.",
    stats: {
      caffeine: 70,
      coding: 60,
      wetLab: 88,
      clinical: 82,
      ankiConsistency: 95
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/skyler/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/172.gif", // Pichu
    hometown: "Salt Lake City, UT"
  },
  {
    id: "012",
    name: "Charlie Zhang",
    type1: "Immunology",
    type2: "Microbiology",
    moves: ["Cytokine Storm", "Phagocytosis", "B-Cell Blast"],
    specialAttack: "Antibody Cascade",
    hobbies: ["Tennis", "Cooking", "Piano"],
    description: "Charlie is fascinated by the body's defense mechanisms. When not studying T-cells, they're likely perfecting a recipe or practicing a concerto.",
    cardDescription: "Immunology expert and pianist.",
    stats: {
      caffeine: 75,
      coding: 65,
      wetLab: 92,
      clinical: 70,
      ankiConsistency: 88
    },
    statLabels: {
      caffeine: "Caffeine",
      coding: "Coding",
      wetLab: "Wet Lab",
      clinical: "Clinical",
      ankiConsistency: "Anki"
    },
    imageUrl: "https://picsum.photos/seed/charlie/400/400",
    imagePosition: "center",
    ballUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
    spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif", // Eevee
    hometown: "San Diego, CA"
  }
];
