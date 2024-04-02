import {create} from "zustand";
import {QUESTION_TYPE} from "../constants";

export const useThreadStore = create((set) => ({
    // State
    messages: [],
    // Actions
    addMessage: () => set((state) => ({
        messages: [
            ...state.messages,
            {
                id: state.message.length,
                characterId: 0,
                content: '',
                questionType: QUESTION_TYPE.NONE
            }
        ]
    })),
    updateMessage: ({id, characterId, content, questionType, responseVariants}) => set((state) => ({

    }))
}));