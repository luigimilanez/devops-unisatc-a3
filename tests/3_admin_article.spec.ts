import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Realizando login como Admin e criando artigo', async ({ page }) => {
    
    // Acessar a página de login
    await page.goto('http://localhost:1337/admin');

    // Logando na conta
    await page.fill('input[name="email"]', 'admin@satc.edu.br');
    await page.fill('input[name="password"]', 'welcomeToStrapi123');
    await page.click('button[type="submit"] span:has-text("Login")');

    // Entrando na página Content Manager
    await page.click('a:has(span:has-text("Content Manager"))');

    // Entrando na tag Artigo
    await page.click('a:has(div:has(span:has-text("Artigo")))');

    // Criando um Artigo
    await page.click('a:has(span:has-text("Create new entry"))');
    await page.fill('input[name="title"]', faker.person.jobArea());
    await page.fill('textarea[name="description"]', faker.person.jobDescriptor());
    
    await page.keyboard.press('Tab');
    
    const focusedElement1 = page.locator(':focus');
    await focusedElement1.click();

    const box1 = await focusedElement1.boundingBox();

    if (box1) {
        // Clica 15px abaixo do meio do elemento selecionado
        await page.mouse.click(box1.x + box1.width / 2, box1.y + box1.height + 15);
    }

    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    
    const focusedElement2 = page.locator(':focus');
    await focusedElement2.click();

    const box2 = await focusedElement2.boundingBox();

    if (box2) {
        // Clica 15px abaixo do meio do elemento selecionado
        await page.mouse.click(box2.x + box2.width / 2, box2.y + box2.height + 15);
    }

    await page.click('h2:has-text("Entry")');
    await page.waitForTimeout(200);

    // Salva o rascunho
    // await page.click('button:has(span:has-text("Publish"))');
    await page.click('button:has(span:has-text("Save"))');

    // Deslogando da conta
    await page.click('span.sc-Qotzb.jopkZf.sc-dKREkF.kGPoCp');
    await page.click('span:has-text("Log out")');
    
    // Verificar se voltou para a tela inicial com "Welcome to Strapi!"
    await expect(page.locator('text=Welcome to Strapi!')).toBeVisible();
});