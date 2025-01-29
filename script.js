const titre = document.getElementById("titre");
const realisateur = document.getElementById("realisateur");
const sortie = document.getElementById("sortie");
const genre = document.getElementById("genre");
const statut = document.getElementById("statut");
const img = document.getElementById("img");
const description = document.getElementById("description");
const submit = document.getElementById("btn_ajouter");

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


submit.onclick = function(){
    
    dataArray.push({
        titre : titre.value,
        realisateur: realisateur.value,
        sortie: sortie.value,
        genre: genre.value,
        statut: statut.value,
        img: img.value,
        description: description.value
    });

    console.log(dataArray);

    localStorage.setItem("films", JSON.stringify(dataArray));

    showFilms();

}
























