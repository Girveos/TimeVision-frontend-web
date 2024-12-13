/// <reference types="cypress" />

describe('Pruebas de cambio de contraseña', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Ir a la página de login antes de cada prueba
  
      // Completa el formulario de inicio de sesión
      cy.get('input[name="email"]').type('julian@gmail.com'); // Correo válido
      cy.get('input[name="password"]').type('Pepe123!'); // Contraseña válida
      cy.get('button').contains('Ingresar').click();
  
      // Verifica que se redirige a la página de inicio
      cy.url().should('include', '/home');
  
      // Ir a la página de perfil
      cy.get('a[name="buttonProfile"]').click();
      cy.url().should('include', '/profile');
  
      // Abre el modal de cambio de contraseña
      cy.get('button').contains('Cambiar contraseña').click();
    });
  
    it('Realiza múltiples intentos de cambio de contraseña y continúa tras errores', () => {
      cy.fixture('passwordChangeAttempts').then((passwordAttempts) => {
        passwordAttempts.forEach((attempt) => {
          const { currentPassword, newPassword, confirmPassword, expectedResult } = attempt;
  
          // Completa los campos del modal
          if (currentPassword) {
            cy.get('input[placeholder="Contraseña actual"]').clear().type(currentPassword);
          } else {
            cy.get('input[placeholder="Contraseña actual"]').clear();
          }
  
          if (newPassword) {
            cy.get('input[placeholder="Nueva contraseña"]').clear().type(newPassword);
          } else {
            cy.get('input[placeholder="Nueva contraseña"]').clear();
          }
  
          if (confirmPassword) {
            cy.get('input[placeholder="Confirmar contraseña"]').clear().type(confirmPassword);
          } else {
            cy.get('input[placeholder="Confirmar contraseña"]').clear();
          }
  
          // Haz clic en guardar
          cy.get('button').contains('Guardar').click();
  
          // Verifica el resultado esperado
          cy.wait(200); // Espera para evitar que se rompa el flujo
          if (expectedResult === 'success') {
            cy.contains('Contraseña cambiada con éxito.').should('be.visible');
            cy.url().should('include', '/login');
          }
        });
      });
    });
  });
  