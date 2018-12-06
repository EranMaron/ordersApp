var events = require('events');


const MAX_ORDERS = 10;

module.exports = class Orders extends events.EventEmitter {

    constructor() {
        super();
        this.numOfOrders = 0;
        this.orders = [];
        this.output = "";
    }

    addOrder(order) {
        if(this.numOfOrders < MAX_ORDERS) {
            this.orders.push(order);
            this.numOfOrders++;
            this.emit('_addOrder', order);
        }
        else 
            this.emit('_errMsg', "The kitchen can not get more orders right now!");
    }

    removeOrder() {
        if(this.numOfOrders > 0) {
            var temp = this.orders.pop();
            this.emit('_removeOrder', temp);
            this.numOfOrders--;
        }
        else 
            this.emit('_errMsg', "There are no Orders!");
    }

    resetOrders() {
        while(this.orders.length > 0) {
            this.orders.pop();
        }
        this.numOfOrders = 0;
        this.emit('_deleteAllOrders');
    }

    printallOrders() {
        if(this.orders.length > 0) 
            this.emit('_printOrders', this.orders);
        else 
            this.emit('_errMsg', "There are no orders right now!")
    }

    _addOrder(order) { 
        let temp = console.log(`There is an ${order} that was ordered`);
        this.output += `<br>There is an ${order} that was ordered`;
    }
    
    _removeOrder(order) {
        console.log(`There is an ${order} that was canceled`);
        this.output += `<br>There is an ${order} that was canceled`;
    }
    
    _deleteAllOrders() {
        console.log('All the orderes were canceled!');
        this.output += '<br>All the orderes were canceled!';
    }
    
    _printOrders(orders) {
        console.log(`Here are all your orders: ${orders}`);
        this.output += `<br>Here are all your orders: ${orders}`;
    }
    
    _errMsg(msg) {
        console.log(msg);
        this.output += `<br> ${msg}`;
    }
}
    
