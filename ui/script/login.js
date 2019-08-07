const validateUser = (form)=>{
  if (form.email.value === "serge@gmail.com" || form.password.value === "serge") { 

  window.open("../pages/admin-trips.html", "_self")
}
else{
  // document.querySelector('#login-admin').click();
  window.open("../pages/trips.html", "_self")

}
}