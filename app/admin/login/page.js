import { redirect } from 'next/navigation';
import AdminLoginForm from '../../../components/AdminLoginForm';
import {
  getAdminDefaultsNotice,
  isAdminAuthenticated,
} from '../../../lib/admin-auth';

export const metadata = {
  title: 'Admin Login | TouchPointe Digital',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect('/admin');
  }

  const defaults = getAdminDefaultsNotice();

  return (
    <main className="admin-login-layout">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <AdminLoginForm defaultPasswordNotice={defaults.usingDefaultPassword || defaults.usingDefaultSecret} />
      </div>
    </main>
  );
}
