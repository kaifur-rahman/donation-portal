//Initial setup
const express=require('express');
const app=express();
const bodyParser=require('body-parser');//importing body-parser for collecting form data
const pug=require('pug');//importing pug module

//heroku port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,function(){
  console.log("Server started successfull");
});
//for body bodyParser
app.use(bodyParser.urlencoded({extended:true}));
//setting template engine pug
app.set("views",__dirname+"/views");//specifying the folder in which pug files are stored(foldername,url)
app.set("view engine",'pug');//to configure pug for view engine
//general server request and response from root
app.get("/",function(request,response){
  response.sendFile(__dirname+"/index.html");
});
app.get("/page2.html",function(request1,respond1){
  respond1.sendFile(__dirname+"/Public/page2.html");
});
//setting public folder as static to send resources
app.use(express.static(__dirname+"/Public"));

//integrating razorpay api
const Razorpay=require('razorpay');//importing razorpay api
//step2 initiating razorpay
var instance = new Razorpay(
  {key_id: 'rzp_test_XvvTB2YaPe1cC7',
   key_secret: 'Zv2jnJefI1OCtqCwAsaz9m5F',}
);
var orderCount=1;//for adding unique no. to order id for storage
//creating new order when user fill their details in form
app.post("/orderGenerate.html",function(req,res){
  //storing data filled by user in a variable
  var customerFName=req.body.firstName;
  var customerLName=req.body.lastName;
  var customerEmail=req.body.email;
  var amountPay=req.body.amount;
  //step3 creating order using razorpay api to api call

  var options = {
    amount: amountPay*100,  // amount in the smallest currency unit i.e. paise
    currency: "INR",
    receipt: customerFName+"_order_rcptid_"+orderCount //we can create our own receipt
  };
  orderCount+=1;
  //sending request to razorpay server to recieve order id in response
  instance.orders.create(options, function(err, order) {
    let orderIdGenerated=order.id;
    let amtGenerated=order.amount;
    //sending 3rd page rendered html to frontend with order id
      res.render('page3.pug',{orderId:orderIdGenerated})
  });
});
//storing signature and other ids recieved on Transaction
app.post("/sending_credentials",function(req,res){
  console.log(req.body)
  razorpay_order_id=req.body.orderIdGenerated;
  console.log(razorpay_order_id);
  razorpay_payment_id=req.body.paymentIdGenerated;
  razorpay_signature=req.body.signatureGenerated;
});
//for signature verification
app.post("/api/payment/verify",(req,res)=>{

let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', 'Zv2jnJefI1OCtqCwAsaz9m5F')
                                .update(body.toString())
                                .digest('hex');
                                console.log("sig received " ,req.body.response.razorpay_signature);
                                console.log("sig generated " ,expectedSignature);
var response = {"signatureIsValid":"false"}
if(expectedSignature === req.body.response.razorpay_signature)
 response={"signatureIsValid":"true"}
    res.send(response);
});
app.post("/home.html",function(request1,respond1){
    respond1.send("<h1>/Public/success.html</h1>");
});
