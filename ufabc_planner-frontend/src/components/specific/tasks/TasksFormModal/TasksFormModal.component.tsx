import { Form } from "@unform/web";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { ISubject } from "../../../../interfaces/subject";
import { ITask } from "../../../../interfaces/task";

import api from "../../../../services/api";

import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { Modal, ModalRef } from "../../../Modal";
import { SelectInput } from "../../../SelectInput";

interface Props {
  onSuccess?: () => void;
}

export interface TaskFormModalRef {
  handleOpenFormModal: (task?: ITask) => void;
}

const TaskFormModal = forwardRef<TaskFormModalRef, Props>(({ onSuccess }, ref) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef(null);

  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(false);

  const unsetFormModalStates = useCallback(() => {
    setCurrentTask(null);
    setLoading(false);
  }, []);

  const handleGetSubjects = useCallback(async () => {
    setSubjects(prevSubjects => ({ ...prevSubjects, loading: true }));

    await api
      .get(`/subjects/get/user`)
      .then(({ data }) => setSubjects(data))
      .catch(error => alert(error));
  }, []);

  const handleSuccess = useCallback((message: string) => {
    alert(message);

    if (onSuccess) onSuccess();

    unsetFormModalStates();

    modalRef.current?.handleCloseModal();
  }, [onSuccess, unsetFormModalStates]);

  const handleSubmit = useCallback(async (data: Omit<ITask, 'id'>) => {
    setLoading(true);

    try {
      if (currentTask) {
        await api
          .put(`/tasks/update/${currentTask.id}`, { ...data, id: currentTask.id })
          .then(() => handleSuccess('Tarefa editada com sucesso!'))
          .catch(error => alert(error));
      } else {
        await api
          .post('/tasks/', { ...data })
          .then(() => handleSuccess('Tarefa criada com sucesso!'))
          .catch(error => alert(error));
      }
    } catch (error) {
      alert('Houve um erro na criação/edição da tarefa...')
    } finally {
      setLoading(false);
    }
  }, [currentTask, handleSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpenFormModal: (task?: ITask) => {
      if (task) setCurrentTask(task);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  useEffect(() => {
    handleGetSubjects();
  }, [handleGetSubjects]);

  return (
    <Modal
      ref={modalRef}
      title={`${currentTask ? 'Editar' : 'Criar'} Tarefa`}
      onClose={unsetFormModalStates}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectInput name="subjectId" label="Matéria*" defaultValue={currentTask?.subjectId}>
            <option value=""></option>

            {subjects.length && subjects?.map(subject => <option value={subject.id}>{subject.name}</option>)}
          </SelectInput>

          <Input name="title" label="Nome*" placeholder="Ex.: Fazer atividade X" defaultValue={currentTask?.title}/>

          <Input name="dueDate" label="Prazo*" placeholder="Ex.: 2022-12-12" defaultValue={currentTask?.dueDate}/>

          <Input name="description" label="Descrição" placeholder="Ex.: Uma tarefa muito legal" defaultValue={currentTask?.description}/>

          <Button style={{ marginTop: '32px' }} type="submit" loading={loading}>Salvar</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default TaskFormModal;
