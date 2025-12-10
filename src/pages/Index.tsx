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
    id: 'fish-7',
    name: 'Рыба-ангел королевская',
    latinName: 'Pomacanthus imperator',
    price: 4500,
    category: 'fish',
    subCategory: 'saltwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/a55f0177-194b-4e62-a968-303d5d5add4a.jpg',
    description: 'Величественная морская рыба с яркими синими и желтыми полосами',
    size: '25-35 см',
    temperature: '24-26°C',
    difficulty: 'hard'
  },
  {
    id: 'fish-8',
    name: 'Рыба-лев',
    latinName: 'Pterois volitans',
    price: 5200,
    category: 'fish',
    subCategory: 'exotic',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/e1f25440-6127-4b68-b166-5e9a5d4b414d.jpg',
    description: 'Экзотическая хищная рыба с красивыми плавниками-веерами',
    size: '30-38 см',
    temperature: '23-26°C',
    difficulty: 'hard'
  },
  {
    id: 'fish-9',
    name: 'Губан-чистильщик',
    latinName: 'Labroides dimidiatus',
    price: 1600,
    category: 'fish',
    subCategory: 'saltwater',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/a55f0177-194b-4e62-a968-303d5d5add4a.jpg',
    description: 'Полезная рыба, очищает других рыб от паразитов',
    size: '8-10 см',
    temperature: '24-27°C',
    difficulty: 'medium'
  },
  {
    id: 'fish-10',
    name: 'Мандаринка',
    latinName: 'Synchiropus splendidus',
    price: 3200,
    category: 'fish',
    subCategory: 'exotic',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/e1f25440-6127-4b68-b166-5e9a5d4b414d.jpg',
    description: 'Невероятно красивая мелкая рыбка с психоделической окраской',
    size: '6-8 см',
    temperature: '24-26°C',
    difficulty: 'hard'
  },
  {
    id: 'jellyfish-1',
    name: 'Медуза Аурелия',
    latinName: 'Aurelia aurita',
    price: 2800,
    category: 'fish',
    subCategory: 'exotic',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/dc387de6-0b98-4401-92f1-69b0b12d2c79.jpg',
    description: 'Прозрачная медуза с легким свечением, завораживающее создание',
    size: '10-20 см',
    temperature: '13-20°C',
    difficulty: 'hard'
  },
  {
    id: 'jellyfish-2',
    name: 'Медуза Кассиопея',
    latinName: 'Cassiopea xamachana',
    price: 3500,
    category: 'fish',
    subCategory: 'exotic',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/dc387de6-0b98-4401-92f1-69b0b12d2c79.jpg',
    description: 'Уникальная медуза, которая лежит на дне вверх ногами',
    size: '12-18 см',
    temperature: '24-28°C',
    difficulty: 'hard'
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
    id: 'aquarium-3',
    name: 'Медузариум JellyFlow 50',
    price: 35000,
    category: 'aquarium',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/5e691519-b213-4ee1-bfab-3e22bc470250.jpg',
    description: 'Специальный цилиндрический аквариум для медуз с круговым потоком',
    specs: '50 л, диаметр 40 см, высота 60 см, LED RGB подсветка, регулируемый поток'
  },
  {
    id: 'aquarium-4',
    name: 'Медузариум Orbit 100',
    price: 58000,
    category: 'aquarium',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/5e691519-b213-4ee1-bfab-3e22bc470250.jpg',
    description: 'Премиальный медузариум с системой автоматического контроля воды',
    specs: '100 л, 50×50×80 см, управление через приложение, 16 цветовых режимов'
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
    id: 'equipment-4',
    name: 'Фильтр внутренний AquaClear 200',
    price: 1800,
    category: 'equipment',
    subCategory: 'filter',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/110698be-1ad4-4721-b2f2-64d6cc12a953.jpg',
    description: 'Компактный внутренний фильтр для аквариумов до 200 л',
    specs: 'Производительность 600 л/ч, тихая работа, картриджи в комплекте'
  },
  {
    id: 'equipment-5',
    name: 'Фильтр канистровый ProFilter 1000',
    price: 7500,
    category: 'equipment',
    subCategory: 'filter',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/110698be-1ad4-4721-b2f2-64d6cc12a953.jpg',
    description: 'Мощный канистровый фильтр для больших аквариумов',
    specs: 'До 1000 л, 1800 л/ч, 5 ступеней очистки, UV-стерилизатор'
  },
  {
    id: 'decor-1',
    name: 'Живой коралл Зоантус',
    price: 2800,
    category: 'decor',
    subCategory: 'coral',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/32fbf10d-ede2-422e-855e-0e885da84be7.jpg',
    description: 'Живой мягкий коралл с яркими полипами, легкий в уходе',
    specs: 'Колония 5-8 см, средняя освещенность, для опытных аквариумистов'
  },
  {
    id: 'decor-2',
    name: 'Живой коралл Дискосома',
    price: 1800,
    category: 'decor',
    subCategory: 'coral',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/32fbf10d-ede2-422e-855e-0e885da84be7.jpg',
    description: 'Неприхотливый живой коралл с грибовидными полипами',
    specs: 'Диаметр 6-10 см, низкая освещенность, подходит для начинающих'
  },
  {
    id: 'decor-2a',
    name: 'Живой коралл Акропора',
    price: 5500,
    category: 'decor',
    subCategory: 'coral',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/32fbf10d-ede2-422e-855e-0e885da84be7.jpg',
    description: 'Элитный жесткий коралл с ветвистой структурой',
    specs: 'Фрагмент 10-15 см, высокое освещение, стабильные параметры воды'
  },
  {
    id: 'decor-3',
    name: 'Живое растение Анубиас',
    price: 450,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живое растение, медленнорастущее и неприхотливое',
    specs: 'Высота 15-25 см, для пресной воды, не требует CO2'
  },
  {
    id: 'decor-4',
    name: 'Живое растение Валлиснерия',
    price: 250,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живое растение с длинными листьями для заднего плана',
    specs: 'Высота до 50 см, быстрый рост, насыщает воду кислородом'
  },
  {
    id: 'decor-4a',
    name: 'Живое растение Роголистник',
    price: 180,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живое плавающее растение, отличный биофильтр',
    specs: 'Пучок 20-30 см, очищает воду, быстро размножается'
  },
  {
    id: 'decor-4b',
    name: 'Живое растение Криптокорина',
    price: 380,
    category: 'decor',
    subCategory: 'plant',
    stock: 'available',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живое растение с широкими листьями, создает естественный вид',
    specs: 'Высота 10-20 см, медленный рост, неприхотливое'
  },
  {
    id: 'decor-4c',
    name: 'Живая водоросль Каулерпа',
    price: 520,
    category: 'decor',
    subCategory: 'plant',
    stock: 'low',
    image: 'https://cdn.poehali.dev/projects/1f437e8a-43ca-4479-a2f9-af87ad18aca8/files/321bdf5a-6771-4d21-9ff0-9ca10c276073.jpg',
    description: 'Живая морская водоросль для рифовых аквариумов',
    specs: 'Пучок 15-25 см, для морской воды, поглощает нитраты'
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