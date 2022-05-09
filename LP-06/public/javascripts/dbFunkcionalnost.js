function vnesiPodatke() {
    fetch("/db/podatki/vnos", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(odgovor => {
        if(odgovor.status == 201){
            //uspesno vneseni podatki
            document.querySelector("#vnosPodatkovSporociloOk").style.display="block";
            setTimeout(vnosSporociloOdstranitev,3000);
        }else{
            //ni uspelo
            document.querySelector("#vnosPodatkovSporociloError").style.display="block";
            setTimeout(vnosSporociloOdstranitev, 3000);
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function odstraniPodatke() {

    fetch("/db/podatki/odstranitev", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(odgovor => {
        if(odgovor.status == 204){
            //uspesno izbrisani podatki
            document.querySelector("#odstranitevPodatkovSporociloOk").style.display="block";
            setTimeout(odstraniSporociloOdstranitev, 4000);
        }else{
            //ni uspelo
            document.querySelector("#odstranitevPodatkovSporociloError").style.display="block";
            setTimeout(odstraniSporociloOdstranitev, 4000);
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function odstraniSporociloOdstranitev(){
    document.querySelector("#odstranitevPodatkovSporociloOk").style.display="none";
    document.querySelector("#odstranitevPodatkovSporociloError").style.display="none";
}
function vnosSporociloOdstranitev(){
    document.querySelector("#vnosPodatkovSporociloOk").style.display="none";
    document.querySelector("#vnosPodatkovSporociloError").style.display="none";
}