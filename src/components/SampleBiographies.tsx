
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock, User, FileText } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

interface SampleBiographiesProps {
  onSelectBiography: (biography: string) => void;
}

export const SampleBiographies: React.FC<SampleBiographiesProps> = ({ onSelectBiography }) => {
  const { t } = useLanguage();
  
  const sampleBiographies = [
    {
      id: "short",
      title: t('leonardo.da.vinci'),
      length: t('short'),
      icon: <Clock className="w-3 h-3" />,
      content: t('leonardo.bio')
    },
    {
      id: "medium",
      title: t('marie.curie'),
      length: t('medium'),
      icon: <User className="w-3 h-3" />,
      content: t('marie.curie.bio')
    },
    {
      id: "long",
      title: t('giuseppe.garibaldi'),
      length: t('long'),
      icon: <FileText className="w-3 h-3" />,
      content: t('garibaldi.bio')
    }
  ];

  return (
    <div className="space-y-3">
      <Label htmlFor="biography-samples" className="text-slate-700 font-semibold">
        {t('biography.samples')}
      </Label>
      <div className="flex flex-wrap gap-2">
        {sampleBiographies.map((bio) => (
          <Button
            key={bio.id}
            onClick={() => onSelectBiography(bio.content)}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs border-slate-300 hover:border-treccani-teal hover:text-treccani-teal"
          >
            {bio.icon}
            {bio.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
