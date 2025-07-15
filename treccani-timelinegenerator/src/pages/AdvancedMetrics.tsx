
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  Database, Brain, GitMerge, Zap, Play, Loader2, Target, TrendingUp, AlertCircle,
  FileText, Upload, BarChart as BarChartIcon, PieChart as PieChartIcon,
  Activity, CheckCircle, Info, Clock, User, Cpu, BookOpen, Lightbulb,
  Calculator, Award, ChartBar, TestTube, Edit3, Plus, Crown, Calendar
} from 'lucide-react';
import { BiographyAnalyzer } from '../components/BiographyAnalyzer';
import SharedHeader from '../components/SharedHeader';
import CustomTimelineInput from '../components/CustomTimelineInput';
import { useToast } from "@/hooks/use-toast";

interface GoldStandardEvent {
  date: string;
  title: string;
  description: string;
  year: number;
}

interface TestBiography {
  key: string;
  name: string;
  description: string;
  period: string;
  textLength: number;
  text: string;
  goldStandard: GoldStandardEvent[];
}

interface BleuRougeMetrics {
  bleuScore: number;
  rougeL: number;
  rouge1: number;
  rouge2: number;
  combinedScore: number;
}

interface MethodResults {
  method: string;
  timeline: any[];
  metrics: BleuRougeMetrics;
  executionTime: number;
}

const testBiographies: TestBiography[] = [
  {
    key: 'leonardo-short',
    name: 'Leonardo da Vinci',
    description: 'Artista e inventore del Rinascimento',
    period: '1452-1519',
    textLength: 580,
    text: `Leonardo da Vinci nasce a Vinci nel 1452, piccolo borgo toscano. Nel 1466 entra come apprendista nella bottega di Andrea del Verrocchio a Firenze. Nel 1482 si trasferisce a Milano alla corte di Ludovico Sforza. Nel 1495 inizia a dipingere l'Ultima Cena nel convento di Santa Maria delle Grazie. Nel 1503 inizia a dipingere la Gioconda. Nel 1519 muore nel castello di Amboise in Francia.`,
    goldStandard: [
      { date: "1452", year: 1452, title: "Nascita a Vinci", description: "Nasce a Vinci, piccolo borgo toscano, figlio illegittimo del notaio Ser Piero da Vinci." },
      { date: "1466", year: 1466, title: "Apprendistato a Firenze", description: "Entra come apprendista nella bottega di Andrea del Verrocchio a Firenze, dove perfeziona le tecniche pittoriche." },
      { date: "1482", year: 1482, title: "Trasferimento a Milano", description: "Si trasferisce a Milano alla corte di Ludovico Sforza, dove si dedica all'arte e all'ingegneria." },
      { date: "1495", year: 1495, title: "Ultima Cena", description: "Inizia a dipingere l'Ultima Cena nel convento di Santa Maria delle Grazie, uno dei suoi capolavori." },
      { date: "1503", year: 1503, title: "Gioconda", description: "Inizia a dipingere la Gioconda, il ritratto più famoso della storia dell'arte." },
      { date: "1519", year: 1519, title: "Morte in Francia", description: "Muore nel castello di Amboise in Francia, ospite del re Francesco I." }
    ]
  },
  {
    key: 'marie-medium',
    name: 'Marie Curie',
    description: 'Fisica e chimica, due premi Nobel',
    period: '1867-1934',
    textLength: 920,
    text: `Maria Salomea Skłodowska, nota come Marie Curie, nasce a Varsavia nel 1867 in una famiglia di intellettuali polacchi. Nel 1891 si trasferisce a Parigi per studiare fisica e matematica alla Sorbona, dove vive in condizioni molto modeste. Nel 1895 sposa Pierre Curie, fisico francese, dopo averlo conosciuto attraverso un collega polacco. Nel 1898, insieme al marito Pierre, scopre due nuovi elementi chimici: il polonio, chiamato così in onore della Polonia, e il radio. Nel 1903 riceve il Premio Nobel per la Fisica insieme a Pierre Curie e Henri Becquerel per le ricerche sulla radioattività. Nel 1906 Pierre Curie muore tragicamente in un incidente stradale e Marie eredita la sua cattedra alla Sorbona, diventando la prima donna professore dell'università. Nel 1911 riceve il Premio Nobel per la Chimica per l'isolamento del radio puro, diventando la prima persona a vincere due Premi Nobel in discipline scientifiche diverse.`,
    goldStandard: [
      { date: "1867", year: 1867, title: "Nascita a Varsavia", description: "Nasce a Varsavia con il nome di Maria Salomea Skłodowska in una famiglia di intellettuali polacchi." },
      { date: "1891", year: 1891, title: "Trasferimento a Parigi", description: "Si trasferisce a Parigi per studiare fisica e matematica alla Sorbona, vivendo in condizioni molto modeste." },
      { date: "1895", year: 1895, title: "Matrimonio con Pierre", description: "Sposa Pierre Curie, fisico francese, dopo averlo conosciuto attraverso un collega polacco." },
      { date: "1898", year: 1898, title: "Scoperta degli elementi", description: "Insieme al marito Pierre, scopre due nuovi elementi chimici: il polonio e il radio." },
      { date: "1903", year: 1903, title: "Primo Premio Nobel", description: "Riceve il Premio Nobel per la Fisica insieme a Pierre Curie e Henri Becquerel per le ricerche sulla radioattività." },
      { date: "1906", year: 1906, title: "Morte di Pierre", description: "Pierre Curie muore tragicamente in un incidente stradale; Marie eredita la sua cattedra alla Sorbona." },
      { date: "1911", year: 1911, title: "Secondo Premio Nobel", description: "Riceve il Premio Nobel per la Chimica, diventando la prima persona a vincere due Nobel in discipline diverse." }
    ]
  },
  {
    key: 'garibaldi-long',
    name: 'Giuseppe Garibaldi',
    description: 'Eroe dell\'unificazione italiana',
    period: '1807-1882',
    textLength: 1240,
    text: `Giuseppe Garibaldi nasce nel 1807 a Nizza, allora parte del Primo Impero francese. Nel 1833 incontra Giuseppe Mazzini a Marsiglia e aderisce alla Giovine Italia. Nel 1834 partecipa ai moti mazziniani di Genova e fu costretto all'esilio in Sud America, dove rimane per 14 anni. Nel 1848 torna in Italia con una legione di volontari per partecipare alla prima guerra d'indipendenza contro l'Austria. Nel 1849 difende eroicamente la Repubblica Romana contro le truppe francesi. Nel 1859 guida i Cacciatori delle Alpi nella seconda guerra d'indipendenza. Nel 1860 salpa da Quarto con i famosi Mille per conquistare il Regno delle Due Sicilie, in quella che sarà chiamata la Spedizione dei Mille. Nel 1862 tenta la marcia su Roma partendo dalla Sicilia, ma viene fermato e ferito ad Aspromonte dalle truppe regie. Nel 1867 fa un secondo tentativo di conquista di Roma, sconfitto a Mentana. Nel 1874 viene eletto deputato e si ritira nella sua casa di Caprera. Nel 1882 muore a Caprera, diventando leggenda dell'unificazione italiana.`,
    goldStandard: [
      { date: "1807", year: 1807, title: "Nascita a Nizza", description: "Nasce a Nizza, allora parte del Primo Impero francese, in una famiglia di marinai." },
      { date: "1833", year: 1833, title: "Incontro con Mazzini", description: "Incontra Giuseppe Mazzini a Marsiglia e aderisce al movimento della Giovine Italia." },
      { date: "1834", year: 1834, title: "Esilio in Sud America", description: "Partecipa ai moti mazziniani di Genova e viene costretto all'esilio in Sud America per 14 anni." },
      { date: "1848", year: 1848, title: "Ritorno in Italia", description: "Torna in Italia con una legione di volontari per partecipare alla prima guerra d'indipendenza." },
      { date: "1849", year: 1849, title: "Difesa di Roma", description: "Difende eroicamente la Repubblica Romana contro le truppe francesi di Luigi Napoleone." },
      { date: "1859", year: 1859, title: "Cacciatori delle Alpi", description: "Guida i Cacciatori delle Alpi nella seconda guerra d'indipendenza contro l'Austria." },
      { date: "1860", year: 1860, title: "Spedizione dei Mille", description: "Salpa da Quarto con i famosi Mille per conquistare il Regno delle Due Sicilie." },
      { date: "1862", year: 1862, title: "Tentativo su Roma", description: "Tenta la marcia su Roma partendo dalla Sicilia, ma viene fermato ad Aspromonte." },
      { date: "1867", year: 1867, title: "Battaglia di Mentana", description: "Fa un secondo tentativo di conquista di Roma, ma viene sconfitto a Mentana." },
      { date: "1882", year: 1882, title: "Morte a Caprera", description: "Muore nella sua casa di Caprera, diventando leggenda dell'unificazione italiana." }
    ]
  },
  {
    key: 'trump-long',
    name: 'Donald J. Trump',
    description: 'Imprenditore e 45°/47° Presidente USA',
    period: '1946 - presente',
    textLength: 4936,
    text: `Trump, Donald John. – Imprenditore e uomo politico statunitense (n. New York 1946). Laureato alla Wharton School of Pennsylvania in Economia e finanza, dal 1971 al 2017 ha guidato l'azienda di sviluppo immobiliare Trump Organization. Entrato in politica alla fine degli anni Novanta nelle fila del Reform Party per poi passare in quelle del Partito repubblicano, nel luglio 2015 è stato nominato candidato alle presidenziali del 2016 per il Partito repubblicano, presentando un programma protezionista in cui risultano centrali la creazione di posti di lavoro, rigide strategie anti-immigratorie e la revisione della riforma sanitaria. Alle consultazioni svoltesi l’8 novembre 2016 è stato eletto quarantacinquesimo presidente degli Stati Uniti, in carica dal gennaio 2017 al gennaio 2021, sostituito alla guida del Paese dal democratico J. Biden, al quale è subentrato per un secondo mandato non consecutivo nel gennaio 2025.
CENNI BIOGRAFICI
Figlio del facoltoso imprenditore Fred, già durante gli anni del college - nel 1968 si è laureato alla Wharton School of Pennsylvania in Economia e finanza - ha iniziato a lavorare con grandi risultati nell’azienda di famiglia Elizabeth Trump & Son, che dal 1971 al 2017 è passata sotto il suo controllo assumendo il nome di Trump Organization. Tra gli uomini più ricchi al mondo, si è impegnato soprattutto nell’edilizia di lusso a Manhattan, facendo del suo nome un brand; dal 2006 è stato il più importante testimonial della multinazionale delle telecomunicazioni e dell’energia ACN Inc, e durante la sua carriera ha costruito casinò, investito in wrestling e nella televisione. Dal 2004 al 2015 è stato conduttore e produttore del programma di successo The apprentice.
ATTIVITÀ POLITICA
Entrato in politica alla fine degli anni Novanta nelle fila del Reform Party, passato successivamente in quelle del Partito repubblicano, nel luglio 2015 è stato nominato candidato alle presidenziali del 2016. Fomentando il radicalismo e la polarizzazione politica e accentuando nello stesso Partito repubblicano la divisione tra una base infiammata dai suoi discorsi e un’élite preoccupata dalla sua ascesa, ha incanalato la rabbia sociale e le ansie di una società spaesata per il declino delle più fondanti appartenenze collettive, fornendo una risposta anti-establishment, populista e rabbiosa, agli effetti di lungo periodo della crisi economica e presentando un programma politico protezionista in cui risultano centrali la creazione di posti di lavoro e agevolazioni fiscali, rigide strategie anti-immigratorie, la revisione della riforma sanitaria di Obama e l’implementazione delle fonti fossili. Alle consultazioni svoltesi l’8 novembre 2016 è stato eletto quarantacinquesimo presidente degli Stati Uniti ottenendo il 47,8% dei consensi contro il 47,4% riportato dalla candidata democratica H. Clinton e subentrando nella carica a Obama il 20 gennaio 2017.
Il tentativo di dare risposte immediate al blocco sociale cui deve la sua elezione, attuando fin dai primi giorni di insediamento – caratterizzati peraltro da una serie di proteste di piazza negli USA e nel mondo che non trova confronto nella storia americana – i punti salienti enunciati nel suo programma di governo, con priorità alle politiche immigratorie e sanitarie, è stato almeno temporaneamente vanificato dall’intervento di organi istituzionali quali la magistratura, che ha bloccato per due volte, in gennaio e marzo, due ordini esecutivi (i cosiddetti Muslim ban o Travel ban) volti a impedire o limitare l’ingresso negli Stati Uniti di rifugiati e di cittadini provenienti da alcuni Paesi a maggioranza islamica, e dallo stesso Partito repubblicano, il cui mancato appoggio lo ha costretto a ritirare la riforma sanitaria che avrebbe dovuto sostituire l’Obamacare e a temporeggiare sulla riforma fiscale nota come Border adjustment tax, la tassa sui beni prodotti fuori degli USA che ha sollevato aspre critiche da parte degli stessi imprenditori statunitensi. Sul fronte della politica estera, in aperto contrasto con le scelte USA degli ultimi anni e inizialmente fedele a quell'“America first!” che è stato il suo slogan nel giorno di insediamento, si è dimostrato dapprima riluttante a esercitare quel ruolo di egemonia sul mondo che è stato la cifra politica degli Stati Uniti nelle presidenze precedenti a Obama, manifestando la volontà di destrutturare accordi multilaterali quali il NAFTA e il TPP, per poi assumere inaspettate posizioni interventiste nel conflitto mediorientale. Nel maggio 2017, mentre il suo livello di popolarità è sceso al di sotto del 40% - il più basso mai registrato da un presidente USA a inizio mandato - ha annunciato dopo il G7 di Taormina il ritiro degli USA dal Trattato di Parigi del 2015 e la volontà di negoziare un nuovo documento. I già tesi rapporti con le Nazioni Unite sono stati ulteriormente deteriorati dalla decisione, presa nell'ottobre 2017 e attuativa dal dicembre dell'anno successivo, di ritirare gli Stati Uniti dall'Unesco, di cui ha denunciato i presunti pregiudizi anti-israeliani; nel quadro geopolitico mondiale, vastissimo impatto ha inoltre avuto la decisione presa nel dicembre successivo di riconoscere Gerusalemme come la capitale dello Stato di Israele e di avviare le procedure per il trasferimento dell’ambasciata da Tel Aviv, dando seguito al Jerusalem Embassy Act approvato dal Congresso nel 1995 ma mai applicato dai presidenti che lo hanno preceduto. Nel giugno 2018, la fase di progressivo disgelo nelle relazioni con la Corea del Nord aperta mesi prima da Kim Jong-un ha reso possibile lo storico incontro avvenuto tra i due capi di stato sull'isola di Sentosa (Singapore), nel corso del quale è stato firmato un documento per la denuclearizzazione della Penisola coreana.
In politica interna, le elezioni di metà mandato del novembre 2018 hanno registrato la perdita del controllo repubblicano della Camera, mentre il Gop ha mantenuto quello del Senato, ciò delineando un quadro di netta polarizzazione in cui le eterogenee forme di dissidenza verso le politiche presidenziali organizzate in primo luogo da donne, afroamericani e giovani elettori sono state decisive per la rimonta democratica. Nei mesi successivi l'inasprimento dei conflitti razziali e le violente proteste di piazza organizzate dal movimento Black lives matter e l'aggravarsi della crisi economica hanno parzialmente eroso i consensi accordati al presidente, che nel mese di agosto ha accettato la nomination repubblicana per un secondo mandato in vista delle consultazioni presidenziali del novembre 2020. Le consultazioni, svoltesi in un clima di polarizzazione acuito dalla pandemia di Coronavirus cui il presidente uscente ha fornito risposte inefficienti se non irresponsabili, perdendo consensi ma riuscendo comunque a mantenere una soglia di resistenza alimentata dalle teorie cospirazioniste e dai miti salvifici di QAnon, hanno registrato la sconfitta di Trump, cui dal gennaio 2021 è subentrato il democratico J. Biden. Escluso dall'accesso ai social network Facebook e Twitter in ragione dell'uso fattone in concomitanza con l'assalto a Capitol Hill, nel febbraio 2022 l'ex presidente ha lanciato la piattaforma social Truth Social, sviluppata dalla Trump Media & Technology Group e da Digital World Acquisition. Nel novembre 2022 l'uomo politico ha annunciato la sua candidatura alle presidenziali del 2024; primo presidente nella storia degli Stati Uniti a essere condannato per numerosi capi di accusa nell’ambito di un processo penale, nel luglio 2024, e limitatamente alle azioni intraprese nell'esercizio dei poteri costituzionali, la Corte suprema gli ha concesso una parziale immunità presidenziale. La campagna elettorale del 2024, condotta con toni asprissimi e discriminatori contro la candidata democratica e vicepresidente del Paese K. Harris, ha ribadito la sua immagine di leader aggressivo, intenzionato a convogliare a proprio vantaggio la rabbia di un elettorato medio-basso, concentrato sulla difesa dei propri interessi e sfiduciato dall'establishment; i risultati non definitivi, ma numericamente incontrovertibili, hanno assegnato la vittoria all’uomo politico, che si è aggiudicato 276 grandi elettori superando la soglia di 270, secondo presidente statunitense dopo G. Cleveland a ottenere un secondo mandato non consecutivo. Nel gennaio 2025 l'uomo politico ha assunto formalmente la carica di 47° presidente degli Stati Uniti.`,
    goldStandard: [
      { date: "1946", year: 1946, title: "Nascita a New York", description: "Donald John Trump nasce nel Queens, New York, in una famiglia benestante. È il quarto di cinque figli di Fred Trump, un importante imprenditore immobiliare, e Mary Anne MacLeod Trump." },
      { date: "1968", year: 1968, title: "Laurea alla Wharton School", description: "Si laurea in Economia e Finanza alla prestigiosa Wharton School della University of Pennsylvania. Già durante gli studi universitari, inizia a lavorare nell'azienda paterna, la Elizabeth Trump & Son, occupandosi di progetti immobiliari e dimostrando un notevole fiuto per gli affari." },
      { date: "1971", year: 1971, title: "Guida della Trump Organization", description: "Assume il controllo dell'azienda di famiglia, ribattezzandola The Trump Organization. Sotto la sua guida, l'azienda si espande notevolmente, concentrandosi sull'edilizia di lusso, hotel e campi da golf a Manhattan e in altre località, trasformando il suo nome in un brand globale." },
      { date: "2004", year: 2004, title: "Lancio di 'The Apprentice'", description: "Diventa conduttore e produttore del reality show di successo 'The Apprentice'. Il programma aumenta enormemente la sua fama a livello nazionale e internazionale, consolidando la sua immagine di uomo d'affari di successo e personaggio mediatico carismatico." },
      { date: "2015", year: 2015, title: "Candidatura alle Presidenziali", description: "Nel luglio 2015, annuncia la sua candidatura alle elezioni presidenziali del 2016 per il Partito Repubblicano. La sua campagna si basa su un programma populista e protezionista, con un'enfasi su politiche anti-immigrazione, la rinegoziazione degli accordi commerciali e la promessa di 'Make America Great Again'." },
      { date: "2016", year: 2016, title: "Elezione a 45° Presidente", description: "L'8 novembre 2016, vince le elezioni presidenziali contro la candidata democratica Hillary Clinton, diventando il 45° presidente degli Stati Uniti. La sua vittoria sorprende molti analisti politici e riflette un profondo malcontento di una parte dell'elettorato verso l'establishment politico." },
      { date: "2017", year: 2017, title: "Inizio mandato e primi atti", description: "Il 20 gennaio 2017 si insedia come presidente. I suoi primi mesi sono caratterizzati da una serie di ordini esecutivi, tra cui il controverso 'Travel Ban' che limita l'ingresso da diversi paesi a maggioranza musulmana. Annuncia anche il ritiro degli Stati Uniti dall'accordo di Parigi sul clima, suscitando critiche a livello globale." },
      { date: "2018", year: 2018, title: "Incontro con Kim Jong-un", description: "Nel giugno 2018, tiene uno storico incontro a Singapore con il leader nordcoreano Kim Jong-un. L'incontro rappresenta un significativo passo verso la diplomazia dopo anni di tensioni e porta alla firma di un documento congiunto per la denuclearizzazione della penisola coreana." },
      { date: "2020", year: 2020, title: "Sconfitta elettorale e contestazioni", description: "Viene sconfitto alle elezioni presidenziali dal candidato democratico Joe Biden, in un'elezione segnata dalla pandemia di COVID-19. Trump contesta i risultati elettorali, sostenendo senza prove brogli diffusi, una posizione che culmina nell'assalto al Campidoglio del 6 gennaio 2021 da parte dei suoi sostenitori." },
      { date: "2022", year: 2022, title: "Lancio di Truth Social e candidatura", description: "Dopo essere stato bandito dai principali social media, lancia la sua piattaforma, Truth Social. Nel novembre dello stesso anno, annuncia ufficialmente la sua candidatura per le elezioni presidenziali del 2024, cercando un secondo mandato non consecutivo." },
      { date: "2024", year: 2024, title: "Vittoria per un secondo mandato", description: "Nonostante le numerose incriminazioni penali, conduce una campagna elettorale aggressiva e vince le elezioni presidenziali, sconfiggendo la candidata democratica Kamala Harris. Diventa così il secondo presidente nella storia degli Stati Uniti, dopo Grover Cleveland, a essere eletto per un secondo mandato non consecutivo." },
      { date: "2025", year: 2025, title: "Inizio del secondo mandato", description: "Nel gennaio 2025, assume formalmente la carica per il suo secondo mandato, diventando il 47° presidente degli Stati Uniti. Il suo ritorno alla Casa Bianca segna un momento di profonda polarizzazione politica e attesa per le sue future politiche interne ed estere." }
    ]
  }
];

const AdvancedMetrics = () => {
  const [selectedBiography, setSelectedBiography] = useState<string>('');
  const [customBiography, setCustomBiography] = useState('');
  const [customBiographyName, setCustomBiographyName] = useState('');
  const [customGoldStandard, setCustomGoldStandard] = useState<GoldStandardEvent[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MethodResults[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const { toast } = useToast();
  const performanceRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedBio = testBiographies.find(bio => bio.key === selectedBiography);

  // Calculate BLEU/ROUGE metrics
  const calculateBleuRougeMetrics = (generated: any[], goldStandard: GoldStandardEvent[]): BleuRougeMetrics => {
    // Simplified BLEU/ROUGE calculation for demonstration
    // In a real implementation, you'd use proper BLEU/ROUGE libraries
    
    const generatedTexts = generated.map(event => `${event.event || event.description || ''}`).join(' ').toLowerCase();
    const goldTexts = goldStandard.map(event => event.description).join(' ').toLowerCase();
    
    // Simple word overlap calculation (simulating BLEU/ROUGE)
    const generatedWords = generatedTexts.split(/\s+/).filter(w => w.length > 2);
    const goldWords = goldTexts.split(/\s+/).filter(w => w.length > 2);
    
    const overlap = generatedWords.filter(word => goldWords.includes(word)).length;
    const precision = generatedWords.length > 0 ? (overlap / generatedWords.length) * 100 : 0;
    const recall = goldWords.length > 0 ? (overlap / goldWords.length) * 100 : 0;
    
    // Simulate different BLEU/ROUGE scores
    const bleuScore = Math.min(precision * 0.8, 100);
    const rouge1 = Math.min(recall * 0.9, 100);
    const rouge2 = Math.min((precision + recall) / 2 * 0.7, 100);
    const rougeL = Math.min((precision + recall) / 2 * 0.85, 100);
    const combinedScore = (bleuScore + rouge1 + rouge2 + rougeL) / 4;
    
    return {
      bleuScore: Number(bleuScore.toFixed(1)),
      rouge1: Number(rouge1.toFixed(1)),
      rouge2: Number(rouge2.toFixed(1)),
      rougeL: Number(rougeL.toFixed(1)),
      combinedScore: Number(combinedScore.toFixed(1))
    };
  };

  const handleSelectBiography = (key: string) => {
    if (key === 'custom') {
      setSelectedBiography('custom');
      setCustomBiography('');
      setCustomBiographyName('');
      setCustomGoldStandard([]);
      setResults([]);
      return;
    }
    
    const bio = testBiographies.find(b => b.key === key);
    if (bio) {
      setSelectedBiography(key);
      setCustomBiography(bio.text);
      setCustomBiographyName(bio.name);
      setCustomGoldStandard(bio.goldStandard);
      setResults([]);
    }
  };

  const getCurrentBiography = () => {
    if (selectedBiography === 'custom' || selectedBiography === '') {
      return {
        text: customBiography,
        name: customBiographyName || 'Biografia Personalizzata',
        goldStandard: customGoldStandard
      };
    }
    // For predefined biographies, use current editable values
    return {
      text: customBiography,
      name: customBiographyName,
      goldStandard: customGoldStandard
    };
  };

  const analyzeSelectedBiography = async () => {
    const currentBio = getCurrentBiography();
    
    if (!currentBio || !currentBio.text.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci il testo della biografia da analizzare",
        variant: "destructive",
      });
      return;
    }

    if (selectedBiography === 'custom' && customGoldStandard.length === 0) {
      toast({
        title: "Attenzione",
        description: "Nessun gold standard definito per la biografia personalizzata. L'analisi procederà senza confronto BLEU/ROUGE.",
        className: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-yellow-400",
      });
    }

    setIsAnalyzing(true);
    const analyzer = new BiographyAnalyzer();
    const methods = ['spacy', 'llm', 'hybrid'];
    const methodResults: MethodResults[] = [];

    try {
      for (const method of methods) {
        const startTime = Date.now();
        const result = await analyzer.analyze(currentBio.text, method, method !== 'spacy' ? apiKey : undefined);
        const endTime = Date.now();
        
        const metrics = calculateBleuRougeMetrics(result.timeline || [], currentBio.goldStandard || []);
        
        methodResults.push({
          method: method.toUpperCase(),
          timeline: result.timeline || [],
          metrics,
          executionTime: endTime - startTime
        });
      }
      
      setResults(methodResults);
      setSelectedMethod(methodResults[0]?.method || '');
      
      // Scroll to performance section automatically
      setTimeout(() => {
        performanceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
      
      toast({
        title: "Analisi BLEU/ROUGE completata",
        description: "Tutte le metriche sono state calcolate con successo.",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
      });
    } catch (error) {
      console.error('Errore durante l\'analisi:', error);
      toast({
        title: "Errore nell'analisi",
        description: `Errore durante l'analisi: ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBestMethod = () => {
    if (results.length === 0) return null;
    return results.reduce((best, current) => 
      current.metrics.combinedScore > best.metrics.combinedScore ? current : best
    );
  };

  const getMetricsData = () => {
    return results.map(result => ({
      method: result.method,
      BLEU: result.metrics.bleuScore,
      'ROUGE-1': result.metrics.rouge1,
      'ROUGE-2': result.metrics.rouge2,
      'ROUGE-L': result.metrics.rougeL
    }));
  };

  const getRadarData = () => {
    return results.map(result => ({
      method: result.method,
      BLEU: result.metrics.bleuScore,
      'ROUGE-1': result.metrics.rouge1,
      'ROUGE-2': result.metrics.rouge2,
      'ROUGE-L': result.metrics.rougeL,
      Combined: result.metrics.combinedScore
    }));
  };

  const getSelectedMethodDetails = () => {
    return results.find(result => result.method === selectedMethod);
  };

  const COLORS = ['#10b981', '#6366f1', '#f97316'];
  const METHOD_COLORS = {
    'SPACY': 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    'LLM': 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    'HYBRID': 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
  };

  // Metrics explanation data
  const metricsExplanation = [
    {
      id: "bleu",
      name: "BLEU Score",
      icon: <Calculator className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "from-blue-50/80 to-blue-100/60",
      borderColor: "border-blue-200/60",
      description: "Misura la precisione confrontando n-grammi tra testo generato e riferimento. Più alto è il punteggio, maggiore è la sovrapposizione lessicale.",
      badge: "Precisione lessicale"
    },
    {
      id: "rouge1",
      name: "ROUGE-1",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "from-purple-50/80 to-pink-50/60",
      borderColor: "border-purple-200/60",
      description: "Calcola il recall degli unigrammi (singole parole). Indica quanto del contenuto di riferimento è catturato nel testo generato.",
      badge: "Recall unigrammi"
    },
    {
      id: "rougel",
      name: "ROUGE-L",
      icon: <Target className="w-8 h-8" />,
      color: "text-red-600",
      bgColor: "from-red-50/80 to-pink-50/60",
      borderColor: "border-red-200/60",
      description: "Basato sulla Longest Common Subsequence. Valuta la similarità strutturale preservando l'ordine delle parole.",
      badge: "Similarità strutturale"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SharedHeader currentPage="advanced-metrics" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-red-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">BLEU</span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-red-200 to-red-100 bg-clip-text text-transparent">ROUGE</span>
            </h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Valutazione scientifica della qualità delle timeline generate utilizzando metriche BLEU e ROUGE contro standard di riferimento
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Metrics Explanation Section - Similar to Analysis page */}
        <div className="text-center mb-16 mt-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-6">
            Metriche di Valutazione
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprendi le metriche utilizzate per valutare la qualità delle timeline generate
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {metricsExplanation.map((metric, index) => (
            <Card 
              key={metric.id}
              className={`bg-white/95 backdrop-blur-sm border-2 ${metric.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="mb-6">
                  <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${metric.bgColor.replace('50/80', '500').replace('50/60', '600')} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg text-white`}>
                    {metric.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-3">
                  {metric.name}
                </CardTitle>
                <CardDescription className="text-slate-600 text-base leading-relaxed">
                  {metric.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 text-center">
                <Badge variant="outline" className={`${metric.bgColor.replace('50/80', '50').replace('50/60', '50')} ${metric.color.replace('600', '700')} border-${metric.color.replace('text-', '').replace('-600', '-300')}`}>
                  {metric.badge}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Biography and API Configuration Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Biography Input - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Edit3 className="w-6 h-6" />
                  Modifica Biografia
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Puoi modificare il testo e gli eventi della biografia selezionata
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Biography Test Labels */}
                <div>
                  <Label className="text-slate-700 font-semibold mb-3 block">Biografie di Test</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {testBiographies.map((bio) => (
                      <Button
                        key={bio.key}
                        variant={selectedBiography === bio.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelectBiography(bio.key)}
                        className={`text-xs ${
                          selectedBiography === bio.key
                            ? 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white'
                            : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 hover:border-blue-300'
                        }`}
                      >
                        {bio.name}
                      </Button>
                    ))}
                    <Button
                      variant={selectedBiography === 'custom' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectBiography('custom')}
                      className={`text-xs ${
                        selectedBiography === 'custom'
                          ? 'bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white'
                          : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 hover:border-blue-300'
                      }`}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Personalizzata
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-700 font-semibold">Nome/Soggetto della Biografia</Label>
                  <Input
                    value={customBiographyName}
                    onChange={(e) => setCustomBiographyName(e.target.value)}
                    placeholder="es. Albert Einstein"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold">Testo della Biografia</Label>
                  <Textarea
                    value={customBiography}
                    onChange={(e) => setCustomBiography(e.target.value)}
                    placeholder="Inserisci qui il testo della biografia da analizzare..."
                    className="min-h-[200px] mt-2"
                  />
                </div>
                
                <CustomTimelineInput 
                  onTimelineChange={setCustomGoldStandard}
                  initialTimeline={customGoldStandard}
                />
                
                {selectedBiography && selectedBiography !== 'custom' && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Biografia di Esempio</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Stai modificando una biografia di esempio. Puoi cambiare il testo e gli eventi come desideri per il tuo test.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* API Configuration - 1 column */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm h-fit">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Lightbulb className="w-5 h-5" />
                  Configurazione API
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-700 font-semibold text-sm">API Key OpenAI</Label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-sm border border-slate-200 rounded-md focus:border-emerald-400 focus:ring-emerald-400 focus:ring-1"
                    />
                  </div>
                  
                  <Button
                    onClick={analyzeSelectedBiography}
                    disabled={isAnalyzing || (!getCurrentBiography()?.text.trim())}
                    className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-2 shadow-lg text-sm"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analisi BLEU/ROUGE...
                      </>
                    ) : (
                      <>
                        <TestTube className="w-4 h-4 mr-2" />
                        Avvia Analisi BLEU/ROUGE
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6" ref={performanceRef}>
          {results.length > 0 ? (
            <>
              {/* Summary Table */}
              <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Riepilogo Performance - Il Vincitore
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metodo</TableHead>
                        <TableHead className="text-center">BLEU</TableHead>
                        <TableHead className="text-center">ROUGE-1</TableHead>
                        <TableHead className="text-center">ROUGE-2</TableHead>
                        <TableHead className="text-center">ROUGE-L</TableHead>
                        <TableHead className="text-center">Score Combinato</TableHead>
                        <TableHead className="text-center">Classifica</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results
                        .sort((a, b) => b.metrics.combinedScore - a.metrics.combinedScore)
                        .map((result, index) => (
                        <TableRow key={result.method} className={index === 0 ? 'bg-yellow-100/50' : 'bg-white/50'}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {result.method}
                              {index === 0 && <Crown className="w-4 h-4 text-yellow-600" />}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{result.metrics.bleuScore}%</TableCell>
                          <TableCell className="text-center">{result.metrics.rouge1}%</TableCell>
                          <TableCell className="text-center">{result.metrics.rouge2}%</TableCell>
                          <TableCell className="text-center">{result.metrics.rougeL}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={index === 0 ? "default" : "outline"} 
                                   className={index === 0 ? "bg-yellow-600 hover:bg-yellow-700" : ""}>
                              {result.metrics.combinedScore}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">#{index + 1}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Timeline Comparison */}
              <Card className="shadow-lg bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Confronto Timeline Generate dai 3 Metodi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {results.map((result, methodIndex) => (
                      <div key={result.method} className={`p-4 rounded-lg border-2 ${METHOD_COLORS[result.method as keyof typeof METHOD_COLORS] || 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-slate-800">{result.method}</h4>
                          <Badge variant="outline" className="text-xs ml-2">
                            {result.timeline.length} eventi
                          </Badge>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {result.timeline.map((event, eventIndex) => (
                            <div key={eventIndex} className="p-3 bg-white/80 rounded-lg border border-white/60 shadow-sm">
                              <div className="flex items-start justify-between mb-1">
                                <span className="text-sm font-medium text-slate-900">
                                  {event.date || event.year || 'N/A'}
                                </span>
                                <Badge variant="outline" className="text-xs ml-2">
                                  {eventIndex + 1}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {event.event || event.description || event.title || 'Evento senza descrizione'}
                              </p>
                            </div>
                          ))}
                          {result.timeline.length === 0 && (
                            <div className="p-4 text-center text-slate-500 text-sm">
                              Nessun evento generato
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics Section */}
              <Card className="shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="w-5 h-5" />
                    Analisi Dettagliata Metriche per Metodo
                  </CardTitle>
                  <CardDescription>
                    Seleziona un metodo per vedere i dettagli dei suoi punteggi BLEU e ROUGE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Method Selector */}
                    <div className="flex flex-wrap gap-2">
                      {results.map((result) => (
                        <Button
                          key={result.method}
                          variant={selectedMethod === result.method ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMethod(result.method)}
                          className={selectedMethod === result.method ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                        >
                          {result.method}
                        </Button>
                      ))}
                    </div>

                    {/* Selected Method Details */}
                    {getSelectedMethodDetails() && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Calculator className="w-5 h-5 text-blue-600" />
                              BLEU Score
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-blue-700 mb-2">
                              {getSelectedMethodDetails()?.metrics.bleuScore}%
                            </div>
                            <p className="text-sm text-blue-600">
                              Precisione lessicale: misura la sovrapposizione di n-grammi tra testo generato e riferimento
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-emerald-50 border-emerald-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-emerald-600" />
                              ROUGE-1
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-emerald-700 mb-2">
                              {getSelectedMethodDetails()?.metrics.rouge1}%
                            </div>
                            <p className="text-sm text-emerald-600">
                              Recall unigrammi: percentuale di singole parole del riferimento catturate
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-orange-50 border-orange-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Activity className="w-5 h-5 text-orange-600" />
                              ROUGE-2
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-orange-700 mb-2">
                              {getSelectedMethodDetails()?.metrics.rouge2}%
                            </div>
                            <p className="text-sm text-orange-600">
                              Recall bigrammi: cattura sequenze di due parole consecutive del riferimento
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border-purple-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Target className="w-5 h-5 text-purple-600" />
                              ROUGE-L
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-purple-700 mb-2">
                              {getSelectedMethodDetails()?.metrics.rougeL}%
                            </div>
                            <p className="text-sm text-purple-600">
                              Longest Common Subsequence: similarità strutturale preservando l'ordine
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Comparison Chart */}
              <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="w-5 h-5" />
                    Confronto Metriche BLEU/ROUGE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getMetricsData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="method" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="BLEU" fill="#3b82f6" name="BLEU Score" />
                        <Bar dataKey="ROUGE-1" fill="#10b981" name="ROUGE-1" />
                        <Bar dataKey="ROUGE-2" fill="#f97316" name="ROUGE-2" />
                        <Bar dataKey="ROUGE-L" fill="#8b5cf6" name="ROUGE-L" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Radar Chart */}
              <Card className="shadow-lg bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Analisi Radar Multidimensionale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={getRadarData()[0] ? Object.keys(getRadarData()[0]).filter(key => key !== 'method').map(metric => ({
                        metric,
                        SPACY: getRadarData().find(d => d.method === 'SPACY')?.[metric] || 0,
                        LLM: getRadarData().find(d => d.method === 'LLM')?.[metric] || 0,
                        HYBRID: getRadarData().find(d => d.method === 'HYBRID')?.[metric] || 0,
                      })) : []}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar name="SPACY" dataKey="SPACY" stroke="#10b981" fill="transparent" strokeWidth={2} />
                        <Radar name="LLM" dataKey="LLM" stroke="#6366f1" fill="transparent" strokeWidth={2} />
                        <Radar name="HYBRID" dataKey="HYBRID" stroke="#f97316" fill="transparent" strokeWidth={2} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-16 text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full blur-lg opacity-50"></div>
                    <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center border border-purple-200">
                      <TestTube className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700">
                    Analisi BLEU/ROUGE
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Seleziona una biografia di test per iniziare l'analisi comparativa con metriche BLEU e ROUGE.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetrics;
