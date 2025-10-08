 import dayjs from "https://esm.sh/dayjs";
 import "https://esm.sh/dayjs/locale/fr";

 dayjs.locale('fr');


const mois_du_calendrier = document.querySelector(".current-date");
const mois_precedent = document.querySelector(".fa-chevron-left");
const mois_suivant = document.querySelector(".fa-chevron-right");
const days_container = document.querySelector(".days");
//ajouter les autres querySelector par exemple pour les li de ul.days en All
//et aussi la partie affichage du programme de la journée 
const date = dayjs();


let month = date.get("month");// de 0 a 11
let year = date.get("year");// années donc infini
let longueur_mois = format("durée du mois",month,year);
let debut_du_mois = format("debut du mois",month,year);
let longueur_mois_precedent = format("durée du mois",month-1,year);


afficherLeMois();


//modifier le addEventListener pour les fleches en forEach
mois_precedent.addEventListener("click", function() {
    month -=1;
    if(month<0) {
        year-=1;
        month=11;
    }
    if(month>11) {
        year+=1;
        month=0;
    }
    longueur_mois = format("durée du mois",month,year);
    debut_du_mois = format("debut du mois",month,year);
    longueur_mois_precedent = format("durée du mois",month-1,year);
    afficherLeMois();
});

//peut etre changer ça en forEache, 17min43s dans la video 

mois_suivant.addEventListener("click", function() {
    month+=1;
    if(month<0) {
        year-=1;
        month=11;
    }
    if(month>11) {
        year+=1;
        month=0;
    }
    longueur_mois = format("durée du mois",month,year);
    debut_du_mois = format("debut du mois",month,year);
    longueur_mois_precedent = format("durée du mois",month-1, year);
    afficherLeMois();
});


function afficherLeMois() {//le fonction d'affichage est comme je le veux

    let days_off_month ="";
    let nombre_de_jours = 0;

    //je genere mes chiffres de mon mois avec des nombres
    for( let i= longueur_mois_precedent-debut_du_mois+2; i<= longueur_mois_precedent; i++) {
        days_off_month += `<li class="inactive">${i}</li>`;
        nombre_de_jours+=1;
    }

    for( let i= 1; i <= longueur_mois; i++) {
        if(date.get('D') === i && date.get('M') === month && date.get('y') === year) {
            days_off_month += `<li class="active">${i}</li>`;
        }
        else {
            days_off_month += `<li>${i}</li>`;
        }
        nombre_de_jours+=1;
    }

    const nombre_a_ajouter = Math.ceil(nombre_de_jours/7)*7-nombre_de_jours;

    for(let i=1; i<=nombre_a_ajouter;i++){
        days_off_month += `<li class="inactive">${i}</li>`;
    }

    //partie ajouter dans l'html
    mois_du_calendrier.innerHTML = dayjs().set('month', month).set('year', year).format("MMMM YYYY") ;
    days_container.innerHTML = days_off_month;
};


function format(type, mois, annee) {//okk l'affichage est bon
    if(type === "durée du mois") {
        return date.set('month', mois).set('year',annee).daysInMonth();
    }
    if(type === "debut du mois") {
        
        const debut = date.set('month', mois).set('year',annee).startOf('month').get('day');
        if(debut === 0) {
            return debut+7
        } 
        else {
            return debut
        }
    }
}