/*-----------------TableDAlphabets------------------------------*/
const $tableID = $('#table');
 const $BTN = $('#export-btn');
 const $EXPORT = $('#export');

 const newTr = `
<tr class="hide">
  <td class="pt-3-half" contenteditable="true">a</td>
  <td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
  </td>
</tr>`;
 $('.table1-add').on('click', 'i', () => {

   const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

   if ($tableID.find('tbody tr').length === 0) {

     $('tbody').append(newTr);
   }

   $tableID.find('table').append($clone);
 });
 $tableID.on('click', '.table-remove', function () {
  var rowCount = $('#table tr').length;
  if (rowCount!=2)
   {$(this).parents('tr').detach();}
 });

 $tableID.on('click', '.table-up', function () {

   const $row = $(this).parents('tr');

   if ($row.index() === 1) {
     return;
   }

   $row.prev().before($row.get(0));
 });

 $tableID.on('click', '.table-down', function () {

   const $row = $(this).parents('tr');
   $row.next().after($row.get(0));
 });

 // A few jQuery helpers for exporting only
 jQuery.fn.pop = [].pop;
 jQuery.fn.shift = [].shift;
 $BTN.on('click', () => {

   const $rows = $tableID.find('tr:not(:hidden)');
   const headers = [];
   const data = [];

   // Get the headers (add special header logic here)
   $($rows.shift()).find('th:not(:empty)').each(function () {

     headers.push($(this).text().toLowerCase());
   });

   // Turn all existing rows into a loopable array
   $rows.each(function () {
     const $td = $(this).find('td');
     const h = {};

     // Use the headers from earlier to name our hash keys
     headers.forEach((header, i) => {

       h[header] = $td.eq(i).text();
     });

     data.push(h);
   });

   // Output the result
   $EXPORT.text(JSON.stringify(data));
 });
 /*-----------------------------------------------*/
  /*-----------------TableDesEtats------------------------------*/
const $tableID2 = $('#table2');
const $BTN2 = $('#export-btn2');
const $EXPORT2 = $('#export2');

const newTr2 = `
<tr class="hide">
 <td class="pt-3-half" contenteditable="true">S1</td>
 <td>
   <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
 </td>
</tr>`;

$('.table2-add').on('click', 'i', () => {

  const $clone = $tableID2.find('tbody tr').last().clone(true).removeClass('hide table-line');

  if ($tableID2.find('tbody tr').length === 0) {

    $('tbody').append(newTr2);
  }

  $tableID2.find('table').append($clone);
});

$tableID2.on('click', '.table-remove', function () {

  var rowCount2 = $('#table2 tr').length;
  if (rowCount2!=2)
   {$(this).parents('tr').detach();};
});

$tableID2.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 1) {
    return;
  }

  $row.prev().before($row.get(0));
});

$tableID2.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN2.on('click', () => {

  const $rows = $tableID2.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {

    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {

      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT2.text(JSON.stringify(data));
});
/*-----------------------------------------------*/
  /*-----------------TableDesEtatsFinaux------------------------------*/
  const $tableID4 = $('#table4');
  const $BTN4 = $('#export-btn4');
  const $EXPORT4 = $('#export4');
  
  const newTr4 = `
  <tr class="hide">
   <td class="pt-3-half" contenteditable="true">S1</td>
   <td>
     <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
   </td>
  </tr>`;
  
  $('.table4-add').on('click', 'i', () => {
  
    const $clone = $tableID4.find('tbody tr').last().clone(true).removeClass('hide table-line');
  
    if ($tableID4.find('tbody tr').length === 0) {
  
      $('tbody').append(newTr4);
    }
  
    $tableID4.find('table').append($clone);
  });
  
  $tableID4.on('click', '.table-remove', function () {
    var rowCount4 = $('#table4 tr').length;
    if (rowCount4!=2)
     {$(this).parents('tr').detach();}
  });
  
  $tableID4.on('click', '.table-up', function () {
  
    const $row = $(this).parents('tr');
  
    if ($row.index() === 1) {
      return;
    }
  
    $row.prev().before($row.get(0));
  });
  
  $tableID4.on('click', '.table-down', function () {
  
    const $row = $(this).parents('tr');
    $row.next().after($row.get(0));
  });
  
  // A few jQuery helpers for exporting only
  jQuery.fn.pop = [].pop;
  jQuery.fn.shift = [].shift;
  
  $BTN4.on('click', () => {
  
    const $rows = $tableID4.find('tr:not(:hidden)');
    const headers = [];
    const data = [];
  
    // Get the headers (add special header logic here)
    $($rows.shift()).find('th:not(:empty)').each(function () {
  
      headers.push($(this).text().toLowerCase());
    });
  
    // Turn all existing rows into a loopable array
    $rows.each(function () {
      const $td = $(this).find('td');
      const h = {};
  
      // Use the headers from earlier to name our hash keys
      headers.forEach((header, i) => {
  
        h[header] = $td.eq(i).text();
      });
  
      data.push(h);
    });
  
    // Output the result
    $EXPORT4.text(JSON.stringify(data));
  });
  /*-----------------------------------------------*/

  /*-----------------TableDesTransitions------------------------------*/
const $tableID5 = $('#table5');
const $BTN5 = $('#export-btn5');
const $EXPORT5 = $('#export5');

const newTr5 = `
    <tr class="hide">
      <td class="pt-3-half" contenteditable="true">Le Mot</td>
      <td class="pt-3-half" contenteditable="true">L'état Avant</td>
      <td class="pt-3-half" contenteditable="true">L'état Après</td>
      <td>
        <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
      </td>
    </tr>`;

$('.table5-add').on('click', 'i', () => {

  const $clone = $tableID5.find('tbody tr').last().clone(true).removeClass('hide table-line');

  if ($tableID5.find('tbody tr').length === 0) {

    $('tbody').append(newTr5);
  }

  $tableID5.find('table').append($clone);
});

$tableID5.on('click', '.table-remove', function () {

  var rowCount5 = $('#table5 tr').length;
  if (rowCount5!=2)
   {$(this).parents('tr').detach();}
});

$tableID5.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 1) {
    return;
  }

  $row.prev().before($row.get(0));
});

$tableID5.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN5.on('click', () => {

  const $rows = $tableID5.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {

    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {

      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT5.text(JSON.stringify(data));
});
/*-----------------------------------------------*/
/*-----------------SaveFile------------------------------*/
/*$("#saveFile").click(function () {
  var myTP = $(document).clone();
  var myTPString = myTP.html();
  var blob = new Blob([myTPString], {
    type: "application/json;utf-8"
  });
  saveAs(blob);
 })*/
 /*-------------------------------------------------------------*/
 /*-----------------LoadFile------------------------------*/
/*$("#readFile").click(function (){
  var path=$('#path').val();
  jQuery.get(path,function(data){
    alert(data);
    $("#myTP").val(data);
  })
})*/