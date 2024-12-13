/// <reference types="cypress" />

describe("Iniciar sesión", () => {
  before(() => {
    // Inicia sesión una sola vez antes de todas las pruebas
    cy.visit("http://localhost:3000/login");

    // Completa el formulario de inicio de sesión
    cy.get('input[name="email"]').type("jero713@hotmail.com"); // Cambia esto por un correo válido
    cy.get('input[name="password"]').type("Pepe123!"); // Cambia esto por una contraseña válida
    cy.get("button").contains("Ingresar").click();

    // Verifica que se redirige a la página de inicio
    cy.url().should("include", "/home");

    // Navega a la sección de crear usuario
    cy.get('a[name="userCreateButtom"]').click();
    cy.wait(5000);
    cy.get("button").contains("Crear usuario").click();
    cy.url().should("include", "/create-user");
  });

  it("Debería crear un usuario con los inputs válidos", () => {
    cy.get('input[name="name"]').type("Alexis");
    cy.get('input[name="lastname"]').type("Fido");
    cy.get("button.dropdown-btn").click();
    cy.get(".ant-dropdown-menu-item").contains("Cédula de ciudadania").click();
    cy.get('input[name="num_doc"]').type("61213258");
    cy.get('input[name="telephone"]').type("3001234569");
    cy.get('input[name="email"]').type("alexis.fido@example.com");
    cy.get('input[name="password"]').type("Pepe123!");
    cy.get('input[name="position"]').type("SOC");

    cy.get("button").contains("Crear usuario").click();

    // Verifica que el usuario fue creado y redirigido correctamente
    cy.contains("Nuevo usuario creado con éxito.").should("be.visible");
    cy.url().should("include", "/employees");
  });
});
