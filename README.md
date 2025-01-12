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
- 可直接轉程式碼。

### 3.CSS
- 使用Figma設計使用者介面，轉成CSS檔。
- 控制網站樣式和排版，提升用戶的使用體驗。

### 4.React
- 使用組件來構建 UI，每個組件可以看作是頁面中的一部分，易於維護和擴展，且能減少重複程式碼。
- 虛擬 DOM 技術用來最小化實際DOM操作，有高效的渲染力，不用F5就可以確保流暢的用戶體驗。
- 有很大群的開發者社群，有大量現成的工具、函式庫和教學資源可用。

### 5.JWT
- 成本較小，伺服器端不需要將用戶驗證狀態透過 Session 儲存起來，而是從用戶端發送的請求中挾帶的 token 來驗證身分，token 中包含了所有必要的資訊。
- 可以在不同的網域中使用，透過 token 在客戶端與伺服器之間安全地傳遞封裝身份信息，方便客戶端與伺服器之間的身份驗證。

### 6.MongoDB
- 使用 JSON 或 BSON 格式存儲資料，支援嵌套文件和陣列，便於儲存複雜的結構化資料。支援動態擴展資料模型，適合資料經常變動的應用。能夠輕鬆處理大量數據，且跟著應用成長，可以輕鬆增加伺服器節點以支援更多流量和更大的資料集。
  
## 安裝與執行指引

### 前置需求
- Node.js (版本 >= 23.5.0)
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
   cd BackEnd
   npm run dev
   ```
   log日誌顯示連線成功的消息：
   ```bash
   info: Dec-26-2024 16:00:33: 	listening on *:2004
   info: Dec-26-2024 16:00:34: 	suscess: connet to mongoDB @mongodb://yyyxi:yyyxi411631269@127.0.0.1:27017/411631269
  ```

3. 啟動前端：
   ```bash
   cd FrontEnd
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

### 管理員的3支API
`BackEnd/src/Service/AdminService.ts`
#### 1. 獲取所有參賽者資料(取得所有資料，並按照No.排序)

**請求方式**: `GET`

**端點**: `/api/v1/admin/getAll`

**回應範例**:
```json
{
  "code": 200,
  "message": "Find success",
  "body": [
    {
            "_id": "676a6904ec679e721fb5d15a",
            "no": "1",
            "name": "林佳慧",
            "phone": "0944015675",
            "gender": "男",
            "email": "user1@test.com"
    }
  ]
}
```

#### 2. 透過id查詢一筆參賽者資料
**請求方式**: `GET`

**端點**： `/api/v1/admin/getPersonByID?id= (mongoDB裡的_id)`

**回應範例**:
```json
{
    "code": 200,
    "message": "Find success",
    "body": [
        {
              "_id": "676a6904ec679e721fb5d15e",
              "no": "5",
              "name": "王淑芬",
              "phone": "0923017890",
              "gender": "女",
              "email": "user5@test.com"
    }
  ]
}
```

#### 3. 刪除參賽者資料（透過 id刪除）
**請求方式**： `DELETE`

**端點**： `/api/v1/admin/deletePersonByID`

**回應範例**:
- 成功刪除
  ```json
  {
       code: 200,
       message: "",
       body: null,
  
  };
  ```


### 參賽者的4支API
`BackEnd/src/Service/UserService.ts`

#### 1. 獲取參賽者自己的資料(透過_id查詢)

**請求方式**: `GET`

**端點**: `/api/v1/user/getPersonByID`

**回應範例**:
```json
{
  "body": [
    {
    "_id": "676a6904ec679e721fb5d15e",
    "no": "5",
    "name": "王淑芬",
    "phone": "0923017890",
    "gender": "女",
    "email": "user5@test.com"
    }
  ]
}
```

#### 2. 報名(新增)
**請求方式**: `POST`

**端點**： `/api/v1/user/addPerson`
**使用格式**:
```json
{
  "name": "張安琪",
  "phone": "0962079792",
  "gender": "女",
  "email": "chiii@gmail.com"
}
```
**回應範例**:
```json
{
    "message": "Person added successfully",
    "person": {
        "no": "23",
        "name": "張安琪",
        "phone": "0962079792",
        "gender": "女",
        "email": "chiii@gmail.com",
        "_id": "677ef13444980bcc73830852",
        "__v": 0
    }
}
```

#### 3. 取消報名(刪除)
**請求方式**： `DELETE`

**端點**： `/api/v1/user/cancelRunByID`

**回應範例**:
- 成功刪除
  ```json
  {
    "message": "Person canceled successfully"
}
```

```
#### 4. 修改
**請求方式**： `PUT`

**端點**： `/api/v1/user/updateUserByID`

**使用格式**:
把要修改的資料內容寫上
```json
{
  "name": "姚育祺",
  "phone": "0976318478",
  "gender": "女",
  "email": "yyyxi@gmail.com"
}
```

**回應範例**:
  ```json
  {
    "message": "Person updated successfully",
    "person": {
        "_id": "677ef1cb44980bcc73830856",
        "no": "23",
        "name": "姚育祺",
        "phone": "0976318478",
        "gender": "女",
        "email": "yyyxi@gmail.com",
        "__v": 0
    }
}
  ```

---
## 架構圖
![image]架構圖
## 流程圖



---
## Figma
**設計理念**
整體色調以橘色和灰色為主。主頁搭配起跑姿勢的圖片展現速度感，其他頁面都是以減格為主。

**連結**
https://www.figma.com/proto/UjmbbiNpyXbDkYG7ODxxfx/%E9%A0%81%E9%9D%A2%E8%A8%AD%E8%A8%88?node-id=1-2&p=f&t=81H9vYKhRgdgHELp-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1

## 操作影片


