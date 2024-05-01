"use strict";

$(function () {
  let borderColor, bodyBg, headingColor;
  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  const datatablesUsers = $(".datatables-users");
  const select2 = $(".select2");
  const userViewAccountUrl = "app-user-view-account.html";
  const statusLabels = {
    1: { title: "Na hora", class: "bg-label-success" },
    2: { title: "Atraso", class: "bg-label-warning" },
    3: { title: "Não apareceu", class: "bg-label-danger" },
  };

  if (select2.length) {
    select2.wrap('<div class="position-relative"></div>').select2({
      placeholder: "Select Country",
      dropdownParent: select2.parent(),
    });
  }

  if (datatablesUsers.length) {
    const dataTable = datatablesUsers.DataTable({
      ajax: assetsPath + "/js/utils/json/user-list.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "role" },
        { data: "cpf" },
        // { data: "status" },
        { data: "pin" },
        { data: "action" },
      ],
      columnDefs: [
        {
          className: "control",
          searchable: false,
          orderable: false,
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
            const fullName = row.full_name;
            const email = row.email;
            const avatar = row.avatar;
            let avatarHtml = "";
            if (avatar) {
              avatarHtml = `<img src="${assetsPath}/assets/img/avatars/${avatar}" alt="Avatar" class="rounded-circle">`;
            } else {
              const initials = (fullName.match(/\b\w/g) || []).shift() || "";
              avatarHtml = `<span class="avatar-initial rounded-circle bg-label-${
                [
                  "success",
                  "danger",
                  "warning",
                  "info",
                  "dark",
                  "primary",
                  "secondary",
                ][Math.floor(6 * Math.random())]
              }">${initials.toUpperCase()}</span>`;
            }
            return `
              <div class="d-flex justify-content-start align-items-center user-name">
                <div class="avatar-wrapper">
                  <div class="avatar avatar-sm me-3">
                    ${avatarHtml}
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <a href="${userViewAccountUrl}" class="text-body text-truncate">
                    <span class="fw-medium">${fullName}</span>
                  </a>
                  <small class="text-muted">${email}</small>
                </div>
              </div>
            `;
          },
        },
        {
          target: 3,
          render: function (data, type, row, meta) {
            const cpf = row.cpf;

            return `
              <span class='text-truncate'>
                ${cpf} 
              </span> 
            `;
          },
        },
        {
          targets: 2,
          render: function (data, type, row, meta) {
            const role = row.role;
            return `
              <span class='text-truncate d-flex align-items-center'>
                ${
                  {
                    Funcionario: `<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>`,
                    Admin: `<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>`,
                  }[role]
                }
                ${role}
              </span>
            `;
          },
        },
        // {
        //   targets: 4,
        //   render: function (data, type, row, meta) {
        //     const status = row.status;

        //     return `<span class="badge ${statusLabels[status].class}">${statusLabels[status].title}</span>`;
        //   },
        // },
        {
          targets: 5,
          render: function (data, type, row, meta) {
            return `<span class="fw-medium">${row.pin}</span>`;
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, row, meta) {
            return `
              <div class="d-inline-block text-nowrap">
                <button class="btn btn-sm btn-icon"><i class="bx bx-edit"></i></button>
                <button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash"></i></button>
                <button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>
                <div class="dropdown-menu dropdown-menu-end m-0">
                  <a href="${userViewAccountUrl}" class="dropdown-item">View</a>
                  <a href="javascript:;" class="dropdown-item">Suspend</a>
                </div>
              </div>
            `;
          },
        },
      ],
      order: [[1, "desc"]],
      dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "_MENU_",
        search: "",
        searchPlaceholder: "Pesquisa ",
      },
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle mx-3",
          text: '<i class="bx bx-export me-1"></i>Export',
          buttons: [
            {
              extend: "print",
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    let formattedData = "";
                    if (data.length > 0) {
                      const parsedHtml = $.parseHTML(data);
                      formattedData = $.map(parsedHtml, function (element) {
                        if (
                          element.classList &&
                          element.classList.contains("user-name")
                        ) {
                          return element.lastChild.firstChild.textContent;
                        } else if (element.innerText) {
                          return element.innerText;
                        } else {
                          return element.textContent;
                        }
                      }).join("");
                    }
                    return formattedData;
                  },
                },
              },
              customize: function (win) {
                $(win.document.body)
                  .css("color", headingColor)
                  .css("border-color", borderColor)
                  .css("background-color", bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    let formattedData = "";
                    if (data.length > 0) {
                      const parsedHtml = $.parseHTML(data);
                      formattedData = $.map(parsedHtml, function (element) {
                        if (
                          element.classList &&
                          element.classList.contains("user-name")
                        ) {
                          return element.lastChild.firstChild.textContent;
                        } else if (element.innerText) {
                          return element.innerText;
                        } else {
                          return element.textContent;
                        }
                      }).join("");
                    }
                    return formattedData;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="bx bxs-file-export me-2"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    let formattedData = "";
                    if (data.length > 0) {
                      const parsedHtml = $.parseHTML(data);
                      formattedData = $.map(parsedHtml, function (element) {
                        if (
                          element.classList &&
                          element.classList.contains("user-name")
                        ) {
                          return element.lastChild.firstChild.textContent;
                        } else if (element.innerText) {
                          return element.innerText;
                        } else {
                          return element.textContent;
                        }
                      }).join("");
                    }
                    return formattedData;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    let formattedData = "";
                    if (data.length > 0) {
                      const parsedHtml = $.parseHTML(data);
                      formattedData = $.map(parsedHtml, function (element) {
                        if (
                          element.classList &&
                          element.classList.contains("user-name")
                        ) {
                          return element.lastChild.firstChild.textContent;
                        } else if (element.innerText) {
                          return element.innerText;
                        } else {
                          return element.textContent;
                        }
                      }).join("");
                    }
                    return formattedData;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    let formattedData = "";
                    if (data.length > 0) {
                      const parsedHtml = $.parseHTML(data);
                      formattedData = $.map(parsedHtml, function (element) {
                        if (
                          element.classList &&
                          element.classList.contains("user-name")
                        ) {
                          return element.lastChild.firstChild.textContent;
                        } else if (element.innerText) {
                          return element.innerText;
                        } else {
                          return element.textContent;
                        }
                      }).join("");
                    }
                    return formattedData;
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add New User</span>',
          className: "add-new btn btn-primary",
          attr: {
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#offcanvasAddUser",
          },
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              return "Details of " + row.data().full_name;
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            const rowData = $.map(columns, function (column, index) {
              if (column.title !== "") {
                return `<tr data-dt-row="${column.rowIndex}" data-dt-column="${column.columnIndex}">
                          <td>${column.title}:</td> <td>${column.data}</td>
                        </tr>`;
              } else {
                return "";
              }
            }).join("");
            return rowData
              ? $('<table class="table"/><tbody />').append(rowData)
              : false;
          },
        },
      },
      initComplete: function () {
        this.api()
          .columns(2)
          .every(function () {
            const column = this;
            const select = $(
              '<select id="UserRole" class="form-select text-capitalize"><option value=""> Filtrar por função </option></select>'
            )
              .appendTo(".user_role")
              .on("change", function () {
                const value = $.fn.dataTable.util.escapeRegex($(this).val());

                column
                  .search(value ? "^" + value + "$" : "", true, false)
                  .draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (value, index) {
                select.append(`<option value="${value}">${value}</option>`);
              });
          });

        this.api()
          .columns(4)
          .every(function () {
            const column = this;
            console.log(this);
            const select = $(
              '<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Filtrar por status </option></select>'
            )
              .appendTo(".user_status")
              .on("change", function () {
                const value = $.fn.dataTable.util.escapeRegex($(this).val());
                column
                  .search(value ? "^" + value + "$" : "", true, false)
                  .draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (value, index) {
                select.append(
                  `<option value="${statusLabels[value].title}" class="text-capitalize">${statusLabels[value].title}</option>`
                );
              });
          });
      },
    });

    $(".dt-buttons > .btn-group > button").removeClass("btn-secondary");

    $(".datatables-users tbody").on("click", ".delete-record", function () {
      dataTable.row($(this).parents("tr")).remove().draw();
    });

    setTimeout(() => {
      $(".dataTables_filter .form-control").removeClass("form-control-sm");
      $(".dataTables_length .form-select").removeClass("form-select-sm");
    }, 300);
  }

  const phoneInputs = document.querySelectorAll(".phone-mask");
  const addUserForm = document.getElementById("addNewUserForm");

  if (phoneInputs) {
    phoneInputs.forEach(function (input) {
      new Cleave(input, { phone: true, phoneRegionCode: "BR" });
    });
  }

  FormValidation.formValidation(addUserForm, {
    fields: {
      userFullname: {
        validators: { notEmpty: { message: "Please enter fullname" } },
      },
      userEmail: {
        validators: {
          notEmpty: { message: "Please enter your email" },
          emailAddress: { message: "The value is not a valid email address" },
        },
      },
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: "",
        rowSelector: function (element, form) {
          return ".mb-3";
        },
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      autoFocus: new FormValidation.plugins.AutoFocus(),
    },
  });
});
