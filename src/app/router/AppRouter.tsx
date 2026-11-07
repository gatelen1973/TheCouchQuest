import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { RecordsListPage } from '../../features/records/pages/RecordsListPage';
import { AppShell } from '../layout/AppShell';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppShell />}>
      <Route index element={<RecordsListPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

export function AppRouter() {
  return <RouterProvider router={appRouter} />;
}
