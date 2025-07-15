import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, Database, GitMerge, BarChart3, TrendingUp, Users, Zap, CheckCircle, AlertTriangle, BookOpen, Globe, Search, Eye, Clock, Target, Scale, Lightbulb, Rocket, Award, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Intersection Observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
            setVisibleSections(prev => new Set([...prev, sectionIndex]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const methodsComparison = [
    {
      method: "NLP Tradizionale",
      score: "72%",
      pros: ["Veloce", "Deterministico", "Economico"],
      cons: ["Limitato nella comprensione del contesto", "Difficoltà con date complesse"]
    },
    {
      method: "Approccio Ibrido", 
      score: "85%",
      pros: ["Bilanciato", "Buona precisione", "Controllo sui costi"],
      cons: ["Complessità implementativa", "Dipendente da regole predefinite"]
    },
    {
      method: "LLM (GPT-4)",
      score: "94%", 
      pros: ["Eccellente comprensione del contesto", "Flessibilità massima", "Risultati creativi"],
      cons: ["Costi più elevati", "Necessita supervisione umana"]
    }
  ];

  const SectionBreakpoint = ({ icon: Icon, title, description, index }: { 
    icon: any, 
    title: string, 
    description: string, 
    index: number 
  }) => (
    <div 
      data-section={index}
      className={`relative py-16 transition-all duration-1000 ${
        visibleSections.has(index) 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-treccani-teal/5 via-transparent to-treccani-teal/5"></div>
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-treccani-teal to-slate-800 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-treccani-teal to-slate-600 mx-auto rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-treccani-cream via-treccani-light to-treccani-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-treccani-teal/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/d9c6539b-6907-47a4-acd4-37b936bec2cb.png" 
                alt="Treccani" 
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              />
              <div className="h-8 w-px bg-treccani-teal/30"></div>
              <h1 className="text-2xl font-bold text-treccani-teal">About the Project</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Intro */}
        <SectionBreakpoint 
          index={0}
          icon={Lightbulb}
          title="Il Patrimonio Treccani nel Mondo Digitale"
          description="Trasformare un secolo di conoscenza italiana per l'era dell'intelligenza artificiale"
        />

        {/* Introduzione Principale */}
        <div 
          data-section={1}
          className={`transition-all duration-1000 delay-200 ${
            visibleSections.has(1) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold text-slate-800 mb-6">
                Biography Reader: L'Evoluzione dell'Archivio Treccani
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Un progetto nato dall'esigenza di trasformare il patrimonio secolare della conoscenza italiana 
                in contenuti fruibili per l'era digitale moderna
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
              
              {/* Contesto e Problema */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Il Patrimonio Treccani nel Mondo Digitale</h2>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    <strong className="text-slate-800">L'Istituto della Enciclopedia Italiana Treccani</strong> rappresenta da oltre un secolo 
                    l'autorevolezza e l'eccellenza della conoscenza italiana. Il nostro archivio contiene un patrimonio 
                    inestimabile di biografie, articoli e contenuti culturali che hanno formato generazioni di studiosi e appassionati.
                  </p>
                  
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    Tuttavia, <strong className="text-slate-800">l'evoluzione delle modalità di fruizione dei contenuti digitali</strong> 
                    ha creato nuove sfide. Nell'era delle AI Overview di Google, dei riassunti automatici e della ricerca semantica, 
                    gli utenti moderni si aspettano informazioni immediate, visualmente organizzate e facilmente comprensibili.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg border border-slate-300">
                    <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      La Sfida della Fruizione Moderna
                    </h4>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      <strong className="text-slate-800">Ricercare informazioni in testi lunghi e articolati</strong> sta diventando 
                      sempre meno immediato per la base utenti contemporanea. La necessità di un <strong className="text-slate-800">"TL;DR" 
                      (Too Long; Didn't Read)</strong> - un riassunto conciso e strutturato - è diventata parte integrante 
                      dell'esperienza di fruizione moderna dei contenuti culturali.
                    </p>
                  </div>
                </div>
              </div>

              {/* La Soluzione */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">La Risposta Tecnologica di Treccani</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-emerald-50 p-8 rounded-lg border border-emerald-200">
                    <h4 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <Eye className="w-6 h-6" />
                      Visibilità Moderna
                    </h4>
                    <p className="text-emerald-700 text-lg leading-relaxed">
                      <strong>Trasformare contenuti testuali complessi</strong> in timeline visive, grafici interattivi 
                      e strutture dati facilmente navigabili. Il nostro obiettivo è rendere la conoscenza Treccani 
                      <strong> immediatamente accessibile e comprensibile</strong> anche agli utenti della generazione digitale.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                    <h4 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                      <Globe className="w-6 h-6" />
                      Fruibilità Universale
                    </h4>
                    <p className="text-blue-700 text-lg leading-relaxed">
                      <strong>Adattare l'archivio secolare Treccani</strong> ai linguaggi e alle aspettative dei media moderni, 
                      mantenendo intatta l'autorevolezza e la precisione che ci contraddistingue. 
                      <strong>Innovazione tecnologica al servizio della tradizione culturale italiana.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision e Obiettivi */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Intelligenza Artificiale al Servizio della Cultura</h2>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    <strong className="text-slate-800">Biography Reader</strong> rappresenta il primo passo di una rivoluzione digitale 
                    che unisce <strong className="text-slate-800">l'intelligenza artificiale più avanzata</strong> con 
                    <strong className="text-slate-800"> il patrimonio culturale italiano più prestigioso</strong>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
                      <h5 className="font-bold text-purple-800 mb-3">🎯 Precisione</h5>
                      <p className="text-purple-700 text-sm">
                        <strong>Mantenere l'accuratezza</strong> e l'autorevolezza che caratterizza ogni contenuto Treccani
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
                      <h5 className="font-bold text-purple-800 mb-3">⚡ Immediatezza</h5>
                      <p className="text-purple-700 text-sm">
                        <strong>Fornire accesso istantaneo</strong> alle informazioni più rilevanti e strutturate
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
                      <h5 className="font-bold text-purple-800 mb-3">🌐 Scalabilità</h5>
                      <p className="text-purple-700 text-sm">
                        <strong>Processare migliaia di biografie</strong> mantenendo qualità e coerenza costanti
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Tool T.A.I.MELINE */}
        <SectionBreakpoint 
          index={2}
          icon={Rocket}
          title="T.A.I.MELINE: Il Cuore Tecnologico"
          description="Timeline Automatiche con Intelligenza Artificiale per trasformare testi in cronologie strutturate"
        />

        {/* Il Tool T.A.I.MELINE */}
        <div 
          data-section={3}
          className={`transition-all duration-1000 delay-300 ${
            visibleSections.has(3) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800">Il Tool T.A.I.MELINE</CardTitle>
              </div>
              <CardDescription className="text-xl text-slate-600 leading-relaxed">
                Timeline Automatiche con Intelligenza Artificiale: Trasformare Testi in Cronologie Strutturate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-lg border border-emerald-200">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  <strong className="text-slate-800">T.A.I.MELINE</strong> rappresenta il cuore tecnologico del nostro progetto: 
                  uno strumento avanzato capace di <strong className="text-slate-800">estrarre automaticamente da testi lunghi e complessi</strong> 
                  le tappe cronologiche più significative, complete di date precise e narrazioni dettagliate per ogni evento.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg border border-emerald-200 shadow-sm">
                    <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Capacità del Sistema
                    </h4>
                    <ul className="space-y-3 text-emerald-700">
                      <li>• <strong>Analisi semantica avanzata</strong> di testi biografici complessi</li>
                      <li>• <strong>Estrazione automatica</strong> di date e periodi storici</li>
                      <li>• <strong>Generazione di narrazioni</strong> coinvolgenti per ogni tappa</li>
                      <li>• <strong>Strutturazione cronologica</strong> logica e coerente</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-emerald-200 shadow-sm">
                    <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Integrazione Produttiva
                    </h4>
                    <p className="text-emerald-700 leading-relaxed mb-4">
                      Il tool sarà <strong>integrato direttamente nel sito Treccani</strong> per la produzione, 
                      con una strategia studiata per <strong>limitare l'imprevedibilità degli LLM</strong> 
                      e <strong>contenere i costi</strong> di generazione.
                    </p>
                    <p className="text-emerald-700 leading-relaxed">
                      Considerando la <strong>base utenti molto ampia</strong> e le <strong>visite numerose</strong> 
                      del portale Treccani, l'approccio produttivo è stato ottimizzato per la sostenibilità a lungo termine.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Misurazione Efficacia */}
        <SectionBreakpoint 
          index={4}
          icon={BarChart3}
          title="Approccio Scientifico Multi-Metrica"
          description="Valutazione rigorosa della qualità attraverso metriche avanzate e standard internazionali"
        />

        {/* Come Misurare l'Efficacia */}
        <div 
          data-section={5}
          className={`transition-all duration-1000 delay-400 ${
            visibleSections.has(5) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800">Come Misurare l'Efficacia dei Tre Metodi?</CardTitle>
              </div>
              <CardDescription className="text-xl text-slate-600 leading-relaxed">
                Un Approccio Scientifico Multi-Metrica per Valutare la Qualità delle Timeline Generate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              
              {/* Metriche Fondamentali */}
              <div className="space-y-8">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-2xl font-bold text-slate-800 mb-6">📊 Le Metriche Fondamentali</h4>
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    Per valutare scientificamente quale dei tre approcci (NLP Tradizionale, Ibrido, LLM) 
                    fosse più efficace, abbiamo implementato un <strong className="text-slate-800">sistema di misurazione multi-dimensionale</strong> 
                    che considera diversi aspetti della qualità delle timeline generate.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* F1 Score */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Scale className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold text-green-800">F1 Score</h5>
                    </div>
                    <p className="text-green-700 leading-relaxed mb-4">
                      <strong>Misura l'equilibrio generale</strong> tra la capacità del sistema di trovare 
                      informazioni rilevanti senza includere troppi dati irrilevanti.
                    </p>
                    <div className="bg-white/70 p-4 rounded-lg">
                      <p className="text-green-600 text-sm">
                        <strong>In parole semplici:</strong> "Quanto è bravo il sistema nel trovare 
                        il giusto equilibrio tra completezza e precisione?"
                      </p>
                    </div>
                  </div>

                  {/* Precision */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold text-blue-800">Precision</h5>
                    </div>
                    <p className="text-blue-700 leading-relaxed mb-4">
                      <strong>Misura la qualità</strong> delle informazioni estratte: 
                      quante delle tappe identificate sono effettivamente corrette e rilevanti.
                    </p>
                    <div className="bg-white/70 p-4 rounded-lg">
                      <p className="text-blue-600 text-sm">
                        <strong>In parole semplici:</strong> "Delle tappe che il sistema ha trovato, 
                        quante sono davvero importanti e accurate?"
                      </p>
                    </div>
                  </div>

                  {/* Recall */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-xl font-bold text-purple-800">Recall</h5>
                    </div>
                    <p className="text-purple-700 leading-relaxed mb-4">
                      <strong>Misura la completezza</strong> dell'estrazione: 
                      quante delle tappe importanti presenti nel testo sono state effettivamente trovate.
                    </p>
                    <div className="bg-white/70 p-4 rounded-lg">
                      <p className="text-purple-600 text-sm">
                        <strong>In parole semplici:</strong> "Di tutte le tappe importanti che esistevano nel testo, 
                        quante il sistema è riuscito a trovare?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metriche Aggiuntive */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-lg border border-orange-200">
                  <h4 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Metriche Aggiuntive per una Valutazione Completa
                  </h4>
                  
                  <p className="text-orange-700 text-lg leading-relaxed mb-6">
                    Oltre alle metriche di qualità tradizionali, abbiamo aggiunto <strong className="text-orange-800">tre parametri fondamentali</strong> 
                    per valutare l'applicabilità pratica in un contesto produttivo come quello di Treccani:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <h5 className="font-bold text-orange-800">Velocità di Generazione</h5>
                      </div>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        <strong>Tempo necessario</strong> per processare una biografia completa 
                        e generare la timeline strutturata
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-orange-600" />
                        <h5 className="font-bold text-orange-800">Numero di Tappe</h5>
                      </div>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        <strong>Quantità di eventi</strong> identificati e strutturati 
                        per ogni biografia analizzata
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                        <h5 className="font-bold text-orange-800">Lunghezza Testi</h5>
                      </div>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        <strong>Ampiezza totale</strong> delle descrizioni generate 
                        per fornire narrazioni complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - BLEU e ROUGE */}
        <SectionBreakpoint 
          index={6}
          icon={Brain}
          title="Standard Scientifici Internazionali"
          description="Implementazione di metriche BLEU e ROUGE per valutazione oggettiva dei testi generati"
        />

        {/* Approccio BLEU e ROUGE */}
        <div 
          data-section={7}
          className={`transition-all duration-1000 delay-500 ${
            visibleSections.has(7) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800">
                  L'Approccio più Convenzionale: Metriche 
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> BLEU</span>
                  {" e "}
                  <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">ROUGE</span>
                </CardTitle>
              </div>
              <CardDescription className="text-xl text-slate-600 leading-relaxed">
                Standard Scientifici Internazionali per la Valutazione di Testi Generati Automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-lg border border-slate-200">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Per completare la nostra analisi scientifica, abbiamo implementato le <strong className="text-slate-800">metriche BLEU e ROUGE</strong>, 
                  considerate <strong className="text-slate-800">standard internazionali</strong> nel campo del Natural Language Processing 
                  per valutare la qualità di testi generati automaticamente.
                </p>
                
                <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
                  <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                    Perché BLEU e ROUGE?
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    Queste metriche ci permettono di <strong className="text-slate-800">confrontare oggettivamente</strong> 
                    i testi generati dai nostri tre approcci con timeline di riferimento create da esperti, 
                    fornendo una <strong className="text-slate-800">valutazione quantitativa e riproducibile</strong> 
                    della qualità linguistica e della fedeltà informativa.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
                  <h4 className="text-2xl font-bold text-blue-800 mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BLEU</span> Score
                  </h4>
                  <p className="text-blue-700 leading-relaxed mb-4">
                    <strong>Bilingual Evaluation Understudy</strong> - Misura la <strong>similitudine lessicale</strong> 
                    tra il testo generato e quello di riferimento, analizzando la corrispondenza di parole e frasi.
                  </p>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <p className="text-blue-600 text-sm">
                      <strong>Focus:</strong> Precisione terminologica e costruzioni linguistiche accurate
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg border border-red-200">
                  <h4 className="text-2xl font-bold text-red-800 mb-4">
                    <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">ROUGE</span> Score
                  </h4>
                  <p className="text-red-700 leading-relaxed mb-4">
                    <strong>Recall-Oriented Understudy for Gisting Evaluation</strong> - Valuta la <strong>completezza informativa</strong>, 
                    misurando quanto del contenuto di riferimento è presente nel testo generato.
                  </p>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <p className="text-red-600 text-sm">
                      <strong>Focus:</strong> Copertura delle informazioni essenziali e richiamo del contenuto
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-red-50 p-8 rounded-lg border border-purple-200">
                <h4 className="text-2xl font-bold text-slate-800 mb-6">🔬 Validazione Scientifica Completa</h4>
                <p className="text-slate-700 text-lg leading-relaxed">
                  L'utilizzo combinato di metriche tradizionali (F1, Precision, Recall), parametri operativi 
                  (velocità, quantità, lunghezza) e standard internazionali (BLEU, ROUGE) ci ha fornito 
                  una <strong className="text-slate-800">valutazione scientifica completa e affidabile</strong> 
                  per determinare quale approccio implementare in produzione per il patrimonio Treccani.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Timeline Tool */}
        <SectionBreakpoint 
          index={8}
          icon={Clock}
          title="Tool Timeline in Azione"
          description="Processo automatico di trasformazione da testi biografici a timeline interattive"
        />

        {/* Come Funziona Timeline */}
        <div 
          data-section={9}
          className={`transition-all duration-1000 delay-600 ${
            visibleSections.has(9) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800">Tool Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                Il nostro strumento di generazione timeline trasforma automaticamente testi biografici 
                in timeline interattive e strutturate. Il processo avviene in tre fasi principali:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 mb-3">1. Analisi del Testo</h4>
                  <p className="text-emerald-700">Estrazione automatica di date, eventi e contesto storico dal testo biografico.</p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                  <h4 className="font-bold text-teal-800 mb-3">2. Strutturazione</h4>
                  <p className="text-teal-700">Organizzazione cronologica degli eventi con titoli creativi e descrizioni dettagliate.</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3">3. Visualizzazione</h4>
                  <p className="text-blue-700">Generazione di una timeline interattiva esportabile in formato JSON.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Analisi Comparative */}
        <SectionBreakpoint 
          index={10}
          icon={GitMerge}
          title="Confronto dei Tre Approcci"
          description="Analisi comparativa scientifica tra NLP tradizionale, approccio ibrido e LLM"
        />

        {/* Analisi Comparative */}
        <div 
          data-section={11}
          className={`transition-all duration-1000 delay-700 ${
            visibleSections.has(11) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardContent className="space-y-8">
              <p className="text-slate-600 text-lg leading-relaxed">
                La nostra piattaforma confronta tre approcci diversi per l'analisi biografica, 
                utilizzando metriche scientifiche per valutare precisione, richiamo e qualità complessiva.
              </p>
              
              <div className="space-y-6">
                {methodsComparison.map((method, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-slate-800">{method.method}</h4>
                      <div className="text-2xl font-bold text-slate-800">{method.score}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Vantaggi
                        </h5>
                        <ul className="space-y-1">
                          {method.pros.map((pro, idx) => (
                            <li key={idx} className="text-green-600 text-sm">• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Svantaggi
                        </h5>
                        <ul className="space-y-1">
                          {method.cons.map((con, idx) => (
                            <li key={idx} className="text-orange-600 text-sm">• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Metriche Avanzate */}
        <SectionBreakpoint 
          index={12}
          icon={TrendingUp}
          title="Validazione Scientifica Completa"
          description="Metriche BLEU e ROUGE per valutazione rigorosa della qualità linguistica"
        />

        {/* Metriche Avanzate BLEU/ROUGE */}
        <div 
          data-section={13}
          className={`transition-all duration-1000 delay-800 ${
            visibleSections.has(13) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800">Risultati del Test su 20 Biografie</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/80 p-6 rounded-lg border border-green-200">
                <h4 className="text-2xl font-bold text-green-800 mb-4">🏆 Vincitore: Approccio LLM</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                    <div className="text-green-700">Precisione Media</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">91.8%</div>
                    <div className="text-green-700">Richiamo Medio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">92.9%</div>
                    <div className="text-green-700">F1-Score</div>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed">
                Il test condotto su un corpus di 20 biografie storiche ha dimostrato la superiorità 
                dell'approccio LLM in tutti i parametri di valutazione, confermando la sua capacità 
                di comprendere contesti complessi e generare timeline accurate e complete.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Breakpoint - Implementazione */}
        <SectionBreakpoint 
          index={14}
          icon={Users}
          title="Implementazione in Produzione"
          description="Strategia ottimale per integrare l'LLM nel sistema produttivo di Treccani"
        />

        {/* Conclusioni e Implementazione Produzione */}
        <div 
          data-section={15}
          className={`transition-all duration-1000 delay-900 ${
            visibleSections.has(15) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-16">
            <CardHeader>
              <h4 className="text-xl font-bold text-slate-800 mb-4">L'LLM: La Scelta Ottimale</h4>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                I risultati dei nostri test confermano che l'approccio basato su Large Language Models 
                rappresenta la soluzione più efficace per la generazione automatica di timeline biografiche, 
                superando significativamente i metodi tradizionali.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h5 className="font-bold text-blue-800 mb-3">Strategia di Produzione</h5>
                  <ul className="space-y-2 text-blue-700">
                    <li>• <strong>Revisione Umana:</strong> Validazione esperta prima della pubblicazione</li>
                    <li>• <strong>Cache Intelligente:</strong> Salvataggio delle timeline generate</li>
                    <li>• <strong>Batch Processing:</strong> Elaborazione pianificata per ottimizzare i costi</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h5 className="font-bold text-orange-800 mb-3">Gestione dei Costi</h5>
                  <ul className="space-y-2 text-orange-700">
                    <li>• <strong>Pre-elaborazione:</strong> Timeline generate offline</li>
                    <li>• <strong>Controllo Qualità:</strong> Riduzione delle rigenerazioni</li>
                    <li>• <strong>Scalabilità:</strong> Adatto all'alto traffico di Treccani</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-treccani-light to-treccani-dark p-6 rounded-lg text-center">
                <p className="text-slate-800 text-lg font-semibold">
                  Con milioni di visitatori giornalieri, Treccani necessita di una soluzione che bilanci 
                  qualità eccellente e sostenibilità economica. L'approccio LLM con supervisione umana 
                  rappresenta il compromesso ideale per il futuro dell'editoria digitale.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA finale con animazione */}
        <div 
          data-section={16}
          className={`text-center transition-all duration-1000 delay-1100 ${
            visibleSections.has(16) 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <Card className="bg-gradient-to-r from-treccani-teal to-slate-700 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Prova i Nostri Strumenti
              </h3>
              <p className="text-slate-100 text-lg mb-8 max-w-2xl mx-auto">
                Esplora la potenza dell'intelligenza artificiale applicata all'analisi biografica. 
                Scegli il tool più adatto alle tue esigenze.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/timeline')}
                  size="lg"
                  className="bg-white text-treccani-teal hover:bg-slate-100 font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-200"
                >
                  Genera Timeline
                </Button>
                <Button 
                  onClick={() => navigate('/analysis')}
                  size="lg"
                  className="bg-white text-treccani-teal hover:bg-slate-100 font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-200"
                >
                  Analisi Comparativa
                </Button>
                <Button 
                  onClick={() => navigate('/advanced-metrics')}
                  size="lg"
                  className="bg-white text-treccani-teal hover:bg-slate-100 font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-200"
                >
                  Metriche Avanzate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-300">
            Thesis project by Elia Remondino
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
