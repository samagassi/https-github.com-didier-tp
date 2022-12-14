function Produit(ref,label,prix){
	this.ref=ref;
	this.label=label;
	this.prix=prix;
}

//tableau associatif entre reférences de produit et produits complets
var mapProduitsByRef = [];
mapProduitsByRef['p1']= new Produit('p1','cahier',3.5);
mapProduitsByRef['p2']= new Produit('p2','stylo',1.2);
mapProduitsByRef['p3']= new Produit('p3','gomme',2.3);
mapProduitsByRef['p4']= new Produit('p4','classeur',4.1);


var selectedProdRef = 'p1';  //référence vers produit séléctionné

//second tableau associatif entre reférences de produit et quantité commandées
var mapSelProdQty = []; //map<selectedProd,qte> des produits avec quantité de la commande
//clef = ref produit , valeur = quantite

function affTabAssociatif(tab){
	for(clef in tab){
		console.log(clef + "-" + JSON.stringify(tab[clef]));
	}
}

//NB: mapProduitsByRef , selectedProdRef , mapSelProdQty sont
//à considérer comme des variables globales (visibles par toutes les fonctions)

//fonction qui ajoute les options (sélections possible) dans la liste html:
function initSelProd(){
	//var eltSelProd = document.getElementById("selProd");
	var eltSelProd = document.querySelector("#selProd"); //meme syntaxe que selecteur css
	//document.querySelectorAll() existe egalement
	for(let refProd in mapProduitsByRef){
		var eltOption = document.createElement("option");
		eltOption.innerText=mapProduitsByRef[refProd].label;
		eltOption.value=refProd;
		eltSelProd.appendChild(eltOption);
	}
	affTabAssociatif(mapProduitsByRef);
}

function addOrUpdateRowInTable(prodRef){
  var prod = mapProduitsByRef[prodRef];
  var qte = mapSelProdQty[prodRef];
  
  var existingRow = document.getElementById("r_"+prodRef);
  if(existingRow){
	  existingRow.cells[4].innerText = qte;
	  existingRow.cells[5].innerText = (qte * prod.prix).toFixed(2);
  }
  else{ //nouvelle ligne
	  var eltTbody = document.getElementById("bodyTableau");
	  var newRow = eltTbody.insertRow(-1) ;
	  newRow.setAttribute("id","r_"+prodRef);
	  newRow.insertCell(0).innerHTML = "<input type='checkbox' id='id_cb'></input>";
	  newRow.insertCell(1).innerHTML = prod.ref;
	  newRow.insertCell(2).innerHTML = prod.label;
	  newRow.insertCell(3).innerHTML = prod.prix;
	  newRow.insertCell(4).innerHTML = qte;
	  newRow.insertCell(5).innerHTML = (prod.prix * qte).toFixed(2);
	  
	  newRow.addEventListener("click",(event)=>{
		  console.log("event.type=" + event.type);
		  console.log("event.target.id=" + event.target.id);
		  let refTr = event.target.parentElement;
		  if(refTr.id=="") refTr = refTr.parentElement; //cas particulier case à cocher
		  console.log("refTr.id=" + refTr.id);
		 // refTr.style.backgroundColor = 'green';
	  });
  }
}

function deleteSelectedRowInTable(){
	 var eltTbody = document.getElementById("bodyTableau");
	 var nbRows  = eltTbody.rows.length;
	 //console.log("nbRows="+nbRows);
	 for(let i=nbRows-1; i>=0 ; i--){
		 var tRow = eltTbody.rows[i];
		 var isSelected = tRow.cells[0].firstChild.checked;
		 if(isSelected){
			 refProdToDelete = tRow.cells[1].innerText;
			 console.log("refProdToDelete=" + refProdToDelete);
			 delete mapSelProdQty[refProdToDelete];
			 eltTbody.deleteRow(i);
		 }
	 }
	 affTabAssociatif(mapSelProdQty);
}

window.onload = function(){
	initSelProd();//ajout des options (sélections possibles) dans la liste html
	
	//affichage initial de la référence du produit sélectionné (p1 par défaut):
	var eltSpanProdSel = document.getElementById("spanProdSel");
    eltSpanProdSel.innerText=
	    JSON.stringify(mapProduitsByRef[selectedProdRef]);
	
	//gestion événement "change" sur liste déroulante:
	var eltSelProd = document.getElementById("selProd");
	eltSelProd.addEventListener("change",function (evt){
		 selectedProdRef = evt.target.value;
		 eltSpanProdSel.innerText = 
		   JSON.stringify(mapProduitsByRef[selectedProdRef]);
	});
	
	var eltBtnAdd = document.getElementById("btnAdd");
	eltBtnAdd.addEventListener("click",   (evt)=>{
		var eltQte = document.getElementById("qte");
		mapSelProdQty[selectedProdRef]=Number(eltQte.value);
		addOrUpdateRowInTable(selectedProdRef);
	});
	
	var eltBtnSuppr = document.getElementById("btnSuppr");
	/*
	eltBtnSuppr.addEventListener("click",function(evt){
		deleteSelectedRowInTable();
	});
	*/
	eltBtnSuppr.addEventListener("click",deleteSelectedRowInTable);
}