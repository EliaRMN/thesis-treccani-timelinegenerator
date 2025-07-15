
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calendar } from 'lucide-react';

interface CustomTimelineEvent {
  date: string;
  year: number;
  title: string;
  description: string;
}

interface CustomTimelineInputProps {
  onTimelineChange: (events: CustomTimelineEvent[]) => void;
  initialTimeline?: CustomTimelineEvent[];
}

const CustomTimelineInput: React.FC<CustomTimelineInputProps> = ({ onTimelineChange, initialTimeline = [] }) => {
  const [events, setEvents] = useState<CustomTimelineEvent[]>([
    { date: '', year: 0, title: '', description: '' }
  ]);

  // Initialize with provided timeline or default empty event
  useEffect(() => {
    if (initialTimeline && initialTimeline.length > 0) {
      setEvents(initialTimeline);
    } else {
      setEvents([{ date: '', year: 0, title: '', description: '' }]);
    }
  }, [initialTimeline]);

  const addEvent = () => {
    const newEvents = [...events, { date: '', year: 0, title: '', description: '' }];
    setEvents(newEvents);
    onTimelineChange(newEvents);
  };

  const removeEvent = (index: number) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    onTimelineChange(newEvents);
  };

  const updateEvent = (index: number, field: keyof CustomTimelineEvent, value: string | number) => {
    const updatedEvents = events.map((event, i) => 
      i === index ? { ...event, [field]: value, year: field === 'date' ? parseInt(value as string) || 0 : event.year } : event
    );
    setEvents(updatedEvents);
    onTimelineChange(updatedEvents);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline Gold Standard Personalizzata (Opzionale)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 bg-slate-50">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">Evento {index + 1}</h4>
              {events.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEvent(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Data/Anno</Label>
                <Input
                  value={event.date}
                  onChange={(e) => updateEvent(index, 'date', e.target.value)}
                  placeholder="es. 1867"
                  className="h-8"
                />
              </div>
              <div>
                <Label className="text-xs">Titolo</Label>
                <Input
                  value={event.title}
                  onChange={(e) => updateEvent(index, 'title', e.target.value)}
                  placeholder="es. Nascita"
                  className="h-8"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Descrizione</Label>
              <Textarea
                value={event.description}
                onChange={(e) => updateEvent(index, 'description', e.target.value)}
                placeholder="Descrizione dettagliata dell'evento..."
                rows={2}
                className="text-sm"
              />
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={addEvent} 
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi Evento alla Timeline
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomTimelineInput;
