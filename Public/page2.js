
//making proceed button active
document.getElementById("gridCheck").addEventListener("click",proceedActive);
//hiding all cross icons on first load
$(".crossIcn1").hide();
$(".crossIcn2").hide();
$(".crossIcn3").hide();

//function to make proceed button active
function proceedActive(){
  //storing values of input box to check
  var checkValue=document.getElementById("gridCheck").checked;
  var inp1=document.querySelector("#inputFname").value;
  var Lname=document.querySelector("#inputLname").value;
  var inp3=document.querySelector("#amount").value;
  var inp2=document.querySelector("#inputEmail").value;
  var inp4=document.querySelector("#inputState").value;
  //checking if mandatory inputs are filled or not by user
  if(checkValue==true && inp1!='' && inp2!='' && inp3!=''){
    //locking all data filled by user
    document.querySelector("#inputFname").setAttribute('readonly','readonly');
    document.querySelector("#inputLname").setAttribute('readonly','readonly');
    document.querySelector("#inputEmail").setAttribute('readonly','readonly');
    document.querySelector("#amount").setAttribute('readonly','readonly');
    //disbaling all options of select since readonly not work there
    var opt= document.querySelectorAll("option");
    for (i=0;i<4;i++){
      opt[i].setAttribute("disabled",null);
    };
    //storing the value of input in local storage
    localStorage.setItem("inp1Local",inp1);
    localStorage.setItem("LnameLocal",Lname);
    localStorage.setItem("inp3Local",inp3);
    localStorage.setItem("inp2Local",inp2);
    localStorage.setItem("inp4Local",inp4);
    //activating proceed button
    document.getElementById("submitbtn").classList.remove("disabled");
    document.getElementById("backbtn").classList.add("disabled");
    //hiding all cross icons
    $(".crossIcn1").hide();
    $(".crossIcn2").hide();
    $(".crossIcn3").hide();
    //deactivating back button

  }else{
    //unlocking all data filled by user for editing
    document.querySelector("#inputFname").removeAttribute('readonly','readonly');
    document.querySelector("#inputLname").removeAttribute('readonly','readonly');
    document.querySelector("#inputEmail").removeAttribute('readonly','readonly');
    document.querySelector("#amount").removeAttribute('readonly','readonly');
    //enabling all options of select since readonly not work there
    var opt= document.querySelectorAll("option");
    for (i=0;i<4;i++){
      opt[i].removeAttribute("disabled",null);
    };
    var arr=[inp1,inp2,inp3];//storing in array to iterate with it
    //disabling proceed button
    document.getElementById("submitbtn").classList.add("disabled");
    //enabling  back button
    document.getElementById("backbtn").classList.remove("disabled");
    //checking which input has been filled and which not
    for(i=0;i<3;i++){
      if(arr[i]==""){
        $(".crossIcn"+(i+1)).show();
      }
      else{
        $(".crossIcn"+(i+1)).hide();
      }
    };
    document.getElementById("gridCheck").checked=false; //making it again unchecked;
  };
};
