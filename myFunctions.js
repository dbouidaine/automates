/*--------------------------------------------------------------*/
/*Les Transitions introduit par l'utilisateur*/
function getTransitions(){
    var transitions = $('#table5 tr:has(td)').map(function(i, v) {
        var $td =  $('td', this);
            return {
                     id: ++i,
                     start: $td.eq(0).text(),
                     word: $td.eq(1).text(),
                     finish: $td.eq(2).text()           
                   }
    }).get();
    return transitions;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*Les Transitions après réduction*/
function getTransitionsR(){
    var transitions = $('#redTransitions tr:has(td)').map(function(i, v) {
        var $td =  $('td', this);
            return {
                     id: ++i,
                     start: $td.eq(0).text(),
                     word: $td.eq(1).text(),
                     finish: $td.eq(2).text()           
                   }
    }).get();
    return transitions;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function getEtatInit(){
    return $('#table3 tr:has(td) td').eq(0).text().toString();
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function getEtatsFin() {
    var etatsFin = [];
    var x;
    $("#table4 tr:has(td)").each(function() {

        var tableData = $(this).find('td');
        x=$(this).find('td').eq(0).text().toString();
        etatsFin.push(x);
        });
    return etatsFin;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*test affichage des etats*/
function eif()
{
    var etatInit=getEtatInit();
    console.log("etatInit");
    if(etatInit=="S1"){
        console.log("yes");
    }
    console.log(etatInit);
    var etatsFin=getEtatsFin();
    console.log("etatsFin");
    console.log(etatsFin);
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*Fusionne les transitions qui ont le meme etat de départ, donne un Map, le clé est l'état de départ, la valeur
est l'état d'arrivé*/
function fusionAll(){
    var transitions=getTransitions();
    var redMap=new Map();
    var i=0,key,val;
    var x;
    while(i<transitions.length)
    {
        key=transitions[i].start;
        val=transitions[i].finish;
        if (redMap.has(key))
        {
            x=redMap.get(key);
            x.push(val);
            redMap[key]=x;
        }
        else
        {
            x = [];
            x.push(val);
            redMap.set(key,x);
        }
        i++;
    }
    return redMap;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*la reduction de la table de transitions, il fait un appel a la fonction reduc, cette foncion retourne une table 
contenant les elements a ne pas eliminer ( On elimine les elements qui n'appartiennent pas a cette table)*/
function reduction(){
    var etatInit=getEtatInit();
    var etatsFin=getEtatsFin();
    var redMap=fusionAll();
    var redList=[];
    var visited=[];
    var etat=etatInit;
    redObj = {redMap,etat,redList,visited,etatInit,etatsFin};
    reduce(redObj);
    redObj.redList.sort();
    return redObj.redList;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*la fonction recursive de reduction, le principe c'est de partir de l'etat vers tous les etats qui peut y aller,
a chaque fois on elimine le chemin que l'on y passe , et on sauvegarde l'etat dans une table (visited), si avant
la sortie on passe par un element dans redList on fusionne la table visible avec la table redList, redList contient au debut la premiere 
etat final que l'on y passe*/
function reduce(redObj){
    var etat=redObj.etat;
    console.log("Entree");
    console.log(etat);
    redObj.visited.push(etat);
    if (redObj.redMap.has(etat)){
        var etatsFis=[];
        etatsFis=redObj.redMap.get(etat);
        while (etatsFis.length>0){
            etatFis=etatsFis.shift();
            if (redObj.redList.includes(etatFis) || redObj.etatsFin.includes(etatFis)){
                var i=0;
                while(i<redObj.visited.length){
                    if (!(redObj.redList.includes(redObj.visited[i]))){
                        redObj.redList.push(redObj.visited[i]);
                    }
                    i++;
                }
                console.log(redObj);
            }
            redObj.etat=etatFis;
            reduce(redObj);
        }
    }
    if (redObj.etatsFin.includes(etat)){
        if (!(redObj.redList.includes(etat))){
            redObj.redList.push(etat);
        }
    }
    redObj.visited.pop();
    console.log(redObj);
    console.log(etat);
    console.log("Sortie");
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function getEpsilons(){
    var epsArr=[];
    var tranSet=new Set();
    var transitions=getTransitionsR();
    var i=0,w,s,f,n,t=[];
    while (i<transitions.length){
        w=transitions[i].word.toString();
        s=transitions[i].start.toString();
        f=transitions[i].finish.toString();
        t=[s,w,f].toString();
        tranSet.add(t);
        if (w==""){  
            epsArr.push(t);
        }
        i++;
    }
    var epObj={epsArr,tranSet};
    return epObj;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function deleteEpsilons(){
    var epObj=getEpsilons();
    var epsArr=epObj.epsArr;
    var tranSet=epObj.tranSet;
    var etatsFin=getEtatsFin();
    var visited=new Set();
    var t=[],p=[];var ts,ps;
    while (epsArr.length!=0){
        ts=epsArr[0];
        t=ts.split(",");
        console.log(tranSet.has(ts));
        tranSet.delete(ts);
        epsArr.shift();
        visited.add(ts);
        if (etatsFin.includes(t[2])){
            if (!(etatsFin.includes(t[0]))){
                etatsFin.push(t[0]);
            }
        }
        var i=0;
        var tail=tranSet.size,s,w,f,transs;
        for (var transs of tranSet){
            trans=transs.split(",");
            if (i<tail){
                if (trans[0]==t[2]){
                    s=t[0].toString();w=trans[1].toString();f=trans[2].toString();
                    p=[s,w,f];
                    ps=p.toString();
                    if (trans[1]!=""){
                        if (!(tranSet.has(ps))){
                            tranSet.add(ps);
                        }
                    }
                    else {
                        if (!(epsArr.includes(ps)) && !(visited.has(ps))){
                            epsArr.push(ps);
                            if (!(tranSet.has(ps))){
                                tranSet.add(ps);
                            }
                        }
                    }
                }
            }
            i++;
        }
    }
    return {etatsFin,tranSet};
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*passage par mot ==> passage par alphabet*/
function toAlpha(){
    var epObj=deleteEpsilons();
    var tranSet=epObj.tranSet,etatsFin=epObj.etatsFin;
    var epMap=new Map(),key,val,elTab,x;
    for (var element of tranSet){
        elTab=element.split(",");
        key=[elTab[0],elTab[1]].toString();
        val=(elTab[2]).toString();
        if(epMap.has(key))
        {
            x=epMap.get(key);
            x.push(val);
            epMap[key]=x;
        }
        else{
            x=[val];
            epMap.set(key,x);
        }
    }
    var length,start,finish,trans,keyM,y,concat;
    var st=0;
    for(key of epMap.keys()){
        x=key.split(",");
        word=x[1];
        i=0;
        length=word.length;
        if (length>1){
            start=x[0];
            finish=epMap.get(key);
            epMap.delete(key);
            while(i<length){
                keyM=[start,word[i]].toString();
                if (i!=length-1)
                {
                    trans=[];
                    trans.push(("T"+(st.toString())).toString());
                }
                else
                {
                    trans=finish;
                }
                start=trans;
                x=[];
                for(val of trans)
                {
                    x.push(val);
                }
                if(epMap.has(keyM)){
                    y=epMap.get(keyM);
                    x=x.concat(y);
                }
                epMap.set(keyM,x)
                st++;
                i++;
            }
        }
    }
    var alphaMap=new Map();
    var keyAlpha;
    var valAlpha;
    for (key of epMap.keys()){
        val=epMap.get(key);
        elTab=key.split(",");
        keyAlpha=elTab[0];
        if (alphaMap.has(keyAlpha)){
            valAlpha=alphaMap.get(keyAlpha);
            valAlpha.set(key,val);
            alphaMap[keyAlpha]=valAlpha;
        }
        else{
            var valAlpha=new Map();
            valAlpha.set(key,val);
            alphaMap.set(keyAlpha,valAlpha);

        }
    }
    /*there's a little problem*/
    console.log("alphaMap");
    return alphaMap;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*remplir la table de transition apres reduction*/
function updateReduction() {
    var tableBody = document.getElementById("redTransitions"),
        newRow, newCell,x,key;
    var transitions=getTransitions();
    var redList=reduction();
    console.log(redList);
    // Reset redTransitions table
    tableBody.innerHTML = "";

    // Build redTransitions new table
    var i=0;
    while (i<transitions.length) {
        var first,finish,word;
        first=transitions[i].start;
        finish=transitions[i].finish;
        word=transitions[i].word;
        if (redList.includes(first) && redList.includes(finish)){
            newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            newCell = document.createElement("td");
            newCell.textContent = first;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = word;
            newRow.appendChild(newCell);
            newCell = document.createElement("td");
            newCell.textContent = finish;
            newRow.appendChild(newCell);
        }
        i++;
    }
    tableBody = document.getElementById("redStates");
    var etatsFin=getEtatsFin();
    // Reset redStates table
    tableBody.innerHTML = "";

    // Build redStates new table
    var i=0;
    while (i<etatsFin.length) {
        fin=etatsFin[i];
        if (redList.includes(fin)){
            newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            newCell = document.createElement("td");
            newCell.textContent = fin;
            newRow.appendChild(newCell);
        }
        i++;
    }
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
$('#updateReduction').click(function () {
    $('#checked').show("fast","swing");
    setTimeout(function() {
        $('#checked').hide("fast","swing");
      }, 2000);
  });
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*remplir un table de transition apres passage par alphabet*/
function updateTransition2() {
    var tableBody = document.getElementById("reduction"),
        newRow, newCell,x,key;
    var redMap=toAlpha();
    // Reset the table
    tableBody.innerHTML = "";

    // Build the new table
    for (key of redMap.keys()) {
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        x=[];
        x=key.split(",");
        newCell = document.createElement("td");
        newCell.textContent = x[0];
        newRow.appendChild(newCell);
        newCell = document.createElement("td");
        newCell.textContent = x[1];
        newRow.appendChild(newCell);
        newCell = document.createElement("td");
        val = redMap.get(key);
        val.sort();
        newCell.textContent = val.toString();
        newRow.appendChild(newCell);
    }
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/