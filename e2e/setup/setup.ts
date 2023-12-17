import { Connection, createConnection } from "mysql2/promise";
import * as csvParser from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";


dotenv.config();

const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

let connection: Connection | null = null;
let testStartTime: string;

function createJST(): string {
  const jstDate = new Date();
  jstDate.setHours(jstDate.getHours() + 9);
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  const hours = String(jstDate.getHours()).padStart(2, '0');
  const minutes = String(jstDate.getMinutes()).padStart(2, '0');
  const seconds = String(jstDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function initializeConnection() {
  if (connection === null) {
    connection = await createConnection(databaseConfig);
  }
  return connection;
}

// dataのcsvを読み込んでDBにデータを投入する
export async function setupTestData(): Promise<void> {
  testStartTime = createJST();
  const csvDirectory = path.join(__dirname, "data");
  const connection = await initializeConnection();
  const files = await fs.promises.readdir(csvDirectory);

  for (const file of files) {
    if (path.extname(file) === ".csv") {
      // csvのファイル名をテーブル名として使用
      const csvFilePath = path.join(csvDirectory, file);
      const tableName = path.basename(file, ".csv");
      const stream = fs.createReadStream(csvFilePath).pipe(csvParser());

      for await (const row of stream) {
        // nullを文字列として読み込んでしまうので、nullに変換
        for (const key in row) {
          if (row[key] === "NULL") {
            row[key] = null;
          }
        }

        // キーと値のペアを取得
        const keys = Object.keys(row);
        const values = Object.values(row);

        // カラム名とプレースホルダーを動的に生成
        const columns = keys.join(", ");
        const placeholders = keys.map(() => "?").join(", ");

        // SQLクエリを実行
        await connection.execute(
          `INSERT INTO \`${tableName}\` (${columns}, created_at, updated_at) VALUES (${placeholders}, ?, ?)`,
          [...values, testStartTime, testStartTime]
        );
      }
    }
  }
}

// テストデータを削除する
export async function clearTestData(): Promise<void> {
  const connection = await initializeConnection();
  const tables = ['users'];  // あなたのテーブル名のリスト

  console.log(testStartTime);
  for (const table of tables) {
    await connection.execute(
      `DELETE FROM \`${table}\` WHERE created_at >= ?`,
      [testStartTime]
    );
  }
  await connection.end();
}
