// Интеграционные тесты на Cypress написаны для страницы конструктора бургера

//Созданы моковые данные для ингредиентов
import mockIngredients from '../fixtures/ingredients.json';

//Созданы моковые данные ответа на запрос создания заказа
import mockUserData from '../fixtures/user-data.json';

//Созданы моковые данные ответа на запрос данных пользователя
import mockUserOrder from '../fixtures/user-order.json';

const URL = Cypress.env('BURGER_API_URL');

const initialUserData = {
  success: true,
  accessToken: '',
  refreshToken: '',
  user: { email: '', name: '' }
};
let userData = initialUserData;

describe('Конструктор бургера', () => {
  beforeEach(() => {
    //Настроен перехват запроса на эндпоинт 'api/ingredients’,
    //в ответе на который возвращаются созданные ранее моковые данные ингредиентов
    cy.intercept('GET', `${URL}/ingredients`, {
      statusCode: 200,
      body: { success: true, data: mockIngredients }
    }).as('getIngredients');

    //Настроен перехват запроса на эндпоинт 'api/orders’,
    //в ответе на который возвращаются созданные ранее моковые данные заказа
    cy.intercept('POST', `${URL}/orders`, {
      statusCode: 200,
      body: mockUserOrder
    }).as('addUserOrder');

    //Настроен перехват запроса на эндпоинт 'api/auth/user’,
    //в ответе на который возвращаются созданные ранее моковые авторизационные данные пользователя

    cy.intercept('GET', `${URL}/auth/user`, {
      statusCode: 200,
      body: userData
    }).as('getUserData');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUserData');
  });

  //Протестировано добавление ингредиента из списка в конструктор
  it('добавление булки в конструктор', () => {
    cy.get('[cypress-test="add-button-bun"]').first().children().click();
    cy.get('[cypress-test="bun-top-filled"]').should('exist');
    cy.get('[cypress-test="bun-bottom-filled"]').should('exist');
  });

  it('добавление соусов в конструктор', () => {
    cy.get('[cypress-test="add-button-sauce"]').first().children().click();
    cy.get('[cypress-test="ingredient-sauce"]').should('exist');
  });

  it('добавление начинки в конструктор', () => {
    cy.get('[cypress-test="add-button-main"]').first().children().click();
    cy.get('[cypress-test="ingredient-main"]').should('exist');
  });

  //Протестирована работа модальных окон
  it('тест открывает модальное окно ингредиента и закрывает модальное окно по клику на крестик', () => {
    cy.get('[cypress-test="ingredient-card"]').first().children().click();
    cy.get('[cypress-test="modal"]').should('exist');
    const ingredientDetailsTest = `ingredient-details-${mockIngredients[0]._id}`;
    cy.get(`[cypress-test="${ingredientDetailsTest}"]`).should('exist');
    cy.get('[cypress-test="modal-close-button"]').children().click();
    cy.get('[cypress-test="modal"]').should('not.exist');
  });

  //Создание заказа
  it('тест должен собирать бургер, открывать модальное окно с данными о заказе, и очищать форму после заказа', () => {
    //добавление булки
    cy.get('[cypress-test="add-button-bun"]').first().children().click();
    cy.get('[cypress-test="bun-top-filled"]').should('exist');
    cy.get('[cypress-test="bun-bottom-filled"]').should('exist');

    //добавление соуса и начинки
    cy.get('[cypress-test="add-button-main"]').first().children().click();
    cy.get('[cypress-test="ingredient-main"]').should('exist');
    cy.get('[cypress-test="add-button-sauce"]').first().children().click();
    cy.get('[cypress-test="ingredient-sauce"]').should('exist');

    //Перед выполнением теста создания заказа в localStorage и сookie подставляются фейковые токены авторизации,
    userData = mockUserData;
    //Вызывается клик по кнопке «Оформить заказ»
    cy.get('[cypress-test="make-order-button-container"]').children().click();
    cy.wait('@getUserData');
    cy.wait('@addUserOrder');

    //Проверяется, что модальное окно открылось и номер заказа верный
    const orderDetailsTest = `order-details-${mockUserOrder.order.number}`;
    cy.get(`[cypress-test="${orderDetailsTest}"]`).should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия
    cy.get('[cypress-test="modal-close-button"]').children().click();
    cy.get('[cypress-test="modal"]').should('not.exist');

    //Проверяется, что конструктор пуст
    cy.get('[cypress-test="bun-top"]').should('contain', 'Выберите булки');
    cy.get('[cypress-test="bun-bottom"]').should('contain', 'Выберите булки');
    cy.get('[cypress-test="ingredients-container"]').should(
      'contain',
      'Выберите начинку'
    );

    //после завершения теста в localStorage и сookie фейковые токены авторизации очищаются
    userData = initialUserData;

    cy.get('[cypress-test="profile-link"]').children().click();
    cy.wait('@getUserData');
    cy.get('[cypress-test="profile-link"]').should('contain', 'Личный кабинет');
  });
});
