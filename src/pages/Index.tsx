import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ShoppingCart from '@/components/ShoppingCart';

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

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const productsData: Product[] = [
  {
    id: 'fish-1',
    name: 'Рыба-клоун',
    latinName: 'Amphiprion ocellaris',
    price: 1200,
    category: 'fish',
    subCategory: 'saltwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/e1f25440-6127-4b68-b166-5e9a5d4b414d.jpg',
    description: 'Яркая морская рыбка, идеально подходит для рифового аквариума',
    size: '8-11 см',
    temperature: '24-27°C',
    difficulty: 'medium'
  },
  {
    id: 'fish-2',
    name: 'Голубой хирург',
    latinName: 'Paracanthurus hepatus',
    price: 2500,
    category: 'fish',
    subCategory: 'exotic',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/a55f0177-194b-4e62-a968-303d5d5add4a.jpg',
    description: 'Экзотическая тропическая рыба насыщенного синего цвета',
    size: '20-30 см',
    temperature: '24-28°C',
    difficulty: 'hard'
  },
  {
    id: 'fish-3',
    name: 'Карп Кои',
    latinName: 'Cyprinus carpio',
    price: 3500,
    category: 'fish',
    subCategory: 'freshwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Декоративный карп для прудов и больших аквариумов',
    size: '30-60 см',
    temperature: '15-25°C',
    difficulty: 'easy'
  },
  {
    id: 'fish-4',
    name: 'Неон голубой',
    latinName: 'Paracheirodon innesi',
    price: 150,
    category: 'fish',
    subCategory: 'freshwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/e1f25440-6127-4b68-b166-5e9a5d4b414d.jpg',
    description: 'Маленькая стайная рыбка с неоновой полосой',
    size: '3-4 см',
    temperature: '20-24°C',
    difficulty: 'easy'
  },
  {
    id: 'fish-5',
    name: 'Рыба-бабочка',
    latinName: 'Chaetodon',
    price: 1800,
    category: 'fish',
    subCategory: 'saltwater',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/a55f0177-194b-4e62-a968-303d5d5add4a.jpg',
    description: 'Изящная морская рыба с яркой окраской',
    size: '12-18 см',
    temperature: '24-26°C',
    difficulty: 'hard'
  },
  {
    id: 'fish-6',
    name: 'Скалярия',
    latinName: 'Pterophyllum scalare',
    price: 450,
    category: 'fish',
    subCategory: 'freshwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Элегантная пресноводная рыба треугольной формы',
    size: '12-15 см',
    temperature: '24-28°C',
    difficulty: 'medium'
  },
  {
    id: 'aquarium-1',
    name: 'Аквариум Panorama 100',
    price: 15000,
    category: 'aquarium',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/84bda76e-6a24-40b1-859b-aeeffd1fc0a6.jpg',
    description: 'Стильный панорамный аквариум с закругленными углами',
    specs: '100 л, 80×35×40 см, стекло 6 мм'
  },
  {
    id: 'aquarium-2',
    name: 'Аквариум Crystal 200',
    price: 28000,
    category: 'aquarium',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/84bda76e-6a24-40b1-859b-aeeffd1fc0a6.jpg',
    description: 'Большой аквариум премиум-класса с LED-подсветкой',
    specs: '200 л, 100×50×45 см, ультрапрозрачное стекло'
  },
  {
    id: 'equipment-1',
    name: 'Аэратор AquaPro 3000',
    price: 2500,
    category: 'equipment',
    subCategory: 'aerator',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/110698be-1ad4-4721-b2f2-64d6cc12a953.jpg',
    description: 'Мощный бесшумный аэратор для аквариумов до 300 л',
    specs: 'Производительность 200 л/ч, 2 выхода, регулировка мощности'
  },
  {
    id: 'equipment-2',
    name: 'Аэратор Silent Mini',
    price: 890,
    category: 'equipment',
    subCategory: 'aerator',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/110698be-1ad4-4721-b2f2-64d6cc12a953.jpg',
    description: 'Компактный аэратор для небольших аквариумов',
    specs: 'До 50 л, бесшумный, энергосберегающий'
  },
  {
    id: 'equipment-3',
    name: 'Фильтр Cascade 500',
    price: 3200,
    category: 'equipment',
    subCategory: 'filter',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/110698be-1ad4-4721-b2f2-64d6cc12a953.jpg',
    description: 'Внешний каскадный фильтр с трехступенчатой очисткой',
    specs: 'До 500 л, 1000 л/ч, биологическая + механическая фильтрация'
  },
  {
    id: 'decor-1',
    name: 'Коралл Brain Coral',
    price: 1800,
    category: 'decor',
    subCategory: 'coral',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/17ff6a1a-5b93-446b-b0c2-99d353be712a.jpg',
    description: 'Искусственный коралл-мозговик, выглядит как настоящий',
    specs: 'Размер 15×12 см, безопасный пластик'
  },
  {
    id: 'decor-2',
    name: 'Набор кораллов Reef Mix',
    price: 3500,
    category: 'decor',
    subCategory: 'coral',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/17ff6a1a-5b93-446b-b0c2-99d353be712a.jpg',
    description: 'Композиция из 5 разных видов кораллов',
    specs: 'Яркие цвета, высота 10-20 см'
  },
  {
    id: 'decor-3',
    name: 'Водоросль Анубиас',
    price: 450,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живое растение, медленнорастущее и неприхотливое',
    specs: 'Высота 15-25 см, для пресной воды'
  },
  {
    id: 'decor-4',
    name: 'Водоросль Валлиснерия',
    price: 250,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Длинные декоративные листья для заднего плана',
    specs: 'Высота до 50 см, быстрый рост'
  },
  {
    id: 'decor-5',
    name: 'Камень Dragon Stone',
    price: 890,
    category: 'decor',
    subCategory: 'rock',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/17ff6a1a-5b93-446b-b0c2-99d353be712a.jpg',
    description: 'Натуральный камень с уникальной текстурой',
    specs: 'Вес 1-2 кг, не влияет на pH воды'
  },
  {
    id: 'decor-6',
    name: 'Набор декора Underwater Castle',
    price: 2200,
    category: 'decor',
    subCategory: 'rock',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/17ff6a1a-5b93-446b-b0c2-99d353be712a.jpg',
    description: 'Композиция из замка, арки и камней',
    specs: 'Керамика, безопасно для рыб, создает укрытия'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductType, setSelectedProductType] = useState<string>('fish');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = productsData.filter(product => {
    if (selectedProductType !== 'fish') {
      return product.category === selectedProductType;
    }
    if (selectedCategory === 'all') {
      return product.category === 'fish';
    }
    return product.category === 'fish' && product.subCategory === selectedCategory;
  });

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
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
                  onClick={() => scrollToSection('home')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Главная
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Каталог
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('care')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'care' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Уход
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('delivery')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Доставка
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacts')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  Контакты
                </button>
              </li>
            </ul>
            <Button 
              size="sm" 
              className="hidden md:flex items-center gap-2 relative"
              onClick={() => setCartOpen(true)}
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

      <main>
        <section id="home" className="py-20 px-4 animate-fade-in">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Мир экзотических рыб
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              От обычных аквариумных до редких морских видов. Создайте свой подводный мир с AquaWorld
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('catalog')} className="gap-2">
                <Icon name="Search" size={20} />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('care')} className="gap-2">
                <Icon name="BookOpen" size={20} />
                Узнать об уходе
              </Button>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
              <p className="text-muted-foreground text-lg">Отслеживание наличия в реальном времени</p>
            </div>

            <div className="flex gap-4 justify-center mb-8 flex-wrap">
              <Button 
                variant={selectedProductType === 'fish' ? 'default' : 'outline'}
                onClick={() => setSelectedProductType('fish')}
                className="gap-2"
              >
                <Icon name="Fish" size={18} />
                Рыбы
              </Button>
              <Button 
                variant={selectedProductType === 'aquarium' ? 'default' : 'outline'}
                onClick={() => setSelectedProductType('aquarium')}
                className="gap-2"
              >
                <Icon name="Box" size={18} />
                Аквариумы
              </Button>
              <Button 
                variant={selectedProductType === 'equipment' ? 'default' : 'outline'}
                onClick={() => setSelectedProductType('equipment')}
                className="gap-2"
              >
                <Icon name="Settings" size={18} />
                Оборудование
              </Button>
              <Button 
                variant={selectedProductType === 'decor' ? 'default' : 'outline'}
                onClick={() => setSelectedProductType('decor')}
                className="gap-2"
              >
                <Icon name="Flower" size={18} />
                Декор
              </Button>
            </div>

            {selectedProductType === 'fish' && (
              <Tabs defaultValue="all" className="w-full mb-8">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
                  <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
                    Все
                  </TabsTrigger>
                  <TabsTrigger value="freshwater" onClick={() => setSelectedCategory('freshwater')}>
                    Пресные
                  </TabsTrigger>
                  <TabsTrigger value="saltwater" onClick={() => setSelectedCategory('saltwater')}>
                    Морские
                  </TabsTrigger>
                  <TabsTrigger value="exotic" onClick={() => setSelectedCategory('exotic')}>
                    Экзотика
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
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
                          onClick={() => addToCart(product)}
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

        <section id="care" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Уход за рыбами</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Droplets" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Качество воды</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Регулярно проверяйте параметры воды: pH, жесткость, температуру. Меняйте 20-30% воды еженедельно.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Apple" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Кормление</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Кормите рыб 1-2 раза в день небольшими порциями. Используйте разнообразные корма для сбалансированного питания.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Wind" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Оборудование</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Установите качественный фильтр и систему аэрации. Для морских видов требуется более сложное оборудование.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Heart" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Здоровье</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Следите за поведением рыб. При признаках болезни изолируйте больную особь и проконсультируйтесь со специалистом.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl text-center">
            <Icon name="Truck" size={48} className="text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Доставка</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Мы осуществляем безопасную доставку рыб по всей России. Каждая рыба транспортируется 
              в специальной упаковке с кислородом для обеспечения максимального комфорта.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24-48 часов</h3>
                <p className="text-sm text-muted-foreground">Быстрая доставка по России</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <Icon name="Shield" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100% гарантия</h3>
                <p className="text-sm text-muted-foreground">Возврат при проблемах</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <Icon name="Package" size={32} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Спецупаковка</h3>
                <p className="text-sm text-muted-foreground">С кислородом и терморегуляцией</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6">Контакты</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Свяжитесь с нами для консультации по выбору рыб и оборудования
            </p>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+79001234567" className="text-lg hover:text-primary transition-colors">
                  +7 (900) 123-45-67
                </a>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Icon name="Mail" size={24} className="text-primary" />
                <a href="mailto:info@aquaworld.ru" className="text-lg hover:text-primary transition-colors">
                  info@aquaworld.ru
                </a>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Icon name="MapPin" size={24} className="text-primary" />
                <span className="text-lg">Москва, ул. Аквариумная, д. 15</span>
              </div>
            </div>
            <div className="mt-12 pt-12 border-t">
              <p className="text-sm text-muted-foreground">
                Работаем ежедневно с 10:00 до 20:00
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Fish" size={24} />
            <span className="text-xl font-bold">AquaWorld</span>
          </div>
          <p className="text-sm opacity-80">© 2024 AquaWorld. Все права защищены</p>
        </div>
      </footer>

      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default Index;