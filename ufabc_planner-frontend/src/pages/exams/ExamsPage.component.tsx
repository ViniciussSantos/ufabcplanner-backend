import { useCallback, useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { Box } from "../../components/Box";
import { BoxesContainer } from "../../components/BoxesContainer";
import { List } from "../../components/List";
import { PageLayout } from "../../components/PageLayout";
import { ExamsFormModal, ExamsFormModalRef } from "../../components/specific/exams/ExamsFormModal";

import { IExam } from "../../interfaces/exam";

import api from "../../services/api";

import { toShortDate } from "../../utils/date";

const ExamsPage = () => {
  const formModalRef = useRef<ExamsFormModalRef>(null);

  const [exams, setExams] = useState<{ data: IExam[], loading: boolean }>({ data: [], loading: false });

  const handleGetExams = useCallback(async () => {
    setExams(prevExams => ({ ...prevExams, loading: true }));

    await api
      .get('/exams/get/user')
      .then(({ data }) => setExams({ data: data.sort((a: IExam, b: IExam) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()), loading: false }))
      .catch(error => alert(error));
  }, []);

  const handleDeleteExam = useCallback(async (exam: IExam) => {
    if (window.confirm(`Tem certeza que quer deletar a prova "${exam.name}"?`)) {
      setExams(prevExams => ({ ...prevExams, loading: true }));

      await api
        .delete(`/exams/delete/${exam.id}`)
        .then(() => {
          setExams(prevExams => ({
            data: prevExams.data.filter(prevExam => prevExam.id !== exam.id),
            loading: false,
          }));

          alert('Prova deletada com sucesso!');
        })
        .catch(error => alert(error));
    }
  }, []);

  useEffect(() => {
    handleGetExams();
  }, [handleGetExams]);

  return (
    <PageLayout>
      <BoxesContainer>
        <Box flex height="calc(100vh - 192px)" title="Provas" onAdd={() => formModalRef.current?.handleOpenFormModal()}>
          <List
            data={{
              items: exams.data,
              loading: exams.loading,
              selectors: { title: 'name', id: 'id', descriptionGenerator: (exam: IExam) => `dia ${toShortDate(new Date(exam.dueDate))} às ${exam.time}` }
            }}
            actions={[
              { type: 'primary', icon: FiEdit, method: (exam: IExam) => formModalRef.current?.handleOpenFormModal(exam) },
              { type: 'error', icon: FiTrash2, method: (exam: IExam) => handleDeleteExam(exam) },
            ]}
          />
        </Box>
      </BoxesContainer>

      <ExamsFormModal ref={formModalRef} onSuccess={() => handleGetExams()} />
    </PageLayout>
  );
};

export default ExamsPage;
