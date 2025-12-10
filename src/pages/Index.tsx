import { useState } from 'react';
import ShoppingCart from '@/components/ShoppingCart';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import InfoSections from '@/components/InfoSections';

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
      <Header 
        activeSection={activeSection}
        cartItemCount={cartItemCount}
        onNavigate={scrollToSection}
        onCartOpen={() => setCartOpen(true)}
      />

      <main>
        <HeroSection onNavigate={scrollToSection} />

        <CatalogSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          selectedProductType={selectedProductType}
          onCategoryChange={setSelectedCategory}
          onProductTypeChange={setSelectedProductType}
          onAddToCart={addToCart}
        />

        <InfoSections />
      </main>

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
