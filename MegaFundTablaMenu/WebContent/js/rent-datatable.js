var dataRentabilidades = [
    [ "Timing", "5,05","7,52","4,32","52,13","49,63","-15,07","22,91","3,65","14,15","-2,78"],
    [ "Fondo", "12,60","10,21","-35,42","66,77","49,63","-8,44","32,58","-3,43","16,05","-9,66"]
    ];


$(document).ready( function () {
  var table = $('#rentabilidades').DataTable({
    "scrollCollapse": true,
    "paging": false, 	// Elimina el paginado
    "searching": false, // Elimina el buscador que tiene la tabla
    "info": false, 		// Elimina la información que sale al final de "showing 1 de 10.."
    "responsive": true,
    "fixedColumns": {
    	"leftColumns": 1
    },
    data: dataRentabilidades,
    columns: [
        { title: "    " },
        { title: "2006" },
        { title: "2007" },
        { title: "2008" },
        { title: "2009" },
        { title: "2010" },
        { title: "2011" },
        { title: "2012" },
        { title: "2013" },
        { title: "2014" },
        { title: "2015" }
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
  
  $('#rentabilidades').contextmenu({
    // delegate: ".dataTable td",
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
