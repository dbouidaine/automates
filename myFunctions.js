/*--------------------------------------------------------------*/
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
function eif()
{
    var etatInit=getEtatInit();
    console.log("etatInit");
    if(etatInit="S1"){
        console.log("yes");
    }
    console.log(etatInit);
    var etatsFin=getEtatsFin();
    console.log("etatsFin");
    console.log(etatsFin);
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
function fusion(){
    var transitions=getTransitions();
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
/*function reduce(redObj){
    var addi=false,add=false;
    var etat=redObj.etat;
    var value;
    console.log("Entree");
    console.log(redObj);
    if (!(redObj.visited.includes(etat))){
        redObj.visited.push(etat);
        if (!(redObj.redList.includes(etat))){
            if (redObj.etatsFin.includes(etat)){
                add=true;
                redObj.redList.push(etat);
            }
            if (redObj.redMap.has(etat)){
                for(value of redObj.redMap.get(etat)){
                    if (!(redObj.redList.includes(value))){
                        redObj.etat=value;
                        if (etat!=value){
                            addi=reduce(redObj);
                        }
                        if (!add){
                            add=addi;
                        }
                    }
                    else{
                        add=true;
                    }
                    if (add){
                        if (!(redObj.redList.includes(etat))){
                            redObj.redList.push(etat);
                        }
                    }
                }
            }
        }
        else {
            add=true;
        }
    }
    
    redObj.etat=etat;
    console.log("Sortie");
    console.log(add);
    console.log(redObj);
    return add;
}
/*--------------------------------------------------------------*/
/*--------------------------------------------------------------*/
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