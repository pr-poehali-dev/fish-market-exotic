import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Product = {
  id: string;
  name: string;
  latinName?: string;
  price: number;
  category: 'fish' | 'aquarium' | 'equipment' | 'decor';
  subCategory?: 'freshwater' | 'saltwater' | 'exotic' | 'aerator' | 'filter' | 'coral' | 'plant' | 'rock';
  stock: 'available' | 'low' | 'out';
  image: string;
  description: string;
  specs?: string;
  size?: string;
  temperature?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

type CatalogSectionProps = {
  products: Product[];
  selectedCategory: string;
  selectedProductType: string;
  onCategoryChange: (category: string) => void;
  onProductTypeChange: (type: string) => void;
  onAddToCart: (product: Product) => void;
};

export default function CatalogSection({ 
  products, 
  selectedCategory, 
  selectedProductType,
  onCategoryChange,
  onProductTypeChange,
  onAddToCart 
}: CatalogSectionProps) {
  const getStockBadge = (stock: string) => {
    switch (stock) {
      case 'available':
        return <Badge className="bg-green-500 text-white">В наличии</Badge>;
      case 'low':
        return <Badge className="bg-amber-500 text-white">Мало</Badge>;
      case 'out':
        return <Badge variant="destructive">Нет в наличии</Badge>;
      default:
        return null;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="text-green-600 border-green-600">Легко</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Средне</Badge>;
      case 'hard':
        return <Badge variant="outline" className="text-red-600 border-red-600">Сложно</Badge>;
      default:
        return null;
    }
  };

  return (
    <section id="catalog" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
          <p className="text-muted-foreground text-lg">Отслеживание наличия в реальном времени</p>
        </div>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <Button 
            variant={selectedProductType === 'fish' ? 'default' : 'outline'}
            onClick={() => onProductTypeChange('fish')}
            className="gap-2"
          >
            <Icon name="Fish" size={18} />
            Рыбы
          </Button>
          <Button 
            variant={selectedProductType === 'aquarium' ? 'default' : 'outline'}
            onClick={() => onProductTypeChange('aquarium')}
            className="gap-2"
          >
            <Icon name="Box" size={18} />
            Аквариумы
          </Button>
          <Button 
            variant={selectedProductType === 'equipment' ? 'default' : 'outline'}
            onClick={() => onProductTypeChange('equipment')}
            className="gap-2"
          >
            <Icon name="Settings" size={18} />
            Оборудование
          </Button>
          <Button 
            variant={selectedProductType === 'decor' ? 'default' : 'outline'}
            onClick={() => onProductTypeChange('decor')}
            className="gap-2"
          >
            <Icon name="Flower" size={18} />
            Декор
          </Button>
        </div>

        {selectedProductType === 'fish' && (
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all" onClick={() => onCategoryChange('all')}>
                Все
              </TabsTrigger>
              <TabsTrigger value="freshwater" onClick={() => onCategoryChange('freshwater')}>
                Пресные
              </TabsTrigger>
              <TabsTrigger value="saltwater" onClick={() => onCategoryChange('saltwater')}>
                Морские
              </TabsTrigger>
              <TabsTrigger value="exotic" onClick={() => onCategoryChange('exotic')}>
                Экзотика
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden bg-secondary/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{product.name}</CardTitle>
                      {product.latinName && (
                        <CardDescription className="italic text-xs">{product.latinName}</CardDescription>
                      )}
                    </div>
                    {getStockBadge(product.stock)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="space-y-2 text-sm">
                    {product.size && (
                      <div className="flex items-center gap-2">
                        <Icon name="Ruler" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Размер:</span>
                        <span className="font-medium">{product.size}</span>
                      </div>
                    )}
                    {product.temperature && (
                      <div className="flex items-center gap-2">
                        <Icon name="Thermometer" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Температура:</span>
                        <span className="font-medium">{product.temperature}</span>
                      </div>
                    )}
                    {product.difficulty && (
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Сложность:</span>
                        {getDifficultyIcon(product.difficulty)}
                      </div>
                    )}
                    {product.specs && (
                      <div className="flex items-start gap-2">
                        <Icon name="Info" size={16} className="text-primary mt-0.5" />
                        <span className="font-medium text-xs">{product.specs}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                  <Button 
                    size="sm" 
                    disabled={product.stock === 'out'}
                    className="gap-2"
                    onClick={() => onAddToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={16} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
