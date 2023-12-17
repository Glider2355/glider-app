import { Step } from "gauge-ts";
import Common from "./Common";

export default class StepImplementation {
    @Step("ログイン成功を確認する")
    async loginSuccess() {
        const page = Common.getPage();
        // ログイン成功を確認する
        await page.waitForSelector('text="合宿一覧"');
    }
}
