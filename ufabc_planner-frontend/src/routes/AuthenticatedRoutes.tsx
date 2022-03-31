import { Navigate, Route, Routes,  } from "react-router-dom";

import { CalendarPage } from "../pages/calendar";
import { DashboardPage } from "../pages/dashboard";
import { ExamsPage } from "../pages/exams";
import { SchedulePage } from "../pages/schedule";
import { TasksPage } from "../pages/tasks";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" replace/>} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/calendar" element={<CalendarPage />} />

      <Route path="/tasks" element={<TasksPage />} />

      <Route path="/exams" element={<ExamsPage />} />

      <Route path="/schedule" element={<SchedulePage />} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
