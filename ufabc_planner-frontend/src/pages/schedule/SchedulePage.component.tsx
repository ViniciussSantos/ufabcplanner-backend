import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Modal, ModalRef } from "../../components/Modal";
import { PageLayout } from "../../components/PageLayout";

import { IAcademicYear } from "../../interfaces/academicYear";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

import styles from './SchedulePage.module.scss';

const SchedulePage = () => {
  const modalRef = useRef<ModalRef>(null);

  const [academicYears, setAcademicYears] = useState<IAcademicYear[]>([]);
  const [currentYear, setCurrentYear] = useState<IAcademicYear | null>(null);

  const handleGetAcademicYears = useCallback(async () => {
    await api
    .get('/academicyears/get/user', { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
    .then(({ data }) => setAcademicYears(data))
    .catch(error => alert(error));
  }, []);

  const handleCreateAcademicYear = useCallback(async () => {
    await api
      .post('/academicyears/', { year: '2023', startDate: '2023-01-01', endDate: '2023-12-31' }, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
      .then(() => handleGetAcademicYears())
      .catch(error => alert(error));
  }, [handleGetAcademicYears]);

  const handleDeleteAcademicYear = useCallback(async (academicYear: { id: string }) => {
    await api
      .delete(`/academicyears/delete/${academicYear.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
      .then(() => setAcademicYears(prevYears => prevYears.filter(year => year.id !== academicYear.id)))
      .catch(error => alert(error));
  }, []);

  const handleEditAcademicYear = useCallback(async (academicYear: { id: string }) => {
    // await api
    //   .put(`/academicyears/update/${academicYear.id}`, { year: '2021', start_date: '2021-01-02', end_date: '2022-12-15' }, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
    //   .then(() => handleGetAcademicYears())
    //   .catch(error => alert(error));

    modalRef.current?.handleOpenModal();
  }, []);

  useEffect(() => {
    handleGetAcademicYears();
  }, [handleGetAcademicYears]);

  return (
    <PageLayout>
      <BoxesContainer>
        <Box style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', height: 'calc(100vh - 192px' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>Anos acadêmicos</b>

            <Button onClick={() => handleCreateAcademicYear()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {academicYears.map((academicYear: IAcademicYear) =>
              <div className={styles.year_item}>
                <div
                  className={clsx(styles.year_item_info, { [styles.selected]: academicYear.id === currentYear?.id })}
                  onClick={() => setCurrentYear(academicYear)}
                >
                  <b>{academicYear.year}</b>

                  <div>{toShortDate(new Date(academicYear.startDate))} até {toShortDate(new Date(academicYear.endDate))}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => handleEditAcademicYear(academicYear)} />

                  <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteAcademicYear(academicYear)} />
                </div>
              </div>
            )}
          </div>
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 192px' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>{currentYear ? 'Matérias do ano selecionado' : 'Nenhum ano acadêmico selecionado'}</b>
          </div>

          <div style={{ padding: '16px' }}>
            Ainda não há matérias para esse ano acadêmico
          </div>
        </Box>
      </BoxesContainer>

      <Modal ref={modalRef} title="Editar/Criar Ano Acadêmico">a</Modal>
    </PageLayout>
  );
};

export default SchedulePage;
