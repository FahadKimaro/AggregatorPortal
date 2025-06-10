import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Send, Download, Car, FileText } from 'lucide-react';
import QuotationForm from '../components/QuotationForm';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'quote'>('dashboard');

  const modules = [ 
    {
      title: "Quotation Module",
      description: "Create and manage insurance quotes",
      icon: FileText,
      action: () => setCurrentView('quote')
    },
    {
      title: "Policy Management",
      description: "Manage active policies",
      icon: BarChart3,
      action: () => console.log('Policy Management')
    },
    {
      title: "Client Management",
      description: "Manage client information",
      icon: Users,
      action: () => console.log('Client Management')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">B2B Insurance Platform</h1>
          </div>
          {currentView === 'quote' && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('dashboard')}
            >
              Back to Dashboard
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
              <p className="text-gray-600">Manage your insurance operations efficiently</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <module.icon className="h-8 w-8 text-blue-600" />
                      <CardTitle>{module.title}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={module.action} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Open Module
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {currentView === 'quote' && (
          <QuoteCreation onComplete={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
};

export default Index;