function maj(){
    var transitions = $('#table5 tr:has(td)').map(function(i, v) {
        var $td =  $('td', this);
            return {
                     id: ++i,
                     start: $td.eq(0).text(),
                     word: $td.eq(1).text()              
                   }
    }).get();
    console.log("transitions"); 
    console.log(transitions);

}
