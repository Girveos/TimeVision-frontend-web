/// <reference types="cypress" />

describe('Iniciar sesión', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/login')
  })
  
    it('Debería iniciar sesión con credenciales válidas', () => {
      // Completa el formulario de inicio de sesión
      cy.get('input[name="email"]').type('jero713@hotmail.com'); // Cambia esto por un correo válido
      cy.get('input[name="password"]').type('Pepe123!'); // Cambia esto por una contraseña válida
      cy.get('button').contains('Ingresar').click(); // Asegúrate de que el texto del botón sea correcto
  
      // Verifica que se redirige a la página de inicio
      cy.url().should('include', '/home'); // Cambia esto por la ruta correcta
    });
  
    it('Debería mostrar un error con credenciales inválidas', () => {
      // Completa el formulario de inicio de sesión con credenciales inválidas
      cy.get('input[name="email"]').type('correo_invalido@gmail.com');
      cy.get('input[name="password"]').type('contraseña_invalida');
      cy.get('button').contains('Ingresar').click();
    });

    it('Debería mostrar un error con credenciales inválidas', () => {
      // Completa el formulario de inicio de sesión con credenciales inválidas
      cy.get('input[name="email"]').type('juan.perez@example.com');
      cy.get('input[name="password"]').type('Pepe123!');
      cy.get('button').contains('Ingresar').click();
    });
  }); 