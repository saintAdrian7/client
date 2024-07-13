import { test} from '@playwright/test';

test('loging functionality and creating courses and deleting', async ({ page }) => {
  await page.pause()
  await page.goto('http://localhost:5173/');
  await page.getByLabel('menu').click();
  await page.getByRole('button', { name: 'Home' }).click();
  await page.locator('.MuiBackdrop-root').click();
  await page.getByLabel('menu').click();
  await page.getByRole('button', { name: 'Create Course' }).click();
  await page.locator('.MuiBackdrop-root').click();
  await page.locator('button').nth(3).click();
  await page.getByRole('button', { name: 'Login or SignUp' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('adriankimani5@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('12345678');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.getByPlaceholder('enter course Title').click();
  await page.getByPlaceholder('enter course Title').fill('title');
  await page.getByPlaceholder('enter course description').click();
  await page.getByPlaceholder('enter course description').click();
  await page.getByPlaceholder('enter course description').fill('delete this');
  await page.getByRole('button', { name: 'Create Course' }).click();
  await page.getByRole('button', { name: 'Delete this Course' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  await page.getByLabel('menu').click();
  await page.getByRole('button', { name: 'Home' }).click();
});