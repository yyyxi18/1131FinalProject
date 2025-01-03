import { Service } from "../abstract/Service";
import { PeopleRun } from "../interfaces/PeopleRun";
import { logger } from "../middlewares/log";
import { peopleModel } from "../orm/schemas/peopleSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";

type seatInfo = {
    schoolName: string,
    department: string,
    seatNumber: string
}

export class UserService extends Service {

    public async getAllPeople(): Promise<Array<DBResp<PeopleRun>> | undefined> {
        try {
            const res: Array<DBResp<PeopleRun>> = await peopleModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }

    }

    /**
     * 查詢一筆用戶
     * @param id 用戶 _id
     * @returns resp<any>
     */

    public async getPersonByID(id: string): Promise<resp<any>> {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: null, // 預設查詢結果為 null
        };

        try {
            // 使用模型方法查詢用戶
            const result = await peopleModel.findOne({ _id: id });

            if (!result) {
                // 如果找不到用戶
                resp.code = 404;
                resp.message = "No user found with the provided ID";
            } else {
                // 如果找到用戶
                resp.body = result; // 返回用戶數據
                resp.message = "Success";
            }
        } catch (error) {
            // 捕捉錯誤
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }

        return resp;
    }

    /**
     * 刪除一筆用戶
     * @param id 用戶 _id
     * @returns resp<any>
     */
    public async deletePersonByID(id: string): Promise<resp<any>> {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: null,
        };

        try {
            const result = await peopleModel.findByIdAndDelete(id);

            if (!result) {
                resp.code = 404;
                resp.message = "No user found with the provided ID";
            } else {
                resp.body = result;
                resp.message = "User deleted successfully";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }

        return resp;
    }
}