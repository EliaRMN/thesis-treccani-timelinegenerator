
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from 'lucide-react';

interface GoldStandardEvent {
  date: string;
  year: number;
  title: string;
  description: string;
}

interface GoldStandardFormProps {
  onAddBiography: (name: string, events: GoldStandardEvent[]) => void;
}

const GoldStandardForm: React.FC<GoldStandardFormProps> = ({ onAddBiography }) => {
  const [biographyName, setBiographyName] = useState('');
  const [events, setEvents] = useState<GoldStandardEvent[]>([
    { date: '', year: 0, title: '', description: '' }
  ]);

  const addEvent = () => {
    setEvents([...events, { date: '', year: 0, title: '', description: '' }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, field: keyof GoldStandardEvent, value: string | number) => {
    const updatedEvents = events.map((event, i) => 
      i === index ? { ...event, [field]: value } : event
    );
    setEvents(updatedEvents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (biographyName && events.some(event => event.title && event.date)) {
      const validEvents = events.filter(event => event.title && event.date).map(event => ({
        ...event,
        year: event.date ? parseInt(event.date) : event.year
      }));
      onAddBiography(biographyName, validEvents);
      setBiographyName('');
      setEvents([{ date: '', year: 0, title: '', description: '' }]);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardTitle>Aggiungi Nuovo Gold Standard</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="biography-name">Nome Biografia</Label>
            <Input
              id="biography-name"
              value={biographyName}
              onChange={(e) => setBiographyName(e.target.value)}
              placeholder="es. Leonardo da Vinci"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Eventi della Timeline</Label>
            {events.map((event, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Evento {index + 1}</h4>
                  {events.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEvent(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data</Label>
                    <Input
                      value={event.date}
                      onChange={(e) => updateEvent(index, 'date', e.target.value)}
                      placeholder="1452"
                    />
                  </div>
                  <div>
                    <Label>Titolo</Label>
                    <Input
                      value={event.title}
                      onChange={(e) => updateEvent(index, 'title', e.target.value)}
                      placeholder="Nascita"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Descrizione</Label>
                  <Textarea
                    value={event.description}
                    onChange={(e) => updateEvent(index, 'description', e.target.value)}
                    placeholder="Descrizione dettagliata dell'evento..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button type="button" variant="outline" onClick={addEvent} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi Evento
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Salva Gold Standard
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoldStandardForm;
