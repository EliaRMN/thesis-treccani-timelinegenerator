import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  it: {
    // Header
    'biography.reader': 'Biography Reader',
    'text.to.timeline': 'TIMELINE',
    'about': 'About',
    'analysis': 'Analisi',
    'advanced.metrics': 'BLEU & ROUGE',
    'ai.analysis': 'AI Nalysis',
    
    // Hero section
    'platform.advanced': 'Piattaforma avanzata per l\'analisi automatica di biografie attraverso intelligenza artificiale e tecniche di Natural Language Processing',
    'start.now': 'Inizia Subito',
    
    // Main features section
    'choose.tool': 'Scegli il Tuo',
    'tool': 'Strumento',
    'three.powerful.tools': 'Tre potenti strumenti per analizzare le biografie: dalla semplice generazione di timeline alla valutazione scientifica avanzata con metriche BLEU e ROUGE',
    
    // Timeline page
    'timeline.hero.subtitle': 'Trasforma le biografie in timeline interattive con l\'intelligenza artificiale',
    'how.it.works': 'Come Funziona',
    'choose.method': 'Scegli il metodo di analisi più adatto alle tue esigenze',
    'spacy.nlp': 'Spacy (NLP)',
    'spacy.description': 'Tecniche NLP per estrarre date, luoghi e info strutturate. Ideale per analisi veloci e precise su testi ben formattati.',
    'llm.gpt': 'LLM (GPT-4o mini)',
    'llm.description': 'GPT-4o mini per analisi contestuale profonda, generazione di titoli creativi e descrizioni narrative. Richiede API Key OpenAI.',
    'hybrid': 'Ibrido',
    'hybrid.description': 'Combina la precisione di Spacy con la creatività di GPT-4o mini per risultati bilanciati. Richiede API Key OpenAI.',
    'processing.flow': 'Flusso di Elaborazione',
    'input.biography': 'Input Biografia',
    'input.biography.description': 'Inserisci il testo della biografia da analizzare o carica un file .txt',
    'upload.file': 'Carica file .txt',
    'select.file': 'Seleziona file',
    'or.manual': 'oppure inserisci il testo manualmente',
    'biography.text': 'Testo della Biografia',
    'biography.placeholder': 'Inserisci qui la biografia da analizzare o carica un file .txt...',
    'characters': 'Caratteri',
    'analysis.method': 'Metodo di Analisi',
    'api.key.openai': 'API Key OpenAI',
    'api.key.warning': 'La tua API key verrà utilizzata solo per questa sessione e non verrà salvata permanentemente.',
    'cache.analysis': 'Cache Analisi',
    'cache.description': 'analisi salvate in cache. Cambiando metodo per la stessa biografia verranno recuperate automaticamente.',
    'analyze.biography': 'Analizza Biografia',
    'analyzing': 'Analizzando...',
    'reset': 'Reset',
    'results.analysis': 'Risultati dell\'Analisi',
    'results.description': 'I risultati dell\'analisi appariranno qui dopo aver processato la biografia. Vedrai timeline, informazioni chiave e titoli generati automaticamente.',
    'file.uploaded': 'File caricato',
    'file.uploaded.success': 'caricato con successo.',
    'error': 'Errore',
    'select.txt.file': 'Seleziona un file di testo (.txt)',
    'insert.biography': 'Inserisci una biografia da analizzare',
    'select.analysis.method': 'Seleziona un metodo di analisi',
    'insert.api.key': 'Inserisci la tua API Key OpenAI per utilizzare questo metodo.',
    'results.from.cache': 'Risultati dalla cache',
    'previous.analysis': 'Analisi precedente recuperata dalla cache.',
    'analysis.completed': 'Analisi completata',
    'analysis.success': 'La biografia è stata analizzata con successo utilizzando',
    'analysis.error': 'Errore nell\'analisi',
    'analysis.error.message': 'Si è verificato un errore durante l\'analisi della biografia.',
    'footer.timeline.description': 'T A.I. MELINE utilizza tecnologie avanzate di intelligenza artificiale per trasformare le biografie in timeline interattive e strutturate. Carica un file o incolla il testo per iniziare l\'analisi automatica.',
    'footer.copyright': '© 2025 T A.I. MELINE. Tutti i diritti riservati.',
    
    // Method flows
    'spacy.flow.1': 'Preprocessing del testo biografico',
    'spacy.flow.2': 'Riconoscimento delle entità nominate (NER)',
    'spacy.flow.3': 'Estrazione di date e luoghi',
    'spacy.flow.4': 'Analisi sintattica per identificare relazioni',
    'spacy.flow.5': 'Generazione della timeline strutturata',
    'llm.flow.1': 'Invio del testo all\'API OpenAI',
    'llm.flow.2': 'Analisi contestuale avanzata',
    'llm.flow.3': 'Estrazione intelligente di eventi chiave',
    'llm.flow.4': 'Generazione di titoli creativi',
    'llm.flow.5': 'Formattazione della timeline finale',
    'hybrid.flow.1': 'Analisi preliminare con Spacy NLP',
    'hybrid.flow.2': 'Estrazione strutturata di date e luoghi',
    'hybrid.flow.3': 'Elaborazione contestuale con GPT-4o mini',
    'hybrid.flow.4': 'Arricchimento con titoli creativi',
    'hybrid.flow.5': 'Combinazione e ottimizzazione dei risultati',
    'timeline.generated': 'Timeline Generata!',
    
    // Sample biographies
    'biography.samples': 'Biografie di Test',
    'marie.curie': 'Marie Curie',
    'leonardo.da.vinci': 'Leonardo da Vinci',
    'giuseppe.garibaldi': 'Giuseppe Garibaldi',
    'short': 'Corta',
    'medium': 'Media',
    'long': 'Lunga',
    
    // Results display translations
    'timeline.extracted.with': 'Timeline estratta con',
    'character.summary': 'Riepilogo Personaggio',
    'name': 'Nome',
    'birth.date': 'Data di Nascita',
    'death.date': 'Data di Morte',
    'profession': 'Professione',
    'main.places': 'Luoghi Principali',
    'timeline': 'Timeline',
    'no.events.found': 'Nessun evento trovato nella timeline.',
    'view.json': 'Visualizza JSON',
    'copy.json': 'Copia JSON',
    'json.copied': 'JSON copiato negli appunti!',
    'copy.error': 'Errore nella copia del JSON',
    'processing.logs': 'Log di Elaborazione',
    'error.during.analysis': 'Errore durante l\'analisi:',
    
    // Sample biography content
    'leonardo.bio': `Leonardo da Vinci nacque il 15 aprile 1452 a Vinci, piccolo borgo toscano. Figlio illegittimo del notaio Ser Piero da Vinci, mostrò fin da giovane un talento straordinario per l'arte e la scienza.

Nel 1466 entrò come apprendista nella bottega di Andrea del Verrocchio a Firenze, dove perfezionò le sue tecniche pittoriche. La sua prima opera importante fu l'Annunciazione (1472-1475).

Nel 1482 si trasferì a Milano alla corte di Ludovico Sforza, dove realizzò l'Ultima Cena (1495-1498) nel convento di Santa Maria delle Grazie. Durante questo periodo si dedicò anche agli studi di ingegneria e anatomia.

Tornò a Firenze nel 1500 e dipinse la Gioconda (1503-1506), il suo capolavoro più famoso. Negli ultimi anni della sua vita si trasferì in Francia, ospite del re Francesco I, dove morì il 2 maggio 1519 nel castello di Amboise.`,
    
    'marie.curie.bio': `Maria Skłodowska Curie nacque il 7 novembre 1867 a Varsavia, allora parte dell'Impero russo, quinta figlia di Władysław Skłodowski e Bronisława Boguska. La famiglia, di tradizione intellettuale, dovette affrontare difficoltà economiche dopo la morte della madre nel 1878.

Completati gli studi secondari nel 1883 con medaglia d'oro, Maria non poté accedere all'università a causa delle restrizioni imposte alle donne. Lavorò come governante per sostenere economicamente gli studi della sorella Bronya a Parigi, con l'accordo che questa l'avrebbe poi aiutata.

Nel novembre 1891 si iscrisse alla Sorbona di Parigi con il nome francesizzato di Marie, studiando fisica, chimica e matematica. Si laureò in fisica nel 1893 (prima della sua classe) e in matematica nel 1894 (seconda classificata).

Nell'aprile 1894 incontrò Pierre Curie, fisico di otto anni più anziano, con cui condivise immediatamente la passione per la scienza. Si sposarono il 26 luglio 1895 e dalla loro unione nacquero due figlie: Irène (1897) ed Ève (1904).

Per la sua tesi di dottorato, Marie scelse di studiare le "radiazioni uraniche" scoperte da Henri Becquerel. Insieme a Pierre, scoprì che l'intensità delle radiazioni era proporzionale alla quantità di uranio presente, intuendo che si trattava di una proprietà atomica.

Nel 1898 la coppia annunciò la scoperta di due nuovi elementi radioattivi: il polonio (luglio) e il radio (dicembre). Il termine "radioattività" fu coniato dalla stessa Marie.

Nel 1903 Marie, Pierre e Becquerel ricevettero il Premio Nobel per la Fisica per le ricerche sulla radioattività. Marie fu la prima donna a ricevere un Nobel.

Tragedia colpì la famiglia il 19 aprile 1906: Pierre morì investito da un carro mentre attraversava una strada di Parigi. Marie, devastata, continuò il loro lavoro e ottenne la cattedra universitaria del marito, diventando la prima donna professoressa alla Sorbona.

Nel 1911 ricevette il secondo Premio Nobel, questa volta per la Chimica, per la scoperta del radio e del polonio. Rimane l'unica persona ad aver vinto Nobel in due diverse discipline scientifiche.

Durante la Prima Guerra Mondiale sviluppò unità mobili di radiografia (soprannominate "petites Curies") per assistere i chirurghi da campo, salvando innumerevoli vite.

Marie Curie morì il 4 luglio 1934 a Passy, in Francia, per anemia aplastica, probabilmente causata dalla prolungata esposizione alle radiazioni. È sepolta accanto a Pierre nel cimitero di Sceaux.`,
    
    'garibaldi.bio': `Giuseppe Garibaldi nacque a Nizza il 4 luglio 1807 da Domenico Garibaldi, capitano di lungo corso originario di Chiavari, e da Rosa Raimondi. La famiglia, di modeste condizioni economiche ma rispettabile, viveva in una casa del centro storico nizzardo.

Fin da giovane Giuseppe mostrò un carattere ribelle e avventuroso. Frequentò le scuole elementari e poi quelle di Padre Giaume, dove imparò i rudimenti del latino, della storia e della geografia. Il padre desiderava avviarlo agli studi ecclesiastici, ma il ragazzo manifestò presto la sua attrazione per il mare e l'avventura.

A quindici anni si imbarcò per la prima volta come mozzo sulla "Costanza", diretto a Odessa sul Mar Nero. Questo viaggio segnò l'inizio della sua carriera marittima e della sua formazione caratteriale. Durante questi primi anni di navigazione toccò i porti del Mediterraneo, del Mar Nero e dell'Atlantico, acquisendo quella conoscenza del mondo che sarebbe stata fondamentale nella sua futura attività politica.

Nel 1833, durante un soggiorno a Taganrog, conobbe Emilio Barrault, un seguace di Saint-Simon, che lo iniziò agli ideali democratici e socialisti. Fu probabilmente in questo periodo che maturò la sua coscienza politica e sociale. L'anno seguente, rientrato in Piemonte, aderì alla "Giovine Italia" di Giuseppe Mazzini, assumendo il nome cospirativo di "Borel".

Il 4 febbraio 1834 partecipò al fallimentare tentativo insurrezionale di Genova. Scoperto dalle autorità, fu condannato a morte in contumacia e dovette fuggire dal Piemonte. Iniziò così il suo primo lungo esilio, che lo portò dapprima a Marsiglia, poi a Tunisi e infine in Sud America.

Giunto in Brasile nel 1835, Garibaldi si stabilì a Rio de Janeiro, dove lavorò come commerciante e insegnante. Nel 1837 si unì ai ribelli della Repubblica Rio-Grandense che lottavano per l'indipendenza dal governo imperiale brasiliano. Fu in questo contesto che iniziò la sua carriera di condottiero, comandando la piccola flotta repubblicana e distinguendosi in numerose azioni navali e terrestri.

Durante il soggiorno brasiliano incontrò Anita Ribeiro da Silva (Ana Maria de Jesus Ribeiro), che divenne la sua compagna di vita e di lotte. Anita, nata nel 1821 a Morrinhos (oggi Laguna), era una donna di straordinario coraggio e determinazione, che condivise con Garibaldi tutte le peripezie sudamericane. I due si sposarono nel 1842 ed ebbero quattro figli: Menotti (1840), Rosita (1843, morta in tenera età), Teresa (1845, anche lei morta bambina) e Ricciotti (1847).

Nel 1841 Garibaldi lasciò il Brasile per l'Uruguay, dove la giovane repubblica era minacciata dalle mire espansionistiche dell'Argentina di Juan Manuel de Rosas. A Montevideo organizzò una "Legione Italiana" composta da esuli italiani, adottando per la prima volta la camicia rossa che sarebbe diventata il simbolo dei suoi volontari.

Le gesta uruguayane accrebbero notevolmente la fama di Garibaldi in Europa. I suoi successi militari e il suo carisma di condottiero democratico lo resero una figura leggendaria, celebrata dalla stampa liberale europea come il paladino della libertà nel Nuovo Mondo.

Nel aprile 1848, scoppiata la rivoluzione in Europa, Garibaldi decise di rientrare in Italia per partecipare alle lotte per l'indipendenza. Sbarcò a Nizza il 21 giugno 1848 con 63 compagni della Legione Italiana. Offrì i suoi servigi a Carlo Alberto, ma il re sabaudo, diffidente verso questo condottiero repubblicano, declinò l'offerta.

Giuseppe Garibaldi morì a Caprera il 2 giugno 1882, all'età di quasi 75 anni, assistito dai figli e circondato dall'affetto del popolo italiano e dall'ammirazione del mondo intero.`,
    
    // Technologies section
    'technologies': 'Tecnologie',
    'used': 'Utilizzate',
    'technologies.description': 'La nostra piattaforma combina le più avanzate tecnologie di intelligenza artificiale e natural language processing per risultati ottimali',
    
    // Technical approaches
    'advanced.nlp': 'NLP Avanzato',
    'nlp.description': 'Tecniche di Natural Language Processing per estrazione automatica di date, luoghi e informazioni strutturate.',
    'artificial.intelligence': 'Intelligenza Artificiale',
    'ai.description': 'GPT-4o mini analizza il contesto e genera titoli creativi per ogni evento biografico.',
    'hybrid.approach': 'Approccio Ibrido',
    'hybrid.approach.description': 'Combina la precisione del NLP con la creatività dell\'AI per risultati ottimali.',
    
    // Timeline feature
    'timeline.generation': 'T A.I. MELINE',
    'timeline.description': 'Trasforma automaticamente una biografia in una timeline interattiva con eventi strutturati, date precise e descrizioni dettagliate.',
    'timeline.feature1': 'Estrazione automatica di date ed eventi',
    'timeline.feature2': 'Timeline visiva e interattiva',
    'timeline.feature3': 'Esportazione in JSON',
    'timeline.feature4': 'Interfaccia user-friendly',
    'create.timeline': 'Crea Timeline',
    
    // Analysis feature
    'comparative.analysis': 'A.I. NALYSIS',
    'analysis.description': 'Confronta diversi approcci di analisi biografica utilizzando metriche scientifiche per valutare precisione e qualità.',
    'analysis.feature1': 'Confronto tra NLP, AI e approccio ibrido',
    'analysis.feature2': 'Metriche di precisione e richiamo',
    'analysis.feature3': 'Analisi F1-score',
    'analysis.feature4': 'Grafici comparativi dettagliati',
    'start.analysis': 'Avvia Analisi',
    
    // Advanced metrics feature
    'advanced.description': 'Valutazione avanzata della qualità delle timeline con metriche BLEU e ROUGE per analisi lessicale e completezza informativa.',
    'advanced.feature1': 'Metriche BLEU per precisione lessicale',
    'advanced.feature2': 'Metriche ROUGE per completezza',
    'advanced.feature3': 'Timeline gold standard personalizzabili',
    'advanced.feature4': 'Analisi comparativa dettagliata',
    'advanced.metrics.button': 'Metriche Avanzate',
    
    // CTA section
    'start.analysis.cta': 'Inizia la Tua Analisi',
    'cta.description': 'Scegli lo strumento più adatto alle tue esigenze e scopri il potere dell\'intelligenza artificiale applicata all\'analisi biografica',
    'generate.timeline': 'Genera Timeline',
    'comparative.analysis.button': 'Analisi Comparativa',
    
    // Footer
    'footer.description': 'Biography Reader utilizza tecnologie avanzate di intelligenza artificiale per analizzare e strutturare automaticamente le informazioni biografiche, creando timeline interattive e comprensibili. Un progetto by Treccani per rendere la conoscenza più accessibile.',
    'footer.copyright.timeline': '© 2024 Biography Reader by Treccani. Tutti i diritti riservati.'
  },
  en: {
    // Header
    'biography.reader': 'Biography Reader',
    'text.to.timeline': 'Text to Timeline',
    'about': 'About',
    'analysis': 'Analysis',
    'advanced.metrics': 'Advanced Metrics',
    'ai.analysis': 'AI Analysis',
    
    // Hero section
    'platform.advanced': 'Advanced platform for automatic biography analysis through artificial intelligence and Natural Language Processing techniques',
    'start.now': 'Start Now',
    
    // Main features section
    'choose.tool': 'Choose Your',
    'tool': 'Tool',
    'three.powerful.tools': 'Three powerful tools to analyze biographies: from simple timeline generation to advanced scientific evaluation with BLEU and ROUGE metrics',
    
    // Timeline page
    'timeline.hero.subtitle': 'Transform biographies into interactive timelines with artificial intelligence',
    'how.it.works': 'How It Works',
    'choose.method': 'Choose the analysis method that best suits your needs',
    'spacy.nlp': 'Spacy (NLP)',
    'spacy.description': 'NLP techniques to extract dates, places and structured info. Ideal for fast and precise analysis on well-formatted texts.',
    'llm.gpt': 'LLM (GPT-4o mini)',
    'llm.description': 'GPT-4o mini for deep contextual analysis, creative title generation and narrative descriptions. Requires OpenAI API Key.',
    'hybrid': 'Hybrid',
    'hybrid.description': 'Combines Spacy precision with GPT-4o mini creativity for balanced results. Requires OpenAI API Key.',
    'processing.flow': 'Processing Flow',
    'input.biography': 'Biography Input',
    'input.biography.description': 'Enter the biography text to analyze or upload a .txt file',
    'upload.file': 'Upload .txt file',
    'select.file': 'Select file',
    'or.manual': 'or enter text manually',
    'biography.text': 'Biography Text',
    'biography.placeholder': 'Enter here the biography to analyze or upload a .txt file...',
    'characters': 'Characters',
    'analysis.method': 'Analysis Method',
    'api.key.openai': 'OpenAI API Key',
    'api.key.warning': 'Your API key will be used only for this session and will not be permanently saved.',
    'cache.analysis': 'Analysis Cache',
    'cache.description': 'analysis saved in cache. Changing method for the same biography will automatically retrieve them.',
    'analyze.biography': 'Analyze Biography',
    'analyzing': 'Analyzing...',
    'reset': 'Reset',
    'results.analysis': 'Analysis Results',
    'results.description': 'Analysis results will appear here after processing the biography. You will see timeline, key information and automatically generated titles.',
    'file.uploaded': 'File uploaded',
    'file.uploaded.success': 'uploaded successfully.',
    'error': 'Error',
    'select.txt.file': 'Select a text file (.txt)',
    'insert.biography': 'Enter a biography to analyze',
    'select.analysis.method': 'Select an analysis method',
    'insert.api.key': 'Enter your OpenAI API Key to use this method.',
    'results.from.cache': 'Results from cache',
    'previous.analysis': 'Previous analysis retrieved from cache.',
    'analysis.completed': 'Analysis completed',
    'analysis.success': 'The biography has been successfully analyzed using',
    'analysis.error': 'Analysis error',
    'analysis.error.message': 'An error occurred during biography analysis.',
    'footer.timeline.description': 'T A.I. MELINE uses advanced artificial intelligence technologies to transform biographies into interactive and structured timelines. Upload a file or paste text to start automatic analysis.',
    'footer.copyright': '© 2025 T A.I. MELINE. All rights reserved.',
    
    // Method flows
    'spacy.flow.1': 'Biographical text preprocessing',
    'spacy.flow.2': 'Named entity recognition (NER)',
    'spacy.flow.3': 'Date and place extraction',
    'spacy.flow.4': 'Syntactic analysis to identify relationships',
    'spacy.flow.5': 'Structured timeline generation',
    'llm.flow.1': 'Sending text to OpenAI API',
    'llm.flow.2': 'Advanced contextual analysis',
    'llm.flow.3': 'Intelligent extraction of key events',
    'llm.flow.4': 'Creative title generation',
    'llm.flow.5': 'Final timeline formatting',
    'hybrid.flow.1': 'Preliminary analysis with Spacy NLP',
    'hybrid.flow.2': 'Structured extraction of dates and places',
    'hybrid.flow.3': 'Contextual processing with GPT-4o mini',
    'hybrid.flow.4': 'Enhancement with creative titles',
    'hybrid.flow.5': 'Combination and optimization of results',
    'timeline.generated': 'Timeline Generated!',
    
    // Sample biographies
    'biography.samples': 'Test Biographies',
    'marie.curie': 'Marie Curie',
    'leonardo.da.vinci': 'Leonardo da Vinci',
    'giuseppe.garibaldi': 'Giuseppe Garibaldi',
    'short': 'Short',
    'medium': 'Medium',
    'long': 'Long',
    
    // Results display translations
    'timeline.extracted.with': 'Timeline extracted with',
    'character.summary': 'Character Summary',
    'name': 'Name',
    'birth.date': 'Birth Date',
    'death.date': 'Death Date',
    'profession': 'Profession',
    'main.places': 'Main Places',
    'timeline': 'Timeline',
    'no.events.found': 'No events found in the timeline.',
    'view.json': 'View JSON',
    'copy.json': 'Copy JSON',
    'json.copied': 'JSON copied to clipboard!',
    'copy.error': 'Error copying JSON',
    'processing.logs': 'Processing Logs',
    'error.during.analysis': 'Error during analysis:',
    
    // Sample biography content
    'leonardo.bio': `Leonardo da Vinci was born on April 15, 1452 in Vinci, a small Tuscan village. Illegitimate son of notary Ser Piero da Vinci, he showed extraordinary talent for art and science from a young age.

In 1466 he entered as an apprentice in Andrea del Verrocchio's workshop in Florence, where he perfected his painting techniques. His first important work was the Annunciation (1472-1475).

In 1482 he moved to Milan to the court of Ludovico Sforza, where he created the Last Supper (1495-1498) in the convent of Santa Maria delle Grazie. During this period he also devoted himself to engineering and anatomy studies.

He returned to Florence in 1500 and painted the Mona Lisa (1503-1506), his most famous masterpiece. In the last years of his life he moved to France, guest of King Francis I, where he died on May 2, 1519 in the castle of Amboise.`,
    
    'marie.curie.bio': `Maria Skłodowska Curie was born on November 7, 1867 in Warsaw, then part of the Russian Empire, fifth daughter of Władysław Skłodowski and Bronisława Boguska. The family, of intellectual tradition, had to face economic difficulties after the mother's death in 1878.

Having completed her secondary studies in 1883 with a gold medal, Maria could not access university due to restrictions imposed on women. She worked as a governess to financially support her sister Bronya's studies in Paris, with the agreement that she would then help her.

In November 1891 she enrolled at the Sorbonne in Paris with the Frenchified name of Marie, studying physics, chemistry and mathematics. She graduated in physics in 1893 (first in her class) and in mathematics in 1894 (second place).

In April 1894 she met Pierre Curie, a physicist eight years older, with whom she immediately shared a passion for science. They married on July 26, 1895 and their union produced two daughters: Irène (1897) and Ève (1904).

For her doctoral thesis, Marie chose to study the "uranic radiations" discovered by Henri Becquerel. Together with Pierre, she discovered that the intensity of radiation was proportional to the amount of uranium present, intuiting that it was an atomic property.

In 1898 the couple announced the discovery of two new radioactive elements: polonium (July) and radium (December). The term "radioactivity" was coined by Marie herself.

In 1903 Marie, Pierre and Becquerel received the Nobel Prize in Physics for research on radioactivity. Marie was the first woman to receive a Nobel Prize.

Tragedy struck the family on April 19, 1906: Pierre died hit by a cart while crossing a Paris street. Marie, devastated, continued their work and obtained her husband's university chair, becoming the first female professor at the Sorbonne.

In 1911 she received her second Nobel Prize, this time for Chemistry, for the discovery of radium and polonium. She remains the only person to have won Nobel Prizes in two different scientific disciplines.

During World War I she developed mobile radiography units (nicknamed "petites Curies") to assist field surgeons, saving countless lives.

Marie Curie died on July 4, 1934 in Passy, France, from aplastic anemia, probably caused by prolonged exposure to radiation. She is buried next to Pierre in the cemetery of Sceaux.`,
    
    'garibaldi.bio': `Giuseppe Garibaldi was born in Nice on July 4, 1807 to Domenico Garibaldi, a sea captain originally from Chiavari, and Rosa Raimondi. The family, of modest but respectable economic conditions, lived in a house in the historic center of Nice.

From a young age Giuseppe showed a rebellious and adventurous character. He attended elementary schools and then those of Father Giaume, where he learned the rudiments of Latin, history and geography. His father wanted to direct him to ecclesiastical studies, but the boy soon manifested his attraction to the sea and adventure.

At fifteen he embarked for the first time as a cabin boy on the "Costanza", bound for Odessa on the Black Sea. This journey marked the beginning of his maritime career and his character formation. During these early years of navigation he touched the ports of the Mediterranean, the Black Sea and the Atlantic, acquiring that knowledge of the world that would be fundamental in his future political activity.

In 1833, during a stay in Taganrog, he met Emilio Barrault, a follower of Saint-Simon, who initiated him into democratic and socialist ideals. It was probably during this period that his political and social consciousness matured. The following year, having returned to Piedmont, he joined Giuseppe Mazzini's "Young Italy", taking the conspiratorial name "Borel".

On February 4, 1834 he participated in the failed insurrectional attempt in Genoa. Discovered by the authorities, he was sentenced to death in absentia and had to flee from Piedmont. Thus began his first long exile, which took him first to Marseille, then to Tunisia and finally to South America.

Arriving in Brazil in 1835, Garibaldi settled in Rio de Janeiro, where he worked as a merchant and teacher. In 1837 he joined the rebels of the Rio-Grandense Republic who were fighting for independence from the Brazilian imperial government. It was in this context that he began his career as a leader, commanding the small republican fleet and distinguishing himself in numerous naval and land actions.

During his Brazilian stay he met Anita Ribeiro da Silva (Ana Maria de Jesus Ribeiro), who became his life and battle companion. Anita, born in 1821 in Morrinhos (now Laguna), was a woman of extraordinary courage and determination, who shared all the South American adventures with Garibaldi. The two married in 1842 and had four children: Menotti (1840), Rosita (1843, died at a young age), Teresa (1845, also died as a child) and Ricciotti (1847).

In 1841 Garibaldi left Brazil for Uruguay, where the young republic was threatened by the expansionist aims of Argentina's Juan Manuel de Rosas. In Montevideo he organized an "Italian Legion" composed of Italian exiles, adopting for the first time the red shirt that would become the symbol of his volunteers.

Giuseppe Garibaldi died in Caprera on June 2, 1882, at the age of almost 75, assisted by his children and surrounded by the affection of the Italian people and the admiration of the entire world.`,
    
    // Technologies section
    'technologies': 'Technologies',
    'used': 'Used',
    'technologies.description': 'Our platform combines the most advanced artificial intelligence and natural language processing technologies for optimal results',
    
    // Technical approaches
    'advanced.nlp': 'Advanced NLP',
    'nlp.description': 'Natural Language Processing techniques for automatic extraction of dates, places and structured information.',
    'artificial.intelligence': 'Artificial Intelligence',
    'ai.description': 'GPT-4o mini analyzes context and generates creative titles for each biographical event.',
    'hybrid.approach': 'Hybrid Approach',
    'hybrid.approach.description': 'Combines NLP precision with AI creativity for optimal results.',
    
    // Timeline feature
    'timeline.generation': 'Timeline Generation',
    'timeline.description': 'Automatically transform a biography into an interactive timeline with structured events, precise dates and detailed descriptions.',
    'timeline.feature1': 'Automatic extraction of dates and events',
    'timeline.feature2': 'Visual and interactive timeline',
    'timeline.feature3': 'JSON export',
    'timeline.feature4': 'User-friendly interface',
    'create.timeline': 'Create Timeline',
    
    // Analysis feature
    'comparative.analysis': 'Comparative Scientific Analysis',
    'analysis.description': 'Compare different biographical analysis approaches using scientific metrics to evaluate precision and quality.',
    'analysis.feature1': 'Comparison between NLP, AI and hybrid approach',
    'analysis.feature2': 'Precision and recall metrics',
    'analysis.feature3': 'F1-score analysis',
    'analysis.feature4': 'Detailed comparative charts',
    'start.analysis': 'Start Analysis',
    
    // Advanced metrics feature
    'advanced.description': 'Advanced evaluation of timeline quality with BLEU and ROUGE metrics for lexical analysis and information completeness.',
    'advanced.feature1': 'BLEU metrics for lexical precision',
    'advanced.feature2': 'ROUGE metrics for completeness',
    'advanced.feature3': 'Customizable gold standard timelines',
    'advanced.feature4': 'Detailed comparative analysis',
    'advanced.metrics.button': 'Advanced Metrics',
    
    // CTA section
    'start.analysis.cta': 'Start Your Analysis',
    'cta.description': 'Choose the tool that best suits your needs and discover the power of artificial intelligence applied to biographical analysis',
    'generate.timeline': 'Generate Timeline',
    'comparative.analysis.button': 'Comparative Analysis',
    
    // Footer
    'footer.description': 'Biography Reader uses advanced artificial intelligence technologies to automatically analyze and structure biographical information, creating interactive and understandable timelines. A Treccani project to make knowledge more accessible.',
    'footer.copyright.timeline': '© 2024 Biography Reader by Treccani. All rights reserved.'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
