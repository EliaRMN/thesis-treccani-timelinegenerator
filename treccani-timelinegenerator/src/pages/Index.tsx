import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, FileText, Clock, User, MapPin, Briefcase, Calendar, Sparkles, Zap, Target, BookOpen, Brain, Database, GitMerge, ArrowRight, Info, X, Plus, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BiographyAnalyzer } from "@/components/BiographyAnalyzer";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SampleBiographies } from "@/components/SampleBiographies";

const Index = () => {
  const [biography, setBiography] = useState("");
  const [method, setMethod] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeMethodFlow, setActiveMethodFlow] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey.trim()) {
      localStorage.setItem('openai-api-key', apiKey);
    }
  }, [apiKey]);

  const handleAnalyze = async () => {
    if (!biography.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci una biografia da analizzare",
        variant: "destructive",
      });
      return;
    }

    if (!method) {
      toast({
        title: "Errore", 
        description: "Seleziona un metodo di analisi",
        variant: "destructive",
      });
      return;
    }

    if (method === "llm" && !apiKey.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci la tua API Key per utilizzare il metodo LLM",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analyzer = new BiographyAnalyzer();
      const analysisResults = await analyzer.analyze(biography, method, apiKey);
      setResults(analysisResults);
      
      toast({
        title: "Analisi completata",
        description: "La biografia è stata analizzata con successo",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
      });
    } catch (error) {
      console.error("Errore durante l'analisi:", error);
      toast({
        title: "Errore nell'analisi",
        description: "Si è verificato un errore durante l'analisi della biografia",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setBiography("");
    setMethod("");
    setResults(null);
    // Keep API key saved in localStorage
  };

  const handleMethodClick = (methodId) => {
    if (activeMethodFlow === methodId) {
      setActiveMethodFlow(null);
    } else {
      setActiveMethodFlow(methodId);
      // Force animation restart by updating key
      setAnimationKey(prev => prev + 1);
    }
  };

  const methodFlows = {
    spacy: {
      title: "Spacy (NLP)",
      steps: [
        "Preprocessing del testo biografico",
        "Riconoscimento delle entità nominate (NER)",
        "Estrazione di date e luoghi",
        "Analisi sintattica per identificare relazioni",
        "Generazione della timeline strutturata"
      ]
    },
    llm: {
      title: "LLM (GPT-4o mini)",
      steps: [
        "Invio del testo all'API OpenAI",
        "Analisi contestuale avanzata",
        "Estrazione intelligente di eventi chiave",
        "Generazione di titoli creativi",
        "Formattazione della timeline finale"
      ]
    },
    hybrid: {
      title: "Ibrido",
      steps: [
        "Analisi preliminare con Spacy NLP",
        "Estrazione strutturata di date e luoghi",
        "Elaborazione contestuale con GPT-4o mini",
        "Arricchimento con titoli creativi",
        "Combinazione e ottimizzazione dei risultati"
      ]
    }
  };

  const methods = [
    {
      id: "spacy",
      name: "Spacy (NLP)",
      icon: <Database className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100"
    },
    {
      id: "llm",
      name: "LLM (GPT-4o mini)",
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-100"
    },
    {
      id: "hybrid",
      name: "Ibrido",
      icon: <GitMerge className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:bg-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-treccani-cream via-treccani-light to-treccani-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-treccani-teal/20 sticky top-0 z-50">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/d9c6539b-6907-47a4-acd4-37b936bec2cb.png" 
                alt="Treccani" 
                className="h-10 w-auto"
              />
              <div className="h-8 w-px bg-treccani-teal/30"></div>
              <h1 className="text-2xl font-bold text-treccani-teal">TimelineAI</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BookOpen className="w-4 h-4" />
              <span>Analizzatore Biografico AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-treccani-teal to-slate-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-6 py-16 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-white animate-fade-in">
              <span className="bg-gradient-to-r from-treccani-cream to-treccani-light bg-clip-text text-transparent">
                TimelineAI
              </span>
            </h2>
            <p className="text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Trasforma le biografie in timeline interattive con l'intelligenza artificiale
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="w-full px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Come <span className="bg-gradient-to-r from-treccani-teal to-slate-700 bg-clip-text text-transparent">Funziona</span>
          </h3>
          <p className="text-lg text-slate-600">Scegli il metodo di analisi più adatto alle tue esigenze</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Method Cards */}
          <Card 
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('spacy')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Spacy (NLP)</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                Utilizza tecniche avanzate di Natural Language Processing per estrarre automaticamente date, luoghi e informazioni strutturate dal testo biografico.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('llm')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">LLM (GPT-4o mini)</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                Sfrutta l'intelligenza artificiale avanzata di GPT-4o mini per un'analisi contestuale profonda e la generazione di titoli creativi e accattivanti.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('hybrid')}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <GitMerge className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">Ibrido</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                Combina la precisione del NLP con la creatività dell'AI per ottenere risultati ottimali: estrazione accurata e comprensione contestuale.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Animated Method Flow - Horizontal below cards */}
        {activeMethodFlow && (
          <div className="mb-16 animate-fade-in" key={animationKey}>
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Flusso di Elaborazione: {methodFlows[activeMethodFlow].title}</h3>
                  <button 
                    onClick={() => setActiveMethodFlow(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center justify-between overflow-x-auto">
                  {methodFlows[activeMethodFlow].steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div 
                        className="flex flex-col items-center min-w-0 flex-1 animate-fade-in"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                          {index + 1}
                        </div>
                        <p className="text-slate-700 text-center text-sm leading-relaxed px-2">{step}</p>
                      </div>
                      {index < methodFlows[activeMethodFlow].steps.length - 1 && (
                        <div className="flex-shrink-0 mx-4">
                          <ArrowRight className="w-8 h-8 text-treccani-teal animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-semibold">Timeline Generata!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section - Always visible */}
          <div className="space-y-8">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="w-6 h-6" />
                  Input Biografia
                </CardTitle>
                <CardDescription className="text-slate-100">
                  Inserisci il testo della biografia da analizzare
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {/* Sample Biographies */}
                <SampleBiographies onSelectBiography={setBiography} />
                
                <div className="space-y-3">
                  <Label htmlFor="biography" className="text-slate-700 font-semibold">Testo della Biografia</Label>
                  <Textarea
                    id="biography"
                    placeholder="Inserisci qui la biografia da analizzare..."
                    className="min-h-[200px] resize-none border-slate-200 focus:border-treccani-teal focus:ring-treccani-teal"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                  <p className="text-sm text-slate-500">
                    Caratteri: <span className="font-medium text-treccani-teal">{biography.length}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="method" className="text-slate-700 font-semibold">Metodo di Analisi</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {methods.map((methodOption) => (
                      <Button
                        key={methodOption.id}
                        onClick={() => setMethod(methodOption.id)}
                        variant={method === methodOption.id ? "default" : "outline"}
                        className={`flex flex-col items-center gap-2 p-4 h-auto ${
                          method === methodOption.id
                            ? "bg-gradient-to-r from-treccani-teal to-slate-700 text-white"
                            : `${methodOption.bgColor} ${methodOption.borderColor} ${methodOption.color} ${methodOption.hoverColor}`
                        }`}
                      >
                        {methodOption.icon}
                        <span className="text-sm font-medium text-center">{methodOption.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {(method === "llm" || method === "hybrid") && (
                  <div className="space-y-3 p-6 bg-gradient-to-r from-treccani-light to-treccani-dark rounded-lg border border-treccani-teal/30">
                    <Label htmlFor="apiKey" className="text-slate-700 font-semibold">API Key OpenAI</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="border-treccani-teal/30 focus:border-treccani-teal focus:ring-treccani-teal"
                    />
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="text-treccani-teal">⚠️</span>
                      La tua API key verrà utilizzata solo per questa sessione e non verrà salvata
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-6">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-treccani-teal to-slate-700 hover:from-treccani-teal/90 hover:to-slate-800 text-white font-semibold py-3 shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analizzando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Analizza Biografia
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-16 text-center">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-treccani-teal/20 to-slate-200/20 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-treccani-light to-treccani-dark rounded-full flex items-center justify-center border border-treccani-teal/20">
                        <FileText className="w-10 h-10 text-treccani-teal" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700">
                      Risultati dell'Analisi
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      I risultati dell'analisi appariranno qui dopo aver processato la biografia. 
                      Vedrai timeline, informazioni chiave e titoli generati automaticamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="w-full px-6">
          <div className="text-center space-y-4">
            <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                © 2024 TimelineAI. Tutti i diritti riservati.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
