// Liste des photos à comparer
const photos = [
    "images/photo1.jpg",
    "images/photo2.jpeg",
    "images/photo3.jpeg",
    "images/photo4.png",
    "images/photo5.png",
    "images/photo6.png",
    "images/photo7.jpegg",
    "images/photo8.png"
];

// Créer un objet pour stocker les scores
const scores = {};

// Initialiser les scores à zéro
photos.forEach(photo => {
    scores[photo] = 0;
});

let currentWinner = null;
let currentIndex = 0;

const imgLeft = document.getElementById('img-left');
const imgRight = document.getElementById('img-right');
const duelDiv = document.getElementById('duel');
const winnerDiv = document.getElementById('winner');
const finalPhoto = document.getElementById('final-photo');

// Ajouter un nouvel élément pour le classement
const classementDiv = document.createElement('div');
classementDiv.id = "classement";
document.body.appendChild(classementDiv);

// Initialiser la première comparaison
function startDuel() {
    currentWinner = photos[currentIndex];
    currentIndex++;
    showNextPhoto();
}

function showNextPhoto() {
    if (currentIndex >= photos.length) {
        // Fin du tournoi, afficher la photo gagnante
        duelDiv.style.display = "none";
        winnerDiv.style.display = "block";
        finalPhoto.src = currentWinner;
        showClassement();
    } else {
        // Afficher la photo gagnante actuelle contre la prochaine photo
        imgLeft.src = currentWinner;
        imgRight.src = photos[currentIndex];
    }
}

function choosePhoto(side) {
    if (side === 'left') {
        scores[currentWinner]++;
    } else if (side === 'right') {
        scores[photos[currentIndex]]++;
        currentWinner = photos[currentIndex];
    }
    currentIndex++;
    showNextPhoto();
}

function showClassement() {
    classementDiv.innerHTML = "<h2>Classement des Photos 📊</h2>";

    // Convertir l'objet scores en tableau pour trier
    const sortedPhotos = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    sortedPhotos.forEach(([photo, score]) => {
        classementDiv.innerHTML += `
            <div class="classement-item">
                <img src="${photo}" alt="Photo" class="mini-photo">
                <span><strong>${score}</strong> votes</span>
            </div>
        `;
    });
}

// Démarrer le duel
startDuel();
