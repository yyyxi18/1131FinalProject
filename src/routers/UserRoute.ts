import { Route } from "../abstract/Route"
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";

export class UserRoute extends Route {

    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super()
        this.url = '/api/v1/admin/'
        this.setRoutes()
    }

    protected setRoutes(): void {

        this.router.get(`${this.url}getAll`, (req, res) => {
            this.Contorller.getAll(req, res);
        })

        /**
         * 新增參賽者
         * request body {
         * no?: String,
         * name: string,
         * phone: string,
         * gender: string,
         * email: string
         * } 
         * @returns resp<PeopleRun>
         */
        this.router.post(`${this.url}insertOne`, (req, res) => {
            this.Contorller.insertOne(req, res);
        })
    }
}