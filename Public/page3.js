//retrieving all the data filled by user from local localStorage
var fName=localStorage.getItem("inp1Local");
var lName=localStorage.getItem("LnameLocal");
var email=localStorage.getItem("inp2Local");
var category=localStorage.getItem("inp4Local");
var amount=localStorage.getItem("inp3Local");
var orderId=document.querySelector(".orderId").innerHTML;
//setting all the input boxes values
document.querySelector("#inputFname").value=fName;
document.querySelector("#inputLname").value=lName;
document.querySelector("#inputEmail").value=email;
document.querySelector("#inputState").value=category;
document.querySelector("#amount").value=amount;
//locking all data filled by user
document.querySelector("#inputFname").setAttribute('readonly','readonly');
document.querySelector("#inputLname").setAttribute('readonly','readonly');
document.querySelector("#inputEmail").setAttribute('readonly','readonly');
document.querySelector("#inputState").setAttribute("readonly","readonly");
document.querySelector("#amount").setAttribute('readonly','readonly');
//changing color of order id
document.querySelector(".orderId").classList.add("orderIdFinal");
//razorpay configuration
var options = {
    "key": "rzp_test_XvvTB2YaPe1cC7", // Enter the Key ID generated from the Dashboard
    "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": fName+" "+lName,
    "description":category + " Via Donation Portal",
    "image": "Resources/favicon.png",
    "order_id":orderId , //This is a sample Order ID. Pass the `id` obtained in the previous step
    "handler": function (response){
      paymentIdGenerated=response.razorpay_payment_id;
      orderIdGenerated=response.razorpay_order_id;
      signatureGenerated=response.razorpay_signature;
      //$.post("/sending_credentials")
        //{
        //};
        //$.post("/home.html",);
        //alert(paymentIdGenerated);
        //alert(orderIdGenerated);
        //alert(signatureGenerated);
        location.replace("/success.html");
    },
    "prefill": {
        "name": fName+" "+lName,
        "email": email,
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#000000"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        //alert(response.error.code);
        //alert(response.error.description);
        //alert(response.error.source);
        //alert(response.error.step);
        //alert(response.error.reason);
        //alert(response.error.metadata.order_id);
        //alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
}
//for signature verification
var settings = {
 "url": "/api/payment/verify",
 "method": "POST",
 "timeout": 0,
 "headers": {
   "Content-Type": "application/json"
 },
 "data": JSON.stringify({response}),
}
