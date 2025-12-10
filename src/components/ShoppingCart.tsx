import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type ShoppingCartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function ShoppingCart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} />
            Корзина ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Корзина пуста</p>
            <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.name}</h4>
                      <p className="text-sm text-primary font-semibold mb-2">{item.price} ₽</p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 ml-auto text-destructive hover:text-destructive"
                          onClick={() => onRemove(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <SheetFooter className="flex-col gap-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Итого:</span>
                <span className="text-primary text-2xl">{total.toLocaleString()} ₽</span>
              </div>
              <Button size="lg" className="w-full gap-2">
                <Icon name="CreditCard" size={20} />
                Оформить заказ
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
