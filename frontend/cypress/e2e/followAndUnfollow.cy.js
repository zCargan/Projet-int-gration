describe('ajouterObjectif', () => {
    it("Utilisateur peut follow et unfollow quelqu'un", () => {
        cy.visit('http://localhost:3000/home');
        cy.visit('http://localhost:3000/inscription')
        cy.get('.form_connection > :nth-child(1) > input').type('thom-blvq@hotmail.com')
        cy.get('.form_connection > :nth-child(2) > input').type('jetaimemamanP22@')
        cy.get('.form_connection > :nth-child(3)').click()
        cy.wait(800)
        cy.get('.fas').click()
        cy.get(':nth-child(4) > .nav-links').click()
        cy.get('.fas').click()
        cy.get('[data-testid="searchInput"]').click()
        cy.get('[data-testid="searchInput"]').type('test')
        cy.get('[data-testid="dataResult"] > :nth-child(1) > p').click()
        cy.wait(800)
        cy.get('.boutonFollow').click()
        cy.get('.boutonFollow').click()


    })
})