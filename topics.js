/* Topics and their sources. Shared by the browser and the serverless function (UMD).
   Feeds are public RSS/Atom feeds of well-known outlets that answer from anywhere. Each topic mixes several outlets on purpose. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NZ_TOPICS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var T = [
    { id: 'world', e: '🌍', c: '#1C7ED6', ru: 'Мир', en: 'World', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/world/rss.xml'], ['The Guardian', 'https://www.theguardian.com/world/rss'],
      ['Al Jazeera', 'https://www.aljazeera.com/xml/rss/all.xml'], ['DW', 'https://rss.dw.com/rdf/rss-en-all'], ['NPR', 'https://feeds.npr.org/1004/rss.xml']] },
    { id: 'tech', e: '💻', c: '#5F3DC4', ru: 'Технологии', en: 'Technology', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/technology/rss.xml'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/index'],
      ['The Verge', 'https://www.theverge.com/rss/index.xml'], ['The Guardian', 'https://www.theguardian.com/technology/rss'], ['Wired', 'https://www.wired.com/feed/rss']] },
    { id: 'ai', e: '🤖', c: '#C2255C', ru: 'Искусственный интеллект', en: 'Artificial intelligence', feeds: [
      ['The Verge', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'], ['The Guardian', 'https://www.theguardian.com/technology/artificialintelligenceai/rss'],
      ['MIT Technology Review', 'https://www.technologyreview.com/feed/'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/technology-lab']] },
    { id: 'business', e: '📈', c: '#2B8A3E', ru: 'Бизнес и экономика', en: 'Business and economy', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/business/rss.xml'], ['The Guardian', 'https://www.theguardian.com/uk/business/rss'],
      ['CNBC', 'https://www.cnbc.com/id/10001147/device/rss/rss.html'], ['NPR', 'https://feeds.npr.org/1006/rss.xml']] },
    { id: 'science', e: '🔬', c: '#0C8599', ru: 'Наука и космос', en: 'Science and space', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'], ['The Guardian', 'https://www.theguardian.com/science/rss'],
      ['NASA', 'https://www.nasa.gov/rss/dyn/breaking_news.rss'], ['ScienceDaily', 'https://www.sciencedaily.com/rss/top/science.xml'], ['Nature', 'https://www.nature.com/nature.rss']] },
    { id: 'health', e: '🩺', c: '#E8590C', ru: 'Здоровье', en: 'Health', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/health/rss.xml'], ['The Guardian', 'https://www.theguardian.com/society/health/rss'],
      ['NPR', 'https://feeds.npr.org/1128/rss.xml'], ['WHO', 'https://www.who.int/rss-feeds/news-english.xml']] },
    { id: 'climate', e: '🌱', c: '#66A80F', ru: 'Климат и природа', en: 'Climate and nature', feeds: [
      ['The Guardian', 'https://www.theguardian.com/environment/climate-crisis/rss'], ['Carbon Brief', 'https://www.carbonbrief.org/feed/'],
      ['NPR', 'https://feeds.npr.org/1167/rss.xml'], ['BBC', 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml']] },
    { id: 'sport', e: '⚽', c: '#E03131', ru: 'Спорт', en: 'Sport', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/sport/rss.xml'], ['The Guardian', 'https://www.theguardian.com/sport/rss'], ['ESPN', 'https://www.espn.com/espn/rss/news']] },
    { id: 'culture', e: '🎬', c: '#9C36B5', ru: 'Культура и кино', en: 'Culture and film', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'], ['The Guardian', 'https://www.theguardian.com/culture/rss'], ['NPR', 'https://feeds.npr.org/1008/rss.xml']] },
    { id: 'games', e: '🎮', c: '#F08C00', ru: 'Игры', en: 'Games', feeds: [
      ['The Guardian', 'https://www.theguardian.com/games/rss'], ['Polygon', 'https://www.polygon.com/rss/index.xml'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/gaming']] }
  ];
  var NAMES = {"world": {"es": "Mundo", "pt": "Mundo", "fr": "Monde", "de": "Welt", "hi": "दुनिया", "zh": "国际", "ar": "العالم"}, "tech": {"es": "Tecnología", "pt": "Tecnologia", "fr": "Technologie", "de": "Technologie", "hi": "टेक्नोलॉजी", "zh": "科技", "ar": "التقنية"}, "ai": {"es": "Inteligencia artificial", "pt": "Inteligência artificial", "fr": "Intelligence artificielle", "de": "Künstliche Intelligenz", "hi": "कृत्रिम बुद्धिमत्ता", "zh": "人工智能", "ar": "الذكاء الاصطناعي"}, "business": {"es": "Economía y negocios", "pt": "Economia e negócios", "fr": "Économie et affaires", "de": "Wirtschaft", "hi": "कारोबार और अर्थव्यवस्था", "zh": "商业与经济", "ar": "الأعمال والاقتصاد"}, "science": {"es": "Ciencia y espacio", "pt": "Ciência e espaço", "fr": "Science et espace", "de": "Wissenschaft und Weltraum", "hi": "विज्ञान और अंतरिक्ष", "zh": "科学与太空", "ar": "العلوم والفضاء"}, "health": {"es": "Salud", "pt": "Saúde", "fr": "Santé", "de": "Gesundheit", "hi": "स्वास्थ्य", "zh": "健康", "ar": "الصحة"}, "climate": {"es": "Clima y naturaleza", "pt": "Clima e natureza", "fr": "Climat et nature", "de": "Klima und Natur", "hi": "जलवायु और प्रकृति", "zh": "气候与自然", "ar": "المناخ والطبيعة"}, "sport": {"es": "Deporte", "pt": "Esporte", "fr": "Sport", "de": "Sport", "hi": "खेल", "zh": "体育", "ar": "الرياضة"}, "culture": {"es": "Cultura y cine", "pt": "Cultura e cinema", "fr": "Culture et cinéma", "de": "Kultur und Film", "hi": "संस्कृति और सिनेमा", "zh": "文化与电影", "ar": "الثقافة والسينما"}, "games": {"es": "Videojuegos", "pt": "Games", "fr": "Jeux vidéo", "de": "Games", "hi": "गेम्स", "zh": "游戏", "ar": "الألعاب"}};
  var LANGS = [['en','English'],['es','Español'],['pt','Português'],['fr','Français'],['de','Deutsch'],['ru','Русский'],['hi','हिन्दी'],['zh','中文'],['ar','العربية']];
  var byId = {};
  T.forEach(function (t) { Object.assign(t, NAMES[t.id]); byId[t.id] = t; });
  return { list: T, byId: byId, langs: LANGS.map(function (l) { return l[0]; }), langNames: LANGS, rtl: ['ar'], BUDGET_SEC: 300, WPM: 200 };
});
