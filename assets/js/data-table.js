"use strict";

var KTUsersList = (function () {
  // Define shared variables
  var table = document.getElementById("kt_datas_table");
  var datatable;

  // Private functions
  var initUserTable = function () {
    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      info: false,
      order: []
    });

    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
    datatable.on("draw", function () {
      handleDeleteRows();
    });
  };

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector(
      '[data-kt-data-table-filter="search"]'
    );
    filterSearch.addEventListener("keyup", function (e) {
      datatable.search(e.target.value).draw();
    });
  };

  // Filter Datatable
  var handleFilterDatatable = () => {
    // Select filter options
    const filterForm = document.querySelector(
      '[data-kt-data-table-filter="form"]'
    );
    const filterButton = filterForm.querySelector(
      '[data-kt-data-table-filter="filter"]'
    );
    const selectOptions = filterForm.querySelectorAll("select");

    // Filter datatable on submit
    filterButton.addEventListener("click", function () {
      var filterString = "";

      // Get filter values
      selectOptions.forEach((item, index) => {
        if (item.value && item.value !== "") {
          if (index !== 0) {
            filterString += " ";
          }

          // Build filter value options
          filterString += item.value;
        }
      });

      // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search(filterString).draw();
    });
  };

  // Reset Filter
  var handleResetForm = () => {
    // Select reset button
    const resetButton = document.querySelector(
      '[data-kt-data-table-filter="reset"]'
    );

    // Reset datatable
    resetButton.addEventListener("click", function () {
      // Select filter options
      const filterForm = document.querySelector(
        '[data-kt-data-table-filter="form"]'
      );
      const selectOptions = filterForm.querySelectorAll("select");

      // Reset select2 values -- more info: https://select2.org/programmatic-control/add-select-clear-items
      selectOptions.forEach((select) => {
        $(select).val("").trigger("change");
      });

      // Reset datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search("").draw();
    });
  };



  return {
    // Public functions
    init: function () {
      if (!table) {
        return;
      }

      initUserTable();
      handleSearchDatatable();
      handleResetForm();
      handleFilterDatatable();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTUsersList.init();
});
