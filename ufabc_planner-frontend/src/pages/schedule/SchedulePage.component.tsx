import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { AcademicYearFormModal } from "../../components/academic_years/AcademicYearFormModal";
import { AcademicYearFormModalRef } from "../../components/academic_years/AcademicYearFormModal/AcademicYearFormModal.component";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { PageLayout } from "../../components/PageLayout";

import { IAcademicYear } from "../../interfaces/academicYear";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

import styles from './SchedulePage.module.scss';

const SchedulePage = () => {
  const formModalRef = useRef<AcademicYearFormModalRef>(null);

  const [academicYears, setAcademicYears] = useState<IAcademicYear[]>([]);
  const [currentYear, setCurrentYear] = useState<IAcademicYear | null>(null);

  const handleGetAcademicYears = useCallback(async () => {
    await api
    .get('/academicyears/get/user', { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
    .then(({ data }) => setAcademicYears(data.sort((a: IAcademicYear, b: IAcademicYear) => Number(a.year) - Number(b.year))))
    .catch(error => alert(error));
  }, []);

  const handleCreateAcademicYear = useCallback(async () => {
    formModalRef.current?.handleOpenFormModal();
  }, []);

  const handleDeleteAcademicYear = useCallback(async (academicYear: IAcademicYear) => {
    if (window.confirm(`Tem certeza que quer deletar o ano acadêmico de ${academicYear.year}?`)) {
      await api
        .delete(`/academicyears/delete/${academicYear.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
        .then(() => { setAcademicYears(prevYears => prevYears.filter(year => year.id !== academicYear.id)); alert('Ano acadêmico deletado com sucesso!') })
        .catch(error => alert(error));
    }
  }, []);

  const handleEditAcademicYear = useCallback(async (academicYear: IAcademicYear) => {
    formModalRef.current?.handleOpenFormModal(academicYear);
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
            <b style={{ fontSize: '22px' }}>{currentYear ? `Matérias de ${currentYear.year}` : 'Nenhum ano acadêmico selecionado'}</b>
          </div>

          <div style={{ padding: '16px' }}>
            Ainda não há matérias para esse ano acadêmico
          </div>
        </Box>
      </BoxesContainer>

      <AcademicYearFormModal ref={formModalRef} onSuccess={() => handleGetAcademicYears()} />
    </PageLayout>
  );
};

export default SchedulePage;
