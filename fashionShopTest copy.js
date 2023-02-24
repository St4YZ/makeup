/// <reference types="Cypress" />
require('cypress-xpath')

describe('MakeUp Automation test', () => {
    it('Add items to the basket', () => {
        cy.visit('https://makeup.com.ua/ua/').wait(7000)
        cy.url().should('eq', 'https://makeup.com.ua/ua/')
        cy.get('#menu-toggle').click()
        cy.get(':nth-child(4) > .menu-list__link').click()
        cy.get('.simple-slider-list-buttons .button.buy').first().click({force:true})
        cy.get('.link').click()
        cy.get('#menu-toggle').click()
        cy.xpath("(//a[contains(text(),'Одяг')])[1]").scrollIntoView().should('be.visible').click({force:true})
        cy.get('.simple-slider-list-buttons .button.buy').first().click({force:true})
        cy.get('.link').click()
        cy.get('.header-basket').click()
        cy.get('.page-header').should('contain',"Кошик")
        cy.get('.product__header').should("have.length",2).should("contain","Нічна антивікова сироватка")
        cy.get('.product__price').should("have.length",2).should('contain',"506")
        cy.get('.product__header').should("contain","Колготки")
        cy.get('.product__price').should('contain',"188")
        cy.get('.product__price').then(($prices) => {
            const productPrices = Array.from($prices, el => parseFloat(el.innerText))
            return productPrices.reduce((acc, price) => acc + price, 0) }).as('totalPrice')
            cy.get("div[class='total'] span strong").invoke('text').then((text) => {
                const cartTotal = parseFloat(text.replace('$', ''))
                expect(cartTotal).to.eq('@totalPrice')
  })
})})