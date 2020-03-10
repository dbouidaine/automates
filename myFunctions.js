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
    var transitions = $('#reduction tr:has(td)').map(function(i, v) {
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
/*Fusionne les transitions qui ont le meme etat de départ + le meme mot a lire, donne un Map, le clé est l'état de départ + 
le mot à lire, la valeur est l'état d'arriv*/
function fusion(){
    var transitions=getTransitionsR();
    var redMap=new Map();
    var i=0,key,val;
    var x;
    while(i<transitions.length)
    {
        key=[transitions[i].start,transitions[i].word].toString();
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
/*la fonction recursice de reduction, le principe c'est de partir de l'etat vers tous les etats qui peut y aller,
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
function essay(){
    var list=new Set();
    t=["S1","","S2"];
    list.add(t);
    console.log(list);
    console.log(list.has(t));
}
/*--------------------------------------------------------------*/
function deleteEpsilons(){
    var epObj=getEpsilons();
    var epsArr=epObj.epsArr;
    var tranSet=epObj.tranSet;
    var etatsFin=getEtatsFin();
    var visited=new Set();
    var t=[],p=[];var ts,ps;
    console.log("1");
    while (epsArr.length!=0){
        console.log(ts,"2");
        ts=epsArr[0];
        t=ts.split(",");
        console.log(ts,"2.2");
        console.log(tranSet.has(ts));
        tranSet.delete(ts);
        epsArr.shift();
        visited.add(ts);
        console.log("visited",visited);
        if (etatsFin.includes(t[2])){
            console.log(ts,"3");
            if (!(etatsFin.includes(t[0]))){
                console.log(ts,"4");
                etatsFin.push(t[0]);
            }
        }
        var i=0;
        var tail=tranSet.size,s,w,f,transs;
        for (var transs of tranSet){
            trans=transs.split(",");
            if (i<tail){
                console.log(ts,"5");
                if (trans[0]==t[2]){
                    console.log(ts,"6");
                    s=t[0].toString();w=trans[1].toString();f=trans[2].toString();
                    p=[s,w,f];
                    ps=p.toString();
                    if (trans[1]!=""){
                        console.log(ts,"7");
                        if (!(tranSet.has(ps))){
                            tranSet.add(ps);
                        }
                    }
                    else {
                        console.log(ts,"8");
                        if (!(epsArr.includes(ps)) && !(visited.has(ps))){
                            console.log(ts,"9");
                            console.log("traitee");
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
    var redMap=fusion();
    var length,start,finish,trans,keyM,y,concat;
    var st=0;
    for(key of redMap.keys()){
        x=key.split(",");
        word=x[1];
        i=0;
        length=word.length;
        if (length>1){
            start=x[0];
            finish=redMap.get(key);
            redMap.delete(key);
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
                if(redMap.has(keyM)){
                    y=redMap.get(keyM);
                    x=x.concat(y);
                }
                redMap.set(keyM,x)
                st++;
                i++;
            }
        }
    }
    /*there's a little problem*/
    console.log("redMap");
    console.log(redMap);
    return redMap;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*remplir la table de transition apres rediction*/
function updateTransition() {
    var tableBody = document.getElementById("reduction"),
        newRow, newCell,x,key;
    var transitions=getTransitions();
    var redList=reduction();
    console.log(redList);
    // Reset the table
    tableBody.innerHTML = "";

    // Build the new table
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
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
$('#updateTransitions').click(function () {
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