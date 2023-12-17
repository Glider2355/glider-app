import { AfterSpec, BeforeSpec, Step } from "gauge-ts";
import { Page, chromium } from "playwright";
import { clearTestData, setupTestData } from "../../setup/setup";

let page: Page;

export default class Common {
  @BeforeSpec({tags: ["web"]})
  public static async beforeSuite() {
    await Common.setup();
    await Common.login();
  }

  @AfterSpec({tags: ["web"]})
  public static async afterSuite() {
    await Common.clear();
    await Common.close();
  }

  public static getPage(): Page {
    return page;
  }

  @Step("テストデータをセットアップする")
  public static async setup() {
    setupTestData();
  }

  @Step("ログインする")
  public static async login() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("http://localhost:3000/user/login");

    // メールアドレスとパスワードの入力フィールドに値を入力します。
    await page.fill(
      'input[placeholder="メールアドレス"]',
      "yourname1@example.com"
    );
    await page.fill('input[placeholder="パスワード"]', "yourpassword");

    // ログインボタンをクリックします。
    await page.click('button[type="submit"]');
  }

  @Step("テストデータを削除する")
  public static async clear() {
    await clearTestData();
  }

  @Step("ブラウザを閉じる")
  public static async close() {
    await page.close();
  }
}
