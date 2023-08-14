const { faker } = require('@faker-js/faker');

describe('Hacker News TAT', () => {
  const palavraNova = 'cypress'

  beforeEach(() => {
    cy.intercept(
      '**/search?query=redux**'
      // { fixture: 'empty' }
    ).as('empty')

    cy.intercept(
      `**/search?query=${palavraNova}**`
      // { fixture: 'stories' }
    ).as('mock')

    cy.visit('/')
    cy.wait('@empty').its("response.statusCode").should("eq", 200);

  })
  it('Verifica se a aplicação está salvando o conteúdo em cache', () => {
    const palavraFake = faker.lorem.word()
    let contador = 0

    cy.intercept(
      'GET',
      `**/search?query=${palavraFake}**`, resposta => {
        contador += 1
        resposta.reply({ fixture: 'empty' })
      }
    ).as('random')

    cy.search(palavraFake).then(() => {
      expect(contador).to.equal(1)

      cy.wait('@random')

      cy.search(palavraNova)
      cy.wait('@mock').its("response.statusCode").should("eq", 200);

      cy.search(palavraFake).then(() => {
        expect(contador).to.equal(1)
      })
    })

  })
})