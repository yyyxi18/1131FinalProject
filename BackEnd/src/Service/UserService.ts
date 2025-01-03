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
     * 新增參賽者
     * @param info 參賽者資訊
     * @returns resp
     */
    public async addPerson(info: PeopleRun): Promise<resp<DBResp<PeopleRun> | undefined>> {
        const current = await this.getAllPeople();
        const resp: resp<DBResp<PeopleRun> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        if (current && current.length > 0) {
            try {
                const nameValidator = await this.validatePersonData(info);
                if (current.length >= 500) {
                    resp.message = "participant list is full";
                    resp.code = 403;
                } else {
                    if (nameValidator === "驗證通過") {
                        info.no = String(current.length + 1);
                        info._id = undefined;
                        const res = new peopleModel(info);
                        resp.body = await res.save();
                    } else {
                        resp.code = 403;
                        resp.message = nameValidator;
                    }
                }
            } catch (error) {
                resp.message = "server error";
                resp.code = 500;
            }
        } else {
            resp.message = "server error";
            resp.code = 500;
        }

        return resp;
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
     * 參賽者取消報名
     * @param id 用戶 _id
     * @returns resp<any>
     */
    public async cancelRunByID(id: string): Promise<resp<any>> {
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
                resp.message = "User cancel successfully";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }

        return resp;
    }

    /**
 * 驗證新增參賽者的資料
 * @param person 新增的參賽者資料
 * @returns 驗證結果
 */
    public async validatePersonData(person: PeopleRun): Promise<
        '姓名不得為空' |
        '電話格式不正確，必須為 10 位數字' |
        '性別必須為 男 或 女' |
        '電子郵件格式不正確' |
        '驗證通過'
    > {
        // 檢查姓名
        if (!person.name || person.name.trim() === '') {
            return '姓名不得為空';
        }

        // 檢查電話格式（10 位數字）
        const phonePattern = /^09\d{8}$/;
        if (!phonePattern.test(person.phone)) {
            return '電話格式不正確，必須為 10 位數字';
        }

        // 檢查性別
        if (person.gender !== '男' && person.gender !== '女') {
            return '性別必須為 男 或 女';
        }

        // 檢查電子郵件格式
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(person.email)) {
            return '電子郵件格式不正確';
        }

        return '驗證通過';
    }

    /**
     * 更新參賽者資料
     * @param id 用戶 _id
     * @param info 更新的參賽者資料
     * @returns resp<any>
     */
    public async updateUserByID(id: string, info: PeopleRun): Promise<resp<any>> {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: null,
        };

        try {
            const nameValidator = await this.validatePersonData(info);
            if (nameValidator !== "驗證通過") {
                resp.code = 403;
                resp.message = nameValidator;
                return resp;
            }

            const result = await peopleModel.findByIdAndUpdate(id, info, { new: true });

            if (!result) {
                resp.code = 404;
                resp.message = "No user found with the provided ID";
            } else {
                resp.body = result;
                resp.message = "User updated successfully";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }

        return resp;
    }


}