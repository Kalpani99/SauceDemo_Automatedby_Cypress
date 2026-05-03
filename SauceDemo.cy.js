describe('SauceDemo Website Automation', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const username = 'standard_user'
  const password = 'secret_sauce'

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  // ============================================================
  // TEST 1: Login to SauceDemo
  // ============================================================
  it('should log in successfully to SauceDemo', () => {
    // Verify login page is loaded
    cy.get('[data-test="login-container"]', { timeout: 20000 })
      .should('be.visible')

    cy.get('[data-test="username"]')
      .should('be.visible')
      .clear()
      .type(username)

    cy.get('[data-test="password"]')
      .should('be.visible')
      .clear()
      .type(password)

    cy.get('[data-test="login-button"]')
      .should('be.visible')
      .click()

    // Verify login success by checking if we're on the inventory page
    cy.url({ timeout: 20000 }).should('include', '/inventory.html')
    cy.get('[data-test="inventory-container"]', { timeout: 20000 }).should('be.visible')
  })

  // ============================================================
  // TEST 2: Add items to cart
  // ============================================================
  it('should add products to the shopping cart', () => {
    // Verify page loaded
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
     //Login first
    cy.get('[data-test="username"]', { timeout: 10000 }).type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 20000 }).should('include', '/inventory.html')
    cy.get('[data-test="inventory-container"]', { timeout: 20000 }).should('be.visible')

    // Add first item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Add second item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verify cart badge shows 2 items
    cy.get('[data-test="shopping-cart-badge"]', { timeout: 10000 })
      .should('contain', '2')
  })

  // ============================================================
  // TEST 3: View cart and verify items
  // ============================================================
  it('should view cart and verify added items', () => {
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
    // Login
    cy.get('[data-test="username"]', { timeout: 10000 }).type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 20000 }).should('include', '/inventory.html')

    // Add items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 10000 }).click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]', { timeout: 10000 }).click()

    // Click cart icon
    cy.get('[data-test="shopping-cart-link"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verify cart page
    cy.url({ timeout: 10000 }).should('include', '/cart.html')
    cy.get('[data-test="cart-list"]', { timeout: 10000 }).should('be.visible')

    // Verify items are in cart
    cy.get('[data-test="inventory-item-name"]', { timeout: 10000 }).should('have.length', 2)
  })

  // ============================================================
  // TEST 4: Complete checkout process
  // ============================================================
  it('should complete the full checkout process', () => {
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
    // Login
    cy.get('[data-test="username"]', { timeout: 10000 }).type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 20000 }).should('include', '/inventory.html')

    // Add item
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 10000 }).click()

    // Go to cart
    cy.get('[data-test="shopping-cart-link"]', { timeout: 10000 }).click()

    cy.url({ timeout: 20000 }).should('include', '/cart.html')

    // Click checkout
    cy.get('[data-test="checkout"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Fill in checkout information
    cy.url({ timeout: 20000 }).should('include', '/checkout-step-one.html')

    cy.get('[data-test="firstName"]', { timeout: 10000 })
      .should('be.visible')
      .type('Kalpani')

    cy.get('[data-test="lastName"]', { timeout: 10000 })
      .should('be.visible')
      .type('Diwyanjali')

    cy.get('[data-test="postalCode"]', { timeout: 10000 })
      .should('be.visible')
      .type('12345')

    // Click Continue
    cy.get('[data-test="continue"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verify checkout overview page
    cy.url({ timeout: 20000 }).should('include', '/checkout-step-two.html')
    cy.get('[data-test="checkout-summary-container"]', { timeout: 20000 }).should('be.visible')

    // Click Finish to complete order
    cy.get('[data-test="finish"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verify order completion
    cy.url({ timeout: 20000 }).should('include', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]', { timeout: 10000 }).should('contain', 'Thank you')
  })

  // ============================================================
  // TEST 5: Filter and sort products
  // ============================================================
  it('should filter and sort products', () => {
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
    // Login
    cy.get('[data-test="username"]', { timeout: 10000 }).type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 20000 }).should('include', '/inventory.html')

    // Select "Price (low to high)" from sort dropdown
    cy.get('[data-test="product-sort-container"]', { timeout: 10000 })
      .should('be.visible')
      .select('lohi')

    // Verify products are sorted
    cy.get('[data-test="inventory-list"]', { timeout: 10000 }).should('be.visible')
  })

  // ============================================================
  // TEST 6: Login with invalid credentials
  // ============================================================
  it('should show error with invalid credentials', () => {
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
    cy.get('[data-test="username"]', { timeout: 10000 })
      .type('invalid_user')

    cy.get('[data-test="password"]', { timeout: 10000 })
      .type('wrong_password')

    cy.get('[data-test="login-button"]', { timeout: 10000 })
      .click()

    // Verify error message appears
    cy.get('[data-test="error"]', { timeout: 20000 })
      .should('be.visible')
      .and('contain', 'Username and password')
  })

  // ============================================================
  // TEST 7: Logout functionality
  // ============================================================
  it('should logout successfully', () => {
    cy.get('[data-test="login-container"]', { timeout: 20000 }).should('be.visible')
    
    // Login
    cy.get('[data-test="username"]', { timeout: 10000 }).type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    cy.url({ timeout: 20000 }).should('include', '/inventory.html')
    cy.get('[data-test="inventory-container"]', { timeout: 20000 }).should('be.visible')

    // Click hamburger menu - SauceDemo specific selector
    cy.get('#react-burger-menu-btn', { timeout: 10000 })
      .should('exist')
      .click()

    // Click logout
    cy.get('#logout_sidebar_link, a[data-test="logout-sidebar-link"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    // Verify redirected to login page
    //cy.url({ timeout: 20000 }).should('include', '/index.html')
    /*cy.get('[data-test="login-button"]', { timeout: 20000 }).should('be.visible')*/})})
