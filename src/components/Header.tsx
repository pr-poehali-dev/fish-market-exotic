import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type HeaderProps = {
  activeSection: string;
  cartItemCount: number;
  onNavigate: (section: string) => void;
  onCartOpen: () => void;
};

export default function Header({ activeSection, cartItemCount, onNavigate, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Fish" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AquaWorld</h1>
          </div>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Главная
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('catalog')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Каталог
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('care')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'care' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Уход
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('delivery')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Доставка
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('contacts')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Контакты
              </button>
            </li>
          </ul>
          <Button 
            size="sm" 
            className="hidden md:flex items-center gap-2 relative"
            onClick={onCartOpen}
          >
            <Icon name="ShoppingCart" size={18} />
            Корзина
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
