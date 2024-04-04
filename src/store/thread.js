import {create} from "zustand";
import {AUTHOR_TYPE, QUESTION_TYPE} from "../constants";
import {cloneDeep} from "../utils";


const INITIAL_MESSAGES_LIST = [
    {
        id: 0,
        characterId: 0,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Привет, я Иван. Я системный аналитик!',
        questionType: QUESTION_TYPE.NONE
    },
    {
        id: 1,
        characterId: 3,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Привет, а я Юлия. Я разработчик! А как зовут тебя и чем ты занимаешься?',
        questionType: QUESTION_TYPE.TEXT
    },
    {
        id: 2,
        characterId: null,
        authorType: AUTHOR_TYPE.USER,
        content: 'Пользователь вводит сообщение, либо выбирает из вариантов'
    },
    {
        id: 3,
        characterId: 0,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Здорово, давай я тебе расскажу немного о нашем продукте?',
        questionType: QUESTION_TYPE.SELECT,
        questionVariants: [
            { id: 0, content: 'Да, давай!'},
            { id: 1, content: 'Было бы интересно послушать!'},
        ]
    },
    {
        id: 4,
        characterId: null,
        authorType: AUTHOR_TYPE.USER,
        content: 'Пользователь вводит сообщение, либо выбирает из вариантов'
    }
];


export const useThreadStore = create((set) => ({
    // State
    messages: cloneDeep(INITIAL_MESSAGES_LIST),
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