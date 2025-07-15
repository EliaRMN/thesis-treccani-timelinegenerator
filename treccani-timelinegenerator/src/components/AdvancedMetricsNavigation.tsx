
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvancedMetricsNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Homepage
          </Button>
          
          <div className="flex items-center gap-2 text-slate-600">
            <Home className="w-4 h-4" />
            <span className="text-sm">/ Metriche Avanzate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetricsNavigation;
