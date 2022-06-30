describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  describe('When not logged in', function() {

    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
      cy.contains('Notes')
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login form can be opened', function() {
      cy.contains('Log in').click()
    })

    it('user can login', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('login fails when password is incorrect', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.contains('Create new').click()
      cy.get('input:last').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'note from cypress', important: false })
      })

      it('it can be made important', function () {
        cy.contains('note from cypress')
          .parent()
          .find('button')
          .click()

        cy.contains('note from cypress')
          .parent()
          .should('contain', 'Make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click()

        cy.contains('second note').parent().find('button')
          .should('contain', 'Make not important')
      })
    })
  })
})