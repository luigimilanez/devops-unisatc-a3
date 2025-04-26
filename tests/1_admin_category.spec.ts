import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Realizando login como Admin e criando categoria', async ({ page }) => {
    
    // Acessar a página de login
    await page.goto('http://localhost:1337/admin');

    // Logando na conta
    await page.fill('input[name="email"]', 'admin@satc.edu.br');
    await page.fill('input[name="password"]', 'welcomeToStrapi123');
    await page.click('button[type="submit"] span:has-text("Login")');

    // Entrando na página Content Manager
    await page.click('a:has(span:has-text("Content Manager"))');

    // Entrando na tag categoria
    await page.click('a:has(div:has(span:has-text("Categoria")))');

    // Criando uma categoria
    await page.click('a:has(span:has-text("Create new entry"))');
    await page.fill('input[name="name"]', faker.person.jobTitle());
    await page.click('button:has(span:has-text("Save"))');

    // Deslogando da conta
    await page.click('span.sc-Qotzb.jopkZf.sc-dKREkF.kGPoCp');
    await page.click('span:has-text("Log out")');
    
    // Verificar se voltou para a tela inicial com "Welcome to Strapi!"
    await expect(page.locator('text=Welcome to Strapi!')).toBeVisible();
});