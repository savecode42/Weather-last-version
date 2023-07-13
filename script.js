const deployButton = document.querySelector('#submitbtn');
console.log(deployButton);

const citySearch = document.querySelector('#city-search');
console.log(citySearch);

const slideBarOpen = document.querySelector("#slide-bar-open");
console.log(slideBarOpen);

//const parametersBtn = document.querySelector("#parameters");
//console.log(parametersBtn);

const cardFront = document.querySelector("#card-front");
console.log(cardFront);



//Permet d'écouter le clic du bouton
deployButton.addEventListener('click', (event) =>{

    event.preventDefault();

    //Permet de Basculer la classe
    slideBarOpen.classList.toggle("invisible");
    //Permet de basculer la  classe
    deployButton.classList.toggle("flecheup");
    
});

// Déclarer const et lui donner la valeur de l'élément à créer exemple img
const blockParameters = document.createElement("img");
//Donner la source de l'img à la const
blockParameters.src ="./assets/medias/parameters-icon.svg";
//
document.getElementById("block-parameters").append(blockParameters);

const blockLogo = document.createElement("img");
blockLogo.src ="./assets/medias/Ellipse6.svg";
document.getElementById("logo").append(blockLogo);

const blockTexte = document.createElement("p");
blockTexte.textContent = 'TEXTE TEXTE TEXTE TEXTE TEXTE TEXTE';
document.getElementById("text").append(blockTexte);

console.log(blockTexte);


blockParameters.addEventListener('click', () =>{
    
    cardFront.replaceChildren()
    
});

// const templatesPages = {
//     city: `Coucou !
//     `,
//     day: '<p>Du html</p>'
//   }
  
//   // Event listener click pour la page city =>
//   const elementDivCity = document.createElement('div');
//   elementDivCity.className = 'divParent';
//   elementDivCity.innerHTML = templatesPages.city;
  
//   document.body.append(elementDivCity);