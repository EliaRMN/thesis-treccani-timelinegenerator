
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, Clock, Home, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface SharedHeaderProps {
  currentPage: 'timeline' | 'analysis' | 'advanced-metrics';
}

const SharedHeader = ({ currentPage }: SharedHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'timeline':
        return 'Timeline';
      case 'analysis':
        return t('ai.analysis');
      case 'advanced-metrics':
        return 'BLEU & ROUGE';
      default:
        return 'Biography Reader';
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigationItems = [
    {
      id: 'timeline',
      label: 'Timeline',
      icon: <Clock className="w-4 h-4" />,
      path: '/timeline',
      color: 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
    },
    {
      id: 'analysis',
      label: t('analysis'),
      icon: <BarChart3 className="w-4 h-4" />,
      path: '/analysis',
      color: 'text-purple-600 border-purple-200 hover:bg-purple-50'
    },
    {
      id: 'advanced-metrics',
      label: t('advanced.metrics'),
      icon: <LineChart className="w-4 h-4" />,
      path: '/advanced-metrics',
      color: 'text-blue-600 border-blue-200 hover:bg-blue-50'
    }
  ];

  // Hide language toggle on analysis and advanced-metrics pages
  const showLanguageToggle = currentPage !== 'analysis' && currentPage !== 'advanced-metrics';

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-treccani-teal/20 sticky top-0 z-50">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/d9c6539b-6907-47a4-acd4-37b936bec2cb.png" 
              alt="Treccani" 
              className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigation('/')}
            />
            <div className="h-8 w-px bg-treccani-teal/30"></div>
            <h1 className="text-2xl font-bold text-treccani-teal">
              {currentPage === 'timeline' ? (
                <>
                  T <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">A.I.</span> MELINE
                </>
              ) : currentPage === 'analysis' ? (
                <>
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">AI</span> NALYSIS
                </>
              ) : currentPage === 'advanced-metrics' ? (
                <>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">BLEU</span>
                  <span className="text-treccani-teal"> & </span>
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">ROUGE</span>
                </>
              ) : (
                getPageTitle()
              )}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {navigationItems
              .filter(item => item.id !== currentPage)
              .map((item) => (
                <Button 
                  key={item.id}
                  variant="outline" 
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 ${item.color}`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            
            {/* Language Toggle - Hidden on analysis and advanced-metrics pages */}
            {showLanguageToggle && (
              <Button
                variant="outline"
                onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
                className="flex items-center gap-2 border-treccani-teal/30 text-treccani-teal hover:bg-treccani-teal/10"
              >
                <Globe className="w-4 h-4" />
                {language === 'it' ? 'EN' : 'IT'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SharedHeader;
