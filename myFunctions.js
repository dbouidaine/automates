var detMapG,detFinG;
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
function getAlphabets() {
    var alphabets = [];
    var x;
    $("#table tr:has(td)").each(function() {

        var tableData = $(this).find('td');
        x=$(this).find('td').eq(0).text().toString();
        alphabets.push(x);
        });
    return alphabets;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function getEtatsFinR() {
    var etatsFin = [];
    var x;
    $("#redStates tr:has(td)").each(function() {

        var tableData = $(this).find('td');
        x=$(this).find('td').eq(0).text().toString();
        etatsFin.push(x);
        });
    return etatsFin;
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
/*la reduction de la table de transitions, il fait un appel a la fonction reduce, cette foncion retourne une table 
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
/*la fonction recursive de reduction, le principe c'est de partir de l'etat initial vers tous les etats qui peut y aller,
a chaque fois on elimine le chemin que l'on y passe , et on sauvegarde l'etat dans une table (visited), si avant
la sortie on passe par un element dans redList on fusionne la table visited avec la table redList, redList contient au debut la premiere 
etat final que l'on y passe*/
function reduce(redObj){
    var etat=redObj.etat;
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
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function deleteEpsilons(){
    var epObj=getEpsilons();
    var epsArr=epObj.epsArr;
    var tranSet=epObj.tranSet;
    var etatsFin=getEtatsFinR();
    var visited=new Set();
    var t=[],p=[];var ts,ps;
    while (epsArr.length!=0){
        ts=epsArr[0];
        t=ts.split(",");
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
    console.log("e-fermeture");
    console.log({etatsFin,tranSet});
    return {etatsFin,tranSet};
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*passage par mot ==> passage par alphabet*/
function toAlpha(epObj){
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
    console.log({alphaMap,etatsFin});
    etatsFin.sort();
    return {alphaMap,etatsFin};
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function determinist(alphaObj){
    var etatsFin=alphaObj.etatsFin;
    var NouvEtatsFin=[];
    var alphaMap=alphaObj.alphaMap;
    var attente=[],visited=[];
    var courant=getEtatInit();
    var detMap=new Map();
    attente.push(courant);
    while (attente.length > 0){
        courant=attente.shift();
        if (!(visited.includes(courant))){
            visited.push(courant);
            var tranTab=courant.split(",");
            var keyDet=courant,valDet=new Map(),keyValDet,valValDet=new Set();
            for (var elTab of tranTab){
                var mapCont=new Map();
                if (alphaMap.has(elTab)){
                    mapCont=alphaMap.get(elTab);
                }
                for (var elKey of mapCont.keys()){
                    var keyValDetTab=(elKey.split(","));
                    keyValDet=keyValDetTab[1];
                    if (valDet.has(keyValDet)){
                        valValDet=valDet.get(keyValDet);
                    }
                    else {
                        valValDet=new Set();
                    }
                    var valArr=mapCont.get(elKey);
                    for (var elementArr of valArr){
                        valValDet.add(elementArr);
                    }
                    valDet.set(keyValDet,valValDet);
                }              
            }
            for (keyValDet of valDet.keys()){
                valValDet=valDet.get(keyValDet);
                var valValDetTab=[];
                for (var element of valValDet){
                    valValDetTab.push(element);
                }
                valValDetTab.sort();
                var valValDetS=valValDetTab.toString();
                attente.push(valValDetS);
            }
            detMap.set(keyDet,valDet);
        }
    }
    console.log("detMap");
    console.log(detMap);
    return detMap;

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
    return false;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
/*remplir la table de transition apres reduction*/
function updateDeterministe() {
    var tableBody = document.getElementById("eTransitions"),
        newRow, newCell,newHeader,x,key,tableHeader;
    var epObj=deleteEpsilons(),epFin=epObj.etatsFin,epSet=epObj.tranSet;
    var alphaObj=toAlpha(epObj),alphaFin=alphaObj.etatsFin,alphaMap=alphaObj.alphaMap;
    var detMap=determinist(alphaObj);
    var comMap=new Map(detMap);
    detMapG=new Map();
    for (var detKey of detMap.keys()){
        var GVal=new Map();//Gval Values
        var GKey=detKey;
        detMapG.set(GKey,GVal);
        var detVal=detMap.get(detKey);
        for (var keyDetVal of detVal.keys()){
            var keyGVal=keyDetVal;
            var valGVal=new Set();
            GVal.set(keyGVal,valGVal);//valGVal Values
            var valDetVal=detVal.get(keyDetVal);
            for (var element of valDetVal){
                valGVal.add(element);
            }
        }
    }
    // Reset eTransitions table
    tableBody.innerHTML = "";

    // Build eTransitions new table
    for (var element of epSet) {
        var first,finish,word,epTab=element.split(",");
        first=epTab[0];
        finish=epTab[2];
        word=epTab[1];
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
    tableBody = document.getElementById("eStates");
    // Reset eStates table
    tableBody.innerHTML = "";

    // Build eStates new table
    var i=0;
    while (i<epFin.length) {
        fin=epFin[i];
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = fin;
        newRow.appendChild(newCell);
        i++;
    }
    /*--------------------------------------------------------------*/
    var alphabets=[];
    alphabets=getAlphabets();
    alphabets.sort();
    tableBody = document.getElementById("alphaTransitions");
    tableHeader = document.getElementById("alphaHeader");
    // Reset alphaTransitions table
    tableBody.innerHTML = "";
    tableHeader.innerHTML = "";
    newHeader = document.createElement("th");
    newHeader.textContent = "L'Etat Avant";
    tableHeader.appendChild(newHeader);
    for(var alphabet of alphabets){
        newHeader = document.createElement("th");
        newHeader.textContent = alphabet;
        tableHeader.appendChild(newHeader);
    }
    // Build alphaTransitions new table
    for (var keyAlpha of alphaMap.keys()){
        var first=keyAlpha;
        var elementAlpha=alphaMap.get(keyAlpha);
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = first;
        newRow.appendChild(newCell);
        for (var alphabet of alphabets){
            var key=[first,alphabet].toString();
            if (elementAlpha.has(key)){
                var element = elementAlpha.get(key);
                var finish=[];
                for (var value of element){
                    finish.push(" "+value+" ");
                }
                newCell = document.createElement("td");
                newCell.textContent = "[ " + finish.toString() + " ]";
                newRow.appendChild(newCell);
            }
            else{
                newCell = document.createElement("td");
                newCell.textContent = "/";
                newRow.appendChild(newCell);
            }
        }
    }
    tableBody = document.getElementById("alphaStates");
    // Reset alphaStates table
    tableBody.innerHTML = "";

    // Build alphaStates new table
    var i=0;
    while (i<alphaFin.length) {
        fin=alphaFin[i];
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "["+fin+"]";
        newRow.appendChild(newCell);
        i++;
    }
    /*--------------------------------------------------------------*/
    tableBody = document.getElementById("detTransitions");
    tableHeader = document.getElementById("detHeader");
    // Reset detTransitions table
    tableBody.innerHTML = "";
    tableHeader.innerHTML = "";
    newHeader = document.createElement("th");
    newHeader.textContent = "L'Etat Avant";
    tableHeader.appendChild(newHeader);
    for(var alphabet of alphabets){
        newHeader = document.createElement("th");
        newHeader.textContent = alphabet;
        tableHeader.appendChild(newHeader);
    }
    // Build detTransitions new table
    var detFin=[];
    for (var keyDet of detMap.keys()){
        var firstTab=[];
        firstTab=keyDet.split(",");
        var first = [];
        for (var value of firstTab){
            first.push(" "+value+" ");
        }
        for(var fin of alphaFin){
            if (first.includes(" " + fin + " ")){
                if (!(detFin.includes(first))){
                    detFin.push(first);
                }
            }
        }
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{ " + first +" }";
        newRow.appendChild(newCell);
        var elementDet=detMap.get(keyDet);
        for (var alphabet of alphabets){
            if (elementDet.has(alphabet)){
                var element=elementDet.get(alphabet);
                var finish=[];
                for (var value of element){
                    finish.push("    " + value + " ");
                }
                finish.sort();
                for(var fin of alphaFin){
                    if (finish.includes(" " + fin + " ")){
                        if (!(detFin.includes(finish))){
                            detFin.push(finish);
                        }
                    }
                } 
                newCell = document.createElement("td");
                newCell.textContent = "{ " + finish +" }";
                newRow.appendChild(newCell);
            }
            else{
                var key=alphabet;
                var value=new Set();
                value.add("Spc");
                elementDet.set(key,value);
                newCell = document.createElement("td");
                newCell.textContent = "/";
                newRow.appendChild(newCell);
            }
        }
    }
    console.log("comMap");
    console.log(comMap);
    tableBody = document.getElementById("detStates");
    // Reset detStates table
    tableBody.innerHTML = "";

    // Build detStates new table
    var i=0;
    detFin.sort();
    detFinG=[...detFin];
    while (i<detFin.length) {
        fin=detFin[i];
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{"+fin+"}";
        newRow.appendChild(newCell);
        i++;
    }
    /*--------------------------------------------------------------*/
    tableBody = document.getElementById("comTransitions");
    tableHeader = document.getElementById("comHeader");
    // Reset comTransitions table
    tableBody.innerHTML = "";
    tableHeader.innerHTML = "";
    newHeader = document.createElement("th");
    newHeader.textContent = "L'Etat Avant";
    tableHeader.appendChild(newHeader);
    for(var alphabet of alphabets){
        newHeader = document.createElement("th");
        newHeader.textContent = alphabet;
        tableHeader.appendChild(newHeader);
    }
    // Build comTransitions new table
    var detFin=[];
    for (var keyCom of comMap.keys()){
        var firstTab=[];
        firstTab=keyCom.split(",");
        var first = [];
        for (var value of firstTab){
            first.push(" "+value+" ");
        }
        for(var fin of alphaFin){
            if (first.includes(" " + fin + " ")){
                if (!(detFin.includes(first))){
                    detFin.push(first);
                }
            }
        }
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{ " + first +" }";
        newRow.appendChild(newCell);
        var elementCom=comMap.get(keyCom);
        for (var alphabet of alphabets){
            if (elementCom.has(alphabet)){
                var element=elementCom.get(alphabet);
                var finish=[];
                for (var value of element){
                    finish.push("    " + value + " ");
                }
                finish.sort();
                for(var fin of alphaFin){
                    if (finish.includes(" " + fin + " ")){
                        if (!(detFin.includes(finish))){
                            detFin.push(finish);
                        }
                    }
                } 
                newCell = document.createElement("td");
                newCell.textContent = "{ " + finish +" }";
                newRow.appendChild(newCell);
            }
        }
    }
    tableBody = document.getElementById("comStates");
    // Reset comStates table
    tableBody.innerHTML = "";

    // Build comStates new table
    var i=0;
    detFin.sort();
    while (i<detFin.length) {
        fin=detFin[i];
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{"+fin+"}";
        newRow.appendChild(newCell);
        i++;
    }
    /*--------------------------------------------------------------*/
    tableBody = document.getElementById("compTransitions");
    tableHeader = document.getElementById("compHeader");
    // Reset compTransitions table
    tableBody.innerHTML = "";
    tableHeader.innerHTML = "";
    newHeader = document.createElement("th");
    newHeader.textContent = "L'Etat Avant";
    tableHeader.appendChild(newHeader);
    for(var alphabet of alphabets){
        newHeader = document.createElement("th");
        newHeader.textContent = alphabet;
        tableHeader.appendChild(newHeader);
    }
    // Build compTransitions new table
    var detFin=[];
    for (var keyCom of comMap.keys()){
        var firstTab=[];
        firstTab=keyCom.split(",");
        var first = [];
        for (var value of firstTab){
            first.push(" "+value+" ");
        }
        for(var fin of alphaFin){
            if (first.includes(" " + fin + " ")){
                if (!(detFin.includes(first))){
                    detFin.push(first);
                }
            }
        }
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{ " + first +" }";
        newRow.appendChild(newCell);
        var elementCom=comMap.get(keyCom);
        for (var alphabet of alphabets){
            if (elementCom.has(alphabet)){
                var element=elementCom.get(alphabet);
                var finish=[];
                for (var value of element){
                    finish.push("    " + value + " ");
                }
                finish.sort();
                for(var fin of alphaFin){
                    if (finish.includes(" " + fin + " ")){
                        if (!(detFin.includes(finish))){
                            detFin.push(finish);
                        }
                    }
                } 
                newCell = document.createElement("td");
                newCell.textContent = "{ " + finish +" }";
                newRow.appendChild(newCell);
            }
        }
    }
    tableBody = document.getElementById("compStates");
    // Reset compStates table
    tableBody.innerHTML = "";

    // Build compStates new table
    var i=0;
    detFin.sort();
    var comFin=[];
    for (var value of detFin){
        comFin.push(value.toString());
    }
    console.log("comFin");
    console.log(comFin);
    compFin=[];
    for (var key of comMap.keys()){
        var keyElements=key.split(",");
        var i=0;
        while (i<keyElements.length){
            var x=keyElements.shift();
            x=" "+x+" ";
            keyElements.push(x);
            i++;
        }
        key=keyElements.toString();
        if (!(comFin.includes(key))){
            var element = key.split(",");
            compFin.push(element);
        }
    }
    console.log("compFin");
    console.log(compFin);
    var i=0;
    while (i<compFin.length) {
        fin=compFin[i];
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = "{"+fin+"}";
        newRow.appendChild(newCell);
        i++;
    }
    return false;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
$('#updateMir').click(function () {
    $('#checkedMir').show("fast","swing");
    setTimeout(function() {
        $('#checkedMir').hide("fast","swing");
      }, 2000);
});
$('#updateAll').click(function () {
    $('#checkedAll').show("fast","swing");
    setTimeout(function() {
        $('#checkedAll').hide("fast","swing");
      }, 2000);
});
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function miroir(){
    var etatInit=getEtatInit();
    var etatsFin=getEtatsFin(),etatFin;
    var transitions=getTransitions();
    for (var tran of transitions){
        var passage=tran.start;
        tran.start=tran.finish;
        tran.finish=passage;
    }
    if (etatsFin.length > 1){
        for (var fin of etatsFin){
            var length=transitions.length+1;
            transitions.push({id:length,start:"Spm",word:"",finish:fin});
        }
        etatFin="Spm";
    }
    else{
        etatFin=etatsFin[0];
    }
    var passage=etatInit;
    etatInit=etatFin;
    etatFin=passage;
    var tableBody = document.getElementById("transitionsMir");
    tableBody.innerHTML = "";
    for (var element of transitions){
        /*---------------------------*/
        newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        newCell = document.createElement("td");
        newCell.textContent = element.start;
        newCell.classList.add("pt-3-half");
        newCell.setAttribute("contenteditable","true");
        newRow.appendChild(newCell);
        /*---------------------------*/
        newCell = document.createElement("td");
        wordTab=element.word.split("");
        wordTab.reverse();
        element.word=wordTab.join("");
        newCell.textContent = element.word;
        newCell.classList.add("pt-3-half");
        newCell.setAttribute("contenteditable","true");
        newRow.appendChild(newCell);
        /*---------------------------*/
        newCell = document.createElement("td");
        newCell.textContent = element.finish;
        newCell.classList.add("pt-3-half");
        newCell.setAttribute("contenteditable","true");
        newRow.appendChild(newCell);
        /*---------------------------*/
        newRow.insertAdjacentHTML('beforeend', `<td>
        <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
        </td>`);
    }
    /*---------------------------*/
    tableBody = document.getElementById("finMir");
    tableBody.innerHTML = "";
    newRow = document.createElement("tr");
    tableBody.appendChild(newRow);
    newCell = document.createElement("td");
    newCell.textContent = etatFin;
    newCell.classList.add("pt-3-half");
    newCell.setAttribute("contenteditable","true");
    newRow.appendChild(newCell);
    newRow.insertAdjacentHTML('beforeend', `<td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
    </td>`);
    /*---------------------------*/
    tableBody = document.getElementById("initMir");
    tableBody.innerHTML = "";
    newRow = document.createElement("tr");
    tableBody.appendChild(newRow);
    newCell = document.createElement("td");
    newCell.textContent = etatInit;
    newCell.classList.add("pt-3-half");
    newCell.setAttribute("contenteditable","true");
    newRow.appendChild(newCell);
    return {transitions,etatFin,etatInit};
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function updateAll(){
    updateReduction();
    updateDeterministe();
    return false;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function lecture(){
    if (detMapG==null){
        alert("Veuillez d'abord mettre a jours votre automate !");
    }
    var mot = document.getElementById("aLire").value;
    var alphabets=mot.split("");
    var reconnu=false,continu=true;
    var i=0;
    var etat=getEtatInit();
    while((i<alphabets.length) && continu) {
        console.log(etat);
        var alphabet=alphabets[i];
        var element=new Map();
        element=detMapG.get(etat);
        if (element.has(alphabet)){
            var elementSet=element.get(alphabet);
            var SetToTab=[];
            for (var value of elementSet){
                SetToTab.push(value);
            }
            SetToTab.sort();
            etat=SetToTab.toString();         
        }
        else{
            continu=false;
        }
        i++;
    }
    var detFin=[];
    for (var element of detFinG){
        var i=0;
        while (i<element.length){
            value=element.shift();
            element.push(value.trim());
            i++;
        }
        console.log(element);
        element.sort();
        detFin.push(element.toString());
    }
    if ((continu) && (detFin.includes(etat))) {reconnu=true};
    var myButton=document.getElementById("lecture");
    if (reconnu){
        setTimeout(function(){
            myButton.classList.replace("btn-light","aqua-gradient");
            myButton.classList.replace("peach-gradient","aqua-gradient");
            myButton.innerHTML="Le mot est reconnu par l'automate | etat courant="+etat;
        },150)
    }
    else {
        setTimeout(function(){
            myButton.classList.replace("btn-light","peach-gradient");
            myButton.classList.replace("aqua-gradient","peach-gradient");
            myButton.innerHTML="Le mot n'est pas reconnu par l'automate | etat courant="+etat;
        },150)
    }
    return reconnu;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
