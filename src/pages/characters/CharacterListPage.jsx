import React, {useState} from "react";
import {useCharactersStore} from "../../store/characters";
import {CharacterCard} from "./components/CharacterCard";
import {CHARACTER_CARD_MODE} from "../../constants";

export const CharacterListPage = () => {
    const [characterInEdit, setCharacterInEdit] = useState(null);
    const characters = useCharactersStore((state) => state.list);

    return (
        <div className="character-list_page">
            <div className="character-list_page-wrapper">
                <h1>Выбери персонажа</h1>
                <div className="character-list_container">
                    {
                        characters.map((character) => {
                            if (characterInEdit === character.id) {
                                return (
                                    <CharacterCard
                                        key={character.id}
                                        character={character}
                                        mode={CHARACTER_CARD_MODE.EDIT}
                                        onBlur={() => setCharacterInEdit(null)}
                                    />
                                )
                            }
                            return (
                                <div key={character.id} onClick={() => setCharacterInEdit(character.id)}>
                                    <CharacterCard character={character} mode={CHARACTER_CARD_MODE.VIEW}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};