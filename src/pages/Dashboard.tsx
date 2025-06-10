import React from 'react';
import { 
  Users, FileText, Shield, Receipt, Mail, RotateCcw, 
  DollarSign, XCircle, AlertTriangle, TrendingUp, 
  TrendingDown, Activity, BarChart3
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Active Leads', value: '284', icon: Users, change: '+12%', color: 'bg-blue-500' },
    { name: 'Quotations Sent', value: '156', icon: FileText, change: '+8%', color: 'bg-teal-500' },
    { name: 'Cover Notes Issued', value: '98', icon: Shield, change: '+15%', color: 'bg-green-500' },
    { name: 'Tax Invoices', value: '87', icon: Receipt, change: '+5%', color: 'bg-purple-500' },
    { name: 'Active Clients', value: '1,247', icon: Users, change: '+23%', color: 'bg-indigo-500' },
    { name: 'Commission Earned', value: 'TZS 2,458,900', icon: DollarSign, change: '+18%', color: 'bg-emerald-500' },
    { name: 'Renewals Due', value: '43', icon: RotateCcw, change: '-3%', color: 'bg-amber-500' },
    { name: 'Active Claims', value: '12', icon: AlertTriangle, change: '+2%', color: 'bg-red-500' },
  ];

  const recentActivities = [
    { action: 'New lead generated', client: 'John Doe', time: '2 hours ago', type: 'lead' },
    { action: 'Quotation sent', client: 'ABC Corp', time: '3 hours ago', type: 'quote' },
    { action: 'Cover note issued', client: 'XYZ Ltd', time: '5 hours ago', type: 'cover' },
    { action: 'Commission received', client: 'DEF Industries', time: '1 day ago', type: 'commission' },
    { action: 'Claim submitted', client: 'GHI Enterprises', time: '2 days ago', type: 'claim' },
  ];

  const monthlyData = [
    { month: 'Jan', leads: 45, quotes: 32, policies: 28 },
    { month: 'Feb', leads: 52, quotes: 38, policies: 31 },
    { month: 'Mar', leads: 48, quotes: 35, policies: 29 },
    { month: 'Apr', leads: 61, quotes: 42, policies: 36 },
    { month: 'May', leads: 55, quotes: 39, policies: 33 },
    { month: 'Jun', leads: 67, quotes: 48, policies: 41 },
  ];
  
  return (
    <div className="space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 text-white">
        <h2 className="text-xl font-bold mb-1">Welcome to Your Insurance Operations Dashboard</h2>
        <p className="text-blue-100 text-sm">Monitor your business performance and manage your insurance operations efficiently.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.name}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Monthly Performance</h3>
          <div className="space-y-3">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center space-x-3">
                <div className="w-10 text-xs font-medium text-gray-600">{data.month}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(data.leads / 70) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-6">{data.leads}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              <span className="text-gray-600">Leads Generated</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Activity className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.client}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-blue-500 mb-1" />
            <span className="text-xs font-medium text-gray-900">Add Lead</span>
          </button>
          <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="h-6 w-6 text-teal-500 mb-1" />
            <span className="text-xs font-medium text-gray-900">Create Quote</span>
          </button>
          <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="h-6 w-6 text-green-500 mb-1" />
            <span className="text-xs font-medium text-gray-900">Issue Cover Note</span>
          </button>
          <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="h-6 w-6 text-purple-500 mb-1" />
            <span className="text-xs font-medium text-gray-900">Send Campaign</span>
          </button>
          <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-6 w-6 text-indigo-500 mb-1" />
            <span className="text-xs font-medium text-gray-900">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;