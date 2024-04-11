"use strict";

$(function () {
  var dataTable,
    permissionsTable = $(".datatables-permissions"),
    userDetailsPage = "app-user-list.html";

  if (permissionsTable.length) {
    dataTable = permissionsTable.DataTable({
      ajax: assetsPath + "json/permissions-list.json",
      columns: [
        { data: "" },
        { data: "id" },
        { data: "name" },
        { data: "assigned_to" },
        { data: "created_date" },
        { data: "" },
      ],
      columnDefs: [
        {
          className: "control",
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, row, meta) {
            return "";
          },
        },
        { targets: 1, searchable: false, visible: false },
        {
          targets: 2,
          render: function (data, type, row, meta) {
            return '<span class="text-nowrap">' + row.name + "</span>";
          },
        },
        {
          targets: 3,
          orderable: false,
          render: function (data, type, row, meta) {
            var assignedTo = row.assigned_to;
            var assignedToHtml = "";
            var roles = {
              Admin:
                '<a href="' +
                userDetailsPage +
                '"><span class="badge  bg-label-primary m-1">Administrator</span></a>',
              Manager:
                '<a href="' +
                userDetailsPage +
                '"><span class="badge  bg-label-warning m-1">Manager</span></a>',
              Users:
                '<a href="' +
                userDetailsPage +
                '"><span class="badge  bg-label-success m-1">Users</span></a>',
              Support:
                '<a href="' +
                userDetailsPage +
                '"><span class="badge  bg-label-info m-1">Support</span></a>',
              Restricted:
                '<a href="' +
                userDetailsPage +
                '"><span class="badge  bg-label-danger m-1">Restricted User</span></a>',
            };

            for (var i = 0; i < assignedTo.length; i++) {
              assignedToHtml += roles[assignedTo[i]];
            }

            return '<span class="text-nowrap">' + assignedToHtml + "</span>";
          },
        },
        {
          targets: 4,
          orderable: false,
          render: function (data, type, row, meta) {
            return '<span class="text-nowrap">' + row.created_date + "</span>";
          },
        },
        {
          targets: -1,
          searchable: false,
          title: "Actions",
          orderable: false,
          render: function (data, type, row, meta) {
            return '<span class="text-nowrap"><button class="btn btn-sm btn-icon me-2" data-bs-target="#editPermissionModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="bx bx-edit"></i></button><button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash"></i></button></span>';
          },
        },
      ],
      order: [[1, "asc"]],
      dom: '<"row mx-1"<"col-sm-12 col-md-3" l><"col-sm-12 col-md-9"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1"<"me-3"f>B>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "_MENU_",
        search: "Search",
        searchPlaceholder: "Search..",
      },
      buttons: [
        {
          text: "Add Permission",
          className: "add-new btn btn-primary mb-3 mb-md-0",
          attr: {
            "data-bs-toggle": "modal",
            "data-bs-target": "#addPermissionModal",
          },
          init: function (api, node, config) {
            $(node).removeClass("btn-secondary");
          },
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              return "Details of " + row.data().name;
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== ""
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '"><td>' +
                    col.title +
                    ":</td> <td>" +
                    col.data +
                    "</td></tr>"
                : "";
            }).join("");

            return !!data && $('<table class="table"/><tbody />').append(data);
          },
        },
      },
      initComplete: function () {
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
            )
              .appendTo(".user_role")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (value, index) {
                select.append(
                  '<option value="' +
                    value +
                    '" class="text-capitalize">' +
                    value +
                    "</option>"
                );
              });
          });
      },
    });

    $(".datatables-permissions tbody").on(
      "click",
      ".delete-record",
      function () {
        dataTable.row($(this).parents("tr")).remove().draw();
      }
    );

    setTimeout(() => {
      $(".dataTables_filter .form-control").removeClass("form-control-sm"),
        $(".dataTables_length .form-select").removeClass("form-select-sm");
    }, 300);
  }
});

/**
 create a permissions-list.json


 
 */
