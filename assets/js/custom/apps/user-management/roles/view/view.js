"use strict";

// Class definition
var KTUsersViewRole = function () {
    // Shared variables
    var datatable;
    var table;

    // Init add schedule modal
    var initViewRole = () => {
        // Set date data order
        const tableRows = table.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const dateRow = row.querySelectorAll('td');
            const realDate = moment(dateRow[3].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
            dateRow[3].setAttribute('data-order', realDate);
        });

         // Init datatable --- more info on datatables: https://datatables.net/manual/
         datatable = $(table).DataTable({
            "info": false,
            'order': [],
            "pageLength": 5,
            "lengthChange": false,
            'columnDefs': [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 4 }, // Disable ordering on column 4 (actions)
            ]
        });        
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-roles-table-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    return {
        // Public functions
        init: function () {
            table = document.querySelector('#kt_roles_view_table');
            
            if (!table) {
                return;
            }

            initViewRole();
            handleSearchDatatable();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersViewRole.init();
});