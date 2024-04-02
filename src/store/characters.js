import {create} from "zustand";
import {cloneDeep} from "../utils";

const INITIAL_CHARACTER_LIST = [
    {
        id: 0,
        name: '',
        bio: '',
        avatar: 'images/man-1.png'
    },
    {
        id: 1,
        name: '',
        bio: '',
        avatar: 'images/man-2.png'
    },
    {
        id: 2,
        name: '',
        bio: '',
        avatar: 'images/woman-1.png'
    },
    {
        id: 3,
        name: '',
        bio: '',
        avatar: 'images/woman-2.png'
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