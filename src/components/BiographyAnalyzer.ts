
import { useLanguage } from '@/context/LanguageContext';

export interface AnalysisResults {
  title: string;
  method: string;
  summary: {
    dataNascita?: string;
    dataMorte?: string;
    professione?: string;
    luoghiPrincipali?: string[];
    personaggiPrincipali?: string[];
  };
  timeline: Array<{
    date: string;
    event: string;
    title?: string;
  }>;
  logs: string[];
  generationTime?: number;
}

export class BiographyAnalyzer {
  private logs: string[] = [];
  
  private log(message: string) {
    console.log(message);
    this.logs.push(`[${new Date().toISOString()}] ${message}`);
  }

  getLogs(): string[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  private formatDateToItalian(dateStr: string): string {
    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];
    
    // Handle different date formats
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 2) {
        const year = parts[0];
        const month = parseInt(parts[1]) - 1;
        if (month >= 0 && month < 12) {
          return `${months[month]} ${year}`;
        }
      }
    }
    
    return dateStr;
  }

  private formatDateToEnglish(dateStr: string): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Handle different date formats
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 2) {
        const year = parts[0];
        const month = parseInt(parts[1]) - 1;
        if (month >= 0 && month < 12) {
          return `${months[month]} ${year}`;
        }
      }
    }
    
    return dateStr;
  }

  async analyze(biography: string, method: string, apiKey?: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    const startTime = Date.now();
    this.clearLogs();
    this.log(`Inizio analisi con metodo: ${method}`);
    
    try {
      let results: AnalysisResults;
      
      switch (method) {
        case 'spacy':
          results = await this.analyzeWithSpacy(biography, language);
          break;
        case 'llm':
          if (!apiKey) throw new Error('API Key OpenAI richiesta per il metodo LLM');
          results = await this.analyzeWithLLM(biography, apiKey, language);
          break;
        case 'hybrid':
          if (!apiKey) throw new Error('API Key OpenAI richiesta per il metodo Hybrid');
          results = await this.analyzeWithHybrid(biography, apiKey, language);
          break;
        default:
          throw new Error(`Metodo di analisi non supportato: ${method}`);
      }
      
      const endTime = Date.now();
      results.generationTime = endTime - startTime;
      this.log(`Analisi completata in ${results.generationTime}ms`);
      
      return results;
    } catch (error) {
      this.log(`Errore durante l'analisi: ${error}`);
      throw error;
    }
  }

  private async analyzeWithSpacy(biography: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    this.log("Avvio analisi con spaCy NLP");
    
    const lines = biography.split('\n').filter(line => line.trim());
    const timeline: Array<{ date: string; event: string }> = [];
    const luoghi = new Set<string>();
    const personaggi = new Set<string>();
    
    let dataNascita: string | undefined;
    let dataMorte: string | undefined;
    let professione: string | undefined;

    const dateRegex = /(\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|nel \d{4}|nel \d{1,2}\/\d{4}|\d{4}-\d{2})/g;
    
    for (const line of lines) {
      const dates = line.match(dateRegex);
      if (dates && dates.length > 0) {
        const cleanDate = language === 'it' ? 
          this.formatDateToItalian(dates[0].replace(/nel\s?/, '').trim()) :
          this.formatDateToEnglish(dates[0].replace(/nel\s?/, '').trim());
        timeline.push({
          date: cleanDate,
          event: line.trim()
        });
        
        if (line.toLowerCase().includes('nasce') || line.toLowerCase().includes('nato') || 
            line.toLowerCase().includes('born') || line.toLowerCase().includes('birth')) {
          dataNascita = cleanDate;
        }
        if (line.toLowerCase().includes('muore') || line.toLowerCase().includes('morte') ||
            line.toLowerCase().includes('died') || line.toLowerCase().includes('death')) {
          dataMorte = cleanDate;
        }
      }
      
      if (line.toLowerCase().includes('scrittore') || line.toLowerCase().includes('poeta') || 
          line.toLowerCase().includes('filosofo') || line.toLowerCase().includes('pittore') ||
          line.toLowerCase().includes('writer') || line.toLowerCase().includes('poet') ||
          line.toLowerCase().includes('philosopher') || line.toLowerCase().includes('painter')) {
        professione = line.match(/(scrittore|poeta|filosofo|pittore|musicista|politico|writer|poet|philosopher|painter|musician|politician)/i)?.[0];
      }
    }

    timeline.sort((a, b) => {
      const dateA = parseInt(a.date.replace(/\D/g, ''));
      const dateB = parseInt(b.date.replace(/\D/g, ''));
      return dateA - dateB;
    });

    this.log(`Trovati ${timeline.length} eventi nella timeline`);

    const title = language === 'it' ? "Timeline estratta con spaCy" : "Timeline extracted with spaCy";

    return {
      title,
      method: "spacy",
      summary: {
        dataNascita,
        dataMorte, 
        professione,
        luoghiPrincipali: luoghi.size > 0 ? Array.from(luoghi) : undefined,
        personaggiPrincipali: personaggi.size > 0 ? Array.from(personaggi) : undefined
      },
      timeline,
      logs: this.logs
    };
  }

  private async analyzeWithLLM(biography: string, apiKey: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    this.log("Avvio analisi con LLM (GPT-4o mini)");
    
    const prompt = language === 'it' ? 
      `Analizza questa biografia e crea una timeline strutturata. Per ogni evento importante, scrivi una descrizione molto dettagliata di 3-10 frasi che espanda significativamente il contenuto originale con:

- Contesto storico del periodo
- Dettagli biografici specifici e significativi  
- Conseguenze e impatto degli eventi
- Collegamenti tra eventi diversi
- Informazioni culturali e sociali rilevanti
- Analisi del significato nella vita del personaggio

BIOGRAFIA:
${biography}

Restituisci un JSON con questa struttura:
{
  "title": "Nome del personaggio - Biografia",
  "summary": {
    "dataNascita": "data di nascita (formato: gennaio 2025, non 2025-01)",
    "dataMorte": "data di morte se presente (formato italiano)", 
    "professione": "professione principale",
    "luoghiPrincipali": ["lista dei luoghi importanti"],
    "personaggiPrincipali": ["lista di persone importanti menzionate"]
  },
  "timeline": [
    {
      "date": "data dell'evento in formato italiano (es: gennaio 2025)",
      "title": "titolo creativo e descrittivo per l'evento",
      "event": "descrizione molto dettagliata di 3-10 frasi che espande enormemente il contenuto originale con contesto storico, significato profondo, conseguenze, dettagli biografici specifici e collegamenti con altri eventi della vita del personaggio"
    }
  ]
}

REGOLE FONDAMENTALI:
- Ogni descrizione deve essere di ALMENO 3-4 frasi complete, idealmente 5-10 frasi
- NON limitarti a riformulare il testo originale - ESPANDI con informazioni storiche, culturali e biografiche
- Aggiungi sempre contesto storico del periodo
- Spiega l'importanza e le conseguenze di ogni evento
- Usa un linguaggio narrativo ricco e coinvolgente
- Collega gli eventi tra loro quando possibile
- Date sempre in formato italiano (gennaio 2025, non 2025-01)
- Se il mese è specificato, usa il nome italiano del mese` :
      
      `Analyze this biography and create a structured timeline. For each important event, write a very detailed description of 3-10 sentences that significantly expands the original content with:

- Historical context of the period
- Specific and significant biographical details
- Consequences and impact of events
- Connections between different events
- Relevant cultural and social information
- Analysis of significance in the character's life

BIOGRAPHY:
${biography}

Return a JSON with this structure:
{
  "title": "Character Name - Biography",
  "summary": {
    "dataNascita": "birth date (format: January 2025, not 2025-01)",
    "dataMorte": "death date if present (English format)", 
    "professione": "main profession",
    "luoghiPrincipali": ["list of important places"],
    "personaggiPrincipali": ["list of important people mentioned"]
  },
  "timeline": [
    {
      "date": "event date in English format (e.g., January 2025)",
      "title": "creative and descriptive title for the event",
      "event": "very detailed description of 3-10 sentences that enormously expands the original content with historical context, deep meaning, consequences, specific biographical details and connections with other events in the character's life"
    }
  ]
}

FUNDAMENTAL RULES:
- Each description must be AT LEAST 3-4 complete sentences, ideally 5-10 sentences
- DO NOT limit yourself to reformulating the original text - EXPAND with historical, cultural and biographical information
- Always add historical context of the period
- Explain the importance and consequences of each event
- Use rich and engaging narrative language
- Connect events to each other when possible
- Dates always in English format (January 2025, not 2025-01)
- If the month is specified, use the English month name`;

    try {
      const systemContent = language === 'it' ?
        'Sei un esperto biografo e storico. Il tuo compito è creare timeline dettagliate e molto ricche espandendo ogni evento con 3-10 frasi di contesto storico, dettagli biografici e significato culturale. Ogni descrizione deve essere sostanzialmente più lunga e dettagliata del testo originale.' :
        'You are an expert biographer and historian. Your task is to create detailed and very rich timelines expanding each event with 3-10 sentences of historical context, biographical details and cultural significance. Each description must be substantially longer and more detailed than the original text.';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system', 
              content: systemContent
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Errore API OpenAI: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      this.log("Risposta ricevuta da OpenAI");
      
      const content = data.choices[0].message.content;
      this.log(`Contenuto ricevuto: ${content.substring(0, 200)}...`);
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Formato JSON non trovato nella risposta');
      }
      
      const result = JSON.parse(jsonMatch[0]);
      this.log(`Timeline generata con ${result.timeline?.length || 0} eventi`);
      
      return {
        ...result,
        method: "llm",
        logs: this.logs
      };
    } catch (error) {
      this.log(`Errore nell'analisi LLM: ${error}`);
      throw error;
    }
  }

  private async analyzeWithHybrid(biography: string, apiKey: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    this.log("Avvio analisi ibrida (spaCy + LLM)");
    
    // Prima fase: estrazione con spaCy
    const spacyResults = await this.analyzeWithSpacy(biography, language);
    this.log("Fase spaCy completata");
    
    // Seconda fase: arricchimento con LLM
    const prompt = language === 'it' ?
      `Basandoti su questa biografia e sui dati già estratti, arricchisci e migliora la timeline con descrizioni molto dettagliate di 3-10 frasi per ogni evento.

BIOGRAFIA ORIGINALE:
${biography}

DATI GIÀ ESTRATTI:
${JSON.stringify(spacyResults, null, 2)}

Migliora e espandi ogni evento della timeline con:
- Descrizioni molto più ricche e dettagliate (3-10 frasi per evento)
- Contesto storico e culturale approfondito
- Significato e conseguenze degli eventi
- Collegamenti tra eventi diversi
- Dettagli biografici rilevanti e specifici
- Analisi dell'impatto nella vita del personaggio

Restituisci un JSON con la stessa struttura ma con eventi enormemente espansi:
{
  "title": "titolo migliorato",
  "summary": {
    "dataNascita": "data nascita in formato italiano",
    "dataMorte": "data morte in formato italiano",
    "professione": "professione",
    "luoghiPrincipali": ["luoghi"],
    "personaggiPrincipali": ["personaggi"]
  },
  "timeline": [
    {
      "date": "data in formato italiano (gennaio 2025)",
      "title": "titolo creativo e descrittivo",
      "event": "descrizione molto dettagliata di 3-10 frasi che espande significativamente il contenuto originale con contesto storico profondo, conseguenze, dettagli biografici specifici e collegamenti con altri eventi"
    }
  ]
}

IMPORTANTE: Ogni descrizione deve essere sostanzialmente più lunga del testo originale, con almeno 3-4 frasi, idealmente 5-10 frasi ricche di dettagli storici e biografici.` :

      `Based on this biography and the already extracted data, enrich and improve the timeline with very detailed descriptions of 3-10 sentences for each event.

ORIGINAL BIOGRAPHY:
${biography}

ALREADY EXTRACTED DATA:
${JSON.stringify(spacyResults, null, 2)}

Improve and expand each timeline event with:
- Much richer and more detailed descriptions (3-10 sentences per event)
- In-depth historical and cultural context
- Meaning and consequences of events
- Connections between different events
- Relevant and specific biographical details
- Analysis of impact in the character's life

Return a JSON with the same structure but with enormously expanded events:
{
  "title": "improved title",
  "summary": {
    "dataNascita": "birth date in English format",
    "dataMorte": "death date in English format",
    "professione": "profession",
    "luoghiPrincipali": ["places"],
    "personaggiPrincipali": ["characters"]
  },
  "timeline": [
    {
      "date": "date in English format (January 2025)",
      "title": "creative and descriptive title",
      "event": "very detailed description of 3-10 sentences that significantly expands the original content with deep historical context, consequences, specific biographical details and connections with other events"
    }
  ]
}

IMPORTANT: Each description must be substantially longer than the original text, with at least 3-4 sentences, ideally 5-10 sentences rich in historical and biographical details.`;

    try {
      const systemContent = language === 'it' ?
        'Sei un esperto biografo che arricchisce timeline con descrizioni molto dettagliate di 3-10 frasi. Espandi ogni evento con informazioni storiche, biografiche e culturali significative. Ogni descrizione deve essere molto più lunga e ricca del testo originale.' :
        'You are an expert biographer who enriches timelines with very detailed descriptions of 3-10 sentences. Expand each event with significant historical, biographical and cultural information. Each description must be much longer and richer than the original text.';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemContent
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`Errore API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Formato JSON non trovato nella risposta');
      }
      
      const result = JSON.parse(jsonMatch[0]);
      this.log(`Timeline ibrida generata con ${result.timeline?.length || 0} eventi arricchiti`);
      
      return {
        ...result,
        method: "hybrid",
        logs: this.logs
      };
    } catch (error) {
      this.log(`Errore nell'analisi ibrida: ${error}`);
      throw error;
    }
  }

  // Metodi statici per l'uso nella pagina Analysis
  static async analyzeWithSpacy(biography: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    const analyzer = new BiographyAnalyzer();
    return analyzer.analyzeWithSpacy(biography, language);
  }

  static async analyzeWithLLM(biography: string, apiKey: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    const analyzer = new BiographyAnalyzer();
    return analyzer.analyzeWithLLM(biography, apiKey, language);
  }

  static async analyzeWithHybrid(biography: string, apiKey: string, language: 'it' | 'en' = 'it'): Promise<AnalysisResults> {
    const analyzer = new BiographyAnalyzer();
    return analyzer.analyzeWithHybrid(biography, apiKey, language);
  }
}
