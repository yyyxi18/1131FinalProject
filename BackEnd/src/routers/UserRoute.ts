import { Route } from "../abstract/Route";
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";

export class UserRoute extends Route {

    protected url: string;
    protected Contorller: UserController; // 修正 Contorller 定義的名稱大小寫

    constructor() {
        super();
        this.url = '/api/v1/user/';
        this.Contorller = new UserController();
        this.setRoutes();
    }

    protected setRoutes(): void {

        /**
         * 新增一筆參賽者資料
         * request body: { name: string, age: number, team: string }
         */
        this.router.post(`${this.url}addPerson`, (req, res) => {
            const { name, phone, gender, email } = req.body;

            // 確保所有必要的欄位都存在
            if (!name || !phone || !gender || !email) {
            return res.status(400).json({ error: "name, phone, gender and email are required" });
            }

            this.Contorller.addPerson(req, res);
        });

        /**
         * 查詢一筆參賽者資料
         * request query: id (string)
         */
        this.router.get(`${this.url}getUserDataByID`, (req, res) => {
            // 將 id 從 req.query 中解析
            const id = req.query.id as string;

            // 確保 id 存在後再調用 Controller 方法
            if (!id) {
                return res.status(400).json({ error: "ID is required" });
            }

            this.Contorller.getUserDataByID(req, res);
        });

        /**
         * 刪除一筆參賽者資料
         * request query: id (string)
         
        this.router.delete(`${this.url}deletePersonByID`, (req, res) => {
            // 將 id 從 req.query 中解析
            const id = req.query.id as string;

            // 確保 id 存在後再調用 Controller 方法
            if (!id) {
            return res.status(400).json({ error: "ID is required" });
            }

            this.Contorller.deletePersonByID(req, res);
        });
        */

        

        
    }
}
