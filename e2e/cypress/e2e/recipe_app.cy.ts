describe("Recipe tests", () => {
  const recipeName = `My lovely recipe ${Date.now()}`;
  const recipeId = recipeName.toLowerCase().replace(/ /g, "-");

  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it(
    `Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`,
    () => {
      // Arrange
      const recipeToAdd = {
        name: recipeName,
        ingredients: [
          {
            name: "Oregano",
            value: 10,
            unit: "G",
          },
          {
            name: "Basil",
            value: 9,
            unit: "G",
          },
        ],
        method: [
          { instructions: "Chuck it all in" },
          { instructions: "Cross your fingers" },
        ],
      };

      // Act

      // Load modal
      cy.get("button#add-favourite-recipe").click();

      // Add recipe name
      cy.get("input#recipe-name").clear().type(recipeToAdd.name);

      // Add recipe ingredients

      // Add first ingredient
      cy.get("input#recipe-ingredient-0-name").clear().type(
        recipeToAdd.ingredients[0].name,
      );
      cy.get("input#recipe-ingredient-0-value").clear().type(
        recipeToAdd.ingredients[0].value.toString(),
      );
      cy.get("input#recipe-ingredient-0-unit").clear().type(
        recipeToAdd.ingredients[0].unit,
      );

      // Add second ingredient
      cy.get("button#add-another-recipe-ingredient-0").click();
      cy.get("input#recipe-ingredient-1-name").clear().type(
        recipeToAdd.ingredients[1].name,
      );
      cy.get("input#recipe-ingredient-1-value").clear().type(
        recipeToAdd.ingredients[1].value.toString(),
      );
      cy.get("input#recipe-ingredient-1-unit").clear().type(
        recipeToAdd.ingredients[1].unit,
      );

      // Add recipe methods

      // Add first method step
      cy.get("input#recipe-method-0-instructions").clear().type(
        recipeToAdd.method[0].instructions,
      );

      // Add second method step
      cy.get("button#add-another-recipe-method-step-0").click();
      cy.get("input#recipe-method-1-instructions").clear().type(
        recipeToAdd.method[1].instructions,
      );

      // Submit the recipe
      cy.get("button#submit-recipe").click();

      // Ensure the new recipe is rendered in the page
      const children = cy.get(`div#${recipeId}`).children();
      children.get("h3").contains(recipeName);
    },
  );

  it(
    `Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`,
    () => {
      // Act
      cy.get("input#search-for-recipe-by-name").clear().type(
        recipeName,
      )
      // Then press enter
      .type("{enter}");

      // Ensure only one recipe is rendered
      cy.get("div#recipes").children().should("have.length", 1);

      // Ensure the searched for recipe is rendered in the page
      const children = cy.get(`div#${recipeId}`).children();
      children.get("h3").contains(recipeName);
    },
  );

  // TODO: complete this optional task if time allows
  it.skip(
    `Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`,
    () => {
      expect(true).to.eq(false);
    },
  );
});
