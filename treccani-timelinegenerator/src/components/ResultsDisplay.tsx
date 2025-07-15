import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, MapPin, Briefcase, Clock, FileText, Sparkles, Database, Brain, GitMerge, ChevronDown, ChevronUp, Terminal, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnalysisResults } from "./BiographyAnalyzer";
import { useLanguage } from '@/context/LanguageContext';

interface ResultsDisplayProps {
  results: AnalysisResults;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());
  const [isLogOpen, setIsLogOpen] = useState(false);
  const { t } = useLanguage();

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'spacy':
        return <Database className="w-4 h-4 text-blue-600" />;
      case 'llm':
        return <Brain className="w-4 h-4 text-purple-600" />;
      case 'hybrid':
        return <GitMerge className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-600" />;
    }
  };

  const formatDateToItalian = (dateStr: string): string => {
    // Se è già formattato bene, ritorna così com'è
    if (!/^\d{4}-\d{2}$|^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    const months = [
      'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'
    ];

    // Formato YYYY-MM
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [year, month] = dateStr.split('-');
      const monthIndex = parseInt(month) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[monthIndex]} ${year}`;
      }
    }

    // Formato YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split('-');
      const monthIndex = parseInt(month) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${parseInt(day)} ${months[monthIndex]} ${year}`;
      }
    }

    return dateStr;
  };

  const generateTitleFromContent = (eventText: string): string => {
    // Rimuove le date dal testo per focalizzarsi sul contenuto
    const cleanText = eventText.replace(/\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|nel \d{4}|nel \d{1,2}\/\d{4}/g, '').trim();
    
    // Cerca verbi e azioni principali
    const actionWords = ['nasce', 'muore', 'pubblica', 'scrive', 'diventa', 'inizia', 'conclude', 'sposa', 'si trasferisce', 'fonda', 'crea', 'sviluppa', 'ottiene', 'riceve', 'vince'];
    const foundAction = actionWords.find(action => cleanText.toLowerCase().includes(action));
    
    if (foundAction) {
      // Estrae la parte del testo che contiene l'azione
      const actionIndex = cleanText.toLowerCase().indexOf(foundAction);
      const actionContext = cleanText.substring(Math.max(0, actionIndex - 20), actionIndex + 50);
      const words = actionContext.split(/\s+/).filter(word => word.length > 2);
      return words.slice(0, 4).join(' ').replace(/[.,;:]$/, '');
    }
    
    // Fallback: prende le prime parole significative
    const words = cleanText.split(/\s+/).filter(word => 
      word.length > 2 && 
      !['che', 'del', 'della', 'nel', 'nella', 'con', 'per', 'una', 'uno', 'gli', 'le', 'di', 'da', 'in', 'su'].includes(word.toLowerCase())
    );
    
    const title = words.slice(0, 3).join(' ').replace(/[.,;:]$/, '');
    return title.length > 0 ? title : 'Evento importante';
  };

  const toggleEvent = (index: number) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Colori alternati per le sezioni testuali
  const getStepColors = (index: number) => {
    return index % 2 === 0 
      ? {
          bg: 'bg-slate-50/80',
          border: 'border-slate-200/80',
          hoverBg: 'hover:bg-slate-100/60',
          textBg: 'bg-white/90'
        }
      : {
          bg: 'bg-blue-50/50',
          border: 'border-blue-200/60',
          hoverBg: 'hover:bg-blue-100/40',
          textBg: 'bg-blue-50/20'
        };
  };

  return (
    <div className="w-full px-4 space-y-6">
      {/* Header con titolo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          {results.title}
        </h1>
        <div className="flex justify-center items-center gap-2">
          <Badge variant="secondary" className="bg-treccani-teal/10 text-treccani-teal border-treccani-teal/30">
            {getMethodIcon(results.method)}
            <span className="ml-1">{t('timeline.extracted.with')} {results.method}</span>
          </Badge>
        </div>
      </div>

      {/* Riepilogo Personaggio */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white">
          <CardTitle className="flex items-center gap-3">
            <User className="w-5 h-5" />
            {t('character.summary')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Layout verticale per le informazioni principali */}
          <div className="space-y-4">
            {results.summary.dataNascita && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-green-800 font-bold text-xl">{formatDateToItalian(results.summary.dataNascita)}</p>
                </div>
              </div>
            )}

            {results.summary.dataMorte && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-red-800 font-bold text-xl">{formatDateToItalian(results.summary.dataMorte)}</p>
                </div>
              </div>
            )}

            {results.summary.professione && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-treccani-light to-treccani-dark rounded-lg border border-treccani-teal/30">
                <div className="w-10 h-10 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 mb-1">{t('profession')}</p>
                  <p className="text-slate-700 font-medium">{results.summary.professione}</p>
                </div>
              </div>
            )}

            {results.summary.luoghiPrincipali && results.summary.luoghiPrincipali.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-treccani-light to-treccani-dark rounded-lg border border-treccani-teal/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">{t('main.places')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.summary.luoghiPrincipali.map((luogo, index) => (
                    <Badge key={index} variant="outline" className="bg-white text-treccani-teal border-treccani-teal font-medium">
                      {luogo}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {results.summary.personaggiPrincipali && results.summary.personaggiPrincipali.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">{t('main.characters')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.summary.personaggiPrincipali.map((personaggio, index) => (
                    <Badge key={index} variant="outline" className="bg-white text-purple-800 border-purple-300 font-medium">
                      {personaggio}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-treccani-teal to-slate-700 text-white">
          <CardTitle className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            {t('timeline')}
            <div className="flex items-center gap-2 ml-auto">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {results.timeline.length} {results.timeline.length === 1 ? 'tappa' : 'tappe'}
              </Badge>
              {getMethodIcon(results.method)}
              <span className="text-sm">Metodo: {results.method}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {results.timeline.length > 0 ? (
            <div className="relative">
              {/* Linea verticale della timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-treccani-teal to-slate-400"></div>
              
              <div className="space-y-8">
                {results.timeline.map((event, index) => {
                  const colors = getStepColors(index);
                  const isExpanded = expandedEvents.has(index);
                  return (
                    <div 
                      key={index} 
                      className="relative flex items-start animate-fade-in transition-all duration-300" 
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {/* Cerchietto sulla linea */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Contenuto dell'evento */}
                      <div className="flex-1 ml-8">
                        {/* Data sempre visibile */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                            {formatDateToItalian(event.date)}
                          </h3>
                        </div>
                        
                        <div className={`${colors.bg} rounded-xl border ${colors.border} shadow-sm ${colors.hoverBg} transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md`}>
                          <div 
                            className="p-6 cursor-pointer"
                            onClick={() => toggleEvent(index)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-800 text-xl mb-3 leading-tight">
                                  {event.title || generateTitleFromContent(event.event)}
                                </h4>
                                
                                {/* Anteprima del testo quando collassato */}
                                {!isExpanded && (
                                  <div className={`${colors.textBg} p-4 rounded-lg`}>
                                    <p className="text-slate-700 line-clamp-2 leading-relaxed">
                                      {event.event.length > 120 ? `${event.event.substring(0, 120)}...` : event.event}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {isExpanded ? 
                                  <ChevronUp className="w-6 h-6 text-slate-500" /> : 
                                  <ChevronDown className="w-6 h-6 text-slate-500" />
                                }
                              </div>
                            </div>
                          </div>
                          
                          {/* Testo completo quando espanso - aggiunto sotto senza modificare la posizione della data */}
                          {isExpanded && (
                            <div className="px-6 pb-6 animate-fade-in">
                              <div className={`${colors.textBg} p-4 rounded-lg`}>
                                <p className="text-slate-800 leading-relaxed text-base">
                                  {event.event}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-lg font-medium">{t('no.events.found')}</p>
              <p className="text-sm mt-2">Prova con una biografia più dettagliata</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log di elaborazione discreto */}
      {results.logs && results.logs.length > 0 && (
        <Collapsible open={isLogOpen} onOpenChange={setIsLogOpen}>
          <Card className="shadow-sm border border-slate-200/60 bg-white/90 backdrop-blur-sm">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 text-slate-600"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('processing.logs')}</span>
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600">
                    {results.logs.length} righe
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {isLogOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isLogOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t border-slate-200">
                <div className="bg-slate-900 text-white p-4 text-sm font-mono max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">
                    <code>
                      {results.logs.join('\n')}
                    </code>
                  </pre>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  );
};
