require('./module/orders');
const Order = require('./module/orders.js');

var http = require('http'),
    events = require('events'),
    eventConfig = require('./module/config').events;

http.createServer((req, res) => {
    res.writeHead(200);
    let order = new Order();

    order.on(eventConfig.ADD, order._addOrder);
    order.on(eventConfig.REMOVE, order._removeOrder);
    order.on(eventConfig.CLEAR, order._deleteAllOrders)
    order.on(eventConfig.PRINT, order._printOrders);
    order.on(eventConfig.ERROR, order._errMsg);

    order.addOrder("Salad");
    order.addOrder("Hamburger");
    order.addOrder("Mit Balls");
    order.addOrder("Spagheti");
    order.addOrder("Cheese Cake");
    order.addOrder("Milkshake");
    order.addOrder("Ice-Cream");
    order.addOrder("Salad");
    order.addOrder("Falafel");
    order.addOrder("Pizza");
    order.addOrder("Water");
    order.removeOrder();
    order.addOrder("Falafel");
    order.printallOrders();
    order.resetOrders();
    order.printallOrders();

    res.write(`<h1>${order.output}</h1>`); //
    res.end();
    
}).listen(8080);
console.log('listening on port 8080');


    

