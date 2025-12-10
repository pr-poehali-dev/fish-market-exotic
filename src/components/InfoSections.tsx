import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function InfoSections() {
  return (
    <>
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

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Fish" size={24} />
            <span className="text-xl font-bold">AquaWorld</span>
          </div>
          <p className="text-sm opacity-80">© 2024 AquaWorld. Все права защищены</p>
        </div>
      </footer>
    </>
  );
}
