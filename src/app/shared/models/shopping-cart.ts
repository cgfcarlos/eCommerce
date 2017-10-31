import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];

            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
        }
    }

    get totalItemsCount() {
        let count = 0;
        // De esta forma obtenemos los objetos que hay en el carrito de la compra
        // tslint:disable-next-line:forin
        for (const productId in this.itemsMap) {
          count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}
