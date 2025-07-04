/**
 * @fileoverview Dashboard component with animated statistics
 * @typedef {import('gsap').gsap} gsap
 */

import { useState, useEffect, useRef } from 'react';
import { BarChart3, LineChart, Loader, PieChart, Users } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

export function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for the dashboard
  const stats = [
    { id: 1, title: t('totalSurveys'), value: '124', icon: 'form', change: '+12%', color: 'bg-blue-500' },
    { id: 2, title: t('responses'), value: '3,847', icon: 'users', change: '+18%', color: 'bg-green-500' },
    { id: 3, title: t('completionRate'), value: '76%', icon: 'pie', change: '+5%', color: 'bg-purple-500' },
    { id: 4, title: t('avgCompletionTime'), value: '4.2m', icon: 'timer', change: '-8%', color: 'bg-amber-500' },
  ];
  
  const regions = [
    { name: 'Greater Accra', count: 1247 },
    { name: 'Ashanti', count: 982 },
    { name: 'Northern', count: 654 },
    { name: 'Eastern', count: 521 },
    { name: 'Central', count: 443 },
  ];
  
  const crops = [
    { name: 'Maize', count: 1428 },
    { name: 'Rice', count: 863 },
    { name: 'Cassava', count: 742 },
    { name: 'Cocoa', count: 614 },
    { name: 'Yam', count: 503 },
  ];
  
  const recentForms = [
    { id: 1, title: 'Maize Yield Assessment', responses: 124, date: '2025-06-28', status: 'active' },
    { id: 2, title: 'Soil Health Survey', responses: 87, date: '2025-06-25', status: 'active' },
    { id: 3, title: 'Market Access Evaluation', responses: 56, date: '2025-06-22', status: 'completed' },
    { id: 4, title: 'Pest Impact Survey', responses: 43, date: '2025-06-20', status: 'active' },
    { id: 5, title: 'Irrigation Assessment', responses: 29, date: '2025-06-18', status: 'completed' },
  ];
  
  const dashboardRef = useRef<HTMLDivElement>(null);
  const statCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animations
  useEffect(() => {
    if (!isLoading && dashboardRef.current) {
      // Animate the dashboard container
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      
      // Animate stat cards
      const cards = statCardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.5, 
          ease: 'power2.out',
          delay: 0.2
        }
      );
      
      // Animate chart sections
      const sections = chartSectionsRef.current.filter(Boolean);
      gsap.fromTo(
        sections,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 0.6, 
          ease: 'power2.out',
          delay: 0.4
        }
      );
    }
  }, [isLoading]);
  
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'form':
        return <BarChart3 className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'pie':
        return <PieChart className={className} />;
      case 'timer':
        return <LineChart className={className} />;
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <Loader className="w-10 h-10 text-green-500 animate-spin" />
          <p className="mt-4 text-gray-600">{t('loadingDashboard')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8" ref={dashboardRef}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{t('dashboardDescription')}</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.id}
            ref={el => statCardsRef.current[index] = el}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold dark:text-white tracking-tight">{stat.value}</p>
                <div className="mt-1 flex items-center">
                  <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{t('lastMonth')}</span>
                </div>
              </div>
              <div className={`rounded-full p-2 ${stat.color}`}>
                {renderIcon(stat.icon, 'w-5 h-5 text-white')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Responses by Region */}
        <div 
          ref={el => chartSectionsRef.current[0] = el}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <h2 className="text-lg font-medium mb-4">{t('responsesByRegion')}</h2>
          <div className="h-60 flex items-end justify-between px-2">
            {regions.map((region, idx) => {
              // Calculate height percentage (max 90%)
              const heightPercentage = (region.count / Math.max(...regions.map(r => r.count))) * 90;
              
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-gradient-to-t from-green-600 to-green-400 rounded-t-md"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2 w-12 text-center">{region.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Responses by Crop Type */}
        <div 
          ref={el => chartSectionsRef.current[1] = el}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <h2 className="text-lg font-medium mb-4">{t('responsesByCrop')}</h2>
          <div className="h-60 flex items-center justify-center">
            <div className="relative w-40 h-40">
              {crops.map((crop, idx) => {
                // Create a simple pie chart representation
                const total = crops.reduce((sum, c) => sum + c.count, 0);
                const percentage = (crop.count / total) * 100;
                
                // For a simplified visual, just create colored circles of different sizes
                const size = 20 + (percentage / 5);
                const angle = (idx / crops.length) * Math.PI * 2;
                const x = Math.cos(angle) * (60 - size/4);
                const y = Math.sin(angle) * (60 - size/4);
                
                return (
                  <div 
                    key={idx}
                    className="absolute rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: `hsl(${(idx * 40) + 120}, 70%, 50%)`,
                      zIndex: Math.floor(percentage)
                    }}
                  >
                    {Math.round(percentage)}%
                  </div>
                );
              })}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-sm">
                  <span className="text-sm text-gray-500">{t('crops')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {crops.map((crop, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: `hsl(${(idx * 40) + 120}, 70%, 50%)` }}
                ></div>
                {crop.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Forms */}
      <div 
        ref={el => chartSectionsRef.current[2] = el}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <h2 className="text-lg font-medium mb-4">{t('recentForms')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('formTitle')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('responses')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('lastUpdated')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{form.title}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{form.responses}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(form.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      form.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
