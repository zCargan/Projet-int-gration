describe('ajouterObjectif', () => {
    it("Utilisateur peut ajouter un objectif", () => {
        cy.visit('http://localhost:3000/home');
        cy.visit('http://localhost:3000/inscription')
        cy.get('.form_connection > :nth-child(1) > input').type('thom-blvq@hotmail.com')
        cy.get('.form_connection > :nth-child(2) > input').type('jetaimemamanP22@')
        cy.get('.form_connection > :nth-child(3)').click()
        cy.wait(800)
        cy.get('.fas').click()
        cy.get(':nth-child(2) > .nav-links').click()
        cy.get('.fas').click()
        cy.get('ul > :nth-child(1) > .fas').click()
        cy.get(':nth-child(2) > .fas').click()
    })
})