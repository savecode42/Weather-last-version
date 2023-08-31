// API Key Weather Map
const apiKey = '16d0e9b7f70c50f639829ffe53668dfe'; // API Key Weather Map

// URL pour se connecter à l'API et demander les données météorologiques actuelles
const apiRoot = 'https://api.openweathermap.org/data/2.5/weather?lat=';
// URL pour se connecter à l'API et demander les prévisions météorologiques
const apiRootForcast = 'https://api.openweathermap.org/data/2.5/forecast?lat=';

// Déclaration de variable pour stocker la latitude
let lat;

// Déclaration de variable pour stocker la longitude
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

const slideBarOpen = document.querySelector('#slide-bar-open');
console.log(slideBarOpen);

// Déclaration de la variable city pour cibler la zone de texte
let city = document.querySelector('#city_search');
console.log(city);

// Déclaration de la variable submitButton pour cibler le bouton de validation de la zone texte
let submitButton = document.getElementById('search_img');
console.log(submitButton);

// Ajout d'un lecteur d'événement sur le bouton, au clic avec un paramètre event
submitButton.addEventListener('click', event => {
  console.log('ok');
  event.preventDefault(); // Permet de stopper le comportement du bouton.

  // Rassemblement des variables pour créer une URL contenant la clé API pour l'API de géocodage
  const apiGeoCoderRoot = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=0&appid=' + apiKey;
  console.log(apiGeoCoderRoot);

   // Appel de l'API de géocodage pour obtenir les coordonnées géographiques de la ville saisie
  fetch(apiGeoCoderRoot) 
    .then(reponse => {
      return reponse.json();
    })
    .then(data => {
      console.log(data);
      console.log(data[0]);

      // Récupération des coordonnées de latitude et longitude à partir des données de l'API de géocodage
      lat = data[0].lat;
      console.log(data[0].lat);

      lon = data[0].lon;
      console.log(data[0].lon);
      // Création de l'URL pour l'API météo en utilisant les coordonnées géographiques et la clé API
      const apiQuery = apiRoot + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';
      console.log(apiQuery);

      // Appel de l'API météo pour obtenir les données météorologiques actuelles
      fetch(apiQuery)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          console.log(data);

          // Affichage du nom de la ville en majuscules dans les éléments HTML ayant la classe 'city'
          const cityWeather = document.querySelectorAll('.city');
          cityWeather.forEach(element => (element.innerText = data.name.toUpperCase()));

          const weatherLogo = document.getElementById('weather_logo');

          // Switch pour afficher les images en fonction de la météo
          switch (data.weather.main) {
            case 'Clear':
              weatherLogo.src = './medias/sunny.svg';
              break;
            case 'Clouds':
              weatherLogo.src = './medias/wind.svg';
              break;
            case 'Rain':
              break;
            case 'Thunderstorm':
              weatherLogo.src = './medias/thunderstorm.svg';
              break;
            case 'Snow':
              weatherLogo.src = './medias/snow.svg';
              break;
            case 'Mist':
              break;
          }

          // Mise à jour du texte HTML avec les informations météorologiques récupérées
          document.getElementById('temp').innerText = data.main.temp + '°C';
          document.getElementById('kmh').innerText = data.wind.speed + 'km/h';
          document.getElementById('mmh').innerText = data.main.humidity + '%';

          // Permet de Basculer la classe 'invisible'
          slideBarOpen.classList.toggle('invisible');
          // Permet de basculer la classe 'flecheup'
          deployButton.classList.toggle('flecheup');

          const timeStamp = data.dt;
          console.log(dateHour(timeStamp));
        });
    });
});

// Permet d'écouter le clic du bouton pour afficher/masquer un élément
deployButton.addEventListener('click', event => {
  event.preventDefault();

  // Permet de Basculer la classe 'invisible'
  slideBarOpen.classList.toggle('invisible');
  // Permet de basculer la classe 'flecheup'
  deployButton.classList.toggle('flecheup');
});

// Sélection des éléments HTML pour les boutons de prochaines heures et prochains jours
let nextHour = document.getElementById('next_hour');
let nextDay = document.getElementById('next_day');

// Permet d'exécuter la transition des slides via les boutons prochaines heures et prochains jours
nextHour.addEventListener('click', event => {
  swiper.slideTo(2);
});
nextDay.addEventListener('click', event => {
  swiper.slideTo(0);
});

// Fetch pour récupérer les prévisions météorologiques des prochaines heures
submitButton.addEventListener('click', event => {
  console.log('ok');
  event.preventDefault(); // Permet de stopper le comportement du bouton.

  // Rassemblement des variables pour créer une variable contenant la clé
  const apiGeoCoderRoot = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=0&appid=' + apiKey;
  console.log(apiGeoCoderRoot);

  fetch(apiGeoCoderRoot) // Fonction qui permet de lancer l'url
    .then(reponse => {
      return reponse.json();
    })
    .then(data => {
      console.log(data);
      console.log(data[0]);

      lat = data[0].lat;
      console.log(data[0].lat);

      lon = data[0].lon;
      console.log(data[0].lon);

      const apiQuery = apiRootForcast + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';
      console.log(apiQuery);

      fetch(apiQuery)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          console.log(data);

          // Appel de la fonction pour afficher les prévisions
          displayForecast(data);

          document.getElementById('first_temp').innerText = data.list[0].main.temp + '°C';
          document.getElementById('first_humidity').innerText = data.list[0].main.humidity + ' mm/h';

          document.getElementById('second_temp').innerText = data.list[1].main.temp + '°C';
          document.getElementById('second_humidity').innerText = data.list[1].main.humidity + ' mm/h';

          document.getElementById('third_temp').innerText = data.list[2].main.temp + '°C';
          document.getElementById('third_humidity').innerText = data.list[2].main.humidity + ' mm/h';

          document.getElementById('fourth_temp').innerText = data.list[3].main.temp + '°C';
          document.getElementById('fourth_humidity').innerText = data.list[3].main.humidity + ' mm/h';

          document.getElementById('first_day_temp').innerText = data.list[8].main.temp + '°C';
          document.getElementById('first_day_humidity').innerText = data.list[8].main.humidity + ' mm/h';

          document.getElementById('second_day_temp').innerText = data.list[16].main.temp + '°C';
          document.getElementById('second_day_humidity').innerText = data.list[16].main.humidity + ' mm/h';

          document.getElementById('third_day_temp').innerText = data.list[24].main.temp + '°C';
          document.getElementById('third_day_humidity').innerText = data.list[24].main.humidity + ' mm/h';

          document.getElementById('fourth_day_temp').innerText = data.list[32].main.temp + '°C';
          document.getElementById('fourth_day_humidity').innerText = data.list[32].main.humidity + ' mm/h';
        });
    });
});

// Fonction pour afficher les prévisions des prochains jours et des prochaines heures
function displayForecast(data) {
  // Prévisions des prochains jours
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 4);

  console.log('Prévisions des prochains jours :');
  dailyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt_txt);
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    console.log(`${dayName}: ${forecast.main.temp}°C, ${forecast.weather[0].description}`);
  });

  // Prévisions des prochaines heures
  const hourlyForecasts = data.list.slice(0, 4);

  console.log('Prévisions des prochaines heures :');
  hourlyForecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    console.log(`${time}: ${forecast.main.temp}°C, ${forecast.weather[0].description}`);
  });
}