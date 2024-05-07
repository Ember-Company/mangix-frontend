const MetaData = {
  links: [
    // Icons
    {
      rel: "stylesheet",
      href: "/src/vendor/fonts/boxicons.css",
    },
    {
      rel: "stylesheet",
      href: "/src/vendor/fonts/fontawesome.css",
    },
    {
      rel: "stylesheet",
      href: "/src/vendor/fonts/flag-icons.css",
    },
    // Core CSS
    {
      rel: "stylesheet",
      href: "/src/vendor/css/rtl/core.css",
    },
    {
      rel: "stylesheet",
      href: "/src/vendor/css/rtl/theme-default.css",
    },
    {
      rel: "stylesheet",
      href: "/src/css/styles.css",
    },
    // Vendors / Plugins CSS
    {
      rel: "stylesheet",
      href: "/src/vendor/libs/perfect-scrollbar/perfect-scrollbar.css",
    },
    {
      rel: "stylesheet",
      href: "/src/vendor/libs/typeahead-js/typeahead.css",
    },
    {
      rel: "stylesheet",
      href: "/src/vendor/libs/apex-charts/apex-charts.css",
    },

    // Helpers
  ],
};

options = {
  ...MetaData,
};

export default class Header {
  constructor(options = {}) {}

  // Convert Links object in metadata and options data into html <link></link>
  transpileLinks() {}

  $defaultOptions = () => {};
}

// new Header({
//   links: [
//     {
//       rel: 'stylesheet',
//       href: '/funcionarios.css'
//     }
//   ]
// })
