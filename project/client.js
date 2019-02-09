displayView = function(){
// the code required to display a view
  if (localStorage.getItem("token") === null) {
    var welcome_content = document.getElementById("welcomeview").innerHTML;
    document.getElementById('view').innerHTML = welcome_content;

    document.getElementById('signupform').addEventListener('submit', registerUser);
    document.getElementById('signinform').addEventListener('submit', logIn);

    email_field = document.getElementById('signupform').elements["email"]
    email_field.addEventListener('input', resetMessage);

    document.getElementById('repeat_password').addEventListener('input',
              function () {
                  checkSignup();
              });
  } else{
    var profile_content = document.getElementById("profileview").innerHTML;
    document.getElementById('view').innerHTML = profile_content;

    document.getElementById('signoutform').addEventListener('submit', logOut);
  }
};

checkSignup = function(){
  var repeat_pwd = document.getElementById('repeat_password');
  var entered_pwd = document.getElementById('signin_password');

  //alert("HAHAHA");
  if(entered_pwd.value != repeat_pwd.value){
    repeat_pwd.setCustomValidity("Passwords do not match");
  }else{
    repeat_pwd.setCustomValidity("");

  }
};

registerUser = function(event){
  //alert("heyyylmao");
  event.preventDefault();
  var signup_form = document.getElementById("signupform");
  var email = signup_form.elements["email"];
  var password = signup_form.elements["password"];
  var first_name = signup_form.elements["firstname"];
  var last_name = signup_form.elements["lastname"];
  var gender = signup_form.elements["gender"];
  var city = signup_form.elements["city"];
  var country = signup_form.elements["country"];

  var dataObject = {
    email: email.value,
    password: password.value,
    familyname: first_name.value,
    firstname: last_name.value,
    gender: gender.value,
    city: city.value,
    country: country.value
  };
  var response = serverstub.signUp(dataObject);
  if(response.success){
    email.setCustomValidity("");
    var login_response = serverstub.signIn(email.value,password.value);
    localStorage.setItem('token', login_response.data);
    displayView();
  }else{
    email.setCustomValidity(response.message);
  }
};

logIn = function(event){
  event.preventDefault();
  var signin_form = document.getElementById("signinform");
  var email = signin_form.elements["email"];
  var password = signin_form.elements["password"];

  var login_response = serverstub.signIn(email.value, password.value);
  if(login_response.success){
    password.setCustomValidity("");
    localStorage.setItem('token', login_response.data);
    displayView();
  }else{
    document.getElementById("loginfail").innerHTML = login_response.message;
    //password.setCustomValidity(login_response.message);
  }
};

logOut = function(){
  serverstub.signOut(localStorage.getItem("token"));
  localStorage.removeItem("token");
  displayView();
}

resetMessage = function(){
  document.getElementById("signupform").elements["email"].setCustomValidity("");
}

window.onload = function(){
  displayView();
  //code that is executed as the page is loaded.
  //You shall put your own custom code here.
  //window.alert() is not allowed to be used in your implementation.

};
