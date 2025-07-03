import React from 'react';
import { BarChart4, FileText, CircleHelp, LayoutDashboard, CirclePlus } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export interface NavItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  isButton?: boolean;
}

export const useNavItems = (): NavItem[] => {
  const { t } = useTranslation();
  
  return [
    { 
      id: 'app', 
      path: '/app', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: t('dashboard') 
    },
    { 
      id: 'forms', 
      path: '/forms', 
      icon: <FileText className="w-5 h-5" />, 
      label: t('forms') 
    },
    { 
      id: 'analytics', 
      path: '/analytics', 
      icon: <BarChart4 className="w-5 h-5" />, 
      label: t('analytics') 
    },
    { 
      id: 'help', 
      path: '/help', 
      icon: <CircleHelp className="w-5 h-5" />, 
      label: t('help') 
    },
    { 
      id: 'new-form', 
      path: '/forms/new', 
      icon: <CirclePlus className="w-5 h-5" />, 
      label: t('createForm'),
      isButton: true
    }
  ];
};
