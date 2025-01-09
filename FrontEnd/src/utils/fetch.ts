import { GoogleIdTokenPayload } from "../interface/GoogleIdTokenPayload";

/**
 * 異步呼叫 GET API, 只支持 JSON 響應
 * @param api 要呼叫的 API URL
 * @returns JSON 結果
 */
export async function asyncGet(api: string): Promise<any> {
    try {
        const res: Response = await fetch(api, { mode: "cors" });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("GET 請求失敗:", error);
        throw error;
    }
}

/**
 * 異步呼叫 POST API
 * @param api 要呼叫的 API URL
 * @param body 傳遞的資料（物件或 FormData）
 * @returns JSON 結果
 */
export async function asyncPost(api: string, body: {} | FormData): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: "POST",
            headers: body instanceof FormData
                ? undefined // 如果是 FormData，不需要指定 Content-Type
                : { "Content-Type": "application/json" },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("POST 請求失敗:", error);
        throw error;
    }
}

/**
 * 異步呼叫 PATCH API
 * @param api 要呼叫的 API URL
 * @param body 傳遞的資料（物件或 FormData）
 * @returns JSON 結果
 */
export async function asyncPatch(api: string, body: {} | FormData): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: "PATCH",
            headers: body instanceof FormData
                ? undefined
                : { "Content-Type": "application/json" },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("PATCH 請求失敗:", error);
        throw error;
    }
}

/**
 * 驗證登入
 */
export const check = async (): Promise<{ user: GoogleIdTokenPayload }> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token 不存在，請先登入！");
    }

    try {
        const res = await asyncPost("http://127.0.0.1:2004/api/v1/user/check", { token });
        return res;
    } catch (error) {
        console.error("登入驗證失敗:", error);
        throw error;
    }
};
