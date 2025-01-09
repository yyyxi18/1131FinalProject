import { Route } from "../abstract/Route";
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";
import * as jwt from 'jsonwebtoken';

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
         * 新增參賽者資料
         * 
         */
        this.router.post(`${this.url}addPerson`, (req, res) => {
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
         */
        this.router.delete(`${this.url}cancelRunByID`, (req, res) => {
            // 將 id 從 req.query 中解析
            const id = req.query.id as string;

            // 確保 id 存在後再調用 Controller 方法
            if (!id) {
            return res.status(400).json({ error: "ID is required" });
            }

            this.Contorller.cancelRunByID(req, res);
        });
        /**
         * 更新參賽者資料
         * request body: { id: string, data: any }
         */
        this.router.put(`${this.url}updateUserByID`, (req, res) => {
            const id = req.query.id as string;
            // 確保 id 和 data 存在後再調用 Controller 方法
            if (!id || !req.body) {
            return res.status(400).json({ error: "ID and data are required" });
            }

            this.Contorller.updateUserByID(req, res);
        });
        this.router.post(`${this.url}check`, (req, res) => {
            const token = req.body.token as string;
            const user = jwt.decode(token)
            res.send({user})
        });
    }
}
