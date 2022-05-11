import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { List } from "../../components/List";
import { PageLayout } from "../../components/PageLayout";
import { TaskFormModalRef, TasksFormModal } from "../../components/specific/tasks/TasksFormModal";

import { ITask } from "../../interfaces/task";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

const TasksPage = () => {
  const formModalRef = useRef<TaskFormModalRef>(null);

  const [tasks, setTasks] = useState<{ data: ITask[], loading: boolean }>({ data: [], loading: false });

  const handleGetTasks = useCallback(async () => {
    setTasks(prevTasks => ({ ...prevTasks, loading: true }));

    await api
      .get('/tasks/get/user')
      .then(({ data }) => setTasks({ data: data.sort((a: ITask, b: ITask) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()), loading: false }))
      .catch(error => alert(error));
  }, []);

  const handleDeleteTask = useCallback(async (task: ITask) => {
    if (window.confirm(`Tem certeza que quer deletar a tarefa "${task.title}"?`)) {
      setTasks(prevTasks => ({ ...prevTasks, loading: true }));

      await api
        .delete(`/tasks/delete/${task.id}`)
        .then(() => {
          setTasks(prevTasks => ({
            data: prevTasks.data.filter(prevTask => prevTask.id !== task.id),
            loading: false,
          }));

          alert('Tarefa deletada com sucesso!');
        })
        .catch(error => alert(error));
    }
  }, []);

  useEffect(() => {
    handleGetTasks();
  }, [handleGetTasks]);

  return (
    <PageLayout>
      <BoxesContainer>
        <Box flex height="calc(100vh - 192px)" title="Tarefas" onAdd={() => formModalRef.current?.handleOpenFormModal()}>
          <List
            data={{
              items: tasks.data,
              loading: tasks.loading,
              selectors: { title: 'title', id: 'id', descriptionGenerator: (task: ITask) => `até ${toShortDate(new Date(task.dueDate))}` }
            }}
            actions={[
              { type: 'primary', icon: FiEdit, method: (item: ITask) => formModalRef.current?.handleOpenFormModal(item) },
              { type: 'error', icon: FiTrash2, method: (item: ITask) => handleDeleteTask(item) },
            ]}
          />
        </Box>
      </BoxesContainer>

      <TasksFormModal ref={formModalRef} onSuccess={() => handleGetTasks()} />
    </PageLayout>
  );
};

export default TasksPage;
