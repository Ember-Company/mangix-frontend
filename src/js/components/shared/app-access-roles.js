"use strict";

$(function () {
  var usersTable = $(".datatables-users"),
    statusLabels = {
      1: { title: "Pending", class: "bg-label-warning" },
      2: { title: "Active", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-secondary" },
    },
    accountPageUrl = "app-user-view-account.html";

  if (usersTable.length) {
    usersTable.DataTable({
      ajax: assetsPath + "json/user-list.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "role" },
        { data: "current_plan" },
        { data: "billing" },
        { data: "status" },
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
        {
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, row, meta) {
            var fullName = row.full_name,
              email = row.email,
              avatar = row.avatar;

            var avatarHtml = avatar
              ? '<img src="' +
                assetsPath +
                "img/avatars/" +
                avatar +
                '" alt="Avatar" class="rounded-circle">'
              : '<span class="avatar-initial rounded-circle bg-label-' +
                [
                  "success",
                  "danger",
                  "warning",
                  "info",
                  "dark",
                  "primary",
                  "secondary",
                ][Math.floor(6 * Math.random()) + 1] +
                '">' +
                (avatar = (
                  ((avatar =
                    (fullName = row.full_name).match(/\b\w/g) || []).shift() ||
                    "") + (avatar.pop() || "")
                ).toUpperCase()) +
                "</span>";

            return (
              '<div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar avatar-sm me-3">' +
              avatarHtml +
              '</div></div><div class="d-flex flex-column"><a href="' +
              accountPageUrl +
              '" class="text-body text-truncate"><span class="fw-medium">' +
              fullName +
              '</span></a><small class="text-muted">@' +
              email +
              "</small></div></div>"
            );
          },
        },
        {
          targets: 2,
          render: function (data, type, row, meta) {
            var role = row.role;

            return (
              "<span class='text-truncate d-flex align-items-center'>" +
              {
                Subscriber:
                  '<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>',
                Author:
                  '<span class="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30 me-2"><i class="bx bx-cog bx-xs"></i></span>',
                Maintainer:
                  '<span class="badge badge-center rounded-pill bg-label-primary w-px-30 h-px-30 me-2"><i class="bx bx-pie-chart-alt bx-xs"></i></span>',
                Editor:
                  '<span class="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
                Admin:
                  '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>',
              }[role] +
              role +
              "</span>"
            );
          },
        },
        {
          targets: 3,
          render: function (data, type, row, meta) {
            return '<span class="fw-medium">' + row.current_plan + "</span>";
          },
        },
        {
          targets: 5,
          render: function (data, type, row, meta) {
            var status = row.status;

            return (
              '<span class="badge ' +
              statusLabels[status].class +
              '">' +
              statusLabels[status].title +
              "</span>"
            );
          },
        },
        {
          targets: -1,
          title: "View",
          searchable: false,
          orderable: false,
          render: function (data, type, row, meta) {
            return (
              '<a href="' +
              accountPageUrl +
              '" class="btn btn-sm btn-icon"><i class="bx bx-show-alt"></i></a>'
            );
          },
        },
      ],
      order: [[1, "desc"]],
      dom: '<"row mx-2"<"col-sm-12 col-md-4 col-lg-6" l><"col-sm-12 col-md-8 col-lg-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center align-items-center flex-sm-nowrap flex-wrap me-1"<"me-3"f><"user_role w-px-200 pb-3 pb-sm-0">>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "_MENU_",
        search: "Search",
        searchPlaceholder: "Search..",
      },
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              return "Details of " + row.data().full_name;
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
          .columns(2)
          .every(function () {
            var column = this,
              select = $(
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

    setTimeout(() => {
      $(".dataTables_filter .form-control").removeClass("form-control-sm"),
        $(".dataTables_length .form-select").removeClass("form-select-sm");
    }, 300);
  }
});

(function () {
  var roleModals = document.querySelectorAll(".role-edit-modal"),
    addRoleButton = document.querySelector(".add-new-role"),
    roleTitle = document.querySelector(".role-title");

  addRoleButton.onclick = function () {
    roleTitle.innerHTML = "Add New Role";
  };

  if (roleModals) {
    roleModals.forEach(function (modal) {
      modal.onclick = function () {
        roleTitle.innerHTML = "Edit Role";
      };
    });
  }
})();
