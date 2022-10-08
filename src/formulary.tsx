import { FormEvent, useEffect, useRef } from "react";
import { createId, Todo } from "./App";

interface TodoFormProps {
    addTodo: (todo: Todo) => void;
}

type FormMapper<T> = {
    [P in keyof T]: HTMLInputElement;
}

export const TodoFormulary = ({ addTodo }: TodoFormProps) => {
    const formularyDOMNode = useRef<null | HTMLFormElement>(null);
    const getFormsForTodo = ():Todo => {
        const { current } = formularyDOMNode as unknown as HTMLFormElement;
        const inputs = current.children as FormMapper<Todo>;
        const { date, description, name } = inputs;
        return {
            id: createId(),
            date: new Date(date.value),
            description: description.value,
            name: name.value
        }
    }
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = getFormsForTodo();
        addTodo(todo);
    }


    return (
        <section className="formulary-wrapper">
            <form ref={formularyDOMNode} onSubmit={($event) => submit($event)} className="flex-column">
                <input type="text" id="name" placeholder="todo name" />
                <input type="text" id="description" placeholder="todo description" />
                <input type="date" id="date" />
                <button type="submit">
                    Create new todo
                </button>
            </form>
        </section>
    )
}