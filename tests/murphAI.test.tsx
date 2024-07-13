import { test,} from '@playwright/test';

test('testing AI interface', async ({ page }) => {
  await page.pause()
  await page.goto('http://localhost:5173/murphyAI');
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Login or SignUp' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adriankimani5@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12345678');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.frameLocator('iframe[title="AI Chatbot"]').getByLabel('How may I be of help to you😃:').click();
  await page.frameLocator('iframe[title="AI Chatbot"]').getByLabel('How may I be of help to you😃:').fill('hey');
  await page.frameLocator('iframe[title="AI Chatbot"]').getByLabel('How may I be of help to you😃:').press('Enter');
  await page.getByRole('button', { name: 'Log Out' }).click();
});