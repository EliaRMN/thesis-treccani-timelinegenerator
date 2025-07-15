
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Brain } from 'lucide-react';

const AdvancedMetricsHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <BarChart3 className="w-10 h-10 text-emerald-600" />
            Metriche Avanzate di Confronto
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            Analisi comparativa automatica tra diversi metodi di estrazione di timeline biografiche utilizzando metriche BLEU e ROUGE per valutare l'accuratezza rispetto al gold standard
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Metodo SpaCy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-600">
                Estrazione automatica con tecniche di Natural Language Processing
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Metodo LLM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600">
                Analisi contestuale con intelligenza artificiale generativa
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Metodo Ibrido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-600">
                Combinazione ottimale di NLP e AI generativa
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetricsHeader;
