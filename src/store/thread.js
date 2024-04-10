import {create} from "zustand";
import {AUTHOR_TYPE, QUESTION_TYPE} from "../constants";
import {cloneDeep} from "../utils";

const USER_MESSAGE_CONTENT = 'Пользователь вводит сообщение, либо выбирает из вариантов';
const CHARACTER_MESSAGE_DEFAULT_CONTENT = 'Реплика персонажа';

const INITIAL_MESSAGES_LIST = [
    {
        id: 0,
        characterId: 0,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Привет, я Иван. Я системный аналитик!',
        questionType: QUESTION_TYPE.NONE,
        questionVariants: []
    },
    {
        id: 1,
        characterId: 3,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Привет, а я Юлия. Я разработчик! А как зовут тебя и чем ты занимаешься?',
        questionType: QUESTION_TYPE.TEXT,
        questionVariants: []
    },
    {
        id: 2,
        characterId: null,
        authorType: AUTHOR_TYPE.USER,
        content: USER_MESSAGE_CONTENT
    },
    {
        id: 3,
        characterId: 0,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Здорово, давай я тебе расскажу немного о нашем продукте?',
        questionType: QUESTION_TYPE.SELECT,
        questionVariants: [
            {id: 0, content: 'Да, давай!'},
            {id: 1, content: 'Было бы интересно послушать!'},
        ]
    },
    {
        id: 4,
        characterId: null,
        authorType: AUTHOR_TYPE.USER,
        content: USER_MESSAGE_CONTENT
    },
    {
        id: 5,
        characterId: 0,
        authorType: AUTHOR_TYPE.CHARACTER,
        content: 'Отлично, мы делаем какую-то хуйню',
        questionType: QUESTION_TYPE.NONE,
        questionVariants: []
    }
];


export const useThreadStore = create((set) => ({
    // State
    messages: cloneDeep(INITIAL_MESSAGES_LIST),
    // Actions
    createMessage: (authorType) => set((state) => ({
        messages: [
            ...state.messages,
            {
                id: state.messages.length,
                characterId: authorType === AUTHOR_TYPE.CHARACTER ? 0 : undefined,
                authorType,
                content: authorType === AUTHOR_TYPE.CHARACTER ? CHARACTER_MESSAGE_DEFAULT_CONTENT : USER_MESSAGE_CONTENT,
                questionType: authorType === AUTHOR_TYPE.CHARACTER ? QUESTION_TYPE.NONE : undefined,
                questionVariants: []
            }
        ]
    })),
    updateMessage: (id, newMessage) => set((state) => ({
        messages: state.messages
            .map((message, idx) => (id === idx ? newMessage : message))
    })),
    deleteMessage: (id) => set((state) => ({
        messages: state.messages
            .filter((message) => message.id !== id)
            .map((message, id) => ({...message, id}))
    }))
}));