import { useState } from 'react'
import { componentRegistry } from './library/registry'
import ComponentViewer from './components/ComponentViewer'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src="/Logo.jpg" alt="Velvron Components Logo" className="h-10 w-10 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Velvron Components</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#components" className="text-gray-500 hover:text-gray-900">Components</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900">About</a>
              <a href="#contribute" className="text-gray-500 hover:text-gray-900">Contribute</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Free Open-Source UI Components
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover and copy beautiful, responsive UI components built with React, Tailwind CSS, and pure CSS.
            Perfect for developers seeking high-quality components without the hassle.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#components" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Explore Components
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#contribute" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Contribute
              </a>
            </div>
          </div>
        </div>

        {/* Components Gallery */}
        <div id="components" className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">Component Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {componentRegistry.map((component) => (
              <div key={component.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold mb-2">{component.name}</h4>
                <p className="text-gray-600 mb-4">{component.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {component.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedComponent(component.name)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  View Component
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Velvron Components. Licensed under MIT.</p>
          </div>
        </div>
      </footer>

      {/* Component Viewer Modal */}
      <ComponentViewer
        componentName={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  )
}

export default App
