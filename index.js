import readline from 'readline';
import { User } from "./user.js";


// console.log(new Order())
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function ask(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }
  
  async function main() {
    console.log('Добро пожаловать в Систему управления заказами!');
  
    const name = await ask('Введите имя пользователя: ');
    const balance = parseFloat(await ask('Введите начальный баланс: ')) || 0;
    const user = new User(name, balance);
  
    let orderId = null;
  
    while (true) {
      console.log('\nМеню:');
      console.log('1. Создать заказ');
      console.log('2. Оплатить заказ');
      console.log('3. Отправить заказ');
      console.log('4. Доставить заказ');
      console.log('5. Отменить заказ');
      console.log('6. Вернуть заказ');
      console.log('7. Вернуть деньги');
      console.log('8. Посмотреть историю заказа');
      console.log('9. Пополнить баланс');
      console.log('0. Выход');
  
      const choice = await ask('Выберите действие: ');
  
      switch (choice) {
        case '1':
          orderId = user.createOrder();
          console.log(`Заказ создан с ID: ${orderId}`);
          break;
        case '2':
          if (orderId) {
            user.orders[orderId].pay(user);
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '3':
          if (orderId) {
            user.orders[orderId].ship();
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '4':
          if (orderId) {
            user.orders[orderId].deliver();
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '5':
          if (orderId) {
            user.orders[orderId].cancel();
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '6':
          if (orderId) {
            user.orders[orderId].return();
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '7':
          if (orderId) {
            user.orders[orderId].refund();
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '8':
          if (orderId) {
            console.log('История заказа:', user.orders[orderId].getHistory());
          } else {
            console.log('Сначала создайте заказ');
          }
          break;
        case '9':
          const amount = parseFloat(await ask('Введите сумму для пополнения: '));
          user.addBalance(amount);
          break;
        case '0':
          console.log('Выход из системы.');
          rl.close();
          return;
        default:
          console.log('Неверный выбор. Попробуйте снова.');
      }
    }
  }
  
  main();