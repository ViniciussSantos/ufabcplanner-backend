import { Form } from "@unform/web";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { IAcademicYear } from "../../../../interfaces/academicYear";
import api from "../../../../services/api";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { Modal, ModalRef } from "../../../Modal";

interface Props {
  onSuccess?: () => void;
}

export interface AcademicYearFormModalRef {
  handleOpenFormModal: (academicYear?: IAcademicYear) => void;
}

const AcademicYearFormModal = forwardRef<AcademicYearFormModalRef, Props>(({ onSuccess }, ref) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef(null);

  const [currentAcademicYear, setCurrentAcademicYear] = useState<IAcademicYear | null>(null);
  const [loading, setLoading] = useState(false);

  const unsetFormModalStates = useCallback(() => {
    setCurrentAcademicYear(null);
    setLoading(false);
  }, []);

  const handleSuccess = useCallback((message: string) => {
    alert(message);

    if (onSuccess) onSuccess();

    unsetFormModalStates();

    modalRef.current?.handleCloseModal();
  }, [onSuccess, unsetFormModalStates]);

  const handleSubmit = useCallback(async (data: Omit<IAcademicYear, 'id'>) => {
    setLoading(true);

    try {
      if (currentAcademicYear) {
        await api
          .put(`/academicyears/update/${currentAcademicYear.id}`, { ...data, id: currentAcademicYear.id })
          .then(() => handleSuccess('Ano academico editado com sucesso!'))
          .catch(error => alert(error));
      } else {
        await api
          .post('/academicyears/', data)
          .then(() => handleSuccess('Ano academico criado com sucesso!'))
          .catch(error => alert(error));
      }
    } catch (error) {
      alert('Houve um erro na criação/edição do ano academico...')
    } finally {
      setLoading(false);
    }
  }, [currentAcademicYear, handleSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpenFormModal: (academicYear?: IAcademicYear) => {
      if (academicYear) setCurrentAcademicYear(academicYear);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  return (
    <Modal
      ref={modalRef}
      title={`${currentAcademicYear ? 'Editar' : 'Criar'} Ano Acadêmico`}
      onClose={unsetFormModalStates}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input name="year" label="Ano*" placeholder="Ex.: 2022" defaultValue={currentAcademicYear?.year}/>

          <Input name="startDate" label="Data de início*" placeholder="Ex.: 2022-01-01" defaultValue={currentAcademicYear?.startDate}/>

          <Input name="endDate" label="Data de encerramento*" placeholder="Ex.: 2022-12-31" defaultValue={currentAcademicYear?.endDate}/>

          <Button style={{ marginTop: '32px' }} type="submit" loading={loading}>Salvar</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default AcademicYearFormModal;
