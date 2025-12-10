import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type HeroSectionProps = {
  onNavigate: (section: string) => void;
};

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="py-20 px-4 animate-fade-in">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Мир экзотических рыб
        </h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          От обычных аквариумных до редких морских видов. Создайте свой подводный мир с AquaWorld
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => onNavigate('catalog')} className="gap-2">
            <Icon name="Search" size={20} />
            Смотреть каталог
          </Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate('care')} className="gap-2">
            <Icon name="BookOpen" size={20} />
            Узнать об уходе
          </Button>
        </div>
      </div>
    </section>
  );
}
