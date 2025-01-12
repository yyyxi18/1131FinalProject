import { Service } from "../abstract/Service";
import { PeopleRun } from "../interfaces/PeopleRun";
import { logger } from "../middlewares/log";
import { peopleModel } from "../orm/schemas/peopleSchemas";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";

type seatInfo = {
    schoolName: string,
    department: string,
    seatNumber: string
}

export class UserService extends Service {

    /**
     * 獲取所有參賽者
     */
    public async getAllPeople(): Promise<Array<DBResp<PeopleRun>> | undefined> {
        try {
            const res: Array<DBResp<PeopleRun>> = await peopleModel.find({});
            return res;
        } catch (error) {
            logger.error("Error fetching all participants", error);
            return undefined;
        }
    }

    /**
     * 新增參賽者
     */
    public async addPerson(info: PeopleRun): Promise<resp<DBResp<PeopleRun> | undefined>> {
        const response: resp<DBResp<PeopleRun> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        try {
            const participants = await this.getAllPeople();

            if (!participants) {
                response.code = 500;
                response.message = "Failed to retrieve participant list.";
                return response;
            }

            if (participants.length >= 500) {
                response.code = 403;
                response.message = "Participant list is full.";
                return response;
            }

            const validationMessage = await this.validatePersonData(info);
            if (validationMessage !== "驗證通過") {
                response.code = 403;
                response.message = validationMessage;
                return response;
            }

            info.no = String(participants.length + 1);
            info._id = undefined;

            const newParticipant = new peopleModel(info);
            response.body = await newParticipant.save();
            response.message = "Participant added successfully.";

        } catch (error) {
            logger.error("Error adding participant", error);
            response.code = 500;
            response.message = "Server error while adding participant.";
        }

        return response;
    }

    /**
     * 查詢用戶資料 - 根據 ID
     */
    public async getPersonByID(id: string): Promise<resp<any>> {
        const response: resp<any> = {
            code: 200,
            message: "",
            body: null
        };

        try {
            const result = await peopleModel.findById(id);

            if (!result) {
                response.code = 404;
                response.message = "No user found with the provided ID.";
            } else {
                response.body = result;
                response.message = "Success.";
            }

        } catch (error) {
            logger.error("Error fetching user by ID", error);
            response.code = 500;
            response.message = `Server error: ${error}`;
        }

        return response;
    }

    /**
     * 查詢用戶資料 - 根據 Email 和電話
     */
    public async getPersonByEmailAndPhone(email: string, phone: string): Promise<resp<any>> {
        const response: resp<any> = {
            code: 200,
            message: "",
            body: null
        };

        try {
            const result = await peopleModel.findOne({ email, phone });
            logger.info(`查詢結果: ${JSON.stringify(result)}`); // 增加日誌
            
            if (!result) {
                response.code = 404;
                response.message = "No user found with the provided email and phone.";
            } else {
                response.body = result;
                response.message = "Success.";
            }

        } catch (error) {
            logger.error("Error fetching user by email and phone", error);
            response.code = 500;
            response.message = `Server error: ${error}`;
        }

        return response;
    }

    /**
     * 取消參賽者報名
     */
    public async cancelRunByID(id: string): Promise<resp<any>> {
        const response: resp<any> = {
            code: 200,
            message: "",
            body: null
        };

        try {
            const result = await peopleModel.findByIdAndDelete(id);

            if (!result) {
                response.code = 404;
                response.message = "No user found with the provided ID.";
            } else {
                response.body = result;
                response.message = "User canceled successfully.";
            }

        } catch (error) {
            logger.error("Error canceling user participation", error);
            response.code = 500;
            response.message = `Server error: ${error}`;
        }

        return response;
    }

    /**
     * 驗證參賽者資料
     */
    public async validatePersonData(person: PeopleRun): Promise<
        '姓名不得為空' |
        '電話格式不正確，必須為 10 位數字' |
        '性別必須為 男 或 女' |
        '電子郵件格式不正確' |
        '驗證通過'
    > {
        if (!person.name || person.name.trim() === '') {
            return '姓名不得為空';
        }

        const phonePattern = /^09\d{8}$/;
        if (!phonePattern.test(person.phone)) {
            return '電話格式不正確，必須為 10 位數字';
        }

        if (person.gender !== '男' && person.gender !== '女') {
            return '性別必須為 男 或 女';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(person.email)) {
            return '電子郵件格式不正確';
        }

        return '驗證通過';
    }

    /**
     * 更新用戶資料
     */
    public async updateUserByID(id: string, info: PeopleRun): Promise<resp<any>> {
        const response: resp<any> = {
            code: 200,
            message: "",
            body: null
        };

        try {
            logger.info(`Received update request: ID=${id}, Info=${JSON.stringify(info)}`);

            const validationMessage = await this.validatePersonData(info);
            if (validationMessage !== "驗證通過") {
                response.code = 403;
                response.message = validationMessage;
                return response;
            }

            const updatedUser = await peopleModel.findByIdAndUpdate(id, info, { new: true });

            if (!updatedUser) {
                response.code = 404;
                response.message = "No user found with the provided ID.";
            } else {
                response.body = updatedUser;
                response.message = "User updated successfully.";
            }

        } catch (error) {
            logger.error("Error updating user", error);
            response.code = 500;
            response.message = `Server error: ${error}`;
        }

        return response;
    }
}
