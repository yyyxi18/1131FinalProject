import { model, Schema } from "mongoose";
import { PeopleRun } from "../../interfaces/PeopleRun";

export const peoplesSchemas = new Schema<PeopleRun>({
    no:{ type: String, required: true },
    name:{ type: String, required: true },
    phone:{ type: String, required: true },
    gender:{ type: String, required: true },
    email:{ type: String, required: true },
});

export const peopleModel = model<PeopleRun>('peoples', peoplesSchemas);
