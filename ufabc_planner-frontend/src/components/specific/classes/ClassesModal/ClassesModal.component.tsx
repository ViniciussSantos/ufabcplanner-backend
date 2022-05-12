import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { IClass } from "../../../../interfaces/class";

import { ISubject } from "../../../../interfaces/subject";
import api from "../../../../services/api";
import { Button } from "../../../Button";
import { Modal, ModalRef } from "../../../Modal";
import { ClassForm } from "../ClassForm";
import { ClassItem } from "../ClassItem";

export interface ClassesModalRef {
  handleOpenModal: (subject: ISubject) => void;
}

const ClassesModal = forwardRef<ClassesModalRef>((_, ref) => {
  const modalRef = useRef<ModalRef>(null);

  const [subject, setSubject] = useState<ISubject | null>(null);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [addingClass, setAddingClass] = useState(false);

  const unsetModalStates = useCallback(() => {
    setSubject(null);
    setClasses([]);
  }, []);

  const modalTitle = useMemo(() => {
    if (subject) {
      return addingClass ? `Adicionando aula à ${subject.name}` : `Aulas de ${subject.name}`;
    } else {
      return 'N/A';
    }
  }, [addingClass, subject]);

  const handleGetClasses = useCallback(async () => {
    if (!subject) return;

    setClasses(prevYears => ({ ...prevYears, loading: true }));

    await api
      .get(`/classes/get/subject/${subject.id}`)
      .then(({ data }) => setClasses(data))
      .catch(error => alert(error));
  }, [subject]);

  useImperativeHandle(ref, () => ({
    handleOpenModal: (subject: ISubject) => {
      setSubject(subject);

      modalRef.current?.handleOpenModal();
    }
  }), []);

  useEffect(() => {
    handleGetClasses();
  }, [handleGetClasses]);

  return (
    <Modal ref={modalRef} title={modalTitle} onClose={unsetModalStates} width="800px">
      {addingClass
        ? (
          <ClassForm
            subjectId={subject?.id || ''}
            onSuccess={() => { setAddingClass(false); handleGetClasses() }}
            onCancel={() => setAddingClass(false)}
          />
        )
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {classes.length && classes?.map(klass =>
              <ClassItem
                klass={klass}
                onDelete={() => setClasses(prevClasses => prevClasses.filter(prevClass => prevClass.id !== klass.id))}
              />
            )}
          </div>
        )
      }

      {!addingClass &&
        <div style={{ display: 'flex', marginTop: '32px', justifyContent: 'center' }}>
          <Button onClick={() => setAddingClass(true)} style={{ width: '200px' }}>
            Adicionar nova aula
          </Button>
        </div>
      }
    </Modal>
  );
});

export default ClassesModal;
