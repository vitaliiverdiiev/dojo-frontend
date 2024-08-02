import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Spinner,
} from "@/components";
import { TodoCreateForm } from "@/components/forms/TodoCreateForm";
import axios from "@/configs/axios";
import { ITodo } from "@/models/interfaces/ITodo";
import { useDeleteTodoMutation } from "@/services/api/mutations/useDeleteTodoMutation";
import { useTodosQuery } from "@/services/api/queries/useTodosQuery";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactElement, useEffect, useState } from "react";

export const Todo = ({ id, author, title }: ITodo): ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      onClick={(e) => e.stopPropagation}
    >
      <CardHeader>
        <CardTitle className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span>{title}</span>
            <span>{author?.email}</span>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              deleteTodo(id);
              console.log("oke");
            }}
            className="size-8"
          >
            X
          </Button>
        </CardTitle>
        <CardDescription>{author?.email}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default function Page(): ReactElement {
  const { data, isLoading, isError } = useTodosQuery();
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (isError) return <span>Heck</span>;

  const onDragEnd = async (event: DragEndEvent) => {
    console.log({ event });

    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }

    setTodos((todos) => {
      const oldIndex = todos.findIndex((todo: ITodo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo: ITodo) => todo.id === over?.id);

      return arrayMove(todos, oldIndex, newIndex);
    });

    try {
      await axios.post("/todos/update-order", {
        todos: todos.map((todo, index) => ({
          id: todo.id.toString(),
          orderIndex: index,
        })),
      });
    } catch (error) {
      console.error("Failed to update order", error);
      // Optionally revert the changes if the API call fails
      setTodos(todos);
    }
  };

  console.log({ data });
  return (
    <div className="container py-8">
      <h1>TODOS</h1>
      <div>
        <TodoCreateForm />
      </div>
      <ul className="mt-4 grid grid-cols-4 gap-4">
        <DndContext
          collisionDetection={closestCenter}
          // sensors={sensors}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={todos}
            strategy={horizontalListSortingStrategy}
          >
            {todos.map((todo: ITodo) => (
              <li key={todo.id}>
                <Todo {...todo} />
              </li>
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}
