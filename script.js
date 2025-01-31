const titre = document.getElementById("titre");
const realisateur = document.getElementById("realisateur");
const sortie = document.getElementById("sortie");
const genre = document.getElementById("genre");
const statut = document.getElementById("statut");
const img = document.getElementById("img");
const description = document.getElementById("description");
const allMovies = document.getElementById("tbody");
const btnSearch = document.getElementById("btnSearch");
const InputSearch = document.getElementById("search");
const detail = document.getElementById("detail");
const aaa = document.getElementById("aaa");
const btnAjouter = document.getElementById("btnAjouter");



var images = {
    img1: "images/the-witcher-season-1-poster-750x298-1.jpg",
    img2: "images/string things.jpg",
    img3: "images/game of thrones.jpg",
    img4: "images/teenwolf.jpg",
    img5: "images/the originals .jpg"
}

var dataArray;

if(localStorage.films != null){
    dataArray = JSON.parse(localStorage.films);
}else{
    dataArray = []; 
}





function Ajouter() {
    const reader = new FileReader();
        reader.onload = function (e) {
            let newmovie = {
                titre : titre.value,
                realisateur: realisateur.value,
                sortie: sortie.value,
                genre: genre.value,
                statut: statut.value,
                img: e.target.result,
                description: description.value
            };

            if(localStorage.mode === "update"){
                
                let indexSelect = JSON.parse(localStorage.getItem("index"));

                dataArray[indexSelect] = newmovie;
                localStorage.setItem("films", JSON.stringify(dataArray));
                btnAjouter.innerHTML = "Ajouter";
                document.getElementById("ajouterUnFilm").innerHTML = "Ajouter un film";
                localStorage.mode = "create";
                window.location.href = "accueil.html";

            }else{
                dataArray.push(newmovie);
                localStorage.setItem("films", JSON.stringify(dataArray));
                window.location.href = "accueil.html";
            }
        };
        
        reader.readAsDataURL(img.files[0]);
};




function showFilms(data) {
     
    let result = dataArray;
    console.log(data)
    if (data.lenght != 0) {
        if(dataArray.filter((film)=>film.titre.includes(InputSearch.value))){
            allMovies.innerHTML="";
            result = data;
        }
    }

    result.forEach((movie, index) => {

        const movieItem = document.createElement("div");
        movieItem.classList.add("div");


        movieItem.innerHTML = `
            <div class="card" id="card">
                <a href="detail.html" onclick="selectFilm(${index})" id="aaa"><img src="${movie.img}" class="card-img" ></a>
                
                <h3 class="card-title">${movie.titre}</h3>
            </div>
            
        `;
        allMovies.appendChild(movieItem);
    });

    
    
}




// fonction afficher les détails 

function selectFilm(index) {
    
    const selectedFilm = dataArray[index];
    localStorage.setItem("selectedfilm", JSON.stringify(selectedFilm));

    
    var indexSelect = index;
    localStorage.setItem("index", JSON.stringify(indexSelect));
    
}

function deleteFilm(){
    let indexSelect = JSON.parse(localStorage.getItem("index"));
    console.log(indexSelect);
    dataArray.splice(indexSelect,1);
    localStorage.films = JSON.stringify(dataArray);
    window.location.href = "accueil.html";
}

// modifier 

function gotoModifier(){
    mode = 'update';
    localStorage.setItem("mode", mode);
    location.href = "ajouter.html";
}

function Modifier(){
    if(localStorage.mode === "update"){
        btnAjouter.innerHTML = "Modifier";
        document.getElementById("ajouterUnFilm").innerHTML = "Modifier un film";

        let indexSelect = JSON.parse(localStorage.getItem("index"));
        titre.value = dataArray[indexSelect].titre;
        realisateur.value = dataArray[indexSelect].realisateur;
        sortie.value = dataArray[indexSelect].sortie;
        genre.value = dataArray[indexSelect].genre;
        statut.value = dataArray[indexSelect].statut;
        description.innerHTML = dataArray[indexSelect].description;
    }
}








 function showDetails() {

    let selectedFilm = JSON.parse(localStorage.getItem("selectedfilm"));
    

    let selectedItem = document.createElement("div");
    selectedItem.classList.add("selected");
        
        selectedItem.innerHTML = `
        
        <div class="details">
            <div class="gouche">
                <h1>${selectedFilm.titre}</h1>
                <h4>Genre: <samp>${selectedFilm.genre}</samp></h4>
                <h4>Année: <samp>${selectedFilm.sortie}</samp></h4>
                <h4>Réalisateur: <samp>${selectedFilm.realisateur}</samp></h4>
                <h4>Statut: <samp>${selectedFilm.statut}</samp></h4>

            </div>
            <div class="droite">
                <h4>Description</h4>
                <p>
                    ${selectedFilm.description}
                </p>
            </div>
            <div id="buttons">
                <button id="modifier" onclick="gotoModifier()">Modifier</button>
                <button id="supprimer" onclick="deleteFilm()">Supprimer</button>
            </div>
        </div>
        <img src="${selectedFilm.img}" >
        
        `;
        detail.appendChild(selectedItem);

};






