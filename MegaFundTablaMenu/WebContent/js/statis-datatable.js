var dataStatis = [
    [ "Timing", "17,02", "12,62", "14,25", "18,96", "13,71", "1,19", "51,01", "-6,38", "-15,15", "1,21" ],
    [ "Fondo", "19,23", "12,09", "5,41", "9,73", "20,05", "0,36", "66,55", "-50,97", "-68,24", "0,22" ]
    ];


$(document).ready( function () {
  var table = $('#estadisticas').DataTable({
    //"jQueryUI": true, // Pone línea naranja por arriba y por abajo de la tabla
	  					// Da estilo a la cabecera
    "paging": false, 	// Elimina el paginado
    "searching": false, // Elimina el buscador que tiene la tabla
    "info": false, 		// Elimina la información que sale al final de "showing 1 de 10.."
    "autowidth": true,
    data: dataStatis,
    columns: [
        { title: "   " },
        { title: "3A" },
        { title: "5A" },
        { title: "10A" },
        { title: "Total" },
        { title: "Volatil." },
        { title: "Sharpe" },
        { title: "Mejor" },
        { title: "Peor" },
        { title: "Caída" },
        { title: "Mega" }
    ],
    "createdRow": function ( row, data, index ) {
    	for( var item in data)
        {
        	var value = Number(data[item].replace(/[\,,]/g, '.'));
        	if ( value <= 0.0 ) {
                $('td', row).eq(item).addClass('rentabilidad-negativa');
            }
        }
    }
  });
  
  $('#estadisticas thead tr th').each( function() {
      var sTitles = [
        "",
        "Promedio de la rentabilidad anual en los últimos 3 años",
        "Promedio de la rentabilidad anual en los últimos 5 años",
        "Promedio de la rentabilidad anual en los últimos 10 años",
        "Promedio de la rentabilidad anual desde la creación del fondo",
        "Desviación típica de la rentabilidad anual del fondo desde su creación",
        "Ratio sharpe. Cuanto mayor sea, mejor es la rentabilidad en relación al riesgo asumido",
        "Rentabilidad más alta conseguida por el fondo en un año natural",
        "Rentabilidad más baja conseguida por el fondo en un año natural",
        "Mayor caída respecto al anterior máximo",
        "Ratio Megafund. Media de rentabilidades a 3, 5 y 10 años, multiplicado por el ratio sharpe"
      ];
      var ind = $(this).index();
      
      var sTitle = sTitles[ind];
       
      this.setAttribute( 'title', sTitle );
  } );
   
  /* Init DataTables */
  var oTable = $('#estadisticas').dataTable();
   
  /* Apply the tooltips */
  oTable.$('tr').tooltip( {
      "delay": 0,
      "track": true,
      "fade": 250
  } );
  
  
  $('#estadisticas').contextmenu({
    //delegate: ".dataTable td",
    menu: [
           {title: "Copiar celdas seleccionadas", cmd: "copiar", uiIcon: " ui-icon-document ui-icon-filter"},
           {title: "Copiar todas las celdas", cmd: "copiar-todas", uiIcon: "ui-icon-note ui-icon-filter"},
           {title: "Copiar ISIN", cmd: "copiar-isin", uiIcon: "ui-icon-tag ui-icon-filter"}
      ],
	select: function(event, ui) {
		var celltext = ui.target.text();
		var colvindex = ui.target.parent().children().index(ui.target);
		var colindex = $('table thead tr th:eq('+colvindex+')').data('column-index');
		switch(ui.cmd){
			case "incluir":
				table
					.column( colindex )
					.search( '^' + celltext + '$', true )
					.draw();
				break;
			case "excluir":
				table
					.search('')
					.columns().search('')
					.draw();
				break;
			case "filter":
                table
					.column( colindex )
					.search( '^' + celltext + '$', true )
					.draw();
				break;
			case "nofilter":
				table
					.search('')
					.columns().search('')
					.draw();
				break;
		}
	},
	beforeOpen: function(event, ui) {
		var $menu = ui.menu,
			$target = ui.target,
			extraData = ui.extraData;
		ui.menu.zIndex(9999);
    }
  });
} );
