$(document).ready(function() {
    $("#radio").buttonset({ icons: { primary: 'ui-icon-triangle-1-ne'} });
    $("#trading").button( 
    		{ icons: {primary:'ui-icon-contact'} } );
    $("#historico").button( { icons: {primary:'ui-icon-calendar'} } );
    $("#componentes").button( { icons: {primary:'ui-icon-folder-open'} } );
    $("#evolucion").button( { icons: {primary:'ui-icon-clipboard'} } );
    $("#estadistica").button( { icons: {primary:'ui-icon-image'} } );
    
    $('#radio').click(function( event ) {
    	// event.type= click
    	// event.which = 1
    	// event.data = null
    	// event.target = HTMLSpanElement (para el primero) y HTMLInputElement para el segundo
    	// event.target.nodeName = SPAN (para el primero) y INPUT para el segundo
    	// event.currentTarget = HTMLDivElement
    	// this: HTMLDivElement
    	if ( event.target.nodeName == "INPUT")
    		alert ("Hola hola target.name " + event.target.name + " target.label " + event.target.id);
    	
    });
});
