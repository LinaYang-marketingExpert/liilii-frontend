import { config } from "@/config";
import { userInfo } from "os";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const GlobalContext = createContext({});

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

const INIT_STATE = {
    userInfo: {
        telegramId: import.meta.env.USERID,
        username: import.meta.env.USERNAME,
        medals: 10
    },

    chatSeason: {
        id: "",
        user: "",
        animalData: {
            name: "LiiLii",
            animalThinking: "Hmm, I don't have a special want today.",
            happiness: 0,
        },
        chatHistory: [{
            role: "",
            content: ""
        }]
    },
}

const GlobalProvider = ({ children }: any) => {

    const [state, setState] = useState(INIT_STATE);
    const stateRef = useRef(state);

    const update = (newState: any) => {
        setState((prevState: any) => {
            const updatedState = { ...prevState, ...newState }
            stateRef.current = updatedState;
            return updatedState;
        });
    }

    const updateWithFunction = (newState: any) => {
        setState((prevState: any) => {
            const updatedState =
                typeof newState === "function"
                    ? newState(prevState)
                    : { ...prevState, ...newState };

            stateRef.current = updatedState;
            return updatedState;
        });
    };

    return (

        <GlobalContext.Provider
            value={{ state, stateRef, update, updateWithFunction }}
        >
            {children}
        </GlobalContext.Provider>

    )
}

export { useGlobalContext, GlobalProvider };