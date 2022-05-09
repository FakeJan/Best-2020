//ce uporabnik ni prijavljen
if(sessionStorage.getItem("uporabnik")==null){
    if(!(window.location.href.endsWith("login") || window.location.href.endsWith("signup"))){
        window.location.replace("/");
    }
}