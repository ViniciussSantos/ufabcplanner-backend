import { Form } from "@unform/web"
import { useCallback, useRef, useState } from "react";
import { IClass } from "../../../../interfaces/class";
import api from "../../../../services/api";
import { Button } from "../../../Button";

import { Input } from "../../../Input";

import styles from './ClassForm.module.scss';

interface Props {
  subjectId: string;
  onSuccess?: () => void | Promise<void>;
  onCancel: () => void;
}

const ClassForm = ({ subjectId, onSuccess, onCancel }: Props) => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: Omit<IClass, 'id'>) => {
    setLoading(true);

    try {
      await api
        .post('/classes/', { ...data, subjectId })
        .then(() => { alert('Aula criada com sucesso!'); if (onSuccess) onSuccess(); })
        .catch(error => alert(error));
    } catch (error) {
      alert('Houve um erro na criação/edição da aula...')
    } finally {
      setLoading(false);
    }
  }, [onSuccess, subjectId]);

  return (
    <div className={styles.form_container}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.sections_container}>
          <div className={styles.form_section}>
            <Input name="startTime" label="Horário de início*" placeholder="Ex.: 17:30" />

            <Input name="endTime" label="Horário de fim*" placeholder="Ex.: 20:00" />
          </div>

          <div className={styles.form_section}>
            <Input name="weekday" label="Dia da semana*" placeholder="Ex.: 'seg' ou 'ter' ou 'quar' ou 'quin' ou 'sex' ou 'sab' ou 'dom'" />

            <Input name="biweeklyType" label="Quinzenal" placeholder="Ex.: 'week1' ou 'week2'" />
          </div>

          <div className={styles.form_section}>
            <Input name="campus" label="Campus" placeholder="Ex.: Santo André" />

            <Input name="building" label="Bloco" placeholder="Ex.: Bloco B ou Beta" />
          </div>

          <div className={styles.form_section}>
            <Input name="room" label="Sala" placeholder="Ex.: 606" />

            <Input name="professor" label="Professor" placeholder="Ex.: Girafales" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center' }}>
          <Button btnType="secondary" style={{ width: '200px' }} type="button" onClick={() => onCancel()}>
            Cancelar
          </Button>

          <Button style={{ width: '200px' }} type="submit" loading={loading}>
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ClassForm;
