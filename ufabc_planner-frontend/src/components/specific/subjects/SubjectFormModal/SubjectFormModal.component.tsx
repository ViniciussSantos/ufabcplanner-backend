import { Form } from "@unform/web";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { ISubject } from "../../../../interfaces/subject";
import api from "../../../../services/api";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { Modal, ModalRef } from "../../../Modal";

interface Props {
  onSuccess?: () => void;
  quarterId: string;
}

export interface SubjectFormModalRef {
  handleOpenFormModal: (subject?: ISubject) => void;
}

const SubjectFormModal = forwardRef<SubjectFormModalRef, Props>(({ onSuccess, quarterId }, ref) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef(null);

  const [currentSubject, setCurrentSubject] = useState<ISubject | null>(null);
  const [loading, setLoading] = useState(false);

  const unsetFormModalStates = useCallback(() => {
    setCurrentSubject(null);
    setLoading(false);
  }, []);

  const handleSuccess = useCallback((message: string) => {
    alert(message);

    if (onSuccess) onSuccess();

    unsetFormModalStates();

    modalRef.current?.handleCloseModal();
  }, [onSuccess, unsetFormModalStates]);

  const handleSubmit = useCallback(async (data: Omit<ISubject, 'id'>) => {
    setLoading(true);

    try {
      if (currentSubject) {
        await api
          .put(`/subjects/update/${currentSubject.id}`, { ...data, id: currentSubject.id, quarterId })
          .then(() => handleSuccess('Matéria editada com sucesso!'))
          .catch(error => alert(error));
      } else {
        await api
          .post('/subjects/', { ...data, quarterId })
          .then(() => handleSuccess('Matéria criada com sucesso!'))
          .catch(error => alert(error));
      }
    } catch (error) {
      alert('Houve um erro na criação/edição da matéria...')
    } finally {
      setLoading(false);
    }
  }, [currentSubject, handleSuccess, quarterId]);

  useImperativeHandle(ref, () => ({
    handleOpenFormModal: (subject?: ISubject) => {
      if (subject) setCurrentSubject(subject);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  return (
    <Modal
      ref={modalRef}
      title={`${currentSubject ? 'Editar' : 'Criar'} Matéria`}
      onClose={unsetFormModalStates}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input name="name" label="Nome*" placeholder="Ex.: Engenharia de Software" defaultValue={currentSubject?.name}/>

          <Input name="description" label="Descrição" placeholder="Ex.: Uma matéria muito legal" defaultValue={currentSubject?.description}/>

          <Button style={{ marginTop: '32px' }} type="submit" loading={loading}>Salvar</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default SubjectFormModal;
