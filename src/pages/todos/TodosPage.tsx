import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Spinner,
} from "@/components";
import { TodoCreateForm } from "@/components/forms/TodoCreateForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { queryClient } from "@/main";
import { ITodo } from "@/models/interfaces/ITodo";
import { useDeleteTodoMutation } from "@/services/api/mutations/useDeleteTodoMutation";
import { useUpdateTodoMutation } from "@/services/api/mutations/useUpdateTodoMutation";
import { useTodosQuery } from "@/services/api/queries/useTodosQuery";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { CircleAlert, CircleCheckIcon, Trash } from "lucide-react";
import { ReactElement, useState } from "react";

export const Todo = ({
  createdAt,
  updatedAt,
  title,
  content,
  isCompleted,
  isImportant,
  id,
}: ITodo): ReactElement => {
  const [isOpen, setOpen] = useState(content ? true : false);
  const { mutate } = useUpdateTodoMutation();

  return (
    <Card
      className={cn(
        "cursor-default overflow-hidden",

        { ["cursor-pointer"]: content?.length },
        { ["[&_*>*]:text-gray-300"]: isCompleted },
      )}
      onClick={() => (content?.length ? setOpen((prev) => !prev) : false)}
    >
      <CardHeader
        className={cn("grid grid-cols-[1fr_auto] bg-gray-50", {
          ["bg-red-50"]: isImportant,
        })}
      >
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-2 flex gap-4 text-gray-400">
            <span>
              created:{" "}
              <span className="text-xs">
                {dayjs(createdAt).format("DD MMMYY, hh:MM")}
              </span>
            </span>
            <span>
              udated:{" "}
              <span className="text-xs">
                {dayjs(updatedAt).format("DD MMMYY, hh:MM")}
              </span>
            </span>
          </CardDescription>
        </div>
        <div>
          <Button
            className={cn({ ["bg-red-50 text-red-700"]: isImportant })}
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              mutate(
                { id, isImportant: !isImportant },
                {
                  onSuccess: () =>
                    queryClient.invalidateQueries({ queryKey: ["todos"] }),
                },
              );
            }}
          >
            <CircleAlert size={18} />
          </Button>
          <Button
            className={cn({
              ["hover:bg-green-50 hover:text-green-500"]: !isCompleted,
              // ["hover:bg-transparent hover:text-red-700"]: isCompleted,
            })}
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              return mutate(
                { isCompleted: !isCompleted, id },
                {
                  onSuccess: () =>
                    queryClient.invalidateQueries({ queryKey: ["todos"] }),
                },
              );
            }}
          >
            <CircleCheckIcon
              size={18}
              className={isCompleted ? "text-green-500" : "text-inherit"}
            />
          </Button>
          <DeleteTodo id={id} />
        </div>
      </CardHeader>
      <CardContent
        className={cn("hidden h-0 overflow-hidden pt-6", {
          ["block h-full overflow-auto"]: isOpen,
        })}
      >
        <span>{content}</span>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export const DeleteTodo = ({ id }: { id: number }): ReactElement => {
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const [isOpen, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  return (
    <>
      <Button
        size="icon"
        className="hover:bg-red-50 hover:text-red-500"
        variant="ghost"
        color=""
        onClick={() => setOpen(true)}
      >
        <Trash size={18} />
      </Button>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this note?
            </DialogTitle>
            <DialogDescription className="mt-3">
              This action cannot be undone. This will permanently delete your
              todo record and remove your data from the servers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <p>
              Please, enter <b className="font-semibold">"yes"</b> in the field
              below:
            </p>
            <Input
              className="mt-1"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={confirmation !== "yes"}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(id, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["todos"] });
                  },
                });
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function TodosPage(): ReactElement {
  const { data, isLoading, isError } = useTodosQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <span>Heck</span>;

  console.log({ data });

  return (
    <section className="container">
      <div className="mt-4 flex items-center justify-center gap-4 bg-slate-50 p-4">
        <span>
          <span>Todos: </span>
          <b>{data.meta.total}</b>
        </span>
        <span>
          <span>Important: </span>
          <b>{data.meta.important}</b>
        </span>
        <span>
          <span>Completed: </span>
          <b>{data.meta.completed}</b>
        </span>
      </div>
      <div className="mt-4">
        <TodoCreateForm />
      </div>
      <div className="mt-6 space-y-4">
        {data.todos.map((todo: ITodo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </section>
  );
}
