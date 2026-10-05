import type { Tutor } from '../types/marketplace';

const CDN = "/generated-images";
const standardPackages = [
{ lessons: 5, discountPercent: 5 },
{ lessons: 10, discountPercent: 10 }];


export const tutors: Tutor[] = [
{
  id: 'maya-chen', name: 'Maya Chen', firstName: 'Maya',
  headline: 'Patient calculus & SAT Math coach — former Stanford TA',
  photo: `${CDN}/0e8cad5a-c8dc-41b6-a405-a8f56d09bba9.jpg`,
  country: 'United States', city: 'San Francisco', timezone: 'Pacific Time (GMT-7)',
  hourlyRate: 55, rating: 4.97, reviewCount: 212, lessonsTaught: 1840, studentsCount: 156,
  responseTime: 'within 1 hour', memberSince: '2021', languages: ['English', 'Mandarin'],
  subjects: [
  { subject: 'math', topics: ['Algebra II', 'Pre-calculus', 'AP Calculus AB/BC'], levels: ['high-school', 'college'] },
  { subject: 'test-prep', topics: ['SAT Math', 'ACT Math'], levels: ['high-school'] }],

  bio: "I've helped more than 150 students go from \"I'm just not a math person\" to confident problem-solvers. I spent four years as a teaching assistant for Stanford's calculus sequence and now tutor full-time. My students have raised their SAT Math scores by an average of 90 points.",
  teachingStyle: 'Every lesson starts with a 5-minute warm-up on last week\'s weak spot, then we work problems together on a shared whiteboard. I explain the "why" before the shortcut, and I send a short recap with practice problems after each session.',
  teachingHighlights: ['Shared digital whiteboard', 'Lesson recap after every session', 'Custom practice sets'],
  education: [
  { title: 'M.S. Mathematics Education', institution: 'Stanford University', year: '2019', verified: true },
  { title: 'B.A. Applied Mathematics', institution: 'UC Berkeley', year: '2017', verified: true }],

  packages: standardPackages,
  availability: { mon: [15, 16, 17, 18, 19], tue: [16, 17, 18, 19], wed: [15, 16, 17, 18], thu: [16, 17, 18, 19, 20], fri: [15, 16, 17], sat: [9, 10, 11, 12], sun: [] },
  verified: true, featured: true
},
{
  id: 'daniel-okafor', name: 'Daniel Okafor', firstName: 'Daniel',
  headline: 'Chemistry & Biology tutor who makes reactions click',
  photo: `${CDN}/e9ff19b6-8020-4b77-8ea9-1f43010246bb.jpg`,
  country: 'United Kingdom', city: 'Manchester', timezone: 'British Time (GMT+1)',
  hourlyRate: 48, rating: 4.92, reviewCount: 138, lessonsTaught: 1120, studentsCount: 97,
  responseTime: 'within 2 hours', memberSince: '2022', languages: ['English', 'Yoruba'],
  subjects: [{ subject: 'science', topics: ['Chemistry', 'Biology', 'AP Chemistry', 'IB Biology'], levels: ['middle', 'high-school', 'college'] }],
  bio: 'PhD candidate in biochemistry at the University of Manchester. I love turning abstract topics like stoichiometry and cellular respiration into stories you can actually remember. I tutor GCSE, A-level, IB and AP students.',
  teachingStyle: 'Visual and hands-on. I use animations, kitchen-table experiments and mnemonics, then lock it in with exam-style questions.',
  teachingHighlights: ['Exam-board specific prep', 'Animated diagrams', 'Weekly progress notes'],
  education: [
  { title: 'PhD Biochemistry (in progress)', institution: 'University of Manchester', year: '2027', verified: true },
  { title: 'B.Sc. Chemistry, First Class', institution: 'University of Leeds', year: '2021', verified: true }],

  packages: standardPackages,
  availability: { mon: [9, 10, 11, 18, 19], tue: [18, 19, 20], wed: [9, 10, 11], thu: [18, 19, 20], fri: [9, 10], sat: [10, 11, 12, 13, 14], sun: [14, 15, 16] },
  verified: true, featured: true
},
{
  id: 'sofia-ramirez', name: 'Sofía Ramírez', firstName: 'Sofía',
  headline: 'Conversational Spanish for teens & adults — speak from day one',
  photo: `${CDN}/62730700-8a6a-40f8-b872-1a52c1ebb7af.jpg`,
  country: 'Mexico', city: 'Guadalajara', timezone: 'Central Time (GMT-6)',
  hourlyRate: 35, rating: 4.95, reviewCount: 301, lessonsTaught: 2650, studentsCount: 240,
  responseTime: 'within 1 hour', memberSince: '2020', languages: ['Spanish', 'English'],
  subjects: [{ subject: 'languages', topics: ['Spanish', 'AP Spanish', 'DELE prep'], levels: ['middle', 'high-school', 'college', 'adult'] }],
  bio: 'Certified ELE teacher with 7 years of experience. I specialize in getting shy speakers talking and preparing students for AP Spanish and DELE exams. Expect lots of real conversation, music and culture.',
  teachingStyle: 'Communicative approach: 70% speaking, 30% structure. I adapt topics to your interests — football, K-pop, cooking, travel — whatever keeps you talking.',
  teachingHighlights: ['Conversation-first', 'Native speaker', 'AP & DELE prep'],
  education: [
  { title: 'Certificate in Teaching Spanish as a Foreign Language', institution: 'Instituto Cervantes', year: '2018', verified: true },
  { title: 'B.A. Hispanic Linguistics', institution: 'Universidad de Guadalajara', year: '2017', verified: false }],

  packages: [{ lessons: 5, discountPercent: 8 }, { lessons: 10, discountPercent: 15 }],
  availability: { mon: [8, 9, 10, 17, 18, 19], tue: [8, 9, 10, 17, 18, 19], wed: [17, 18, 19], thu: [8, 9, 10, 17, 18], fri: [8, 9, 10], sat: [], sun: [10, 11, 12] },
  verified: true, featured: true
},
{
  id: 'priya-nair', name: 'Priya Nair', firstName: 'Priya',
  headline: 'Software engineer teaching Python & JavaScript, project-first',
  photo: `${CDN}/bc816155-1a2f-4370-88e5-08f3dfb62ee1.jpg`,
  country: 'Canada', city: 'Toronto', timezone: 'Eastern Time (GMT-4)',
  hourlyRate: 60, rating: 4.98, reviewCount: 96, lessonsTaught: 740, studentsCount: 64,
  responseTime: 'within 3 hours', memberSince: '2022', languages: ['English', 'Hindi'],
  subjects: [{ subject: 'coding', topics: ['Python', 'JavaScript', 'AP Computer Science A', 'Web development'], levels: ['high-school', 'college', 'adult'] }],
  bio: 'Senior engineer at a Toronto fintech by day, coding mentor by evening. I teach programming the way it\'s used at work: by building real projects — games, websites, data dashboards — while learning fundamentals along the way.',
  teachingStyle: 'Pair-programming over screen share. You drive, I navigate. We ship a small project every 3–4 lessons so you always have something to show.',
  teachingHighlights: ['Real projects', 'Pair programming', 'Portfolio guidance'],
  education: [
  { title: 'B.A.Sc. Computer Engineering', institution: 'University of Waterloo', year: '2016', verified: true },
  { title: 'AWS Certified Developer', institution: 'Amazon Web Services', year: '2023', verified: true }],

  packages: standardPackages,
  availability: { mon: [19, 20, 21], tue: [19, 20, 21], wed: [19, 20], thu: [19, 20, 21], fri: [], sat: [10, 11, 12, 13], sun: [10, 11, 12] },
  verified: true, featured: true
},
{
  id: 'james-whitaker', name: 'James Whitaker', firstName: 'James',
  headline: 'Essay writing & college application coach, 15 years in the classroom',
  photo: `${CDN}/a30ca791-b348-4530-9fbd-29e71da0443c.jpg`,
  country: 'United States', city: 'Boston', timezone: 'Eastern Time (GMT-4)',
  hourlyRate: 65, rating: 4.94, reviewCount: 174, lessonsTaught: 1980, studentsCount: 188,
  responseTime: 'within 4 hours', memberSince: '2020', languages: ['English'],
  subjects: [{ subject: 'english', topics: ['Essay writing', 'AP Literature', 'College essays', 'Reading comprehension'], levels: ['middle', 'high-school', 'college'] }],
  bio: 'Former high-school English department head. I help students find their voice on the page — from five-paragraph essays to Common App personal statements that admissions officers remember.',
  teachingStyle: 'Socratic and encouraging. We read closely, outline together, and revise in rounds with tracked comments so you see exactly how your writing improves.',
  teachingHighlights: ['College essay specialist', 'Tracked-change feedback', 'Reading lists by level'],
  education: [
  { title: 'M.Ed. Secondary English', institution: 'Boston College', year: '2010', verified: true },
  { title: 'B.A. English Literature', institution: 'Tufts University', year: '2008', verified: true }],

  packages: standardPackages,
  availability: { mon: [16, 17, 18], tue: [16, 17, 18], wed: [16, 17, 18, 19], thu: [16, 17], fri: [], sat: [9, 10, 11], sun: [13, 14, 15] },
  verified: true, featured: true
},
{
  id: 'amelie-laurent', name: 'Amélie Laurent', firstName: 'Amélie',
  headline: 'Parisian French tutor — grammar made friendly, accent made easy',
  photo: `${CDN}/5e3c6c11-130f-40aa-997c-f6a786bc1b42.jpg`,
  country: 'France', city: 'Paris', timezone: 'Central European Time (GMT+2)',
  hourlyRate: 40, rating: 4.89, reviewCount: 122, lessonsTaught: 960, studentsCount: 83,
  responseTime: 'within 2 hours', memberSince: '2021', languages: ['French', 'English', 'Spanish'],
  subjects: [{ subject: 'languages', topics: ['French', 'AP French', 'DELF prep'], levels: ['elementary', 'middle', 'high-school', 'adult'] }],
  bio: 'Native Parisian and DELF examiner. I teach children through games and songs, and teens and adults through conversation, film and current events.',
  teachingStyle: 'Structured but playful: a clear grammar point each lesson, practiced through role-play and short readings.',
  teachingHighlights: ['DELF examiner', 'Great with kids', 'Pronunciation drills'],
  education: [{ title: 'Master FLE (French as a Foreign Language)', institution: 'Sorbonne Nouvelle', year: '2016', verified: true }],
  packages: standardPackages,
  availability: { mon: [7, 8, 9, 10], tue: [7, 8, 9], wed: [7, 8, 9, 10, 11], thu: [7, 8], fri: [7, 8, 9, 10], sat: [8, 9], sun: [] },
  verified: true
},
{
  id: 'kenji-tanaka', name: 'Kenji Tanaka', firstName: 'Kenji',
  headline: 'Music theory & ear training for pianists and composers',
  photo: `${CDN}/8369f7db-a22f-4ef4-b18f-f3aa1d0882e6.jpg`,
  country: 'Japan', city: 'Osaka', timezone: 'Japan Time (GMT+9)',
  hourlyRate: 42, rating: 4.96, reviewCount: 71, lessonsTaught: 520, studentsCount: 44,
  responseTime: 'within 6 hours', memberSince: '2023', languages: ['Japanese', 'English'],
  subjects: [{ subject: 'music-theory', topics: ['Harmony', 'Ear training', 'AP Music Theory', 'Composition'], levels: ['middle', 'high-school', 'college', 'adult'] }],
  bio: 'Conservatory-trained pianist and film composer. I make harmony and voice-leading feel intuitive by connecting every rule to music you already love.',
  teachingStyle: 'Listen first, label second. We analyze songs, then compose short exercises to internalize each concept.',
  teachingHighlights: ['Ear training apps', 'Song analysis', 'AP Music Theory prep'],
  education: [{ title: 'B.Mus. Composition', institution: 'Osaka College of Music', year: '2015', verified: true }],
  packages: standardPackages,
  availability: { mon: [6, 7, 20, 21], tue: [6, 7], wed: [6, 7, 20, 21], thu: [20, 21], fri: [6, 7], sat: [18, 19, 20], sun: [18, 19, 20] },
  verified: true
},
{
  id: 'hannah-goldberg', name: 'Hannah Goldberg', firstName: 'Hannah',
  headline: '99th percentile SAT & ACT strategist — 200+ point average gains',
  photo: `${CDN}/98b1057a-c125-48c3-b152-6a78fa6e1226.jpg`,
  country: 'United States', city: 'New York', timezone: 'Eastern Time (GMT-4)',
  hourlyRate: 85, rating: 4.99, reviewCount: 248, lessonsTaught: 3100, studentsCount: 290,
  responseTime: 'within 1 hour', memberSince: '2019', languages: ['English', 'Hebrew'],
  subjects: [
  { subject: 'test-prep', topics: ['SAT', 'ACT', 'PSAT/NMSQT'], levels: ['high-school'] },
  { subject: 'english', topics: ['SAT Reading & Writing'], levels: ['high-school'] }],

  bio: 'I scored a 1590 on the SAT and 36 on the ACT, and I\'ve spent 8 years teaching students how to do the same. My students average a 200+ point SAT gain over a 10-lesson package.',
  teachingStyle: 'Diagnostic first. We take a full practice test, then build a personalized plan that targets the question types costing you the most points.',
  teachingHighlights: ['Full diagnostic test', 'Personalized study plan', 'Timing strategies'],
  education: [
  { title: 'B.A. Economics', institution: 'Columbia University', year: '2016', verified: true },
  { title: 'SAT: 1590 · ACT: 36', institution: 'College Board / ACT', year: '2012', verified: true }],

  packages: [{ lessons: 5, discountPercent: 5 }, { lessons: 10, discountPercent: 12 }],
  availability: { mon: [15, 16, 17, 18], tue: [15, 16, 17, 18], wed: [15, 16, 17], thu: [15, 16, 17, 18], fri: [], sat: [9, 10, 11, 12, 13], sun: [11, 12, 13] },
  verified: true, featured: true
},
{
  id: 'lucas-ferreira', name: 'Lucas Ferreira', firstName: 'Lucas',
  headline: 'Geometry & statistics tutor for middle and high schoolers',
  photo: `${CDN}/3ba62854-b7b6-4fa2-bb5f-870be6484135.jpg`,
  country: 'Brazil', city: 'São Paulo', timezone: 'Brasília Time (GMT-3)',
  hourlyRate: 32, rating: 4.86, reviewCount: 88, lessonsTaught: 690, studentsCount: 61,
  responseTime: 'within 3 hours', memberSince: '2022', languages: ['Portuguese', 'English', 'Spanish'],
  subjects: [{ subject: 'math', topics: ['Geometry', 'Statistics', 'Algebra I', 'AP Statistics'], levels: ['middle', 'high-school'] }],
  bio: 'Math teacher at a bilingual school in São Paulo. I love showing students how stats explains sports, games and social media — it makes the formulas stick.',
  teachingStyle: 'Real-world examples, short checks for understanding, and a weekly mini-quiz to track progress.',
  teachingHighlights: ['Real-world examples', 'Weekly mini-quiz', 'Bilingual support'],
  education: [{ title: 'Licenciatura em Matemática', institution: 'Universidade de São Paulo', year: '2018', verified: true }],
  packages: standardPackages,
  availability: { mon: [10, 11, 12, 13], tue: [10, 11, 12], wed: [10, 11, 12, 13], thu: [10, 11], fri: [10, 11, 12], sat: [], sun: [] },
  verified: true
},
{
  id: 'aisha-rahman', name: 'Aisha Rahman', firstName: 'Aisha',
  headline: 'Physics made intuitive — GCSE, A-level, AP & IB',
  photo: `${CDN}/17607103-d41c-4e93-a3a3-8a395f9534f1.jpg`,
  country: 'United Kingdom', city: 'London', timezone: 'British Time (GMT+1)',
  hourlyRate: 52, rating: 4.93, reviewCount: 109, lessonsTaught: 880, studentsCount: 72,
  responseTime: 'within 2 hours', memberSince: '2021', languages: ['English', 'Arabic'],
  subjects: [
  { subject: 'science', topics: ['Physics', 'AP Physics 1 & 2', 'IB Physics'], levels: ['high-school', 'college'] },
  { subject: 'math', topics: ['Mechanics', 'Further maths'], levels: ['high-school'] }],

  bio: 'Imperial College physics graduate and former research assistant at CERN. I break down mechanics and electromagnetism into simple, visual models before we touch the equations.',
  teachingStyle: 'Concept → model → equation → exam question. Students leave every lesson with one clean summary page.',
  teachingHighlights: ['One-page summaries', 'Simulations', 'Past-paper practice'],
  education: [{ title: 'MSci Physics', institution: 'Imperial College London', year: '2020', verified: true }],
  packages: standardPackages,
  availability: { mon: [17, 18, 19], tue: [17, 18, 19, 20], wed: [], thu: [17, 18, 19, 20], fri: [17, 18], sat: [10, 11, 12], sun: [10, 11] },
  verified: true
},
{
  id: 'marcus-johnson', name: 'Marcus Johnson', firstName: 'Marcus',
  headline: 'Fun, game-based coding for kids 8–14 (Scratch, Python, Roblox)',
  photo: `${CDN}/3cc23557-ed7d-4915-93d8-5cd572979271.jpg`,
  country: 'United States', city: 'Atlanta', timezone: 'Eastern Time (GMT-4)',
  hourlyRate: 38, rating: 4.97, reviewCount: 156, lessonsTaught: 1320, studentsCount: 118,
  responseTime: 'within 1 hour', memberSince: '2021', languages: ['English'],
  subjects: [{ subject: 'coding', topics: ['Scratch', 'Python for kids', 'Roblox Lua', 'Minecraft modding'], levels: ['elementary', 'middle'] }],
  bio: 'Former elementary school STEM teacher. Kids build their own games from lesson one, and parents get a short progress video every month.',
  teachingStyle: 'High-energy, project-based and screen-share friendly. Short challenges, lots of celebration, and gentle debugging coaching.',
  teachingHighlights: ['Great with kids', 'Monthly parent updates', 'Build-a-game curriculum'],
  education: [{ title: 'B.S. Elementary Education (STEM)', institution: 'Georgia State University', year: '2014', verified: true }],
  packages: standardPackages,
  availability: { mon: [16, 17, 18], tue: [16, 17, 18], wed: [16, 17, 18], thu: [16, 17, 18], fri: [16, 17], sat: [9, 10, 11, 12], sun: [] },
  verified: true, featured: true
},
{
  id: 'elena-petrova', name: 'Elena Petrova', firstName: 'Elena',
  headline: 'Math olympiad coach & advanced problem-solving',
  photo: `${CDN}/a3b58645-c374-4ba2-922a-307f8380c4af.jpg`,
  country: 'Bulgaria', city: 'Sofia', timezone: 'Eastern European Time (GMT+3)',
  hourlyRate: 58, rating: 4.95, reviewCount: 64, lessonsTaught: 610, studentsCount: 39,
  responseTime: 'within 5 hours', memberSince: '2022', languages: ['Russian', 'English'],
  subjects: [{ subject: 'math', topics: ['AMC 8/10/12', 'Number theory', 'Combinatorics', 'Calculus'], levels: ['middle', 'high-school'] }],
  bio: 'Coached national olympiad teams for 12 years. I work with ambitious students who want to go beyond the curriculum and compete in AMC, AIME and international olympiads.',
  teachingStyle: 'Problem-driven. We tackle one hard problem from many angles, then generalize the technique.',
  teachingHighlights: ['Olympiad coaching', 'Curated problem sets', 'Competition strategy'],
  education: [{ title: 'Ph.D. Mathematics', institution: 'Sofia University', year: '2011', verified: true }],
  packages: standardPackages,
  availability: { mon: [8, 9], tue: [8, 9, 10], wed: [8, 9], thu: [8, 9, 10], fri: [], sat: [7, 8, 9, 10], sun: [7, 8, 9] },
  verified: true
},
{
  id: 'grace-kim', name: 'Grace Kim', firstName: 'Grace',
  headline: 'Korean for beginners & IELTS English speaking coach',
  photo: `${CDN}/7cef85c9-fdcc-4f12-8a82-a42e5fc18df2.jpg`,
  country: 'South Korea', city: 'Seoul', timezone: 'Korea Time (GMT+9)',
  hourlyRate: 30, rating: 4.9, reviewCount: 143, lessonsTaught: 1210, studentsCount: 102,
  responseTime: 'within 2 hours', memberSince: '2021', languages: ['Korean', 'English'],
  subjects: [
  { subject: 'languages', topics: ['Korean', 'TOPIK prep'], levels: ['high-school', 'college', 'adult'] },
  { subject: 'english', topics: ['IELTS speaking', 'ESL conversation'], levels: ['high-school', 'adult'] }],

  bio: 'Bilingual tutor who grew up between Seoul and Vancouver. I teach Hangul in your first lesson and have helped 60+ students reach IELTS band 7+.',
  teachingStyle: 'Warm, patient and structured, with flashcards and recordings you can review between lessons.',
  teachingHighlights: ['Hangul in 1 lesson', 'IELTS band 7+ track', 'Audio recaps'],
  education: [{ title: 'B.A. English Language & Literature', institution: 'Yonsei University', year: '2019', verified: true }],
  packages: [{ lessons: 5, discountPercent: 10 }, { lessons: 10, discountPercent: 15 }],
  availability: { mon: [6, 7, 8, 21], tue: [6, 7, 8], wed: [6, 7, 8, 21], thu: [6, 7], fri: [6, 7, 8], sat: [19, 20, 21], sun: [] },
  verified: true
},
{
  id: 'tomas-novak', name: 'Tomáš Novák', firstName: 'Tomáš',
  headline: 'Guitarist teaching music theory, chords & songwriting',
  photo: `${CDN}/9ea32bed-c069-461d-a7d1-1bb817f13aa9.jpg`,
  country: 'Czech Republic', city: 'Prague', timezone: 'Central European Time (GMT+2)',
  hourlyRate: 34, rating: 4.84, reviewCount: 52, lessonsTaught: 410, studentsCount: 35,
  responseTime: 'within 4 hours', memberSince: '2023', languages: ['German', 'English'],
  subjects: [{ subject: 'music-theory', topics: ['Chord theory', 'Songwriting', 'Rhythm', 'Reading notation'], levels: ['middle', 'high-school', 'adult'] }],
  bio: 'Session guitarist and songwriter. I teach theory through the fretboard so it immediately makes sense in the songs you want to play and write.',
  teachingStyle: 'Relaxed and practical — we learn a concept, play it, then write four bars with it.',
  teachingHighlights: ['Fretboard-based theory', 'Songwriting projects', 'Backing tracks'],
  education: [{ title: 'B.A. Jazz Performance', institution: 'Prague Conservatory', year: '2014', verified: false }],
  packages: standardPackages,
  availability: { mon: [], tue: [10, 11, 12, 18, 19], wed: [10, 11, 12], thu: [10, 11, 12, 18, 19], fri: [10, 11], sat: [14, 15, 16], sun: [14, 15] },
  verified: true
},
{
  id: 'olivia-bennett', name: 'Olivia Bennett', firstName: 'Olivia',
  headline: 'AP Biology & anatomy tutor — future-doctor approved',
  photo: `${CDN}/b2f9a121-2871-4de1-9a88-1181ac1c5567.jpg`,
  country: 'Australia', city: 'Melbourne', timezone: 'Australian Eastern Time (GMT+10)',
  hourlyRate: 50, rating: 4.91, reviewCount: 79, lessonsTaught: 590, studentsCount: 48,
  responseTime: 'within 3 hours', memberSince: '2022', languages: ['English'],
  subjects: [{ subject: 'science', topics: ['Biology', 'AP Biology', 'Anatomy & physiology', 'MCAT Bio'], levels: ['high-school', 'college'] }],
  bio: 'Medical student at the University of Melbourne. I help pre-med and AP students master biology with clear diagrams, spaced repetition and exam drills.',
  teachingStyle: 'Diagram-heavy with active recall. Every topic ends with a 10-question flash quiz you keep.',
  teachingHighlights: ['Spaced repetition decks', 'Hand-drawn diagrams', 'MCAT bio support'],
  education: [{ title: 'Doctor of Medicine (in progress)', institution: 'University of Melbourne', year: '2027', verified: true }],
  packages: standardPackages,
  availability: { mon: [5, 6, 7], tue: [5, 6, 7], wed: [], thu: [5, 6, 7], fri: [5, 6], sat: [16, 17, 18], sun: [16, 17, 18] },
  verified: true
},
{
  id: 'rafael-costa', name: 'Rafael Costa', firstName: 'Rafael',
  headline: 'Portuguese & Italian for travelers, heritage learners and professionals',
  photo: `${CDN}/cf4ecd23-3533-4aaf-8fd9-e157e24ed722.jpg`,
  country: 'Portugal', city: 'Lisbon', timezone: 'Western European Time (GMT+1)',
  hourlyRate: 33, rating: 4.88, reviewCount: 117, lessonsTaught: 1400, studentsCount: 99,
  responseTime: 'within 2 hours', memberSince: '2020', languages: ['Portuguese', 'Italian', 'English', 'Spanish'],
  subjects: [{ subject: 'languages', topics: ['European Portuguese', 'Brazilian Portuguese', 'Italian'], levels: ['high-school', 'college', 'adult'] }],
  bio: 'Polyglot and former tour guide. I teach practical, confidence-building conversation, plus grammar for heritage speakers who want to finally write well.',
  teachingStyle: 'Relaxed conversation with a clear lesson goal, a shared vocabulary doc, and short homework voice notes.',
  teachingHighlights: ['Heritage learners', 'Shared vocab doc', 'Travel-ready phrases'],
  education: [{ title: 'M.A. Applied Linguistics', institution: 'Universidade de Lisboa', year: '2012', verified: true }],
  packages: standardPackages,
  availability: { mon: [9, 10, 11, 15, 16], tue: [15, 16, 17], wed: [9, 10, 11], thu: [15, 16, 17], fri: [9, 10, 11, 15], sat: [], sun: [10, 11] },
  verified: true
}];