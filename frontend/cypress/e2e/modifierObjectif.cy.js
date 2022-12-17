describe('modifier objectif', () => {
    it("Utilisateur peut modifier ses objectifs", () => {
        cy.visit('http://localhost:3000/home');
        cy.visit('http://localhost:3000/inscription')
        cy.get('.form_connection > :nth-child(1) > input').type('thom-blvq@hotmail.com')
        cy.get('.form_connection > :nth-child(2) > input').type('jetaimemamanP22@')
        cy.get('.form_connection > :nth-child(3)').click()
        cy.wait(800)
        cy.get('.fas').click()
        cy.get(':nth-child(6) > .nav-links').click()
        cy.get('.fas').click()
        cy.get('.fa-pencil').click()
        cy.get('.form > :nth-child(7)').click()
        cy.get('.type').click()
        cy.get('.type').type("TestEnd2End")
        cy.get('input.button_form').click()
        cy.get('.fa-pencil').click()
        cy.get('.form > :nth-child(7)').click()





    })
})