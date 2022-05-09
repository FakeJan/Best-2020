let pogodba;
const gasLimit = 200000;
const provider = {
  server: "localhost",
  port: 8545,
};

function loadJSON(pot) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          if (error) reject(xhr);
        }
      }
    };
    xhr.open("GET", pot, true);
    xhr.send();
  });
}

const osveziStatusDogodka = async () => {
  let statusDogodka = (await pogodba.vrniStatusDogodka()).toNumber();
  let opisStatusaDogodka = "Neznan status";
  let vsiStatusiDogodka = [
    /* 0 */ "Aktiven",
    /* 1 */ "Koncan",
    /* 2 */ "Preklican",
  ];
  if (statusDogodka < vsiStatusiDogodka.length)
    opisStatusaDogodka = vsiStatusiDogodka[statusDogodka];

  // Status na spletni strani
  for (let i = 0; i < vsiStatusiDogodka.length; i++) {
    let zapStStatusa = document.querySelector("#korak" + (i + 1) + " span");
    let opisStatusa = document.querySelector("#korak" + (i + 1) + " div");
    zapStStatusa.classList.remove("bg-light");
    zapStStatusa.classList.remove("text-muted");
    opisStatusa.classList.remove("text-muted");
    if (i == statusDogodka) {
      if (opisStatusaDogodka == 'Preklican') {
        zapStStatusa.classList.add("bg-danger");
        opisStatusa.classList.add("text-danger");
      } else if (opisStatusaDogodka == 'Koncan') {
        zapStStatusa.classList.add("bg-warning");
        opisStatusa.classList.add("text-warning");
      } else {
        zapStStatusa.classList.add("bg-success");
        opisStatusa.classList.add("text-success");
      }
    } else {
      zapStStatusa.classList.add("bg-light");
      zapStStatusa.classList.add("text-muted");
      opisStatusa.classList.add("text-muted");
    }
  }
  document.querySelector('#koncajDogodek').disabled = 
    statusDogodka != 0;
  document.querySelector('#prekliciDogodek').disabled = 
    statusDogodka != 0;
  document.querySelector('#gumbOddajDonacijo').disabled = 
    statusDogodka != 0;
  document.querySelector('#prijavaNaDogodek').disabled = 
    statusDogodka != 0;

  document.querySelector("#povracilo").disabled = 
    statusDogodka != 2;
};

const osveziSeznamPrijavljenih = async () => {
  let dogodki = await pogodba.getPastEvents("PrijavaUporabnikaDogodek", {
    fromBlock: 1,
    toBlock: "latest",
  });

  let nasloviPrijavljenih = [];
  let seznamPrijavljenih = "";

  if (dogodki.length > 0) {
    nasloviPrijavljenih = dogodki.map((x) => x.returnValues.uporabnik);
    console.log(nasloviPrijavljenih);
    seznamPrijavljenih += "<ul>";
    for (let i = 0; i < nasloviPrijavljenih.length; i++)
    seznamPrijavljenih +=
        "<li><code class='text-success'>" +
        nasloviPrijavljenih[i].substring(0, 5) +
        "..." +
        nasloviPrijavljenih[i].slice(-4) +
        "</code></li>";
    seznamPrijavljenih += "</ul>";
    document.querySelector("#seznamPrijavljenih").innerHTML = seznamPrijavljenih;
  }
};

const osveziSeznamDonatorjev = async () => {
    let dogodki = await pogodba.getPastEvents("DonacijaDogodek", {
      fromBlock: 1,
      toBlock: "latest",
    });

    let nasloviDonatorjev = [];
    let seznamDonatorjev = "";

    console.log(dogodki)

    if (dogodki.length > 0) {
      nasloviDonatorjev = dogodki.map((x) => x.returnValues.donator);
      kolicineDonacij = dogodki.map((x) => x.returnValues.vrednost);
      seznamDonatorjev += "<ul>";
      for (let i = 0; i < nasloviDonatorjev.length; i++)
      seznamDonatorjev +=
          "<li><code class='text-success'>" +
          nasloviDonatorjev[i].substring(0, 5) +
          "..." +
          nasloviDonatorjev[i].slice(-4) + " .  .  .  .  . " + kolicineDonacij[i]/1000000000000000000 +
          " eth</code></li>";
      seznamDonatorjev += "</ul>";
      document.querySelector("#seznamDonatorjev").innerHTML = seznamDonatorjev;
    }
};

const oddajDonacijo = async () => {
  let naslovUporabnika = await vrniUporabnika();
  let donacijaKolicina = document.querySelector("#donacijaKolicina").value * 1000000000000000000;
  let jePrijavljenUporabnik = await pogodba.jePrijavljenUporabnik(naslovUporabnika);
  let aktivenDogodek = (await pogodba.vrniStatusDogodka()) == 0;

  if (donacijaKolicina && jePrijavljenUporabnik && aktivenDogodek) {
    await pogodba.doniranje({
      from: naslovUporabnika,
      gas: gasLimit,
      value: donacijaKolicina,
    });
  } else {
    neDovoliIzvajanja('niPrijavljenError');
  } 
  osveziSeznamDonatorjev();
}

const prijavaNaDogodek = async () => {
  let naslovUporabnika = await vrniUporabnika();
  let jePrijavljenUporabnik = await pogodba.jePrijavljenUporabnik(naslovUporabnika);
  if (naslovUporabnika && !jePrijavljenUporabnik) {
    await pogodba.prijavaNaDogodek({
      from: naslovUporabnika,
      gas: gasLimit,
    });
  } else {
    neDovoliIzvajanja('prijavaError');
  } 
  osveziSeznamPrijavljenih();
}

const koncajDogodek = async (akcija = "koncaj") => {
  let lastnik = await vrniUporabnika();
  let jeLastnik = await pogodba.jeLastnik(lastnik);

  if(jeLastnik) {
    if (akcija == "koncaj") {
      await pogodba.koncajDogodek({
        from: lastnik,
        gas: gasLimit,
      });
    } else if (akcija == "preklici") {
      await pogodba.prekiniDogodek({
        from: lastnik,
        gas: gasLimit,
      })
    }
  } else {
    neDovoliIzvajanja('koncajError');
  }
  
  osveziStatusDogodka();
};

const povracilo = async () => {
  let naslovUporabnika = await vrniUporabnika();
  let imaUporabnikDonacije = await pogodba.imaUporabnikDonacije(naslovUporabnika);
  let jePrijavljenUporabnik = await pogodba.jePrijavljenUporabnik(naslovUporabnika);
  if(jePrijavljenUporabnik) {
    if (naslovUporabnika && imaUporabnikDonacije) {
      await pogodba.povracilo({
        from: naslovUporabnika,
        gas: gasLimit,
      });
    } else {
      neDovoliIzvajanja('povraciloError');
    };
  } else {
    neDovoliIzvajanja('povraciloPrijavljenError');
  }
  
}

const vrniUporabnika = async () => {
  if (typeof window.ethereum !== "undefined") {
    // Poveži se na MetaMask
    const racuni = await ethereum.request({ method: "eth_requestAccounts" });
    return racuni[0];
  } else return null;
};

const neDovoliIzvajanja = (id) => {
  document.getElementById(id).style.display = "block";
  setTimeout(() => {document.getElementById(id).style.display = "none"}, 5000);
};

window.onload = async () => {
    let donacije = await TruffleContract(await loadJSON("/ABI/DonacijeDogodek.json"));
    donacije.setProvider(
    new Web3.providers.WebsocketProvider(
        "ws://" + provider.server + ":" + provider.port
    )
    );
    pogodba = await donacije.deployed();

    document.getElementById('niPrijavljenError').style.display = "none";
    document.getElementById('koncajError').style.display = "none";
    document.getElementById('prijavaError').style.display = "none";
    document.getElementById('povraciloError').style.display = "none";
    document.getElementById('povraciloPrijavljenError').style.display = "none";
 
    osveziStatusDogodka();
    osveziSeznamPrijavljenih()
    osveziSeznamDonatorjev();
};