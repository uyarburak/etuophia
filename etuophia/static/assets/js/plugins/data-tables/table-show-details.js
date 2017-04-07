/* Formating function for row details */
function fnFormatDetails ( oTable, nTr )
{
    var aData = oTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Rendering engine:</td><td>'+aData[1]+' '+aData[4]+'</td></tr>';
    sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
    sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
    sOut += '</table>';
     
    return sOut;
}
 
$(document).ready(function() {
    /*
     * Insert a 'details' column to the table
     */
    var nCloneTh = document.createElement( 'th' );
    var nCloneTd = document.createElement( 'td' );
    nCloneTd.innerHTML = "<a href='javascript:;'><i class='icon-'>&#xf067;</i></a>";
	nCloneTd.width = "19px";
	nCloneTd.align = "center";
	nCloneTd.style.textAlign = "center";
     
    $('#show-details-table thead tr').each( function () {
        this.insertBefore( nCloneTh, this.childNodes[0] );
    } );
     
    $('#show-details-table tbody tr').each( function () {
        this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
    } );
     
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTable = $('#show-details-table').dataTable({
									"sPaginationType": "bootstrap",
									"aoColumnDefs": [
													{ "bSortable": false, "aTargets": [ 0 ] }
													],
									"aaSorting": [[1, 'asc']],
									"aLengthMenu": [
													[5, 10, 15, -1],
													[5, 10, 15, "All"] // change per page values here
												   ],
												// set the initial value
												"iDisplayLength": 5
								  });
     
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $(document).on('click', '#show-details-table tbody td a', function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.innerHTML = "<b><i class='icon-'>&#xf067;</i></b>";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.innerHTML = "<b><i class='icon-'>&#xf068;</i></b>";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
        }
    } );
} );