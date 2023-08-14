Cypress.Commands.add('search', palavraNova => {
    cy.get('input[type="text"]')
        .should('be.visible')
        .clear()
        .type(`${palavraNova}{enter}`)
})