# 1131FinalProject
## 怕輸，還不快跑？

### 主題
馬拉松報名比賽 - 怕輸，還不快跑

### 說明
輸在起跑點，還不跑起來！還要等裁判來提醒你輸得有多徹底？跑步還不如人生輕鬆，人生至少可以坐下來罵天罵地，跑步只能一路罵自己的膝蓋。記住，這場馬拉松的意義不是完成，而是讓你重新認識膝蓋、腳趾頭和肺，它們在用疼痛提醒你：老子不幹了!

### 目標
- 後端：資料庫建立與管理，伺服器架設
- 前端：使用Figma設計使用者介面，CRUD功能實現

## 技術選用
### 1.TypeScript
- 提供程式碼提示和自動完成功能。使得開發過程更加流暢，減少了錯誤和拼寫錯誤。
- 跨平台開發： TypeScript 可以編譯成標準的 JavaScript，因此可以在瀏覽器、伺服器（Node.js）、行動應用程式等不同平台上使用，實現代碼重用。
- 相容第三方函式庫，即使第三方函式庫不是用 TypeScript 寫的，也可以編寫單獨的型別檔案供 TypeScript 讀取。
  
### 2.Figma
- 可同時多人協作。
- 擁有大量的實用、多元及免費的外掛可使用。

### 3.CSS
- 使用Figma設計使用者介面，轉成CSS檔。
- 控制網站樣式和排版，提升用戶的使用體驗。

### 4.React
- (待編輯)

## 安裝與執行指引

### 前置需求
- Node.js (版本 >= 16)
- MongoDB (版本 >= 4.4)
- 安裝 `npm`工具

### 安裝步驟
1. git clone專案到本地：
   ```bash
   git clone https://github.com/yyyxi18/1131FinalProject.git
   cd 1131FinalProject
   ```

2. 安裝後端依賴：
   ```bash
   cd BackEnd
   npm install
   npm run dev
   ```

3. 安裝前端依賴：
   ```bash
   cd FrontEnd
   npm install
   npm run dev
   ```

### 關於資料庫
1. 打開Docker，打開MongoDB Compass：
   根據 `.env` 文件中的設定連接到遠端 MongoDB。

2. 啟動後端：
   ```bash
   npm run dev
   ```
   log日誌顯示連線成功的消息：
   ```bash
   info: Dec-26-2024 16:00:33: 	listening on *:2004
   info: Dec-26-2024 16:00:34: 	suscess: connet to mongoDB @mongodb://yyyxi:yyyxi411631269@127.0.0.1:27017/411631269
  ```

3. 啟動前端：
   ```bash
   npm run dev
   ```

   顯示：
   ```bash
   > my-react-app@0.0.0 dev
   > vite

   Port 5173 is in use, trying another one...
   Port 5174 is in use, trying another one...

   VITE v5.4.10  ready in 726 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

  4. 前往瀏覽器查看 `http://localhost:5173/`

---

## API 規格說明
`mongoDemo/src/Service/UserService.ts`
### 1. 查詢所有學生資料(取得所有資料，並按照座號排序)

**請求方式**: `GET`

**端點**: `/api/v1/user/findAll`

**回應範例**:
```json
{
  "code": 200,
  "message": "find success",
  "body": [
    {
      "_id": "6759060c8080b5e17e4d101d",
            "userName": "tkuee0787",
            "sid": "1",
            "name": "張佳慧",
            "department": "電機工程系",
            "grade": "四年級",
            "class": "A",
            "Email": "tkuee0787@tkuim.com"
    }
  ]
}
```

### 2. 新增學生資料
**請求方式**: `POST`

**端點**： `/api/v1/user/insertOne`

**請求 Body**:
```json
{
  "userName": "tkuim8765",
  "name": "姚育祺",
  "department": "資訊管理學系",
  "grade": "三",
  "class": "C",
  "email": "yaoyuci@gmail.com"
}
```

**回應範例**:
```json
{
  "code": 200,
    "message": "",
    "body": {
        "userName": "tkuim8765",
        "sid": "54",
        "name": "姚育祺",
        "department": "資訊管理學系",
        "grade": "三",
        "class": "C",
        "Email": "yaoyuci@gmail.com",
        "absences": 0,
        "_id": "67622a45f7ab6cd3084cf8a8",
        "__v": 0
  }
}
```

### 3. 刪除學生資料（透過 id刪除學生）
**請求方式**： `DELETE`

**端點**： `/api/v1/user/deleteById`

**回應範例**:
- 成功刪除
  ```json
  {
    "code": 200,
    "message": "sucess",
    "body": {
        "acknowledged": true,
        "deletedCount": 0
    }
  }
  ```

### 4. 更新學生名稱（透過id索引編輯學生資料）
**請求方式**: `PUT`

**端點**: `/api/v1/user/updateNameById`

**請求 Body**:
```json
{
    "id": "67618b31de2a3d02cddbd931",
    "name":"TEST"
}
```

**回應範例**:
```json
{
    "code": 200,
    "message": " update sucess",
    "body": {
        "_id": "67618b31de2a3d02cddbd931",
        "userName": "tkuim9999",
        "sid": "53",
        "name": "TEST",
        "department": "資訊管理學系",
        "grade": "三",
        "class": "C",
        "Email": "yaoyuci@gmail.com",
        "absences": 0,
        "__v": 0
    }
}
```

---

## 架構圖/流程圖


- **前端react-ts-mid**: 提供用戶介面與使用者互動。
- **後端mongoDemo**: 提供 API 服務，包含參賽者資料的 CRUD 操作。
- **資料庫**: 儲存參賽者資料。

---
## Figma
https://www.figma.com/proto/UjmbbiNpyXbDkYG7ODxxfx/%E9%A0%81%E9%9D%A2%E8%A8%AD%E8%A8%88?node-id=1-2&p=f&t=81H9vYKhRgdgHELp-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1

## 操作影片


