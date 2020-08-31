Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const completeItem = {
  id: 'b98814fe-841c-4e2c-aa3c-972d19bac52a',
  name: 'Corinthians',
  challengers: ['Corinthians', 'Fluminense'],
  tags: [
    { name: 'soccer', regexp: /soccer/i },
    { name: 'vod', regexp: /vod/i }
  ]
}

describe('visit home page', () => {
  beforeEach('open home page', () => {
    cy.visit('http://localhost:3000/')
  })

  it('should have a header', () => {
    cy.findByText(/on rewind app/i).should('exist')
  })

  it('should fint 10 items', () => {
    cy.wait(100)
      .findAllByTestId(/event-item-*/i)
      .should('have.length', 10)
  })

  it('should have all informations on event item', () => {
    cy.wait(100)
      .findByTestId('event-item-' + completeItem.id)
      .within(() => {
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

  it('should go to event page on click', () => {
    cy.wait(100)
      .findByTestId('event-item-' + completeItem.id)
      .click()
    cy.url().should('include', '/event/' + completeItem.id)
  })

  it('should fetch next items when scroll is on window bottom', () => {
    cy.wait(1000)
    cy.scrollTo('bottom')
    cy.wait(1000)

    cy.findAllByTestId(/event-item-*/i).should('have.length', 20)
  })

  it('should return to top on go to top button click ', () => {
    cy.wait(100)

    cy.scrollTo('bottom')
    cy.wait(100)
    cy.findByText(/go to top/i)
      .should('be.visible')
      .click()

    cy.wait(100)
    cy.findByText(/go to top/i).should('not.be.visible')
  })
})
