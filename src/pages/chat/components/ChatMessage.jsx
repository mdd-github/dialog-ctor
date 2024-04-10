import {memo, useMemo} from "react";
import {MESSAGE_TYPE} from "../../../constants";
import {useCharactersStore} from "../../../store/characters";


export const ChatMessage = memo(({message}) => {
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

        return classNames.join(' ');
    }, [character]);

    const name = useMemo(() => {
        switch (message.type) {
            case MESSAGE_TYPE.CHARACTER:
                return character.name;
            case MESSAGE_TYPE.USER:
                return 'Вы';
            case MESSAGE_TYPE.TYPING:
                return character.name;
            case MESSAGE_TYPE.SYSTEM:
                return 'Чат';
            default:
                return '';
        }
    })

    return (
        <div className={messageClasses}>
            {character && (
                <div className="thread_message-avatar">
                    <img src={character.avatar} alt={character.name}/>
                </div>
            )}

            <div className="thread_message-content">
                <div className="thread_message-content_header">
                    <h2>{name}</h2>
                </div>

                <span className="thread_message-content_text">
                    {message.type === MESSAGE_TYPE.TYPING ? 'Вводит сообщение' : message.content}
                </span>
            </div>
        </div>
    )
});