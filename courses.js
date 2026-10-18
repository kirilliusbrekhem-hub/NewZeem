/* Seven-day courses for the Learn tab. Shared by the browser and the serverless function (UMD).
   Each lesson is an English Wikipedia article; the server finds the same article in the reader's Wikipedia when there is one
   and turns it into a short lesson. Names: [title, one line] per language. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NZ_COURSES = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var C = [
    { id: 'econ', c: '#2B8A3E', w: ['Supply and demand', 'Inflation', 'Interest rate', 'Central bank', 'Gross domestic product', 'Stock market', 'Recession'], n: {
      en: ['Economics in a week', 'Prices, money, banks and why recessions happen'],
      es: ['Economía en una semana', 'Precios, dinero, bancos y por qué llegan las recesiones'],
      pt: ['Economia em uma semana', 'Preços, dinheiro, bancos e por que acontecem recessões'],
      fr: ['L’économie en une semaine', 'Prix, monnaie, banques et pourquoi les récessions arrivent'],
      de: ['Wirtschaft in einer Woche', 'Preise, Geld, Banken und warum es Rezessionen gibt'],
      ru: ['Экономика за неделю', 'Цены, деньги, банки и откуда берутся кризисы'],
      hi: ['एक हफ़्ते में अर्थशास्त्र', 'क़ीमतें, पैसा, बैंक और मंदी क्यों आती है'],
      zh: ['一周读懂经济', '价格、货币、银行，以及经济衰退为何发生'],
      ar: ['الاقتصاد في أسبوع', 'الأسعار والمال والبنوك ولماذا يحدث الركود'] } },
    { id: 'space', c: '#1C7ED6', w: ['Solar System', 'Sun', 'Moon', 'Galaxy', 'Black hole', 'Big Bang', 'Exoplanet'], n: {
      en: ['How space works', 'From our Sun to black holes and the Big Bang'],
      es: ['Cómo funciona el espacio', 'Del Sol a los agujeros negros y el Big Bang'],
      pt: ['Como funciona o espaço', 'Do Sol aos buracos negros e ao Big Bang'],
      fr: ['Comment fonctionne l’espace', 'Du Soleil aux trous noirs et au Big Bang'],
      de: ['Wie das Weltall funktioniert', 'Von der Sonne bis zu Schwarzen Löchern und dem Urknall'],
      ru: ['Как устроен космос', 'От Солнца до чёрных дыр и Большого взрыва'],
      hi: ['अंतरिक्ष कैसे काम करता है', 'सूरज से ब्लैक होल और बिग बैंग तक'],
      zh: ['宇宙是怎样运转的', '从太阳到黑洞，再到大爆炸'],
      ar: ['كيف يعمل الفضاء', 'من الشمس إلى الثقوب السوداء والانفجار العظيم'] } },
    { id: 'mind', c: '#C2255C', w: ['Neuron', 'Memory', 'Sleep', 'Dopamine', 'Neuroplasticity', 'Cognitive bias', 'Placebo'], n: {
      en: ['Your brain', 'Memory, sleep, habits and the tricks the mind plays'],
      es: ['Tu cerebro', 'Memoria, sueño, hábitos y las trampas de la mente'],
      pt: ['Seu cérebro', 'Memória, sono, hábitos e os truques da mente'],
      fr: ['Votre cerveau', 'Mémoire, sommeil, habitudes et pièges de l’esprit'],
      de: ['Dein Gehirn', 'Gedächtnis, Schlaf, Gewohnheiten und Denkfallen'],
      ru: ['Твой мозг', 'Память, сон, привычки и ловушки мышления'],
      hi: ['आपका दिमाग़', 'याददाश्त, नींद, आदतें और मन के धोखे'],
      zh: ['你的大脑', '记忆、睡眠、习惯和思维的陷阱'],
      ar: ['دماغك', 'الذاكرة والنوم والعادات وخدع العقل'] } },
    { id: 'tech', c: '#5F3DC4', w: ['Internet', 'World Wide Web', 'Algorithm', 'Encryption', 'Machine learning', 'Neural network (machine learning)', 'Large language model'], n: {
      en: ['From the internet to AI', 'How the web, encryption and AI models work'],
      es: ['De internet a la IA', 'Cómo funcionan la web, el cifrado y los modelos de IA'],
      pt: ['Da internet à IA', 'Como funcionam a web, a criptografia e os modelos de IA'],
      fr: ['D’internet à l’IA', 'Comment fonctionnent le web, le chiffrement et l’IA'],
      de: ['Vom Internet zur KI', 'Wie Web, Verschlüsselung und KI-Modelle funktionieren'],
      ru: ['От интернета до ИИ', 'Как работают сеть, шифрование и нейросети'],
      hi: ['इंटरनेट से एआई तक', 'वेब, एन्क्रिप्शन और एआई मॉडल कैसे काम करते हैं'],
      zh: ['从互联网到人工智能', '网络、加密和 AI 模型是怎样工作的'],
      ar: ['من الإنترنت إلى الذكاء الاصطناعي', 'كيف تعمل الشبكة والتشفير ونماذج الذكاء الاصطناعي'] } },
    { id: 'climate', c: '#66A80F', w: ['Greenhouse effect', 'Greenhouse gas', 'Climate change', 'Ocean current', 'El Niño–Southern Oscillation', 'Renewable energy', 'Paris Agreement'], n: {
      en: ['Climate, plainly', 'What warms the planet and what can be done'],
      es: ['El clima, sin rodeos', 'Qué calienta el planeta y qué se puede hacer'],
      pt: ['O clima, sem rodeios', 'O que aquece o planeta e o que pode ser feito'],
      fr: ['Le climat, simplement', 'Ce qui réchauffe la planète et ce qu’on peut faire'],
      de: ['Klima, einfach erklärt', 'Was den Planeten erwärmt und was man tun kann'],
      ru: ['Климат без паники', 'Что нагревает планету и что с этим делают'],
      hi: ['जलवायु, आसान भाषा में', 'धरती क्यों गर्म हो रही है और क्या किया जा सकता है'],
      zh: ['说清楚气候', '是什么让地球变暖，又能做些什么'],
      ar: ['المناخ ببساطة', 'ما الذي يسخّن الكوكب وما الذي يمكن فعله'] } },
    { id: 'state', c: '#E8590C', w: ['Democracy', 'Separation of powers', 'Constitution', 'Election', 'Parliament', 'United Nations', 'International law'], n: {
      en: ['How states work', 'Power, constitutions, elections and the UN'],
      es: ['Cómo funcionan los Estados', 'Poder, constituciones, elecciones y la ONU'],
      pt: ['Como funcionam os Estados', 'Poder, constituições, eleições e a ONU'],
      fr: ['Comment fonctionnent les États', 'Pouvoir, constitutions, élections et l’ONU'],
      de: ['Wie Staaten funktionieren', 'Macht, Verfassungen, Wahlen und die UNO'],
      ru: ['Как устроено государство', 'Власть, конституция, выборы и ООН'],
      hi: ['राज्य कैसे चलते हैं', 'सत्ता, संविधान, चुनाव और संयुक्त राष्ट्र'],
      zh: ['国家是怎样运作的', '权力、宪法、选举和联合国'],
      ar: ['كيف تعمل الدول', 'السلطة والدساتير والانتخابات والأمم المتحدة'] } },
    { id: 'think', c: '#0C8599', w: ['Critical thinking', 'Scientific method', 'Fallacy', 'Confirmation bias', 'Correlation does not imply causation', 'Statistical significance', "Occam's razor"], n: {
      en: ['Think clearly', 'Spot weak arguments and read the news with a cool head'],
      es: ['Piensa con claridad', 'Detecta argumentos débiles y lee las noticias con calma'],
      pt: ['Pense com clareza', 'Identifique argumentos fracos e leia notícias com calma'],
      fr: ['Penser clairement', 'Repérer les arguments faibles et lire l’actualité à froid'],
      de: ['Klar denken', 'Schwache Argumente erkennen und Nachrichten gelassen lesen'],
      ru: ['Думай ясно', 'Как замечать слабые аргументы и читать новости с холодной головой'],
      hi: ['साफ़ सोचें', 'कमज़ोर तर्क पहचानें और ख़बरें ठंडे दिमाग़ से पढ़ें'],
      zh: ['清晰思考', '识别薄弱的论证，冷静地读新闻'],
      ar: ['فكّر بوضوح', 'اكتشف الحجج الضعيفة واقرأ الأخبار بهدوء'] } }
  ];
  var byId = {}; C.forEach(function (c) { byId[c.id] = c; });
  return { list: C, byId: byId, DAYS: 7 };
});
