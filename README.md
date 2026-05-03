# Cypress Website Automation

This project is set up to automate website testing using Cypress.

## Getting Started

1. Make sure you have Node.js installed
2. Install dependencies: `npm install`
3. Open Cypress Test Runner: `npm run cypress:open`
4. Or run tests headlessly: `npm run cypress:run`

## Project Structure

- `cypress.config.js` - Cypress configuration file
- `cypress/e2e/` - Directory containing test files
- `cypress/e2e/sample_test.cy.js` - Example test file

## Writing Tests

Edit the `cypress/e2e/sample_test.cy.js` file to customize your tests:

- Change the `cy.visit()` URL to your target website
- Add more test cases using `it()` blocks
- Use Cypress commands like `cy.get()`, `cy.click()`, `cy.type()`, etc.

## Common Cypress Commands

- `cy.visit(url)` - Visit a URL
- `cy.get(selector)` - Get an element
- `cy.contains(text)` - Get element containing text
- `cy.click()` - Click an element
- `cy.type(text)` - Type into an input field
- `cy.should('be.visible')` - Assert element is visible

## Example Test Modifications

Replace the example URL and add your own test logic:

```javascript
describe('My Website Tests', () => {
  it('should login successfully', () => {
    cy.visit('https://mywebsite.com/login')
    cy.get('#username').type('myusername')
    cy.get('#password').type('mypassword')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})
```