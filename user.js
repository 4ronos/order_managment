import { v4 as uuidv4 } from 'uuid';
import { Order } from './order.js';

export class User {
  constructor(name, balance = 0) {
    this.id = uuidv4();
    this.name = name;
    this.balance = balance;
    this.orders = {
        
    };
  }

  addBalance(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Баланс пользователя ${this.name} увеличен на ${amount}. Текущий баланс: ${this.balance}`);
    } else {
      console.log('Сумма для пополнения должна быть положительной');
    }
  }

  deductBalance(amount) {
    if (amount > this.balance) {
      console.log(`Недостаточно средств на балансе пользователя ${this.name}`);
      return false;
    }
    this.balance -= amount;
    console.log(`С баланса пользователя ${this.name} списано ${amount}. Текущий баланс: ${this.balance}`);
    return true;
  }

  createOrder() {
    const newOrder = new Order(this.id);
    this.orders[newOrder.id] = newOrder;
    return newOrder.id;
  }
}