import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: Props) {
  return (
    <div className="flex min-h-screen" style={{ background: '#05080F' }}>
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1 px-8 py-6 grid-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
