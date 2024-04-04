import {useCharactersStore} from "../../../store/characters";
import {memo, useMemo} from "react";
import {THREAD_MESSAGE_MODE} from "../../../constants";

export const ThreadMessage = memo(({message, mode}) => {
    const characters = useCharactersStore((state) => state.list);

    const character = useMemo(
        () => characters.find(({id}) => id === message.characterId),
        [message.characterId, characters]
    );

    const messageClasses = useMemo(() => {
        let classNames = ['thread_message'];
        if(character == null) {
            classNames.push('thread_message--you');
        } else {
            classNames.push('thread_message--character');
        }

        if(mode === THREAD_MESSAGE_MODE.EDIT) {
            classNames.push('thread_message--edit');
        }
        return classNames.join(' ');
    }, [character, mode]);

    return (
        <div className={messageClasses}>
            {character && (
                <div className="thread_message-avatar">
                    <img src={character.avatar} alt={character.name}/>
                </div>
            )}

            <div className="thread_message-content">
                <div className="thread_message-content_header">
                    <h2>{character ? character.name : 'Вы'}</h2>
                    <span>Редактировать</span>
                </div>

                <span className="thread_message-content_text">{message.content}</span>
            </div>
        </div>
    )
});