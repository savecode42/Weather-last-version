

/*
* API weather Map avec recherche par lat et lon
* https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
*
*/
const apiKey = `16d0e9b7f70c50f639829ffe53668dfe`; //API Key Weather Map

//URL pour se connecter à l'API et demander 
const apiRoot = "https://api.openweathermap.org/data/2.5/weather?lat="; 
const apiRootForcast = "https://api.openweathermap.org/data/2.5/forecast?lat=";

//Déclaration de variable latitude et longitude 
let lat;
let lon;

/**
 * 
 * SLIDE BAR
 * 
 */

const deployButton = document.querySelector('#submitbtn');
console.log(deployButton);

const citySearch = document.querySelector('#city-search');
console.log(citySearch);

const slideBarOpen = document.querySelector("#slide-bar-open");
console.log(slideBarOpen);

//Pour la page Main
//const parametersBtn = document.querySelector("#parameters");
//console.log(parametersBtn);

const cardFront = document.querySelector("#card-front");
console.log(cardFront);

/*
* FETCH
* API convertir ville en lat et long
* Nécessaire pour Weather Map
*
* URL à paramétrer 
*http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
*/

//Déclaration de la variable city pour cibler la zone de texte
let city = document.querySelector("#city_search");
console.log(city);

//Déclaration de la variable submitButton pour cibler le bouton de validation de la zone texte
let submitButton = document.getElementById("search_img");
console.log(submitButton);

// Ajout d'un lecteur d'événement sur le bouton, au clic avec un paramètre event
submitButton.addEventListener("click", event => {
    console.log("ok");
    event.preventDefault(); //Permet de stopper le comportement du bouton.
    
    //Rassemblement des variables pour créer une variable contenant la clé
    const apiGeoCoderRoot = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=0&appid=" + apiKey;
    console.log(apiGeoCoderRoot);

    fetch(apiGeoCoderRoot)// Fonction qui permet de lancer l'url
    .then((reponse)=>{
        return reponse.json()//
    })
    .then((data)=>{
        console.log(data)
        console.log(data[0])

        lat = data[0].lat
        console.log(data[0].lat)


        lon = data[0].lon
        console.log(data[0].lon)

        const apiQuery = apiRoot + lat + "&lon=" + lon + "&appid=" + apiKey+ "&units=metric";
        console.log(apiQuery);

        fetch(apiQuery)
        .then((reponse)=>{
            return reponse.json();
        })
        .then((data)=>{
            console.log(data);
            const cityWeather = document.querySelectorAll('.city');
            cityWeather.forEach(element => element.innerText = data.name.toUpperCase());

            
            const weatherLogo = document.getElementById("weather_logo");
            // Switch pour afficher les images en fonction de la météo
            switch(data.weather.main){
                case "clear sky":
                    weatherLogo.src = "./medias/sunny.svg";
                    break;
                case "few clouds":                    
                case "scattered clouds":
                case "broken clouds":
                    weatherLogo.src = "./medias/wind.svg";
                    break;
                case "shower rain":
                case "rain":
                    break;
                case "thunderstorm":
                    weatherLogo.src = "./medias/thunderstorm.svg";
                    break;
                case "snow":
                    weatherLogo.src = "./medias/snow.svg";
                    break;
                case "mist":
                    break;
            }

            // Permet de modifier le texte html avec les infos récupérés
            document.getElementById("temp").innerText = data.main.temp + "°C";
            document.getElementById("kmh").innerText = data.wind.speed + "km/h";
            document.getElementById("mmh").innerText = data.main.humidity + "%";

                //Permet de Basculer la classe
                slideBarOpen.classList.toggle("invisible");
                //Permet de basculer la  classe
                deployButton.classList.toggle("flecheup");
        })
    })
    

});

//Permet d'écouter le clic du bouton
deployButton.addEventListener('click', (event) =>{

    event.preventDefault();

    //Permet de Basculer la classe
    slideBarOpen.classList.toggle("invisible");
    //Permet de basculer la  classe
    deployButton.classList.toggle("flecheup");
    
});

let nextHour = document.getElementById('next_hour');
let nextDay = document.getElementById('next_day');

// Permet d'exécuter la transition des slides via les boutons prochaines heures et prochains jours
nextHour.addEventListener('click', (event)=> {
    swiper.slideTo(2);
});
nextDay.addEventListener('click', (event)=>{
    swiper.slideTo(0);
});

//fetch pour la météo des prochaines heures

submitButton.addEventListener("click", event => {
    console.log("ok");
    event.preventDefault(); //Permet de stopper le comportement du bouton.
    
    //Rassemblement des variables pour créer une variable contenant la clé
    const apiGeoCoderRoot = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=0&appid=" + apiKey;
    console.log(apiGeoCoderRoot);

    fetch(apiGeoCoderRoot)// Fonction qui permet de lancer l'url
    .then((reponse)=>{
        return reponse.json()//
    })
    .then((data)=>{
        console.log(data)
        console.log(data[0])

        lat = data[0].lat
        console.log(data[0].lat)


        lon = data[0].lon
        console.log(data[0].lon)

        const apiQuery = apiRootForcast + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
        console.log(apiQuery);

        fetch(apiQuery)
        .then((reponse)=>{
            return reponse.json();
        })
        .then((data)=>{
            console.log(data);
            
            document.getElementById("first_temp").innerText = data.list[0].main.temp + "°C";

            document.getElementById("first_humidity").innerText = data.list[0].main.humidity + " mm/h";
            
            document.getElementById("second_temp").innerText = data.list[1].main.temp + "°C";

            document.getElementById("second_humidity").innerText = data.list[1].main.humidity + " mm/h";
            
            document.getElementById("third_temp").innerText = data.list[2].main.temp + "°C";

            document.getElementById("third_humidity").innerText = data.list[2].main.humidity + " mm/h";
            
            document.getElementById("fourth_temp").innerText = data.list[3].main.temp + "°C";

            document.getElementById("fourth_humidity").innerText = data.list[3].main.humidity + " mm/h";

            document.getElementById("first_day_temp").innerText = data.list[8].main.temp + "°C";
    
            document.getElementById("first_day_humidity").innerText = data.list[8].main.humidity + " mm/h";
            
            document.getElementById("second_day_temp").innerText = data.list[16].main.temp + "°C";

            document.getElementById("second_day_humidity").innerText = data.list[16].main.humidity + " mm/h";
            
            document.getElementById("third_day_temp").innerText = data.list[24].main.temp + "°C";

            document.getElementById("third_day_humidity").innerText = data.list[24].main.humidity + " mm/h";
            
            document.getElementById("fourth_day_temp").innerText = data.list[32].main.temp + "°C";

            document.getElementById("fourth_day_humidity").innerText = data.list[32].main.humidity + " mm/h";
            })
        })
    });

    