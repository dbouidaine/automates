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

function getReduction(){
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
    /*--------------------------*/
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
    /*console.log("redMap");
    console.log(redMap);*/
    return redMap;
}

function updateReduction() {
    var tableBody = document.getElementById("reduction"),
        newRow, newCell,x,key;
    var redMap=getReduction();
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