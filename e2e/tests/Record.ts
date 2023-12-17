import { test, expect } from "playwright/test";

test.describe("Todo App", () => {
    test("ToDoを追加できること", async ({ page }) => {
      await page.goto('http://localhost:3000/user/login');
      await page.getByPlaceholder('メールアドレス').click();
      await page.getByPlaceholder('メールアドレス').fill('');
      await page.getByPlaceholder('メールアドレス').click();
      await page.getByPlaceholder('メールアドレス').fill('yourname@example.com');
      await page.getByPlaceholder('パスワード').click();
      await page.getByPlaceholder('パスワード').fill('yourpassword');
      await page.getByRole('button', { name: 'ログイン' }).click();
      await page.getByRole('button', { name: '合宿を追加' }).click();
      await page.getByLabel('合宿名：').click();
      await page.locator('div').filter({ hasText: /^撤収日：$/ }).getByRole('textbox').click();
      await page.getByLabel('Choose 2023年10月3日火曜日').click();
      await page.getByRole('combobox').selectOption('木曽川');
      await page.getByLabel('合宿名：').click();
      await page.getByLabel('合宿名：').fill('テスト');
      await page.getByLabel('合宿名：').press('Enter');
      await page.getByRole('button', { name: '作成する' }).click();
      await page.getByRole('button', { name: '合宿を追加' }).click();
      await page.getByRole('button', { name: '戻る' }).click();

      await page.goto('http://localhost:3000/camp');
      await page.goto('http://localhost:3000/user/login');
      await page.getByPlaceholder('メールアドレス').click();
      await page.getByPlaceholder('メールアドレス').fill('yourname1@example.com');
      await page.getByPlaceholder('パスワード').click();
      await page.getByPlaceholder('パスワード').fill('yourpassword');
      await page.getByRole('button', { name: 'ログイン' }).click();
      await page.getByRole('button', { name: 'ログイン' }).click();
      await page.getByPlaceholder('パスワード').click();
      await page.getByRole('button', { name: 'ログイン' }).click();
    });
  });

  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('button', { name: '新規登録ページへ' }).click();
  await page.getByRole('button', { name: 'ログインページへ' }).click();
  await page.getByPlaceholder('メールアドレス').click();
  await page.getByPlaceholder('メールアドレス').fill('yourname1@example.com');
  await page.getByPlaceholder('パスワード').click();
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByText('ログインヘルプページへ新規登録ページへ').click();
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByPlaceholder('メールアドレス').click();
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').press('ArrowLeft');
  await page.getByPlaceholder('メールアドレス').fill('yourname@example.com');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('heading', { name: '合宿一覧' }).click();
  await page.getByRole('heading', { name: '合宿一覧' }).click();
  await page.getByRole('heading', { name: '合宿一覧' }).click();
  getByRole('heading', { name: '合宿一覧' })
