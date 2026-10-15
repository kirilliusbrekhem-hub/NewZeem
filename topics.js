/* Topics and their sources. Shared by the browser and the serverless function (UMD).
   Feeds are public RSS/Atom feeds of well-known outlets that answer from anywhere. Each topic mixes several outlets on purpose. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NZ_TOPICS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var T = [
    { id: 'world', ru: 'Мир', en: 'World', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/world/rss.xml'], ['The Guardian', 'https://www.theguardian.com/world/rss'],
      ['Al Jazeera', 'https://www.aljazeera.com/xml/rss/all.xml'], ['DW', 'https://rss.dw.com/rdf/rss-en-all'], ['NPR', 'https://feeds.npr.org/1004/rss.xml']] },
    { id: 'tech', ru: 'Технологии', en: 'Technology', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/technology/rss.xml'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/index'],
      ['The Verge', 'https://www.theverge.com/rss/index.xml'], ['The Guardian', 'https://www.theguardian.com/technology/rss'], ['Wired', 'https://www.wired.com/feed/rss']] },
    { id: 'ai', ru: 'Искусственный интеллект', en: 'Artificial intelligence', feeds: [
      ['The Verge', 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'], ['The Guardian', 'https://www.theguardian.com/technology/artificialintelligenceai/rss'],
      ['MIT Technology Review', 'https://www.technologyreview.com/feed/'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/technology-lab']] },
    { id: 'business', ru: 'Бизнес и экономика', en: 'Business and economy', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/business/rss.xml'], ['The Guardian', 'https://www.theguardian.com/uk/business/rss'],
      ['CNBC', 'https://www.cnbc.com/id/10001147/device/rss/rss.html'], ['NPR', 'https://feeds.npr.org/1006/rss.xml']] },
    { id: 'science', ru: 'Наука и космос', en: 'Science and space', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'], ['The Guardian', 'https://www.theguardian.com/science/rss'],
      ['NASA', 'https://www.nasa.gov/rss/dyn/breaking_news.rss'], ['ScienceDaily', 'https://www.sciencedaily.com/rss/top/science.xml'], ['Nature', 'https://www.nature.com/nature.rss']] },
    { id: 'health', ru: 'Здоровье', en: 'Health', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/health/rss.xml'], ['The Guardian', 'https://www.theguardian.com/society/health/rss'],
      ['NPR', 'https://feeds.npr.org/1128/rss.xml'], ['WHO', 'https://www.who.int/rss-feeds/news-english.xml']] },
    { id: 'climate', ru: 'Климат и природа', en: 'Climate and nature', feeds: [
      ['The Guardian', 'https://www.theguardian.com/environment/climate-crisis/rss'], ['Carbon Brief', 'https://www.carbonbrief.org/feed/'],
      ['NPR', 'https://feeds.npr.org/1167/rss.xml'], ['BBC', 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml']] },
    { id: 'sport', ru: 'Спорт', en: 'Sport', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/sport/rss.xml'], ['The Guardian', 'https://www.theguardian.com/sport/rss'], ['ESPN', 'https://www.espn.com/espn/rss/news']] },
    { id: 'culture', ru: 'Культура и кино', en: 'Culture and film', feeds: [
      ['BBC', 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'], ['The Guardian', 'https://www.theguardian.com/culture/rss'], ['NPR', 'https://feeds.npr.org/1008/rss.xml']] },
    { id: 'games', ru: 'Игры', en: 'Games', feeds: [
      ['The Guardian', 'https://www.theguardian.com/games/rss'], ['Polygon', 'https://www.polygon.com/rss/index.xml'], ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/gaming']] }
  ];
  var byId = {};
  T.forEach(function (t) { byId[t.id] = t; });
  return { list: T, byId: byId, langs: ['ru', 'en'], BUDGET_SEC: 300, WPM: 200 };
});
