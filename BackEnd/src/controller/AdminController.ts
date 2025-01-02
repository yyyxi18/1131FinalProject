import { Contorller } from "../abstract/Contorller";
//import { Request, Response } from "express";
import { UserService } from "../Service/AdminService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { PeopleRun } from "../interfaces/PeopleRun";
import { peopleModel } from "../orm/schemas/peopleSchemas";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

require('dotenv').config();

export class UserController extends Contorller {
    addPerson(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) {
        throw new Error("Method not implemented.");
    }
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    /**
     * 獲取所有參賽者
     * @param req Express Request
     * @param res Express Response
     */
    public async getAll(req: Request, res: Response): Promise<void> {
        const resBody: resp<Array<DBResp<PeopleRun>> | undefined> = {
            code: 200,
            message: "",
            body: undefined,
        };

        try {
            const dbResp = await this.service.getAllPeople();
            if (dbResp) {
                resBody.body = dbResp;
                resBody.message = "Find success";
                res.status(200).json(resBody);
            } else {
                resBody.code = 404;
                resBody.message = "No data found";
                res.status(404).json(resBody);
            }
        } catch (error) {
            resBody.code = 500;
            resBody.message = `Server error: ${error}`;
            res.status(500).json(resBody);
        }
    }

    /**
     * 查詢一筆參賽者資料
     * @param req Express Request
     * @param res Express Response
     */
    public async getPersonByID(req: Request<{}, any, any, ParsedQs>,
        res: Response): Promise<void> {
        const id = req.query.id as string;

        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return;
        }

        try {
            const person = await peopleModel.findById(id);
            if (!person) {
                res.status(404).json({ message: "Person not found" });
            } else {
                res.status(200).json(person);
            }
        } catch (error) {
            res.status(500).json({ message: `Error retrieving person: ${error}` });
        }
    }

    /**
     * 刪除一筆參賽者資料
     * @param req Express Request
     * @param res Express Response
     */
    public async deletePersonByID(req: Request, res: Response): Promise<void> {
        const id = req.query.id as string;

        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return;
        }

        try {
            const deletedPerson = await peopleModel.findByIdAndDelete(id);
            if (!deletedPerson) {
                res.status(404).json({ message: "Person not found" });
            } else {
                res.status(200).json({ message: "Person deleted successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: `Error deleting person: ${error}` });
        }
    }

    /**
     * 新增參賽者
     * @param req Express Request
     * @param res Express Response
     
    public async insertOne(req: Request, res: Response): Promise<void> {
        try {
            const newPerson = new peopleModel(req.body);
            const savedPerson = await newPerson.save();

            res.status(201).json({
                message: "Person added successfully",
                person: savedPerson,
            });
        } catch (error) {
            res.status(500).json({ message: `Error adding person: ${error}` });
        }
    }
        */
}
