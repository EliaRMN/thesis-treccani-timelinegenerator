
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen } from 'lucide-react';

interface BiographyOption {
  key: string;
  name: string;
  period: string;
  field: string;
  textLength: number;
  eventsCount: number;
}

interface BiographyLabelSelectorProps {
  selectedBiography: string;
  onSelectBiography: (key: string, biographyText: string) => void;
  availableBiographies: string[];
}

const BiographyLabelSelector: React.FC<BiographyLabelSelectorProps> = ({
  selectedBiography,
  onSelectBiography,
  availableBiographies
}) => {
  const biographyOptions: Record<string, BiographyOption & { biographyText: string }> = {
    'marie-curie': {
      key: 'marie-curie',
      name: 'Marie Curie',
      period: '1867-1934',
      field: 'Fisica e Chimica',
      textLength: 1250,
      eventsCount: 7,
      biographyText: `Maria Salomea Skłodowska, nota come Marie Curie, nasce a Varsavia nel 1867 in una famiglia di intellettuali polacchi. Nel 1891 si trasferisce a Parigi per studiare fisica e matematica alla Sorbona, dove vive in condizioni molto modeste. Nel 1895 sposa Pierre Curie, fisico francese, dopo averlo conosciuto attraverso un collega polacco. Nel 1898, insieme al marito Pierre, scopre due nuovi elementi chimici: il polonio, chiamato così in onore della Polonia, e il radio. Nel 1903 riceve il Premio Nobel per la Fisica insieme a Pierre Curie e Henri Becquerel per le ricerche sulla radioattività. Nel 1906 Pierre Curie muore tragicamente in un incidente stradale e Marie eredita la sua cattedra alla Sorbona, diventando la prima donna professore dell'università. Nel 1911 riceve il Premio Nobel per la Chimica per l'isolamento del radio puro, diventando la prima persona a vincere due Premi Nobel in discipline scientifiche diverse.`
    },
    'einstein': {
      key: 'einstein',
      name: 'Albert Einstein',
      period: '1879-1955',
      field: 'Fisica Teorica',
      textLength: 980,
      eventsCount: 5,
      biographyText: `Albert Einstein nasce a Ulm nel 1879, nel Regno di Württemberg dell'Impero tedesco, da una famiglia ebraica di classe media. Nel 1905 pubblica cinque articoli rivoluzionari che cambiano la fisica moderna, inclusa la teoria della relatività speciale e l'equazione E=mc². Nel 1915 completa la teoria della relatività generale, una nuova teoria della gravitazione che rivoluziona la comprensione dello spazio e del tempo. Nel 1921 riceve il Premio Nobel per la Fisica per la spiegazione dell'effetto fotoeletrico, contributo fondamentale alla meccanica quantistica. Nel 1933 fugge dalla Germania nazista e si stabilisce negli Stati Uniti, accettando una posizione all'Institute for Advanced Study di Princeton.`
    },
    'leonardo': {
      key: 'leonardo',
      name: 'Leonardo da Vinci',
      period: '1452-1519',
      field: 'Arte e Scienza',
      textLength: 1120,
      eventsCount: 6,
      biographyText: `Leonardo da Vinci nasce a Vinci nel 1452, piccolo borgo toscano, figlio illegittimo del notaio Ser Piero da Vinci. Nel 1466 entra come apprendista nella bottega di Andrea del Verrocchio a Firenze, dove perfeziona le sue tecniche pittoriche. Nel 1482 si trasferisce a Milano alla corte di Ludovico Sforza, dove si dedica all'arte, ingegneria e studi anatomici. Nel 1495 realizza l'Ultima Cena nel convento di Santa Maria delle Grazie, uno dei suoi capolavori più famosi. Nel 1503 inizia a dipingere la Gioconda, il ritratto più famoso della storia dell'arte. Nel 1519 muore nel castello di Amboise in Francia, ospite del re Francesco I.`
    },
    'galileo': {
      key: 'galileo',
      name: 'Galileo Galilei',
      period: '1564-1642',
      field: 'Astronomia e Fisica',
      textLength: 850,
      eventsCount: 5,
      biographyText: `Galileo Galilei nasce a Pisa nel 1564 da una famiglia di musicisti e matematici. Nel 1609 perfeziona il telescopio e inizia le prime osservazioni astronomiche sistematiche. Nel 1610 scopre i satelliti di Giove e le fasi di Venere, confermando il sistema copernicano. Nel 1633 viene processato dall'Inquisizione per le sue teorie eliocentriche e costretto all'abiura. Nel 1642 muore nella sua villa di Arcetri, dove aveva trascorso gli ultimi anni agli arresti domiciliari.`
    },
    'darwin': {
      key: 'darwin',
      name: 'Charles Darwin',
      period: '1809-1882',
      field: 'Biologia',
      textLength: 920,
      eventsCount: 6,
      biographyText: `Charles Robert Darwin nasce a Shrewsbury nel 1809, in Inghilterra, in una famiglia benestante. Nel 1831 inizia il famoso viaggio di cinque anni a bordo del HMS Beagle come naturalista. Nel 1838 elabora la teoria della selezione naturale dopo aver letto Malthus. Nel 1859 pubblica 'L'origine delle specie', rivoluzionando la biologia e la comprensione della vita. Nel 1871 pubblica 'L'origine dell'uomo' estendendo la teoria evolutiva alla specie umana. Nel 1882 muore nella sua casa di Down, nel Kent, riconosciuto come uno dei più grandi scienziati della storia.`
    }
  };

  const availableOptions = availableBiographies
    .map(key => biographyOptions[key])
    .filter(Boolean);

  return (
    <Card className="shadow-lg mb-8">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Users className="w-6 h-6" />
          Seleziona Biografia per l'Analisi
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-slate-600 mb-6">
            Seleziona una delle biografie di esempio per l'analisi comparativa con tutti e tre i metodi:
          </p>
          
          <div className="flex flex-wrap gap-3">
            {availableOptions.map((option) => (
              <Button
                key={option.key}
                variant={selectedBiography === option.key ? "default" : "outline"}
                onClick={() => onSelectBiography(option.key, option.biographyText)}
                className={`h-auto p-4 flex-col items-start space-y-2 ${
                  selectedBiography === option.key 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                <div className="font-semibold text-left">{option.name}</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {option.period}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {option.field}
                  </Badge>
                </div>
                <div className="flex gap-2 text-xs">
                  <span>{option.textLength} caratteri</span>
                  <span>•</span>
                  <span>{option.eventsCount} eventi</span>
                </div>
              </Button>
            ))}
          </div>
          
          {availableOptions.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
              <p>Nessuna biografia disponibile al momento.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiographyLabelSelector;
