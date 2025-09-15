import { v4 as uuidv4 } from 'uuid';
class CreatedState {
    pay(order) {
      console.log("Заказ оплачен");
      order.addHistory("Заказ оплачен", "платить");//
      order.setState(new PaidState());
    }
    ship(order) {
      console.log("Нельзя отправить заказ, пока он не оплачен");
    }
    deliver(order) {
      console.log("Нельзя доставить заказ, пока он не отправлен");
    }
    cancel(order) {
      console.log("Заказ отменён");
      order.addHistory("Заказ отменён", "отменить");
      order.setState(new CancelledState());
    }
    return(order) {
      console.log("Нельзя вернуть заказ, который не доставлен");
    }
    refund(order) {
      console.log("Нельзя вернуть деньги за неоплаченный заказ");
    }
  }
  
  class PaidState {
    pay(order, user) {
      console.log("Заказ уже оплачен");
    }
    ship(order) {
      console.log("Заказ отправлен");
      order.addHistory("Заказ отправлен", "отправить");
      order.setState(new ShippedState());
    }
    deliver(order) {
      console.log("Нельзя доставить заказ, пока он не отправлен");
    }
    cancel(order) {
      console.log("Заказ отменён");
      order.addHistory("Cancelled", "cancel");
      order.setState(new CancelledState());
    }
    return(order) {
      console.log("Нельзя вернуть заказ, который не доставлен");
    }
    refund(order) {
      console.log("Нельзя вернуть деньги за неоплаченный заказ");
    }
  }
  
  class ShippedState {
    pay(order, user) {
      console.log("Нельзя оплатить отправленный заказ");
    }
    ship(order) {
      console.log("Заказ уже отправлен");
    }
    deliver(order) {
      console.log("Заказ доставлен");
      order.addHistory("Заказ доставлен", "доставлять");
      order.setState(new DeliveredState());
    }
    cancel(order) {
      console.log("Нельзя отменить отправленный заказ");
    }
    return(order) {
      console.log("Нельзя вернуть заказ, который не доставлен");
    }
    refund(order) {
      console.log("Нельзя вернуть деньги за неоплаченный заказ");
    }
  }
  
  class DeliveredState {
    pay(order, user) {
      console.log("Заказ уже доставлен, оплата невозможна");
    }
    ship(order) {
      console.log("Заказ уже доставлен, повторная отправка невозможна");
    }
    deliver(order) {
      console.log("Заказ уже доставлен");
    }
    cancel(order) {
      console.log("Нельзя отменить доставленный заказ");
    }
    return(order) {
      console.log("Заказ возвращён");
      order.addHistory("Заказ возвращён", "возврат заказа");
      order.setState(new ReturnedState());
    }
    refund(order) {
      console.log("Нельзя вернуть деньги без возврата товара");
    }
  }

  class CancelledState {
    pay(order, user) {
      console.log("Нельзя оплатить отменённый заказ");
    }
    ship(order) {
      console.log("Нельзя отправить отменённый заказ");
    }
    deliver(order) {
      console.log("Нельзя доставить отменённый заказ");
    }
    cancel(order) {
      console.log("Заказ уже отменён");
    }
    return(order) {
      console.log("Нельзя вернуть отменённый заказ");
    }
    refund(order) {
      console.log("Нельзя вернуть деньги за отменённый заказ");
    }
  }

  class ReturnedState {
    pay(order, user) {
      console.log("Нельзя оплатить возвращённый заказ");
    }
    ship(order) {
      console.log("Нельзя отправить возвращённый заказ");
    }
    deliver(order) {
      console.log("Нельзя доставить возвращённый заказ");
    }
    cancel(order) {
      console.log("Нельзя отменить возвращённый заказ");
    }
    return(order) {
      console.log("Заказ уже возвращён");
    }
    refund(order) {
      console.log("Деньги возвращены");
      order.addHistory("Деньги возвращены", "возврат денег");
      order.setState(new RefundedState());
    }
  }

  class RefundedState {
    pay(order, user) {
      console.log("Нельзя оплатить заказ с возвращёнными деньгами");
    }
    ship(order) {
      console.log("Нельзя отправить заказ с возвращёнными деньгами");
    }
    deliver(order) {
      console.log("Нельзя доставить заказ с возвращёнными деньгами");
    }
    cancel(order) {
      console.log("Нельзя отменить заказ с возвращёнными деньгами");
    }
    return(order) {
      console.log("Нельзя вернуть заказ с возвращёнными деньгами");
    }
    refund(order) {
      console.log("Деньги уже возвращены");
    }
  }
  
 export class Order {
    constructor(userId) {
      this.id = uuidv4()
      this.userId = userId;
      this.state = new CreatedState();
      this.history = [];
    }
    
    setState(state) {
      this.state = state;
    }
    addHistory(state, action) {
      this.history.push({
        state,
        action,
        timestamp: new Date().toISOString()
      });
    }
    pay(user) {
      this.state.pay(this);
    }
    ship() {
      this.state.ship(this);
    }
    deliver() {
      this.state.deliver(this);
    }
    cancel() {
      this.state.cancel(this);
    }
    return() {
      this.state.return(this);
    }
    refund() {
      this.state.refund(this);
    }
  
    getHistory() {
      return this.history;
    }
  }