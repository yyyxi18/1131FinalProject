import { Contorller } from "../abstract/Contorller";
import { UserService } from "../Service/UserService";
import { peopleModel } from "../orm/schemas/peopleSchemas";
import { Request, Response } from "express-serve-static-core";
require("dotenv").config();

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
            const result = await this.service.addPerson(req.body);

            if (result.code === 200) {
                res.status(201).json({
                    message: "Person added successfully",
                    person: result.body,
                });
            } else {
                res.status(result.code).json({ message: result.message });
            }
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
    public async cancelRunByID(req: Request, res: Response): Promise<void> {
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
                res.status(200).json({ message: "Person canceled successfully" });
            }
        } catch (error) {
            res.status(500).json({ message: `Error deleting person: ${error}` });
        }
    }

    /**
     * 更新參賽者資料
     * @param req Express Request
     * @param res Express Response
     */
    public async updateUserByID(req: Request, res: Response): Promise<void> {
        const id = req.query.id as string;

        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return;
        }

        try {
            const updatedPerson = await peopleModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedPerson) {
                res.status(404).json({ message: "Person not found" });
            } else {
                res.status(200).json({
                    message: "Person updated successfully",
                    person: updatedPerson,
                });
            }
        } catch (error) {
            res.status(500).json({ message: `Error updating person: ${error}` });
        }
    }

    /**
     * 根據 Email 和電話查詢參賽者
     * @param req Express Request
     * @param res Express Response
     */
    public async getUserDataByEmailAndPhone(req: Request, res: Response): Promise<void> {
        const { email, phone } = req.query;

        if (!email || !phone) {
            res.status(400).json({ message: "Email and phone are required" });
            return;
        }

        try {
            const result = await this.service.getPersonByEmailAndPhone(email as string, phone as string);

            if (result.code === 200) {
                res.status(200).json(result.body);
            } else {
                res.status(result.code).json({ message: result.message });
            }
        } catch (error) {
            res.status(500).json({ message: `Error retrieving person: ${error}` });
        }
    }
}
