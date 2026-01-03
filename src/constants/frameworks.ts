import { Framework } from '../types';

export interface FrameworkInfo {
  id: Framework;
  title: string;
  description: string;
  icon: string;
}

export const FRAMEWORKS: FrameworkInfo[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Open conversation about faith, Scripture, and spiritual growth',
    icon: '💬',
  },
  {
    id: 'scripture',
    title: 'Scripture Study',
    description: 'Deep dive into God\'s Word with context and application',
    icon: '📖',
  },
  {
    id: 'prayer',
    title: 'Prayer Guide',
    description: 'Facilitate conversation with God and prayer practices',
    icon: '🙏',
  },
  {
    id: 'action',
    title: 'Word → Action',
    description: 'Translate Scripture into practical obedience',
    icon: '⚡',
  },
  {
    id: 'vision',
    title: 'Vision Clarity',
    description: 'Discern and clarify God-given calling and vision',
    icon: '🔮',
  },
];
