import { Route } from "../abstract/Route";
import { UserController } from "../controller/AdminController";
import { logger } from "../middlewares/log";
import { Request, Response } from "express";

export class AdminRoute extends Route {

    protected url: string;
    protected Contorller: UserController; // 修正 Contorller 定義的名稱大小寫

    constructor() {
        super();
        this.url = '/api/v1/admin/';
        this.Contorller = new UserController();
        this.setRoutes();
    }

    protected setRoutes(): void {
        /**
         * 獲取所有資料
         */
        this.router.get(`${this.url}getAll`, (req, res) => {
            this.Contorller.getAll(req, res);
        });

        /**
         * 查詢一筆參賽者資料
         * request query: id (string)
         */
        this.router.get(`${this.url}getPersonByID`,(req :Request, res: Response) => {
            // 將 id 從 req.query 中解析
            const {id} = req.query;

            // 確保 id 存在後再調用 Controller 方法
            if (!id) {
                return res.status(400).json({ error: "ID is required" });
            }

            this.Contorller.getPersonByID(req, res);
        });

        /**
         * 刪除一筆參賽者資料
         * request query: id (string)
         */
        this.router.delete(`${this.url}deletePersonByID`, (req: Request, res: Response) => {
            // 將 id 從 req.query 中解析
            const id = req.query.id as string;

            // 確保 id 存在後再調用 Controller 方法
            if (!id) {
            return res.status(400).json({ error: "ID is required" });
            }

            this.Contorller.deletePersonByID(req, res);
        });

        
        /**
         * 新增參賽者
         * request body:
         * {
         *   no?: string;
         *   name: string;
         *   phone: string;
         *   gender: string;
         *   email: string;
         * }
         
        this.router.post(`${this.url}insertOne`, (req, res) => {
            this.Contorller.insertOne(req, res);
        }
            );
            */
    }
}
