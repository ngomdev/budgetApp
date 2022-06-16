"use strict"

// Acces par id

const balanceEl = document.getElementById("balance")

const soldeEl = document.getElementById("solde")

const tnxname = document.getElementById("name")

const revenuEl = document.getElementById("revenu")

const depenseEl = document.getElementById("depense")

const tnxmontant = document.getElementById("montant")

const saveButton = document.getElementById("save")

const displayList = document.getElementById("list_of_transaction")

const cancelBtn = document.getElementById("cancel");

// variable liste transactions tableaux
let listOfTransactions = [];

let symbole = "XOF";

let balance = 0;

let editIndex = -1;
// fonction pour modifier une transaction
function edit(i){
    editIndex = i;


    tnxname.value = listOfTransactions[i].name;
    tnxmontant.value = listOfTransactions[i].montant;
    if(listOfTransactions[i].type == "revenu"){
        revenuEl.checked = true;

    }else{
        depenseEl.checked = true;
    }

 cancelBtn.style.display = "block";
}

// fonction pour supprimer une transaction

function del(i){
    listOfTransactions = listOfTransactions.filter((e,index) => i !== index);
    rendu();
}

// fonction pour sauvegarder nos donnees dans le local storage
function saveData(){
    localStorage.setItem("symbole",symbole);
    localStorage.setItem("balance",balance);
    localStorage.setItem("listOfTransactions",JSON.stringify(listOfTransactions));


}

// fonction pour charger les donnees dans le local

function loadData(){
    listOfTransactions = JSON.parse(localStorage.getItem("listOfTransactions"));

    symbole = localStorage.getItem("symbole");

    balance = Number(localStorage.getItem("balance"));


}


// fonction rendu pour le UI
function rendu(){
    
        
        let balance = listOfTransactions.reduce(
            (total, value) => {
        return value.type == "depense" ?
        total - value.montant : total + value.montant},0);
        
          displayList.innerHTML ="";
          if(listOfTransactions.length == 0){
            displayList.innerHTML+= "Aucune Transactions Effectuée";
          }
    
          else{
            listOfTransactions.forEach((e,i)=>{
            displayList.innerHTML+= `
            
            <li class="transaction ${e.type} ">
                <p>${e.name}</p>
                <div class="right_side">
                    <p>${e.montant} ${symbole}</p>
                    <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
                    <button onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>
                </div>
    
            </li>`;
    
        })
       
    
       }
    
            soldeEl.innerHTML = symbole;
            balanceEl.innerHTML = balance;
            saveData();  

    }
  

cancelBtn.addEventListener("click",() =>{
 editIndex = -1;
 tnxname.value = "";
 tnxmontant.value = "";

 rendu();
 cancelBtn.style.display = "none";

})
// Ecouteur d'evenement sur le bouton ajouter transction
saveButton.addEventListener("click",() =>{
    
    if(tnxname.value == "" || Number
    (tnxmontant.value)<=0 ){
        alert("Ne pas faire cela!");
        return;
    }


    let transaction = {
        name : tnxname.value,
        montant: Number(tnxmontant.value),
        type : revenuEl.checked? "revenu":
        "depense"
    }
if(editIndex == -1) {
    listOfTransactions.push(transaction);
}

else{
listOfTransactions[editIndex] = transaction;
}

editIndex = -1;

 
 tnxname.value = "";
 tnxmontant.value = "";

 rendu();
 cancelBtn.style.display = "none";




})













loadData();
//rendu();



