/* eslint-disable no-undef */
Feature('Customer Review Restaurant');

Scenario('Add customer review', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('restaurant-list');

  I.seeElement('.restaurant-title a');
  I.click('.restaurant-title a');

  I.seeElement('#review-form');

  const nameText = 'Ahmad';
  I.fillField('#name', nameText);
  const reviewText = 'Tempatnya terasa nyaman.';
  I.fillField('#review', reviewText);
  I.click('button[type="submit"]');

  I.seeElement('.review-item');
});
