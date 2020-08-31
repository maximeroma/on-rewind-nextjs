const completeItem = {
  id: 'b98814fe-841c-4e2c-aa3c-972d19bac52a',
  name: 'Corinthians',
  challengers: ['Corinthians', 'Fluminense'],
  tags: [
    { name: 'soccer', regexp: /soccer/i },
    { name: 'vod', regexp: /vod/i }
  ]
}

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('visit home page', () => {
  beforeEach('open home page', () => {
    cy.visit('http://localhost:3000/event/' + completeItem.id)
  })

  it('should have a header', () => {
    cy.findByText(/on rewind app/i).should('exist')
  })

  it('should have info when streams are not available', () => {
    cy.wait(100)
    cy.findAllByText(/stream not available/i).should('have.length', 2)
  })

  it('should have all informations on event item', () => {
    cy.findByTestId('event-item-' + completeItem.id).within(() => {
      cy.findByAltText('thumbnail-' + completeItem.name).should('exist')
      cy.findByTestId('event-name').contains(completeItem.name)
      completeItem.challengers.forEach((challenger) => {
        cy.findByTestId('challenger-name-' + challenger).contains(challenger)
        cy.findByAltText('challenger-' + challenger).should('exist')
      })
      completeItem.tags.forEach((tag) => {
        cy.findByTestId('tag-' + tag.name).contains(tag.regexp)
      })
    })
  })

  it('should go back on home page on go back button click', () => {
    cy.wait(100)
      .findByText(/go back/i)
      .click()
    cy.url().should('include', '/')
  })
})
