import {create} from "zustand";
import {cloneDeep} from "../utils";

const INITIAL_CHARACTER_LIST = [
    {
        id: 0,
        name: 'Иван',
        bio: 'Занимается системной аналитикой в команде',
        avatar: require('../assets/images/man-1.png')
    },
    {
        id: 1,
        name: 'Елизавета',
        bio: 'Инженер технической поддержки 1-я линия',
        avatar: require('../assets/images/woman-1.png')
    },
    {
        id: 2,
        name: 'Григорий',
        bio: 'Тимлид команды',
        avatar: require('../assets/images/man-2.png')
    },
    {
        id: 3,
        name: 'Юлия',
        bio: 'Разработчик',
        avatar: require('../assets/images/woman-2.png')
    }
];

export const useCharactersStore = create((set) => ({
    // STATE
    list: cloneDeep(INITIAL_CHARACTER_LIST),

    // ACTIONS
    reset: () => set(() => ({
        list: cloneDeep(INITIAL_CHARACTER_LIST)
    })),
    update: ({id, name, bio}) => set((state) => ({
        list: state.list.map((character) => {
            if (character.id === id) {
                return {
                    ...character,
                    name,
                    bio
                };
            }
            return character;
        })
    }))
}));