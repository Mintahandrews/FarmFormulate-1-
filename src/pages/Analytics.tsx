import { useState, useEffect, useRef } from 'react';
import { BarChart3, Download, Filter, LineChart, PieChart, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

export function Analytics() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  
  // Mock forms for selection
  const forms = [
    { id: 'all', name: 'All Forms' },
    { id: 'form-1', name: 'Maize Yield Assessment' },
    { id: 'form-2', name: 'Irrigation Survey' },
    { id: 'form-3', name: 'Market Access Evaluation' },
    { id: 'form-4', name: 'Soil Health Survey' },
  ];
  
  // Mock regions for selection
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'greater-accra', name: 'Greater Accra' },
    { id: 'ashanti', name: 'Ashanti' },
    { id: 'northern', name: 'Northern' },
    { id: 'eastern', name: 'Eastern' },
    { id: 'central', name: 'Central' },
  ];
  
  // Mock data for charts
  const responseData = [
    { date: '2025-06-01', count: 25 },
    { date: '2025-06-05', count: 42 },
    { date: '2025-06-10', count: 37 },
    { date: '2025-06-15', count: 53 },
    { date: '2025-06-20', count: 48 },
    { date: '2025-06-25', count: 61 },
    { date: '2025-06-30', count: 78 },
  ];
  
  const cropYieldData = [
    { crop: 'Maize', avgYield: 4.2, prevYield: 3.8 },
    { crop: 'Rice', avgYield: 3.5, prevYield: 3.2 },
    { crop: 'Cassava', avgYield: 12.8, prevYield: 11.5 },
    { crop: 'Yam', avgYield: 8.3, prevYield: 7.9 },
    { crop: 'Cocoa', avgYield: 0.6, prevYield: 0.5 },
  ];
  
  const pestPrevalence = [
    { pest: 'Fall Armyworm', percentage: 38 },
    { pest: 'Stem Borer', percentage: 24 },
    { pest: 'Aphids', percentage: 18 },
    { pest: 'Grasshoppers', percentage: 12 },
    { pest: 'Other', percentage: 8 },
  ];
  
  const completionRates = [
    { status: 'Completed', count: 1247, color: '#16a34a' },
    { status: 'Partial', count: 438, color: '#f59e0b' },
    { status: 'Abandoned', count: 286, color: '#ef4444' },
  ];
  
  const analyticsRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animations
  useEffect(() => {
    if (!isLoading && analyticsRef.current) {
      // Animate the analytics container
      gsap.fromTo(
        analyticsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      
      // Animate controls
      if (controlsRef.current) {
        gsap.fromTo(
          controlsRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
        );
      }
      
      // Animate tabs
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
        );
      }
      
      // Animate charts
      const charts = chartsRef.current.filter(Boolean);
      gsap.fromTo(
        charts,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.5, 
          delay: 0.3,
          ease: 'power2.out' 
        }
      );
    }
  }, [isLoading]);
  
  // Animate charts when switching tabs
  useEffect(() => {
    if (!isLoading && analyticsRef.current) {
      const charts = chartsRef.current.filter(Boolean);
      gsap.fromTo(
        charts,
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1,
          duration: 0.4, 
          ease: 'power2.out' 
        }
      );
    }
  }, [activeTab]);
  
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">{t('processingData')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8" ref={analyticsRef}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('analytics')}</h1>
        <p className="text-gray-600">{t('analyticsDescription')}</p>
      </div>
      
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" ref={controlsRef}>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form')}</label>
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="block w-full sm:w-48 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              {forms.map(form => (
                <option key={form.id} value={form.id}>{form.name}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('region')}</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full sm:w-48 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('dateRange')}</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="block w-full sm:w-48 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            >
              <option value="week">{t('lastWeek')}</option>
              <option value="month">{t('lastMonth')}</option>
              <option value="quarter">{t('lastQuarter')}</option>
              <option value="year">{t('lastYear')}</option>
            </select>
          </div>
          
          <div className="w-full sm:w-auto sm:ml-auto flex items-end">
            <button
              onClick={refreshData}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('refresh')}
            </button>
            <button
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('export')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6" ref={tabsRef}>
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            {[
              { id: 'overview', label: t('overview'), icon: <LineChart className="h-4 w-4 mr-2" /> },
              { id: 'crops', label: t('cropYields'), icon: <BarChart3 className="h-4 w-4 mr-2" /> },
              { id: 'pests', label: t('pestPrevalence'), icon: <PieChart className="h-4 w-4 mr-2" /> },
              { id: 'responses', label: t('responseAnalysis'), icon: <Filter className="h-4 w-4 mr-2" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Charts based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Responses Over Time */}
          <div 
            ref={el => chartsRef.current[0] = el}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <h2 className="text-lg font-medium mb-4">{t('responsesOverTime')}</h2>
            <div className="h-64 mt-2">
              <div className="flex h-full items-end">
                {responseData.map((data, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <div 
                      className="w-4/5 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                      style={{ height: `${(data.count / Math.max(...responseData.map(d => d.count))) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(data.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Completion Rates */}
          <div 
            ref={el => chartsRef.current[1] = el}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <h2 className="text-lg font-medium mb-4">{t('formCompletionRates')}</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Donut Chart */}
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  {completionRates.map((item, index) => {
                    // Calculate the total
                    const total = completionRates.reduce((sum, i) => sum + i.count, 0);
                    
                    // Calculate percentage and stroke dasharray
                    const percent = (item.count / total) * 100;
                    const startPercent = completionRates
                      .slice(0, index)
                      .reduce((sum, i) => sum + (i.count / total) * 100, 0);
                    
                    // SVG parameters
                    const radius = 16;
                    const circumference = 2 * Math.PI * radius;
                    
                    return (
                      <circle
                        key={index}
                        className="donut-segment"
                        cx="18"
                        cy="18"
                        r={radius}
                        strokeWidth="4"
                        strokeDasharray={`${(percent * circumference) / 100} ${circumference}`}
                        strokeDashoffset={-((startPercent * circumference) / 100)}
                        fill="transparent"
                        stroke={item.color}
                        strokeLinecap="round"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                      />
                    );
                  })}
                  <circle cx="18" cy="18" r="12" fill="white" />
                  <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold" fill="#374151">
                    {Math.round((completionRates[0].count / completionRates.reduce((sum, i) => sum + i.count, 0)) * 100)}%
                  </text>
                </svg>
              </div>
              
              {/* Legend */}
              <div className="flex flex-col gap-2">
                {completionRates.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm text-gray-700">{item.status}</span>
                      <span className="text-sm text-gray-500 ml-4">{item.count} ({Math.round((item.count / completionRates.reduce((sum, i) => sum + i.count, 0)) * 100)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'crops' && (
        <div 
          ref={el => chartsRef.current[2] = el}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <h2 className="text-lg font-medium mb-4">{t('cropYieldsComparison')}</h2>
          <div className="h-80 mt-4">
            <div className="flex h-full items-end justify-around px-4">
              {cropYieldData.map((data, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center"
                >
                  <div className="flex items-end space-x-2">
                    <div className="w-12 relative">
                      <div 
                        className="w-full bg-gray-200 rounded-t absolute bottom-0 left-0"
                        style={{ height: `${(data.prevYield / Math.max(...cropYieldData.map(d => Math.max(d.avgYield, d.prevYield)))) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-green-500 rounded-t absolute bottom-0 left-0"
                        style={{ 
                          height: `${(data.avgYield / Math.max(...cropYieldData.map(d => Math.max(d.avgYield, d.prevYield)))) * 100}%`,
                          opacity: 0.7
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{data.crop}</div>
                  <div className="text-xs text-gray-700 font-medium mt-1">{data.avgYield} t/ha</div>
                  <div className="text-xs text-gray-400">{((data.avgYield - data.prevYield) / data.prevYield * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-green-500 mr-2 opacity-70"></div>
              <span className="text-sm text-gray-600">{t('currentSeason')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 mr-2"></div>
              <span className="text-sm text-gray-600">{t('previousSeason')}</span>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'pests' && (
        <div 
          ref={el => chartsRef.current[3] = el}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <h2 className="text-lg font-medium mb-4">{t('pestPrevalence')}</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Pie Chart */}
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {pestPrevalence.map((item, index) => {
                  // Calculate starting angle
                  const total = pestPrevalence.reduce((sum, i) => sum + i.percentage, 0);
                  const startAngle = pestPrevalence
                    .slice(0, index)
                    .reduce((sum, i) => sum + (i.percentage / total) * 360, 0);
                  const angle = (item.percentage / total) * 360;
                  
                  // Convert angles to radians
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = ((startAngle + angle) * Math.PI) / 180;
                  
                  // Calculate coordinates
                  const radius = 40;
                  const x1 = 50 + radius * Math.cos(startRad);
                  const y1 = 50 + radius * Math.sin(startRad);
                  const x2 = 50 + radius * Math.cos(endRad);
                  const y2 = 50 + radius * Math.sin(endRad);
                  
                  // Create the arc path
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  const pathData = [
                    `M 50 50`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={`hsl(${120 + index * 40}, 70%, ${60 - index * 7}%)`}
                      stroke="white"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="flex flex-col gap-2">
              {pestPrevalence.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: `hsl(${120 + index * 40}, 70%, ${60 - index * 7}%)` }}
                  ></div>
                  <div className="flex justify-between w-full min-w-[150px]">
                    <span className="text-sm text-gray-700">{item.pest}</span>
                    <span className="text-sm text-gray-500 ml-4">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'responses' && (
        <div 
          ref={el => chartsRef.current[4] = el}
          className="space-y-6"
        >
          {/* Response Quality */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium mb-4">{t('dataQualityOverview')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('completeness')}</h3>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs font-medium text-gray-700">87%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('accuracy')}</h3>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs font-medium text-gray-700">92%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('dataConsistency')}</h3>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs font-medium text-gray-700">78%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Response Time Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium mb-4">{t('responseTimeAnalysis')}</h2>
            <div className="h-64 mt-2">
              <div className="flex h-full items-end">
                {['0-1m', '1-2m', '2-5m', '5-10m', '10-15m', '15-30m', '>30m'].map((timeRange, idx) => {
                  // Mock data for response times
                  const values = [5, 18, 38, 24, 10, 3, 2];
                  
                  return (
                    <div 
                      key={idx} 
                      className="flex-1 flex flex-col items-center justify-end h-full"
                    >
                      <div 
                        className="w-4/5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                        style={{ height: `${(values[idx] / Math.max(...values)) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">
                        {timeRange}
                      </div>
                      <div className="text-xs font-medium text-gray-700 mt-1">
                        {values[idx]}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
