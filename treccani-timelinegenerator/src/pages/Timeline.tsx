import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, FileText, Clock, User, MapPin, Briefcase, Calendar, Sparkles, Zap, Target, BookOpen, Brain, Database, GitMerge, ArrowRight, Info, X, Plus, RotateCcw, Upload, Home, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BiographyAnalyzer } from "@/components/BiographyAnalyzer";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SampleBiographies } from "@/components/SampleBiographies";
import { useNavigate } from "react-router-dom";
import SharedHeader from "@/components/SharedHeader";
import { useLanguage } from '@/context/LanguageContext';

const Timeline = () => {
  const [biography, setBiography] = useState("");
  const [method, setMethod] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeMethodFlow, setActiveMethodFlow] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [analysisCache, setAnalysisCache] = useState(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const generateCacheKey = (biographyText: string, analysisMethod: string) => {
    // Create a simple hash of the biography + method for caching
    return `${analysisMethod}_${biographyText.slice(0, 100).replace(/\s+/g, '_')}`;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setBiography(content);
        toast({
          title: t('file.uploaded'),
          description: `${t('file.uploaded')} "${file.name}" ${t('file.uploaded.success')}`,
          className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: t('error'),
        description: t('select.txt.file'),
        variant: "destructive",
      });
    }
  };

  const handleAnalyze = async () => {
    if (!biography.trim()) {
      toast({
        title: t('error'),
        description: t('insert.biography'),
        variant: "destructive",
      });
      return;
    }

    if (!method) {
      toast({
        title: t('error'),
        description: t('select.analysis.method'),
        variant: "destructive",
      });
      return;
    }

    if ((method === "llm" || method === "hybrid") && !apiKey.trim()) {
      toast({
        title: t('error'),
        description: t('insert.api.key'),
        variant: "destructive",
      });
      return;
    }

    // Check cache first - include language in cache key
    const cacheKey = `${language}_${generateCacheKey(biography, method)}`;
    if (analysisCache.has(cacheKey)) {
      const cachedResults = analysisCache.get(cacheKey);
      setResults(cachedResults);
      toast({
        title: t('results.from.cache'),
        description: t('previous.analysis'),
        className: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);
    const analyzer = new BiographyAnalyzer();
    try {
      const analysisResults = await analyzer.analyze(biography, method, (method === "llm" || method === "hybrid") ? apiKey : undefined, language);
      
      // Cache the results with language-specific key
      setAnalysisCache(prev => new Map(prev.set(cacheKey, analysisResults)));
      
      setResults(analysisResults);
      
      toast({
        title: t('analysis.completed'),
        description: `${t('analysis.success')} ${analysisResults.method || method}.`,
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400",
      });
    } catch (error) {
      console.error("Errore durante l'analisi:", error);
      toast({
        title: t('analysis.error'),
        // @ts-ignore
        description: error.message || t('analysis.error.message'),
        variant: "destructive",
      });
      setResults({
        // @ts-ignore
        error: error.message || "Errore sconosciuto",
        method: method,
        timeline: [],
        summary: {},
        title: "Analisi Fallita",
        logs: analyzer.getLogs()
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setBiography("");
    setMethod("");
    setResults(null);
    setActiveMethodFlow(null);
    setAnalysisCache(new Map()); // Clear cache on reset
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleMethodClick = (methodId) => {
    if (activeMethodFlow === methodId) {
      setActiveMethodFlow(null);
    } else {
      setActiveMethodFlow(methodId);
      setAnimationKey(prev => prev + 1);
    }
  };

  const methodFlows = {
    spacy: {
      title: t('spacy.nlp'),
      steps: [
        t('spacy.flow.1'),
        t('spacy.flow.2'),
        t('spacy.flow.3'),
        t('spacy.flow.4'),
        t('spacy.flow.5')
      ]
    },
    llm: {
      title: t('llm.gpt'),
      steps: [
        t('llm.flow.1'),
        t('llm.flow.2'),
        t('llm.flow.3'),
        t('llm.flow.4'),
        t('llm.flow.5')
      ]
    },
    hybrid: {
      title: t('hybrid'),
      steps: [
        t('hybrid.flow.1'),
        t('hybrid.flow.2'),
        t('hybrid.flow.3'),
        t('hybrid.flow.4'),
        t('hybrid.flow.5')
      ]
    }
  };

  const methods = [
    {
      id: "spacy",
      name: t('spacy.nlp'),
      icon: <Database className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100"
    },
    {
      id: "llm",
      name: t('llm.gpt'),
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-100"
    },
    {
      id: "hybrid",
      name: t('hybrid'),
      icon: <GitMerge className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:bg-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-treccani-cream via-treccani-light to-treccani-dark">
      {/* Updated Header */}
      <SharedHeader currentPage="timeline" />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-treccani-teal to-slate-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-white animate-fade-in">
              <span className="bg-gradient-to-r from-treccani-cream to-treccani-light bg-clip-text text-transparent">
                T <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">A.I.</span> MELINE
              </span>
            </h2>
            <p className="text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              {t('timeline.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            {t('how.it.works')}
          </h3>
          <p className="text-lg text-slate-600">{t('choose.method')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Method Cards */}
          <Card 
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('spacy')}
          >
            <CardContent className="p-8 text-center flex flex-col h-full">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{t('spacy.nlp')}</h4>
              <p className="text-slate-600 leading-relaxed mb-4 flex-grow">
                {t('spacy.description')}
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('llm')}
          >
            <CardContent className="p-8 text-center flex flex-col h-full">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{t('llm.gpt')}</h4>
              <p className="text-slate-600 leading-relaxed mb-4 flex-grow">
                {t('llm.description')}
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMethodClick('hybrid')}
          >
            <CardContent className="p-8 text-center flex flex-col h-full">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <GitMerge className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{t('hybrid')}</h4>
              <p className="text-slate-600 leading-relaxed mb-4 flex-grow">
                {t('hybrid.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Animated Method Flow */}
        {activeMethodFlow && (
          <div className="mb-16 animate-fade-in" key={animationKey}>
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{t('processing.flow')}: {methodFlows[activeMethodFlow].title}</h3>
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
                    <span className="text-green-800 font-semibold">{t('timeline.generated')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="w-6 h-6" />
                  {t('input.biography')}
                </CardTitle>
                <CardDescription className="text-slate-100">
                  {t('input.biography.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {/* File Upload */}
                <div className="space-y-3">
                  <Label htmlFor="file-upload" className="text-slate-700 font-semibold">{t('upload.file')}</Label>
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="flex items-center gap-2 border-treccani-teal/30 text-treccani-teal hover:bg-treccani-teal/10"
                    >
                      <Upload className="w-4 h-4" />
                      {t('select.file')}
                    </Button>
                    <span className="text-sm text-slate-500">{t('or.manual')}</span>
                  </div>
                </div>

                {/* Sample Biographies */}
                <SampleBiographies onSelectBiography={setBiography} />
                
                <div className="space-y-3">
                  <Label htmlFor="biography" className="text-slate-700 font-semibold">{t('biography.text')}</Label>
                  <Textarea
                    id="biography"
                    placeholder={t('biography.placeholder')}
                    className="min-h-[200px] resize-none border-slate-200 focus:border-treccani-teal focus:ring-treccani-teal"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                  <p className="text-sm text-slate-500">
                    {t('characters')}: <span className="font-medium text-treccani-teal">{biography.length}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="method" className="text-slate-700 font-semibold">{t('analysis.method')}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {methods.map((methodOption) => (
                      <Button
                        key={methodOption.id}
                        onClick={() => setMethod(methodOption.id)}
                        variant={method === methodOption.id ? "default" : "outline"}
                        className={`flex flex-col items-center justify-center text-center gap-2 p-3 h-auto text-xs sm:text-sm ${
                          method === methodOption.id
                            ? "bg-gradient-to-r from-treccani-teal to-slate-700 text-white"
                            : `${methodOption.bgColor} ${methodOption.borderColor} ${methodOption.color} ${methodOption.hoverColor}`
                        }`}
                      >
                        {React.cloneElement(methodOption.icon, { className: "w-4 h-4 sm:w-5 sm:h-5"})}
                        <span className="font-medium">{methodOption.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {(method === "llm" || method === "hybrid") && (
                  <div className="space-y-3 p-6 bg-gradient-to-r from-treccani-light to-treccani-dark rounded-lg border border-treccani-teal/30 animate-fade-in">
                    <Label htmlFor="apiKey" className="text-slate-700 font-semibold">{t('api.key.openai')}</Label>
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
                      {t('api.key.warning')}
                    </p>
                  </div>
                )}

                {/* Cache indicator */}
                {analysisCache.size > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{t('cache.analysis')}</h4>
                        <p className="text-sm">
                          {analysisCache.size} {t('cache.description')}
                        </p>
                      </div>
                    </div>
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
                        {t('analyzing')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t('analyze.biography')}
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    {t('reset')}
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
                      {t('results.analysis')}
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      {t('results.description')}
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4">
            <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
              {t('footer.timeline.description')}
            </p>
            <div className="pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                {t('footer.copyright')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Timeline;
