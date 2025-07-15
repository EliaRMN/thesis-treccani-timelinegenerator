import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { FileText, Sparkles, Brain, Database, GitMerge, ArrowRight, BookOpen, Clock, Zap, BarChart3, LineChart, TrendingUp, Play, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Function to render styled titles
  const renderStyledTitle = (title: string) => {
    if (title === 'T A.I. MELINE') {
      return (
        <>
          T <span className="text-green-500">A.I.</span> MELINE
        </>
      );
    }
    if (title === 'A.I. NALYSIS') {
      return (
        <>
          <span className="text-yellow-500">A.I.</span> NALYSIS
        </>
      );
    }
    return title;
  };

  const mainFeatures = [
    {
      id: 'timeline',
      icon: <Clock className="w-16 h-16" />,
      title: t('timeline.generation'),
      description: t('timeline.description'),
      features: [
        t('timeline.feature1'),
        t('timeline.feature2'),
        t('timeline.feature3'),
        t('timeline.feature4')
      ],
      buttonText: t('create.timeline'),
      route: "/timeline",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:bg-emerald-50"
    },
    {
      id: 'analysis',
      icon: <BarChart3 className="w-16 h-16" />,
      title: t('comparative.analysis'),
      description: t('analysis.description'),
      features: [
        t('analysis.feature1'),
        t('analysis.feature2'),
        t('analysis.feature3'),
        t('analysis.feature4')
      ],
      buttonText: t('start.analysis'),
      route: "/analysis", 
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
      hoverColor: "hover:bg-yellow-50"
    },
    {
      id: 'advanced',
      icon: <LineChart className="w-16 h-16" />,
      title: t('advanced.metrics'),
      description: t('advanced.description'),
      features: [
        t('advanced.feature1'),
        t('advanced.feature2'),
        t('advanced.feature3'),
        t('advanced.feature4')
      ],
      buttonText: t('advanced.metrics.button'),
      route: "/advanced-metrics",
      color: "from-blue-500 to-red-600", 
      bgColor: "from-blue-50 to-red-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-50"
    }
  ];

  const technicalApproaches = [
    {
      icon: <Database className="w-8 h-8" />,
      title: t('advanced.nlp'),
      description: t('nlp.description'),
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: t('artificial.intelligence'),
      description: t('ai.description'),
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <GitMerge className="w-8 h-8" />,
      title: t('hybrid.approach'),
      description: t('hybrid.description'),
      color: "from-emerald-500 to-teal-600"
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
              <h1 className="text-2xl font-bold text-treccani-teal">{t('text.to.timeline')}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-treccani-teal" />
                <Toggle
                  pressed={language === 'en'}
                  onPressedChange={(pressed) => setLanguage(pressed ? 'en' : 'it')}
                  className="data-[state=on]:bg-treccani-teal data-[state=on]:text-white"
                >
                  {language === 'it' ? 'EN' : 'IT'}
                </Toggle>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/about')}
                className="flex items-center gap-2 text-treccani-teal border-treccani-teal hover:bg-treccani-teal hover:text-white"
              >
                <BookOpen className="w-4 h-4" />
                {t('about')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-treccani-teal to-slate-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl font-bold text-white">
                <span className="bg-gradient-to-r from-treccani-cream to-treccani-light bg-clip-text text-transparent">
                  {t('text.to.timeline')}
                </span>
              </h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed">
                {t('platform.advanced')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/timeline')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-2" />
                {t('start.now')}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="w-full px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-6">
              {t('choose.tool')} <span className="bg-gradient-to-r from-treccani-teal to-slate-700 bg-clip-text text-transparent">{t('tool')}</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('three.powerful.tools')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {mainFeatures.map((feature, index) => (
              <Card 
                key={feature.id}
                className={`bg-white/95 backdrop-blur-sm border-2 ${feature.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="mb-6">
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 mb-3">
                    {renderStyledTitle(feature.title)}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => navigate(feature.route)}
                    className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    {feature.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Approaches Section */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-6">
              {t('technologies')} <span className="bg-gradient-to-r from-treccani-teal to-slate-700 bg-clip-text text-transparent">{t('used')}</span>
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('technologies.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {technicalApproaches.map((approach, index) => (
              <Card 
                key={index}
                className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${approach.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {approach.icon}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-4">{approach.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-treccani-light to-treccani-dark border-treccani-teal/30 shadow-2xl">
              <CardContent className="p-12">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-treccani-teal to-slate-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800">
                    {t('start.analysis.cta')}
                  </h3>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    {t('cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/timeline')}
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-10 py-4 text-lg shadow-xl"
                    >
                      <Clock className="w-6 h-6 mr-2" />
                      {t('generate.timeline')}
                    </Button>
                    <Button 
                      onClick={() => navigate('/analysis')}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-10 py-4 text-lg shadow-xl"
                    >
                      <BarChart3 className="w-6 h-6 mr-2" />
                      {t('comparative.analysis.button')}
                    </Button>
                    <Button 
                      onClick={() => navigate('/advanced-metrics')}
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-10 py-4 text-lg shadow-xl"
                    >
                      <LineChart className="w-6 h-6 mr-2" />
                      {t('advanced.metrics.button')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="w-full px-6">
          <div className="text-center space-y-4">
            <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
              {t('footer.description')}
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

export default Home;
