import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { PeopleRun } from "../interfaces/PeopleRun";
import { peopleModel } from "../orm/schemas/peopleSchemas";
require('dotenv').config();

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    /**
     * 新增參賽者資料
     * @param req Express Request
     * @param res Express Response
     */
    public async addPerson(req: Request, res: Response): Promise<void> {
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

    /**
     * 查詢參賽者自己的報名資料
     * @param req Express Request
     * @param res Express Response
     */
    public async getUserDataByID(req: Request, res: Response): Promise<void> {
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
}
