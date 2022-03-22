import { useMemo } from "react";
import { IconType } from "react-icons";
import { FiAlertOctagon, FiArchive, FiCalendar, FiCheckCircle, FiFileText, FiGrid } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export type UrlPage = 'dashboard' | 'calendar' | 'tasks' | 'exams' | 'schedule';

export const pagesProps: { [key: string]: { title: string, icon: IconType } } = {
  dashboard: { title: 'Dashboard', icon: FiGrid },
  calendar: { title: 'Calendário', icon: FiCalendar },
  tasks: { title: 'Tarefas', icon: FiCheckCircle },
  exams: { title: 'Avaliações', icon: FiFileText },
  schedule: { title: 'Períodos e Matérias', icon: FiArchive },
};

const usePageProps = () => {
  const { pathname } = useLocation();

  const currentPage = pathname.split('/')[1];

  const pageProps = useMemo(() => {
    const props = pagesProps[currentPage];

    if (!props) return { title: '404', icon: FiAlertOctagon };

    return props;
  }, [currentPage]);

  return { pageProps };
}

export default usePageProps;
