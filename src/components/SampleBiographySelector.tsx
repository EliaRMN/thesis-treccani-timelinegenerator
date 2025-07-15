
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Star, Crown, Lightbulb } from 'lucide-react';

interface SampleBiographyData {
  key: string;
  name: string;
  period: string;
  field: string;
  icon: React.ReactNode;
  description: string;
  eventsCount: number;
  textLength: number;
  biographyText: string;
}

interface SampleBiographySelectorProps {
  selectedBiography: string;
  onSelectBiography: (key: string, biographyText: string) => void;
  availableBiographies: string[];
}

const SampleBiographySelector: React.FC<SampleBiographySelectorProps> = ({
  selectedBiography,
  onSelectBiography,
  availableBiographies
}) => {
  const sampleBiographies: SampleBiographyData[] = [
    {
      key: 'marie-curie',
      name: 'Marie Curie',
      period: '1867-1934',
      field: 'Fisica e Chimica',
      icon: <Star className="w-5 h-5" />,
      description: 'Prima donna a vincere un Premio Nobel e unica persona a vincere Nobel in due discipline scientifiche diverse.',
      eventsCount: 7,
      textLength: 1250,
      biographyText: `Maria Salomea Skłodowska, nota come Marie Curie, nasce a Varsavia nel 1867 in una famiglia di intellettuali polacchi. Nel 1891 si trasferisce a Parigi per studiare fisica e matematica alla Sorbona, dove vive in condizioni molto modeste. Nel 1895 sposa Pierre Curie, fisico francese, dopo averlo conosciuto attraverso un collega polacco. Nel 1898, insieme al marito Pierre, scopre due nuovi elementi chimici: il polonio, chiamato così in onore della Polonia, e il radio. Nel 1903 riceve il Premio Nobel per la Fisica insieme a Pierre Curie e Henri Becquerel per le ricerche sulla radioattività. Nel 1906 Pierre Curie muore tragicamente in un incidente stradale e Marie eredita la sua cattedra alla Sorbona, diventando la prima donna professore dell'università. Nel 1911 riceve il Premio Nobel per la Chimica per l'isolamento del radio puro, diventando la prima persona a vincere due Premi Nobel in discipline scientifiche diverse.`
    },
    {
      key: 'einstein',
      name: 'Albert Einstein',
      period: '1879-1955',
      field: 'Fisica Teorica',
      icon: <Lightbulb className="w-5 h-5" />,
      description: 'Sviluppatore della teoria della relatività, una delle menti più brillanti della storia della scienza.',
      eventsCount: 5,
      textLength: 980,
      biographyText: `Albert Einstein nasce a Ulm nel 1879, nel Regno di Württemberg dell'Impero tedesco, da una famiglia ebraica di classe media. Nel 1905 pubblica cinque articoli rivoluzionari che cambiano la fisica moderna, inclusa la teoria della relatività speciale e l'equazione E=mc². Nel 1915 completa la teoria della relatività generale, una nuova teoria della gravitazione che rivoluziona la comprensione dello spazio e del tempo. Nel 1921 riceve il Premio Nobel per la Fisica per la spiegazione dell'effetto fotoeletrico, contributo fondamentale alla meccanica quantistica. Nel 1933 fugge dalla Germania nazista e si stabilisce negli Stati Uniti, accettando una posizione all'Institute for Advanced Study di Princeton.`
    },
    {
      key: 'leonardo',
      name: 'Leonardo da Vinci',
      period: '1452-1519',
      field: 'Arte e Scienza',
      icon: <Crown className="w-5 h-5" />,
      description: 'Genio rinascimentale, artista, inventore e scienziato, simbolo del Rinascimento italiano.',
      eventsCount: 6,
      textLength: 1120,
      biographyText: `Leonardo da Vinci nasce a Vinci nel 1452, piccolo borgo toscano, figlio illegittimo del notaio Ser Piero da Vinci. Nel 1466 entra come apprendista nella bottega di Andrea del Verrocchio a Firenze, dove perfeziona le sue tecniche pittoriche. Nel 1482 si trasferisce a Milano alla corte di Ludovico Sforza, dove si dedica all'arte, ingegneria e studi anatomici. Nel 1495 realizza l'Ultima Cena nel convento di Santa Maria delle Grazie, uno dei suoi capolavori più famosi. Nel 1503 inizia a dipingere la Gioconda, il ritratto più famoso della storia dell'arte. Nel 1519 muore nel castello di Amboise in Francia, ospite del re Francesco I.`
    },
    {
      key: 'galileo',
      name: 'Galileo Galilei',
      period: '1564-1642',
      field: 'Astronomia e Fisica',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Padre della scienza moderna, rivoluzionò l\'astronomia con le sue osservazioni telescopiche.',
      eventsCount: 5,
      textLength: 850,
      biographyText: `Galileo Galilei nasce a Pisa nel 1564 da una famiglia di musicisti e matematici. Nel 1609 perfeziona il telescopio e inizia le prime osservazioni astronomiche sistematiche. Nel 1610 scopre i satelliti di Giove e le fasi di Venere, confermando il sistema copernicano. Nel 1633 viene processato dall'Inquisizione per le sue teorie eliocentriche e costretto all'abiura. Nel 1642 muore nella sua villa di Arcetri, dove aveva trascorso gli ultimi anni agli arresti domiciliari.`
    },
    {
      key: 'darwin',
      name: 'Charles Darwin',
      period: '1809-1882',
      field: 'Biologia',
      icon: <Users className="w-5 h-5" />,
      description: 'Naturalista che formulò la teoria dell\'evoluzione per selezione naturale.',
      eventsCount: 6,
      textLength: 920,
      biographyText: `Charles Robert Darwin nasce a Shrewsbury nel 1809, in Inghilterra, in una famiglia benestante. Nel 1831 inizia il famoso viaggio di cinque anni a bordo del HMS Beagle come naturalista. Nel 1838 elabora la teoria della selezione naturale dopo aver letto Malthus. Nel 1859 pubblica 'L'origine delle specie', rivoluzionando la biologia e la comprensione della vita. Nel 1871 pubblica 'L'origine dell'uomo' estendendo la teoria evolutiva alla specie umana. Nel 1882 muore nella sua casa di Down, nel Kent, riconosciuto come uno dei più grandi scienziati della storia.`
    }
  ];

  const availableSamples = sampleBiographies.filter(bio => 
    availableBiographies.includes(bio.key)
  );

  return (
    <Card className="shadow-lg mb-8">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Users className="w-6 h-6" />
          Biografie di Esempio Disponibili
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-slate-600 mb-6">
            Seleziona una delle biografie di esempio per analizzarla con i tre metodi e confrontare i risultati con il gold standard:
          </p>
          
          <div className="grid gap-4">
            {availableSamples.map((bio) => (
              <div
                key={bio.key}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedBiography === bio.key
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
                onClick={() => onSelectBiography(bio.key, bio.biographyText)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedBiography === bio.key ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {bio.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{bio.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {bio.period}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bio.field}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ~{bio.textLength} caratteri
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bio.eventsCount} eventi gold
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {selectedBiography === bio.key && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Selezionata
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 mt-3 ml-14">
                  {bio.description}
                </p>
              </div>
            ))}
          </div>
          
          {availableSamples.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
              <p>Nessuna biografia di esempio disponibile al momento.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleBiographySelector;
