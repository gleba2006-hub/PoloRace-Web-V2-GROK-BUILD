const ASSET = "https://polo-race-memories.lovable.app/__l5e/assets-v1";

export const images = {
  briefing: `${ASSET}/5230499e-070c-47dd-a378-199475e680b0/hero_briefing.jpg`,
  passport: `${ASSET}/596307af-ca21-4284-bb79-125fecbfd82b/passport_board.jpg`,
  pointing: `${ASSET}/e3971d7f-78c6-4aa2-a411-4985d6a9e612/pointing.jpg`,
  cameras: `${ASSET}/4efb7230-3b91-49c7-b82e-e6755184e5fd/cameras.jpg`,
  green: `${ASSET}/3c08cd48-05f2-424c-af07-01260a56556c/gallery_green.jpg`,
  guyBoard: `${ASSET}/482b8f48-e39c-4771-b606-482063702574/guy_board.jpg`,
  shooter: `${ASSET}/aa277bdc-4493-4200-8ae1-0f6778ba7df2/shooter.jpg`,
  boardHeld: `${ASSET}/afc6db43-334e-41a7-b6f4-56ce09a11097/board_held.jpg`,
  laughing: `${ASSET}/ffb3964a-ab27-4f55-a9c7-3f56f2a5c567/gallery_laughing.jpg`,
  table: `${ASSET}/b5922201-3de8-4e36-80ec-c2df67b735a0/table_photos.jpg`,
} as const;

export const links = {
  whatsapp: "https://wa.me/972584250480",
  instagram: "https://www.instagram.com/polorace_game/",
  youtube: "https://www.youtube.com/@PoloRace",
  pushers: "https://pushers.co.il/",
  smirnov: "https://smirnovpro.com",
} as const;

/** Prices extracted from the live PoloRace calculator. Edit here only. */
export const prices = {
  directPerPerson: 250,
  producerPerPerson: 230,
  frames8Factor: 0.9,
  englishFactor: 1.2,
  orgPerPerson: 35,
  chaserPerPerson: 10,
  album: 1000,
  highlight: 2000,
  travelPerKm: 3,
  vatRate: 0.18,
  depositRate: 0.3,
  minParticipants: 50,
  maxPerGroup: 7,
  photosPerGroup: 16,
  departure: "קניון עזריאלי",
} as const;

export const why = [
  {
    title: "חיזוק עבודת הצוות",
    text: "המשימות מחייבות את המשתתפים לשתף פעולה, לקבל החלטות יחד ולפעול למען מטרה משותפת.",
  },
  {
    title: "שיפור התקשורת הבין־אישית",
    text: "כדי להצליח במשימות, חברי הצוות צריכים להקשיב זה לזה, לשתף רעיונות ולמצוא שפה משותפת.",
  },
  {
    title: "פיתוח חשיבה יצירתית",
    text: "האתגרים מעודדים את המשתתפים לחשוב מחוץ לקופסה, למצוא פתרונות מקוריים ולהביא לידי ביטוי את היצירתיות שלהם.",
  },
  {
    title: "גילוי חוזקות וכישרונות",
    text: "הפעילות מאפשרת לעובדים להכיר צדדים חדשים זה בזה, לגלות יכולות נסתרות וללמוד להעריך את התרומה הייחודית של כל אחד.",
  },
  {
    title: "שבירת מחיצות ויצירת קשרים",
    text: "מחוץ לשגרת העבודה ולהיררכיה הארגונית, נוצרת הזדמנות להתחבר, לצחוק ולבנות קשרים אישיים בין חברי הצוות.",
  },
  {
    title: "חוויה משותפת שנשארת",
    text: "בניגוד לפעילות גיבוש שנגמרת ונשכחת, כל צוות מסיים עם פוסטר תמונות אישי שמתעד את החוויות, ההצלחות והרגעים המשותפים.",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "המשימה",
    text: "בתדריך קצר ומקצועי כל צוות מקבל תיק מבצע סודי: חידות, משימות מטורפות ומצלמת \u2066Polaroid Go Now 3\u2069 עם כמות תמונות מוגבלת. מכאן זה רק מתחמם.",
  },
  {
    n: "02",
    title: "עבודת צוות",
    text: "הצוות יוצא לשטח, מנווט במרחב, מביים סיטואציות ומשתף פעולה כדי ללכוד את הפריים המושלם. בלי פילטרים, בלי צילום מחדש: רגע אחד, הזדמנות אחת.",
  },
  {
    n: "03",
    title: "המזכרת",
    text: "כל צוות בונה קיר ראיות: קולאז' מהפריימים שהצטלמו שמספר סיפור יצירתי עם רצף לוגי. הסיפור השווה ביותר יזכה בניקוד משוגע, והלוח המפותח נשאר אצלכם כמזכרת נצחית.",
  },
] as const;

export const videos = [
  {
    name: "מנכ״ל ברנדלייט",
    role: "מנכ״ל",
    company: "ברנדלייט",
    poster: "https://i.ytimg.com/vi/il751wr5FGg/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/il751wr5FGg",
  },
  {
    name: "לקוחה",
    role: "לקוחה",
    company: "עמצה",
    poster: "https://i.ytimg.com/vi/dVMwfmfNfs8/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/dVMwfmfNfs8",
  },
  {
    name: "ארתור",
    role: "משתתף",
    company: "חוויית משחק",
    poster: "https://i.ytimg.com/vi/lm3Kkf8ELjY/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/lm3Kkf8ELjY",
  },
  {
    name: "משתתפים",
    role: "חוויות מהפעילות",
    company: "PoloRace",
    poster: "https://i.ytimg.com/vi/ZPIe6b2zN9M/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/ZPIe6b2zN9M",
  },
  {
    name: "Beta Finance",
    role: "מאחורי הקלעים",
    company: "Beta Finance",
    poster: "https://i.ytimg.com/vi/r7QvsgJJRKc/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/r7QvsgJJRKc",
  },
  {
    name: "טעימות מהפעילות",
    role: "קליפ מהשטח",
    company: "PoloRace",
    poster: "https://i.ytimg.com/vi/e3joqUZcqDw/hqdefault.jpg",
    src: "https://www.youtube.com/shorts/e3joqUZcqDw",
  },
] as const;

export const gallery = [
  { src: images.green, alt: "צוות מצלם בחוץ במסגרת PoloRace" },
  { src: "/polorace/gallery-table.jpg", alt: "צוות סביב שולחן אבן עם תמונות פולורואיד" },
  { src: images.shooter, alt: "צילום פולורואיד במהלך המשימה" },
  { src: "/polorace/gallery-board.jpg", alt: "צוות מחזיק לוח Making Memories" },
  { src: images.laughing, alt: "צחוק משותף אחרי הפריים" },
  { src: images.table, alt: "תמונות מפותחות על השולחן" },
  { src: images.passport, alt: "דרכון שבירת הלופ" },
  { src: images.pointing, alt: "הכוונה במשימה בשטח" },
  { src: images.briefing, alt: "תדריך הפתיחה של PoloRace" },
  { src: images.cameras, alt: "מצלמות Polaroid Go Now 3" },
] as const;

export const faq = [
  {
    q: "כמה משתתפים צריך?",
    a: "מינימום 50 משתתפים, בחלוקה לקבוצות של 5–7.",
  },
  {
    q: "מה כלול במחיר?",
    a: "מצלמות מקצועיות עד 7 בקבוצה, 2 סטים פילמים לכל קבוצה (16 תמונות), גיליון הדרכה מעוצב והדרכה מקצועית, לוח תיעוד ואטבים שנשארים כמזכרת, ארגז חפצים למשימות, וחלוקה מראש לקבוצות.",
  },
  {
    q: "איך משלמים?",
    a: "30% מקדמה עם חתימת החוזה, והיתרה ביום האירוע. מחירי המחשבון מוצגים לפני מע״מ, והסיכום כולל גם את הסכום אחרי מע״מ.",
  },
  {
    q: "האם אפשר באנגלית?",
    a: "כן. פעילות באנגלית מוסיפה 20% מעלות הפעילות.",
  },
  {
    q: "אפשר בכמה לוקיישנים?",
    a: "כן. כל לוקיישן נוסף עולה 2,000–2,500 ₪.",
  },
  {
    q: "אילו תוספות אפשר להוסיף?",
    a: "שאלות הבניה ארגונית 35 ₪ למשתתף, צ'ייסר יצירתיות 10 ₪ למשתתף, אלבום תמונות מקצועיות 1,000 ₪, סרטון היילייטס 2,000 ₪. פורמט 8 פריימים מעניק 10% הנחה.",
  },
  {
    q: "כמה עולות נסיעות?",
    a: "3 ₪ לק״מ, בחישוב מנקודת היציאה בקניון עזריאלי.",
  },
  {
    q: "מה מדיניות הביטולים?",
    a: "21 ימי עסקים לפני האירוע: 50% מערך העסקה. 14 ימי עסקים: 75%. 7 ימי עסקים: 100%.",
  },
  {
    q: "עד מתי ההצעה תקפה?",
    a: "5 ימי עסקים מיום שליחתה.",
  },
  {
    q: "האם אפשר לעקוב אחרי הניקוד?",
    a: "כן. שולחים לינק למעקב בזמן אמת אחרי הניקוד של כל הקבוצות.",
  },
] as const;
