import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { AcademicYearFormModal } from "../../components/specific/academic_years/AcademicYearFormModal";
import { AcademicYearFormModalRef } from "../../components/specific/academic_years/AcademicYearFormModal/AcademicYearFormModal.component";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Loader } from "../../components/Loader";
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

  const [academicYears, setAcademicYears] = useState<{ data: IAcademicYear[], loading: boolean }>({ data: [], loading: false });
  const [quarters, setQuarters] = useState<{ data: IQuarter[], loading: boolean }>({ data: [], loading: false });
  const [subjects, setSubjects] = useState<{ data: ISubject[], loading: boolean }>({ data: [], loading: false });

  const [currentYear, setCurrentYear] = useState<IAcademicYear | null>(null);
  const [currentQuarter, setCurrentQuarter] = useState<IQuarter | null>(null);

  const handleGetAcademicYears = useCallback(async () => {
    setAcademicYears(prevYears => ({ ...prevYears, loading: true }));

    await api
      .get('/academicyears/get/user')
      .then(({ data }) => setAcademicYears({ data: data.sort((a: IAcademicYear, b: IAcademicYear) => Number(a.year) - Number(b.year)), loading: false  }))
      .catch(error => alert(error));
  }, []);

  const handleGetQuarters = useCallback(async () => {
    if (!currentYear) return;

    setQuarters(prevQuarters => ({ ...prevQuarters, loading: true }));

    await api
      .get(`/quarters/get/academicYear/${currentYear?.id}`)
      .then(({ data }) => setQuarters({ data: data.sort((a: IQuarter, b: IQuarter) => Number(a.startDate) - Number(b.startDate)), loading: false }))
      .catch(error => alert(error));
  }, [currentYear]);

  const handleGetSubjects = useCallback(async () => {
    if (!currentQuarter) return;

    setSubjects(prevSubjects => ({ ...prevSubjects, loading: true }));

    await api
      .get(`/subjects/get/quarter/${currentQuarter?.id}`)
      .then(({ data }) => setSubjects({ data, loading: false }))
      .catch(error => alert(error));
  }, [currentQuarter]);

  const handleDeleteAcademicYear = useCallback(async (academicYear: IAcademicYear) => {
    if (window.confirm(`Tem certeza que quer deletar o ano acadêmico de ${academicYear.year}?`)) {
      setAcademicYears(prevAcademicYears => ({ ...prevAcademicYears, loading: true }));

      await api
        .delete(`/academicyears/delete/${academicYear.id}`)
        .then(() => {
          setAcademicYears(prevYears => ({
            data: prevYears.data.filter(year => year.id !== academicYear.id),
            loading: false,
          }));

          alert('Ano acadêmico deletado com sucesso!');
        })
        .catch(error => alert(error));
    }
  }, []);

  const handleDeleteQuarter = useCallback(async (quarter: IQuarter) => {
    if (window.confirm(`Tem certeza que quer deletar o quadrimestre?`)) {
      setQuarters(prevQuarters => ({ ...prevQuarters, loading: true }));

      await api
        .delete(`/quarters/delete/${quarter.id}`)
        .then(() => {
          setQuarters(prevQuarters => ({
            data: prevQuarters.data.filter(q => q.id !== quarter.id),
            loading: false,
          }));

          alert('Quadrimestre deletado com sucesso!');
        })
        .catch(error => alert(error));
    }
  }, []);

  const handleDeleteSubject = useCallback(async (subject: ISubject) => {
    if (window.confirm(`Tem certeza que quer deletar a matéria ${subject.name}?`)) {
      setSubjects(prevSubjects => ({ ...prevSubjects, loading: true }));

      await api
        .delete(`/subjects/delete/${subject.id}`)
        .then(() => {
          setSubjects(prevSubjects => ({
            data: prevSubjects.data.filter(s => s.id !== subject.id),
            loading: false,
          }));

          alert('Matéria deletada com sucesso!');
        })
        .catch(error => alert(error));
    }
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

            <Button onClick={() => formModalRef.current?.handleOpenFormModal()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {academicYears.loading && <Loader />}

            {!academicYears.loading && academicYears.data?.map((academicYear: IAcademicYear) =>
              <div key={academicYear.id} className={clsx(styles.year_item, { [styles.selected]: academicYear.id === currentYear?.id })}>
                <div className={styles.year_item_info} onClick={() => { setCurrentYear(academicYear); setCurrentQuarter(null); setSubjects({ data: [], loading: false }) }}>
                  <b>{academicYear.year}</b>

                  <div>{toShortDate(new Date(academicYear.startDate))} até {toShortDate(new Date(academicYear.endDate))}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => formModalRef.current?.handleOpenFormModal(academicYear)} />

                  <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteAcademicYear(academicYear)} />
                </div>
              </div>
            )}
          </div>
        </Box>

        <Box style={{ display: 'flex', maxWidth: '360px', flexDirection: 'column', height: 'calc(100vh - 192px)' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>Quadrimestres</b>

            <Button onClick={() => quarterFormModalRef.current?.handleOpenFormModal()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {!currentYear && <div className={styles.no_message}>Nenhum ano acadêmico selecionado</div>}

            {!quarters.loading && !!currentYear && !quarters.data.length && <div className={styles.no_message}>Não há quadrimestres criados para esse ano acadêmico</div>}

            {quarters.loading && <Loader />}

            {!quarters.loading && quarters.data?.map((quarter: IQuarter, index) =>
              <div key={quarter.id} className={clsx(styles.year_item, { [styles.selected]: quarter.id === currentQuarter?.id })}>
                <div className={styles.year_item_info} onClick={() => setCurrentQuarter(quarter)}>
                  <b>Q{index + 1}</b>

                  <div>{toShortDate(new Date(quarter.startDate))} até {toShortDate(new Date(quarter.endDate))}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => quarterFormModalRef.current?.handleOpenFormModal(quarter)} />

                  <IconButton btnType="error" icon={FiTrash2} onClick={() => handleDeleteQuarter(quarter)} />
                </div>
              </div>
            )}
          </div>
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 192px)' }}>
          <div className={styles.box_header}>
            <b style={{ fontSize: '22px' }}>Matérias</b>

            <Button onClick={() => subjectFormModalRef.current?.handleOpenFormModal()} style={{ width: '40px', height: '40px' }}>
              <FiPlus size={20}/>
            </Button>
          </div>

          <div className={styles.years_container}>
            {!currentQuarter && <div className={styles.no_message}>Nenhum quadrimestre selecionado</div>}

            {!subjects.loading && !!currentQuarter && !subjects.data.length && <div className={styles.no_message}>Não há matérias criadas para esse quadrimestre</div>}

            {subjects.loading && <Loader />}

            {!subjects.loading && subjects.data?.map((subject: ISubject) =>
              <div key={subject.id} className={styles.year_item}>
                <div className={styles.year_item_info}>
                  <b>{subject.name}</b>

                  <div>{subject.description || ''}</div>
                </div>

                <div className={styles.actions_container}>
                  <IconButton btnType="primary" icon={FiEdit} onClick={() => subjectFormModalRef.current?.handleOpenFormModal(subject)} />

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
