import { toPage } from "../utils/route-builder.js";
import app_config from "./env.js";

const main_routes = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: `${import.meta.env.VITE_APP_BASE_PREFIX}/index.html`,
  },
  {
    id: 2,
    title: "Users",
    icon: '<i class="menu-icon tf-icons bx bx-user"></i>',
    path: toPage("users/app-user-list.html"),
  },
  {
    id: 3,
    title: "Roles & Permissions",
    icon: '<i class="menu-icon tf-icons bx bx-check-shield"></i>',
    submenus: [
      {
        id: 1,
        title: "Roles",
        path: toPage("access/app-access-roles.html"),
      },
      {
        id: 2,
        title: "Permissions",
        path: toPage("access/app-access-permission.html"),
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: '<i class="menu-icon tf-icons bx bxs-user-account"></i>',
    path: toPage("users/pages-account-settings-account.html"),
  },
];

// Podes ignorar este kkkk
const design_system_routes = [
  {
    title: "Misc",
    icon: '<i class="menu-icon tf-icons bx bx-dots-horizontal-rounded"></i>',
    submenus: [
      {
        title: "Error",
        path: toPage("misc/pages-misc-error.html"),
      },
      {
        title: "Under Maintenance",
        path: toPage("misc/pages-misc-under-maintenance.html"),
      },
      {
        title: "Coming Soon",
        path: toPage("misc/pages-misc-comingsoon.html"),
      },
      {
        title: "Not Authorized",
        path: toPage("misc/pages-misc-not-authorized.html"),
      },
    ],
  },
  {
    title: "Authentications",
    icon: '<i class="menu-icon tf-icons bx bx-lock-open-alt"></i>',
    submenus: [
      {
        title: "Login",
        submenus: [
          {
            title: "Login Basic",
            path: toPage("auth/login/auth-login-basic.html"),
          },
          {
            title: "Login Cover",
            path: toPage("auth/login/auth-login-cover.html"),
          },
        ],
      },
      {
        title: "Register",
        submenus: [
          {
            title: "Register Basic",
            path: toPage("auth/register/auth-register-basic.html"),
          },
          {
            title: "Register Cover",
            path: toPage("auth/register/auth-register-cover.html"),
          },
          {
            title: "Register MultiSteps",
            path: toPage("auth/register/auth-register-multisteps.html"),
          },
        ],
      },
      {
        title: "Verify Email",
        submenus: [
          {
            title: "Basic",
            path: toPage("auth/email-verify/auth-verify-email-basic.html"),
          },
          {
            title: "Cover",
            path: toPage("auth/email-verify/auth-verify-email-cover.html"),
          },
        ],
      },
      {
        title: "Reset Password",
        submenus: [
          {
            title: "Basic",
            path: toPage("auth/reset/auth-reset-password-basic.html"),
          },
          {
            title: "Cover",
            path: toPage("auth/reset/auth-reset-password-cover.html"),
          },
        ],
      },
      {
        title: "Forgot Password",
        submenus: [
          {
            title: "Basic",
            path: toPage(
              "auth/forgot-password/auth-forgot-password-basic.html"
            ),
          },
          {
            title: "Cover",
            path: toPage(
              "auth/forgot-password/auth-forgot-password-cover.html"
            ),
          },
        ],
      },
      {
        title: "Two Steps",
        submenus: [
          {
            title: "Basic",
            path: toPage("auth/2factor-auth/auth-two-steps-basic.html"),
          },
          {
            title: "Cover",
            path: toPage("auth/two-steps/auth-two-steps-cover.html"),
          },
        ],
      },
    ],
  },
  {
    title: "Modal Examples",
    icon: '<i class="menu-icon tf-icons bx bx-window-open"></i>',
    path: toPage("ui/modals/modal-examples.html"),
  },
  {
    title: "Cards",
    icon: '<i class="menu-icon tf-icons bx bx-collection"></i>',
    submenus: [
      {
        title: "Basic",
        path: toPage("ui/cards/card-basic.html"),
      },
      {
        title: "Advanced",
        path: toPage("ui/cards/card-advance.html"),
      },
      {
        title: "Statistics",
        path: toPage("ui/cards/card-statistics.html"),
      },
      {
        title: "Analytics",
        path: toPage("ui/cards/card-analytics.html"),
      },
      {
        title: "Gamifications",
        path: toPage("ui/cards/card-gamifications.html"),
      },
      {
        title: "Actions",
        path: toPage("ui/cards/card-actions.html"),
      },
    ],
  },
  {
    title: "User Interface",
    icon: '<i class="menu-icon tf-icons bx bx-box"></i>',
    submenus: [
      {
        title: "Accordion",
        path: toPage("ui/ui-accordion.html"),
      },
      {
        title: "Alerts",
        path: toPage("ui/ui-alerts.html"),
      },
      {
        title: "Badges",
        path: toPage("ui/ui-badges.html"),
      },
      {
        title: "Buttons",
        path: toPage("ui/ui-buttons.html"),
      },
      {
        title: "Carousel",
        path: toPage("ui/ui-carousel.html"),
      },
      {
        title: "Collapse",
        path: toPage("ui/ui-collapse.html"),
      },
      {
        title: "Dropdowns",
        path: toPage("ui/ui-dropdowns.html"),
      },
      {
        title: "Footer",
        path: toPage("ui/ui-footer.html"),
      },
      {
        title: "Modals",
        path: toPage("ui/ui-modals.html"),
      },
      {
        title: "List Groups",
        path: toPage("ui/ui-list-groups.html"),
      },
      {
        title: "Navbar",
        path: toPage("ui/ui-navbar.html"),
      },
      {
        title: "Offcanvas",
        path: toPage("ui/ui-offcanvas.html"),
      },
      {
        title: "Pagination & Breadcrumbs",
        path: toPage("ui/ui-pagination-breadcrumbs.html"),
      },
      {
        title: "Progress",
        path: toPage("ui/ui-progress.html"),
      },
      {
        title: "Spinners",
        path: toPage("ui/ui-spinners.html"),
      },
      {
        title: "Tabs & Pills",
        path: toPage("ui/ui-tabs-pills.html"),
      },
      {
        title: "Toasts",
        path: toPage("ui/ui-toasts.html"),
      },
      {
        title: "Tooltips & Popovers",
        path: toPage("ui/ui-tooltips-popovers.html"),
      },
      {
        title: "Typography",
        path: toPage("ui/ui-typography.html"),
      },
    ],
  },
  {
    title: "Extended UI",
    icon: '<i class="menu-icon tf-icons bx bx-copy"></i>',
    submenus: [
      {
        title: "Drag & Drop",
        path: toPage("ui/ui-extensions/extended-ui-drag-and-drop.html"),
      },
      {
        title: "Sweet Alerts",
        path: toPage("ui/ui-extensions/extended-ui-sweetalert2.html"),
      },
      {
        title: "Star Ratings",
        path: toPage("ui/ui-extensions/extended-ui-star-ratings.html"),
      },
      {
        title: "Avatars",
        path: toPage("ui/ui-extensions/extended-ui-avatar.html"),
      },
      {
        title: "BlockUI",
        path: toPage("ui/ui-extensions/extended-ui-blockui.html"),
      },
      {
        title: "Media Player",
        path: toPage("ui/ui-extensions/extended-ui-media-player.html"),
      },
      {
        title: "Perfect Scrollbar",
        path: toPage("ui/ui-extensions/extended-ui-perfect-scrollbar.html"),
      },
      {
        title: "Text Divider",
        path: toPage("ui/ui-extensions/extended-ui-text-divider.html"),
      },
      {
        title: "Timeline",
        submenus: [
          {
            title: "Basic",
            path: toPage("ui/ui-extensions/extended-ui-timeline-basic.html"),
          },
          {
            title: "Fullscreen",
            path: toPage(
              "ui/ui-extensions/extended-ui-timeline-fullscreen.html"
            ),
          },
        ],
      },
      {
        title: "Tour",
        path: toPage("ui/ui-extensions/extended-ui-tour.html"),
      },
      {
        title: "Treeview",
        path: toPage("ui/ui-extensions/extended-ui-treeview.html"),
      },
      {
        title: "Miscellaneous",
        path: toPage("ui/ui-extensions/extended-ui-misc.html"),
      },
    ],
  },
  {
    header: "Forms & Tables",
  },
  {
    title: "Form Elements",
    icon: '<i class="menu-icon tf-icons bx bx-detail"></i>',
    submenus: [
      {
        title: "Basic Inputs",
        path: toPage("ui/forms/forms-basic-inputs.html"),
      },
      {
        title: "Input Groups",
        path: toPage("ui/forms/forms-input-groups.html"),
      },
      {
        title: "Custom Options",
        path: toPage("ui/forms/forms-custom-options.html"),
      },
      {
        title: "Editors",
        path: toPage("ui/forms/forms-editors.html"),
      },
      {
        title: "Date & Time Pickers",
        path: toPage("ui/forms/forms-pickers.html"),
      },
      {
        title: "File Upload",
        path: toPage("ui/forms/forms-file-upload.html"),
      },
      {
        title: "Select & Tags",
        path: toPage("ui/forms/forms-selects.html"),
      },
      {
        title: "Sliders",
        path: toPage("ui/forms/forms-sliders.html"),
      },
      {
        title: "Switches",
        path: toPage("ui/forms/forms-switches.html"),
      },
      {
        title: "Extras",
        path: toPage("ui/forms/forms-extras.html"),
      },
    ],
  },
  {
    title: "Form Layouts",
    icon: '<i class="menu-icon tf-icons bx bx-detail"></i>',
    submenus: [
      {
        title: "Horizontal",
        path: toPage("ui/layouts/form-layouts-horizontal.html"),
      },
      {
        title: "Vertical",
        path: toPage("ui/layouts/form-layouts-vertical.html"),
      },
      {
        title: "Sticky Actions",
        path: toPage("ui/layouts/form-layouts-sticky.html"),
      },
    ],
  },
  {
    title: "Form Wizard",
    submenus: [
      {
        title: "Numbered",
        path: toPage("ui/forms/form-wizard-numbered.html"),
      },
      {
        title: "Icons",
        path: toPage("ui/forms/form-wizard-icons.html"),
      },
      {
        title: "Form Validation",
        path: toPage("ui/forms/form-validation.html"),
      },
    ],
  },
  {
    title: "Tables",
    icon: '<i class="menu-icon tf-icons bx bx-table"></i>',
    path: toPage("ui/tables/tables-basic.html"),
  },
  {
    title: "Data Tables",
    icon: '<i class="menu-icon tf-icons bx bx-grid"></i>',
    submenus: [
      {
        title: "Basic",
        path: toPage("ui/tables/tables-datatables-basic.html"),
      },
      {
        title: "Advanced",
        path: toPage("ui/tables/tables-datatables-advance.html"),
      },
      {
        title: "Extensions",
        path: toPage("ui/tables/tables-datatables-extensions.html"),
      },
    ],
  },
];

export const sidebarMapConfig = {
  main: main_routes,
  design_system: design_system_routes,
};
