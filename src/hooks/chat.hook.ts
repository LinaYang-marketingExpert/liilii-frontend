import { useGlobalContext } from "@/context"
import { serverProvider } from "@/utils/serverProvider";



export const useChat = () => {

    const { state, update }: any = useGlobalContext();

    const changeThought = async (userId: string) => {
        if (!userId) {
            return;
        }
        console.log("send userId", userId)
        const result = await serverProvider.changeThought(userId);
        console.log(result);

        update({
            chatSeason: {
                id: result.id,
                user: result.userId,
                animalData: {
                    name: result.animalData.animalName,
                    animalThinking: result.animalData.animalThinking,
                    happiness: result.animalData.happiness,
                },
                chatHistory: result.chatHistory
            }
        })

        console.log("state.chatSeason: ", state.chatSeason)
    }

    const sendMessage = async (data: any) => {
        console.log(data)
        const result = await serverProvider.sendMessage({
            chatId: data.id,
            role: "user",
            content: data.text,
            thinking: data.thinking
        });

        console.log("chatseason: ", result)

        if(result !== null) {
            update({
                chatSeason: result
            });
        }
    }

    const gameStart = async () => {
        // const user = Telegram.WebApp.initDataUnsafe.user;

    }

    return {
        chatSeason: state.chatSeason,

        changeThought,
        sendMessage,
        gameStart,
    }
}