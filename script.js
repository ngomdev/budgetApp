"use strict"

// Acces par id

const balanceEl = document.getElementById("balance");

const soldeEl = document.getElementById("solde");

const tnxname = document.getElementById("name");

const revenuEl = document.getElementById("revenu");

const depenseEl = document.getElementById("depense");

const tnxmontant = document.getElementById("montant");

const saveButton = document.getElementById("save");

const displayList = document.getElementById("list_of_transaction");

const cancelBtn = document.getElementById("cancel");

// variable liste transactions tableaux
let listOfTransactions = [];

let symbole = "XOF";

let balance = 0;


// founction rendu pour  le UI
function rendu(){
   
   balance = listOfTransactions.reduce((total, value)=>
   {
    return value.type == "depense" ? total - value.montant :
    total + value.montant
   },0)


    // l'affichage de la liste des transaction
    displayList.innerHTML = "";

    if(listOfTransactions.length == 0){
        displayList.innerHTML = "Aucune Transaction Effectuer ";
    }else{
        listOfTransactions.forEach((e,i) => {
            displayList.innerHTML += `
            
            <li class="transaction ${e.type}">
                <p>${e.name}</p>
                <div class="right_side">
                    <p>${e.montant} ${symbole}</p>
                    <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
                    <button onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>
                </div>

           </li>
            
            `;
        })
    }




    balanceEl.innerHTML= balance;
    soldeEl.innerHTML = symbole;
    saveData();
}

let editIndex = -1;
// fonction pour modifier une transaction
function edit(i){
  cancelBtn.style.display = "block";
    editIndex = i;
    tnxname.value = listOfTransactions[i].name;
    tnxmontant.value = listOfTransactions[i].montant;
    if(listOfTransactions[i].type == "revenu"){
        revenuEl.checked = true;
    }else{
        depenseEl.checked = true;
    }
 
}


// fonction pour supprimer une transaction
function del(i){
    listOfTransactions = listOfTransactions.filter((e,index) =>
    i!== index);
    rendu();

}

// fonction pour enregistrer les donnees dans le localStorage
function saveData(){
    localStorage.setItem("symbole",symbole);
    localStorage.setItem("balance",balance);
    localStorage.setItem("list",JSON.stringify(listOfTransactions));
}

// fonction pour charger les donnees dans le localStorage

function loadData(){
listOfTransactions = JSON.parse(localStorage.getItem("list"));

symbole =  localStorage.getItem("symbole");
balance = Number(localStorage.getItem("balance"));


}

cancelBtn.addEventListener("click",()=>{
    editIndex = -1;
    tnxname.value = "";
    tnxmontant.value = "";
   
   
   
   
    
    cancelBtn.style.display = "none";
})

// fonction écouteur d'evenement pour le bouton ajouter une transaction
saveButton.addEventListener("click",() =>{

if(tnxname.value == "" || Number(tnxmontant.value) <= 0){
    alert("Les valeurs sont incorrectes");
    return
}


 let transaction = {
    name : tnxname.value,
    montant : Number(tnxmontant.value),
    
    type : revenuEl.checked? "revenu" : "depense"
           
    
 }

 if(editIndex == -1) listOfTransactions.push(transaction);

 else
   listOfTransactions[editIndex] = transaction;

 
 editIndex = -1;
 tnxname.value = "";
 tnxmontant.value = "";




 rendu();
 cancelBtn.style.display = "none";

})


loadData();

rendu();