import React, {memo, useState} from 'react';
import {CHARACTER_CARD_MODE} from "../constants";
import {useCharactersStore} from "../../../store/characters";


const CharacterCardEdit = ({character, onBlur}) => {
    const [form, setForm] = useState({
        name: character.name,
        bio: character.bio
    });
    const updateCharacter = useCharactersStore((state) => state.update);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        updateCharacter({
            id: character.id,
            ...form
        });

        onBlur?.();
    }

    const onInputHandler = (fieldKey, event) => {
        setForm({
            ...form,
            [fieldKey]: event.target.value
        });
    }

    return (
        <form className="character-list_item" onSubmit={onSubmitHandler}>
            <img
                src={character.avatar}
                alt="Character avatar"
                className="character-list_item_avatar"
            />

            <div className="character-list_item_field">
                <label htmlFor="character_name" className="character-list_item_field-title">
                    Имя персонажа:
                </label>
                <input
                    id="character_name"
                    type="text"
                    value={form.name}
                    onInput={(e) => onInputHandler('name', e)}
                />
            </div>

            <div className="character-list_item_field">
                <span className="character-list_item_field-title">
                    Описание персонажа:
                </span>
                <textarea
                    id="character_bio"
                    rows="3"
                    value={form.bio}
                    onInput={(e) => onInputHandler('bio', e)}
                />
            </div>

            <div className="character-list_item_buttons-container">
                <button className="character-list_item_button--secondary" type="button" onClick={() => onBlur?.()}>
                    Отменить
                </button>
                <button className="character-list_item_button">Сохранить</button>
            </div>
        </form>
    )
}

const CharacterCardView = ({character}) => {
    return (
        <div className="character-list_item">
            <img
                src={character.avatar}
                alt="Character avatar"
                className="character-list_item_avatar"
            />

            <div className="character-list_item_field">
                <span className="character-list_item_field-title">
                    Имя персонажа:
                </span>
                <span className="character-list_item_field-value">
                    {character.name.length === 0 ? 'Без имени' : character.name}
                </span>
            </div>

            <div className="character-list_item_field">
                <span className="character-list_item_field-title">
                    Описание персонажа:
                </span>
                <span className="character-list_item_field-value">
                    {character.bio.length === 0 ? 'Описание не задано' : character.bio}
                </span>
            </div>
        </div>
    )
}

export const CharacterCard = memo(({character, mode = CHARACTER_CARD_MODE.VIEW, onBlur}) => {
    if (mode === CHARACTER_CARD_MODE.VIEW) {
        return <CharacterCardView character={character}/>
    } else {
        return <CharacterCardEdit character={character} onBlur={onBlur}/>
    }
});
