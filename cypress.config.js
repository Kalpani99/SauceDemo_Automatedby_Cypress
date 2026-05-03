const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '5f1b3h',

  e2e: {
    baseUrl: 'https://www.saucedemo.com', // optional but recommended

    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // no changes needed here
    },
  },

  // Enable session caching globally (important for cy.session)
  experimentalSessionAndOrigin: true
})
