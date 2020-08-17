const { func } = require("prop-types")

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {username: 'testUser', name: 'test', password: 'test123'}
      cy.request('POST','http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.contains('Log in to application')
    })
    describe('Login tests', function(){
      it('Login with right credentials', function() {
        cy.get('input:first').type('testUser')
        cy.get('input:last').type('test123')
        cy.contains('Login').click()
        cy.contains('test logged in ')
      })
      it('Login with wrong crendentials', function() {
        cy.get('input:first').type('spaddw')
        cy.get('input:last').type('oakkw')
        cy.contains('Login').click()
        cy.contains('Wrong credentials')
      })
    })

    describe.only('When logged in', function() {
      beforeEach(function(){
        cy.get('input:first').type('testUser')
        cy.get('input:last').type('test123')
        cy.contains('Login').click()
        cy.contains('test logged in ')
      })
      it('Creating new blog', function() {
        cy.contains('New blog').click()
        cy.get('#titleId').type('Testi blogi')
        cy.get('#authorId').type('auhtor')
        cy.get('#urlId').type('ww.com')
        cy.contains('Create').click()
        cy.contains('Testi blogi')
      })
      it('Liking a blog', function() {
        cy.contains('New blog').click()
        cy.get('#titleId').type('Testi blogi')
        cy.get('#authorId').type('auhtor')
        cy.get('#urlId').type('ww.com')
        cy.contains('Create').click()
        cy.contains('Testi blogi')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })
      it('Deleting a blog', function() {
        cy.contains('New blog').click()
        cy.get('#titleId').type('Testi blogi')
        cy.get('#authorId').type('auhtor')
        cy.get('#urlId').type('ww.com')
        cy.contains('Create').click()
        cy.contains('Testi blogi')
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.get('.titleAuthor').should('not.contain', 'Testi blogi')
      })
      it('Blogs should be sorted by likes', function() {
        cy.contains('New blog').click()
        cy.get('#titleId').type('Testi blogi')
        cy.get('#authorId').type('auhtor')
        cy.get('#urlId').type('ww.com')
        cy.contains('Create').click()
        cy.contains('New blog').click()
        cy.get('#titleId').type('Testi2 blogi')
        cy.get('#authorId').type('auh2tor')
        cy.get('#urlId').type('ww.com')
        cy.contains('Create').click()
        cy.contains('Testi blogi')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click()

      })
    })
  })