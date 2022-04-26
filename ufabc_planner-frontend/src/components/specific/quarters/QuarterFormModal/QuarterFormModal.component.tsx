import { Form } from "@unform/web";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { IQuarter } from "../../../../interfaces/quarter";
import api from "../../../../services/api";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import { Modal, ModalRef } from "../../../Modal";

interface Props {
  onSuccess?: () => void;
  academicYearId: string;
}

export interface QuarterFormModalRef {
  handleOpenFormModal: (quarter?: IQuarter) => void;
}

const QuarterFormModal = forwardRef<QuarterFormModalRef, Props>(({ onSuccess, academicYearId }, ref) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef(null);

  const [currentQuarter, setCurrentQuarter] = useState<IQuarter | null>(null);
  const [loading, setLoading] = useState(false);

  const unsetFormModalStates = useCallback(() => {
    setCurrentQuarter(null);
    setLoading(false);
  }, []);

  const handleSuccess = useCallback((message: string) => {
    alert(message);

    if (onSuccess) onSuccess();

    unsetFormModalStates();

    modalRef.current?.handleCloseModal();
  }, [onSuccess, unsetFormModalStates]);

  const handleSubmit = useCallback(async (data: Omit<IQuarter, 'id'>) => {
    setLoading(true);

    try {
      if (currentQuarter) {
        await api
          .put(`/quarters/update/${currentQuarter.id}`, { ...data, id: currentQuarter.id, academicYearId })
          .then(() => handleSuccess('Quadrimestre editado com sucesso!'))
          .catch(error => alert(error));
      } else {
        await api
          .post('/quarters/', { ...data, academicYearId })
          .then(() => handleSuccess('Quadrimestre criado com sucesso!'))
          .catch(error => alert(error));
      }
    } catch (error) {
      alert('Houve um erro na criação/edição do quadrimestre...')
    } finally {
      setLoading(false);
    }
  }, [academicYearId, currentQuarter, handleSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpenFormModal: (quarter?: IQuarter) => {
      if (quarter) setCurrentQuarter(quarter);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  return (
    <Modal
      ref={modalRef}
      title={`${currentQuarter ? 'Editar' : 'Criar'} Quadrimestre`}
      onClose={unsetFormModalStates}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input name="startDate" label="Data de início*" placeholder="Ex.: 2022-01-01" defaultValue={currentQuarter?.startDate}/>

          <Input name="endDate" label="Data de encerramento*" placeholder="Ex.: 2022-12-31" defaultValue={currentQuarter?.endDate}/>

          <Button style={{ marginTop: '32px' }} type="submit" loading={loading}>Salvar</Button>
        </div>
      </Form>
    </Modal>
  );
});

export default QuarterFormModal;
