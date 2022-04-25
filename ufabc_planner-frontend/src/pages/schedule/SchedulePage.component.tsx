import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { AcademicYearFormModal } from "../../components/specific/academic_years/AcademicYearFormModal";
import { AcademicYearFormModalRef } from "../../components/specific/academic_years/AcademicYearFormModal/AcademicYearFormModal.component";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { PageLayout } from "../../components/PageLayout";

import { IAcademicYear } from "../../interfaces/academicYear";
import { IQuarter } from "../../interfaces/quarter";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

import styles from './SchedulePage.module.scss';
import { QuarterFormModal, QuarterFormModalRef } from "../../components/specific/quarters/QuarterFormModal";
import { ISubject } from "../../interfaces/subject";
import { SubjectFormModal, SubjectFormModalRef } from "../../components/specific/subjects/SubjectFormModal";

const SchedulePage = () => {
  const formModalRef = useRef<AcademicYearFormModalRef>(null);
  const quarterFormModalRef = useRef<QuarterFormModalRef>(null);
  const subjectFormModalRef = useRef<SubjectFormModalRef>(null);

  const [academicYears, setAcademicYears] = useState<IAcademicYear[]>([]);
  const [quarters, setQuarters] = useState<IQuarter[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const [currentYear, setCurrentYear] = useState<IAcademicYear | null>(null);
  const [currentQuarter, setCurrentQuarter] = useState<IQuarter | null>(null);

  const handleGetAcademicYears = useCallback(async () => {
    await api
      .get('/academicyears/get/user', { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}` } })
      .then(({ data }) => setAcademicYears(data.sort((a: IAcademicYear, b: IAcademicYear) => Number(a.year) - Number(b.year))))
      .catch(error => alert(error));
  }, []);

  const handleGetQuarters = useCallback(async () => {
    if (!currentYear) return;

    await api
      .get(`/quarters/get/academicYear/${currentYear?.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}` }})
      .then(({ data }) => setQuarters(data.sort((a: IQuarter, b: IQuarter) => Number(a.startDate) - Number(b.startDate))))
      .catch(error => alert(error));
  }, [currentYear]);

  const handleGetSubjects = useCallback(async () => {
    if (!currentQuarter) return;

    await api
      .get(`/subjects/get/quarter/${currentQuarter?.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}` }})
      .then(({ data }) => setSubjects(data))
      .catch(error => alert(error));
  }, [currentQuarter]);

  const handleCreateAcademicYear = useCallback(async () => {
    formModalRef.current?.handleOpenFormModal();
  }, []);

  const handleCreateQuarter = useCallback(async () => {
    quarterFormModalRef.current?.handleOpenFormModal();
  }, []);

  const handleCreateSubject = useCallback(async () => {
    subjectFormModalRef.current?.handleOpenFormModal();
  }, []);

  const handleDeleteAcademicYear = useCallback(async (academicYear: IAcademicYear) => {
    if (window.confirm(`Tem certeza que quer deletar o ano acadêmico de ${academicYear.year}?`)) {
      await api
        .delete(`/academicyears/delete/${academicYear.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
        .then(() => { setAcademicYears(prevYears => prevYears.filter(year => year.id !== academicYear.id)); alert('Ano acadêmico deletado com sucesso!') })
        .catch(error => alert(error));
    }
  }, []);

  const handleDeleteQuarter = useCallback(async (quarter: IQuarter) => {
    if (window.confirm(`Tem certeza que quer deletar o quadrimestre?`)) {
      await api
        .delete(`/quarters/delete/${quarter.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
        .then(() => { setQuarters(prevQuarters => prevQuarters.filter(q => q.id !== quarter.id)); alert('Quadrimestre deletado com sucesso!') })
        .catch(error => alert(error));
    }
  }, []);

  const handleDeleteSubject = useCallback(async (subject: ISubject) => {
    if (window.confirm(`Tem certeza que quer deletar a matéria ${subject.name}?`)) {
      await api
        .delete(`/subjects/delete/${subject.id}`, { headers: { 'Authorization': `Basic ${localStorage.getItem('auth_token')}`  } })
        .then(() => { setSubjects(prevSubjects => prevSubjects.filter(s => s.id !== subject.id)); alert('Matéria deletada com sucesso!') })
        .catch(error => alert(error));
    }
  }, []);

  const handleEditAcademicYear = useCallback(async (academicYear: IAcademicYear) => {
    formModalRef.current?.handleOpenFormModal(academicYear);
  }, []);

  const handleEditQuarter = useCallback(async (quarter: IQuarter) => {
    quarterFormModalRef.current?.handleOpenFormModal(quarter);
  }, []);

  const handleEditSubject = useCallback(async (subject: ISubject) => {
    subjectFormModalRef.current?.handleOpenFormModal(subject);
  }, []);

  useEffect(() => {
    handleGetAcademicYears();
  }, [handleGetAcademicYears]);

  useEffect(() => {
    handleGetQuarters();
  }, [handleGetQuarters]);

  useEffect(() => {
    handleGetSubjects();
  }, [handleGetSubjects]);

  return (
    <PageLayout>
      <BoxesContainer>
        <Box style={{ display: 'flex', flexDirection: 'column', maxWidth: '360px', height: 'calc(100vh - 192px)' }}>
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
                  onClick={() => { setCurrentYear(academicYear); setCurrentQuarter(null); setSubjects([]) }}
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

        <Box style={{ display: 'flex', maxWidth: '360px', flexDirection: 'column', height: 'calc(100vh - 192px)' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>Quadrimestres</b>

            <Button onClick={() => handleCreateQuarter()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {quarters.map((quarter: IQuarter, index) =>
              <div className={styles.year_item}>
                <div
                  className={clsx(styles.year_item_info, { [styles.selected]: quarter.id === currentQuarter?.id })}
                  onClick={() => setCurrentQuarter(quarter)}
                >
                  <b>Q{index + 1}</b>

                  <div>{toShortDate(new Date(quarter.startDate))} até {toShortDate(new Date(quarter.endDate))}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => handleEditQuarter(quarter)} />

                  <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteQuarter(quarter)} />
                </div>
              </div>
            )}
          </div>
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 192px)' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>Matérias</b>

            <Button onClick={() => handleCreateSubject()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {subjects.map((subject: ISubject) =>
              <div className={styles.year_item}>
                <div className={styles.year_item_info}>
                  <b>{subject.name}</b>

                  <div>{subject.description || ''}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => handleEditSubject(subject)} />

                  <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteSubject(subject)} />
                </div>
              </div>
            )}
          </div>
        </Box>
      </BoxesContainer>

      <AcademicYearFormModal ref={formModalRef} onSuccess={() => handleGetAcademicYears()} />

      <QuarterFormModal ref={quarterFormModalRef} academicYearId={currentYear?.id || ''} onSuccess={() => handleGetQuarters()}/>

      <SubjectFormModal ref={subjectFormModalRef} quarterId={currentQuarter?.id || ''} onSuccess={() => handleGetSubjects()}/>
    </PageLayout>
  );
};

export default SchedulePage;
