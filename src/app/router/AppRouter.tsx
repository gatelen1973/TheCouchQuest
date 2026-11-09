import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { RecordsListPage } from '../../features/records/pages/RecordsListPage';
import { AdventureLandingPage } from '../../features/adventure/pages/AdventureLandingPage';
import { HostGamePage } from '../../features/adventure/pages/HostGamePage';
import { AppShell } from '../layout/AppShell';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<AdventureLandingPage />} />
      <Route path="host" element={<HostGamePage />} />
      <Route path="records" element={<AppShell />}>
        <Route index element={<RecordsListPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>,
  ),
);

export function AppRouter() {
  return <RouterProvider router={appRouter} />;
}
