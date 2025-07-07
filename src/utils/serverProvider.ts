import axios from "axios";
import { config } from "@/config";

export const serverProvider = {
    changeThought: async (userId: string) => {
        console.log(`${config.serverUrl}/chat/changeThought`, userId)
        const res = await axios.post(`${config.serverUrl}/chat/changeThought`, { userId });
        return res.data.result;
    },

    sendMessage: async (data: any) => {
        // console.log(`${config.serverUrl}/chat/changeThought`)
        const res = await axios.post(`${config.serverUrl}/chat/sendMessage`, data);
        return res.data.result;

    }
}