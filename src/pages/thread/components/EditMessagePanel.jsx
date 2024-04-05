import {useThreadStore} from "../../../store/thread";
import {useEffect, useState} from "react";
import {cloneDeep} from "../../../utils";
import {QUESTION_TYPE} from "../../../constants";
import {useCharactersStore} from "../../../store/characters";

export const EditMessagePanel = ({messageId, onBlur}) => {
    const characters = useCharactersStore(state => state.list);
    const messages = useThreadStore(state => state.messages);
    const updateMessage = useThreadStore(state => state.updateMessage);

    const [form, setForm] = useState(null);
    useEffect(() => {
        const message = messages.find(({id}) => id === messageId);

        if (message != null) {
            setForm(cloneDeep(message));
        }
    }, [messages, messageId]);

    const onInputHandler = (fieldKey, event) => {
        setForm({
            ...form,
            [fieldKey]: event.target.value
        });
    }

    const onChangeQuestionVariant = (id, event) => {
        setForm({
            ...form,
            questionVariants: form.questionVariants.map((variant) => ({
                id: variant.id,
                content: id === variant.id ? event.target.value : variant.content
            }))
        })
    }

    const onCreateVariant = () => {
        setForm({
            ...form,
            questionVariants: [
                ...form.questionVariants,
                {
                    id: form.questionVariants.length,
                    content: ''
                }
            ]
        })
    }

    const onDeleteVariant = (variantId) => {
        setForm({
            ...form,
            questionVariants: form.questionVariants.filter(({id}) => variantId !== id)
                .map(({content}, id) => ({id, content}))
        })
    }

    const onNextCharacterHandler = () => {
        setForm({
            ...form,
            characterId: form.characterId + 1 >= characters.length ? 0 : form.characterId + 1
        });
    }

    const onPreviousCharacterHandler = () => {
        setForm({
            ...form,
            characterId: form.characterId - 1 < 0 ? characters.length - 1 : form.characterId - 1
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        updateMessage(messageId, form);
        onBlur?.();
    }

    return form && (
        <form className="thread_edit-panel" onSubmit={onSubmitHandler}>
            <div className="thread_edit-panel_character-selector">
                <button
                    className="thread_edit-panel_button--text"
                    type="button"
                    onClick={onPreviousCharacterHandler}
                >
                    <span className="material-symbols-outlined">
                        expand_less
                    </span>
                </button>

                <div className="thread_edit-panel_character-selector_info">
                    <img
                        src={characters[form.characterId].avatar}
                        alt={characters[form.characterId].name}
                    />
                    <h3>{characters[form.characterId].name}</h3>
                </div>

                <button
                    className="thread_edit-panel_button--text"
                    type="button"
                    onClick={onNextCharacterHandler}
                >
                    <span className="material-symbols-outlined">
                        expand_more
                    </span>
                </button>
            </div>

            <div className="thread_edit-panel_fields">
                <h3 className="thread_edit-panel_fields_row">
                    Редактирование сообщения персонажа:
                </h3>
                <div className="thread_edit-panel_fields_row">
                    <textarea
                        rows="3"
                        placeholder="Введите текст"
                        onInput={(e) => onInputHandler('content', e)}
                        value={form.content}
                    />
                </div>
                <div className="thread_edit-panel_fields_col">
                    <h4>Действие пользователя при ответе:</h4>
                    <div className="thread_edit-panel_fields_row">
                        <label htmlFor="questionTypeText">
                            <input
                                type="radio"
                                name="questionType"
                                value={QUESTION_TYPE.TEXT}
                                checked={form.questionType === QUESTION_TYPE.TEXT}
                                onChange={(e) => onInputHandler('questionType', e)}
                            />
                            Вводит текст
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="questionType"
                                value={QUESTION_TYPE.SELECT}
                                checked={form.questionType === QUESTION_TYPE.SELECT}
                                onChange={(e) => onInputHandler('questionType', e)}
                            />
                            Выбор одного из вариантов
                        </label>

                        <label htmlFor="questionTypeNone">
                            <input
                                type="radio"
                                name="questionType"
                                value={QUESTION_TYPE.NONE}
                                checked={form.questionType === QUESTION_TYPE.NONE}
                                onChange={(e) => onInputHandler('questionType', e)}
                            />
                            Не требуется
                        </label>
                    </div>
                </div>

                {form.questionType === QUESTION_TYPE.SELECT && (
                    <div className="thread_edit-panel_fields_col">
                        <h4 className="thread_edit-panel_fields_row">
                            Варианты ответов:
                        </h4>
                        <div className="thread_edit-panel_fields_row">
                        <div className="thread_edit-panel_question-variants">
                            {
                                form.questionVariants.map((variant) => (
                                    <div key={variant.id} className="thread_edit-panel_question-variants_item">
                                        <input
                                            type="text"
                                            value={variant.content}
                                            onChange={(e) => onChangeQuestionVariant(variant.id, e)}
                                        />
                                        <button
                                            className="thread_edit-panel_button--text"
                                            onClick={() => onDeleteVariant(variant.id)}
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined">
                                                close
                                            </span>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                        <button
                            className="thread_edit-panel_button--text"
                            onClick={onCreateVariant}
                            type="button"
                        >
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>
                    </div>
                )}
            </div>

            <div className="thread_edit-panel_buttons">
                <button className="thread_edit-panel_button">Сохранить</button>

                <button
                    className="thread_edit-panel_button--secondary"
                    type="button"
                    onClick={() => onBlur?.()}
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}