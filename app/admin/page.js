import { redirect } from 'next/navigation';
import ContentAdminClient from '../../components/ContentAdminClient';
import { isAdminAuthenticated } from '../../lib/admin-auth';
import { canEditContent, getSiteContent } from '../../lib/content-store';

export const metadata = {
  title: 'Content Admin | TouchPointe Digital',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();
  const editable = canEditContent();

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 50%), radial-gradient(circle at bottom left, rgba(6,182,212,0.06), transparent 40%), var(--bg-color)' }}>
      <ContentAdminClient initialContent={content} editable={editable} />
    </div>
  );
}
