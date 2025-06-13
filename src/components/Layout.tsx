import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Users, FileText, Shield, Receipt, 
  Mail, RotateCcw, DollarSign, XCircle, AlertTriangle,
  BarChart3, Settings, Building2, UserCheck, 
  FileCheck, Send
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Clients', href: '/clients', icon: Users }, 
    { name: 'Leads', href: '/leads', icon: UserCheck },
    { name: 'Quotations', href: '/quotations', icon: FileText },
    { name: 'Cover Notes', href: '/cover-notes', icon: Shield },
    { name: 'Tax Invoices', href: '/tax-invoices', icon: Receipt },
    { name: 'Receipts', href: '/receipts', icon: FileCheck },
    { name: 'Marketing', href: '/marketing', icon: Mail },
    { name: 'Renewals', href: '/renewals', icon: RotateCcw },
    { name: 'Commissions', href: '/commissions', icon: DollarSign },
    { name: 'Cancellations', href: '/cancellations', icon: XCircle },
    { name: 'Claims', href: '/claims', icon: AlertTriangle },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Integrations', href: '/integrations', icon: Send },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-56 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-between h-14 px-4 bg-blue-900">
          <div className="flex items-center space-x-2">
            <Building2 className="h-7 w-7 text-white" />
            <span className="text-white font-bold">InsureOPS</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={`${sidebarOpen ? 'lg:ml-56' : ''} transition-all duration-300`}>
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`${sidebarOpen ? 'lg:hidden' : ''} text-gray-500 hover:text-gray-700`}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <h1 className="ml-4 text-lg font-semibold text-gray-900">
                  {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  fahadykimaro@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;