/// <reference types="cypress" />

describe('Iniciar sesión', () => {
    beforeEach(() => {
      // Visitar la página de inicio de sesión antes de cada prueba
      cy.visit('http://localhost:3000/login');
    });
  
    it('Debería probar múltiples credenciales desde un archivo JSON', () => {
      // Cargar las credenciales desde el archivo JSON
      cy.fixture('credentials').then((credentials) => {
        credentials.forEach(({ email, password, expectedUrl }) => {
          // Completa el formulario de inicio de sesión con las credenciales del archivo
          cy.get('input[name="email"]').clear().type(email);
          cy.get('input[name="password"]').clear().type(password);
          cy.get('button').contains('Ingresar').click();
  
          // Verifica la URL esperada después del intento de inicio de sesión
          cy.url().should('include', expectedUrl);
        });
      });
    });
  });
  