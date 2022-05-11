import { useCallback, useEffect, useRef, useState } from "react";
import { FiCalendar, FiEdit, FiTrash2 } from "react-icons/fi";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { List } from "../../components/List";
import { PageLayout } from "../../components/PageLayout";
import { AcademicYearFormModal, AcademicYearFormModalRef } from "../../components/specific/academic_years/AcademicYearFormModal";
import { QuarterFormModal, QuarterFormModalRef } from "../../components/specific/quarters/QuarterFormModal";
import { SubjectFormModal, SubjectFormModalRef } from "../../components/specific/subjects/SubjectFormModal";
import { ClassesModal, ClassesModalRef } from "../../components/specific/classes/ClassesModal";

import { IAcademicYear } from "../../interfaces/academicYear";
import { IQuarter } from "../../interfaces/quarter";
import { ISubject } from "../../interfaces/subject";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

const SchedulePage = () => {
  const formModalRef = useRef<AcademicYearFormModalRef>(null);
  const quarterFormModalRef = useRef<QuarterFormModalRef>(null);
  const subjectFormModalRef = useRef<SubjectFormModalRef>(null);
  const classesModalRef = useRef<ClassesModalRef>(null);

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
        <Box
          flex
          maxWidth="360px"
          height="calc(100vh - 192px)"
          title="Anos acadêmicos"
          onAdd={() => formModalRef.current?.handleOpenFormModal()}
        >
          <List
            data={{
              items: academicYears.data,
              loading: academicYears.loading,
              selectors: { title: 'year', id: 'id', descriptionGenerator: (academicYear: IAcademicYear) => `${toShortDate(new Date(academicYear.startDate))} até ${toShortDate(new Date(academicYear.endDate))}` }
            }}
            actions={[
              { type: 'primary', icon: FiEdit, method: (item: IAcademicYear) => formModalRef.current?.handleOpenFormModal(item) },
              { type: 'error', icon: FiTrash2, method: (item: IAcademicYear) => handleDeleteAcademicYear(item) },
            ]}
            onSelect={(academicYear: IAcademicYear) => { setCurrentYear(academicYear); setCurrentQuarter(null); setSubjects({ data: [], loading: false }) }}
          />
        </Box>

        <Box
          flex
          maxWidth="360px"
          height="calc(100vh - 192px)"
          title="Quadrimestres"
          onAdd={() => quarterFormModalRef.current?.handleOpenFormModal()}
        >
          <List
            data={{
              items: quarters.data,
              loading: quarters.loading,
              selectors: { id: 'id', descriptionGenerator: (quarter: IQuarter) => `${toShortDate(new Date(quarter.startDate))} até ${toShortDate(new Date(quarter.endDate))}` }
            }}
            actions={[
              { type: 'primary', icon: FiEdit, method: (item: IQuarter) => quarterFormModalRef.current?.handleOpenFormModal(item) },
              { type: 'error', icon: FiTrash2, method: (item: IQuarter) => handleDeleteQuarter(item) },
            ]}
            overlapMessages={[
              { show: !currentYear, message: 'Nenhum ano acadêmico selecionado' },
              { show: !quarters.loading && !!currentYear && !quarters.data.length, message: 'Não há quadrimestres criados para esse ano acadêmico' },
            ]}
            onSelect={(quarter: IQuarter) => setCurrentQuarter(quarter)}
          />
        </Box>

        <Box
          flex
          height="calc(100vh - 192px)"
          title="Matérias"
          onAdd={() => subjectFormModalRef.current?.handleOpenFormModal()}
        >
          <List
            data={{
              items: subjects.data,
              loading: subjects.loading,
              selectors: { title: 'name', id: 'id', description: 'description' }
            }}
            actions={[
              { type: 'primary', icon: FiEdit, method: (item: ISubject) => subjectFormModalRef.current?.handleOpenFormModal(item) },
              { type: 'info', icon: FiCalendar, method: (item: ISubject) => classesModalRef.current?.handleOpenModal(item) },
              { type: 'error', icon: FiTrash2, method: (item: ISubject) => handleDeleteSubject(item) }
            ]}
            overlapMessages={[
              { show: !currentQuarter, message: 'Nenhum quadrimestre selecionado' },
              { show: !subjects.loading && !!currentQuarter && !subjects.data.length, message: 'Não há matérias criadas para esse quadrimestre' },
            ]}
          />
        </Box>
      </BoxesContainer>

      <AcademicYearFormModal ref={formModalRef} onSuccess={() => handleGetAcademicYears()} />

      <QuarterFormModal ref={quarterFormModalRef} academicYearId={currentYear?.id || ''} onSuccess={() => handleGetQuarters()}/>

      <SubjectFormModal ref={subjectFormModalRef} quarterId={currentQuarter?.id || ''} onSuccess={() => handleGetSubjects()}/>

      <ClassesModal ref={classesModalRef} />
    </PageLayout>
  );
};

export default SchedulePage;
