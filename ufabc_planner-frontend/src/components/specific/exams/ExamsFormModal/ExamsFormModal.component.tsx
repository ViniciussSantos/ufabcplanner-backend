import { Form } from "@unform/web";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { IExam } from "../../../../interfaces/exam";
import { ISubject } from "../../../../interfaces/subject";

import api from "../../../../services/api";

import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { Modal, ModalRef } from "../../../Modal";
import { SelectInput } from "../../../SelectInput";

interface Props {
  onSuccess?: () => void;
}

export interface ExamsFormModalRef {
  handleOpenFormModal: (exam?: IExam) => void;
}

const ExamsFormModal = forwardRef<ExamsFormModalRef, Props>(({ onSuccess }, ref) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef(null);

  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [currentExam, setCurrentExam] = useState<IExam | null>(null);
  const [loading, setLoading] = useState(false);

  const unsetFormModalStates = useCallback(() => {
    setCurrentExam(null);
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

  const handleSubmit = useCallback(async (data: Omit<IExam, 'id'>) => {
    setLoading(true);

    try {
      if (currentExam) {
        await api
          .put(`/exams/update/${currentExam.id}`, { ...data, id: currentExam.id })
          .then(() => handleSuccess('Prova editada com sucesso!'))
          .catch(error => alert(error));
      } else {
        await api
          .post('/exams/', { ...data }) //todo
          .then(() => handleSuccess('Prova criada com sucesso!'))
          .catch(error => alert(error));
      }
    } catch (error) {
      alert('Houve um erro na criação/edição da prova...')
    } finally {
      setLoading(false);
    }
  }, [currentExam, handleSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpenFormModal: (exam?: IExam) => {
      if (exam) setCurrentExam(exam);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  useEffect(() => {
    handleGetSubjects();
  }, [handleGetSubjects]);

  return (
    <Modal
      ref={modalRef}
      title={`${currentExam ? 'Editar' : 'Criar'} Prova`}
      onClose={unsetFormModalStates}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectInput name="subjectId" label="Matéria*" defaultValue={currentExam?.subjectId}>
            <option value=""></option>
            {subjects?.length && subjects?.map(subject => <option value={subject.id}>{subject.name}</option>)}
          </SelectInput>

          <Input name="name" label="Nome*" placeholder="Ex.: P2" defaultValue={currentExam?.name}/>

          <Input name="dueDate" label="Data*" placeholder="Ex.: 2022-12-12" defaultValue={currentExam?.dueDate}/>

          <Input name="time" label="Hora de início*" placeholder="Ex.: 15:30" defaultValue={currentExam?.time}/>

          <Input name="description" label="Descrição" placeholder="Ex.: Uma prova muito legal" defaultValue={currentExam?.description}/>

          <Button style={{ marginTop: '32px' }} type="submit" loading={loading}>Salvar</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default ExamsFormModal;
