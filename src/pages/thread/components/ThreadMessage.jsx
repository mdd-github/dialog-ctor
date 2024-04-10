import {useCharactersStore} from "../../../store/characters";
import {memo, useCallback, useMemo} from "react";
import {AUTHOR_TYPE, THREAD_MESSAGE_MODE} from "../../../constants";
import {useThreadStore} from "../../../store/thread";

export const ThreadMessage = memo(({message, mode, onEdit, onDelete}) => {
    const characters = useCharactersStore((state) => state.list);
    const deleteMessage = useThreadStore((state) => state.deleteMessage);

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

    const onDeleteHandler = useCallback(() => {
        onDelete?.();
        deleteMessage(message.id);
    }, [deleteMessage, message.id, onDelete]);

    return (
        <div className={messageClasses}>
            {character && (
                <div className="thread_message-avatar">
                    <img src={character.avatar} alt={character.name}/>
                </div>
            )}

            <div className="thread_message-content">
                <div className="thread_message-content_header">
                    <h2>{message.authorType === AUTHOR_TYPE.CHARACTER ? character.name : 'Вы'}</h2>
                    <span>
                        <span onClick={() => onEdit?.()} className="thread_message-edit-button">Редактировать</span>
                        <span onClick={onDeleteHandler} className="thread_message-delete-button">Удалить</span>
                    </span>
                </div>

                <span className="thread_message-content_text">{message.content}</span>
            </div>
        </div>
    )
});