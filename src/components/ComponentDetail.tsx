import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  tags: string[];
  author: string;
  languages: string[];
  dependencies: string[];
}

const ComponentDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const [component, setComponent] = useState<ComponentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      if (!name) return

      try {
        const response = await fetch(`/library/${name}/manifest.json`)
        if (!response.ok) throw new Error('Component not found')
        const data = await response.json()
        setComponent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load component')
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [name])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading component...</p>
        </div>
      </div>
    )
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Component Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src="/Logo.jpg" alt="Velvron Components Logo" className="h-10 w-10 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Velvron Components</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Gallery</Link>
              <a href="#about" className="text-gray-500 hover:text-gray-900">About</a>
              <a href="#contribute" className="text-gray-500 hover:text-gray-900">Contribute</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Component Detail */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
                <p className="text-gray-600 mt-2">{component.description}</p>
              </div>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {component.category}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Metadata */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Author</h3>
                    <p className="text-gray-900">{component.author}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {component.languages.map((lang) => (
                        <span key={lang} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {component.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dependencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {component.dependencies.map((dep) => (
                        <span key={dep} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Demo</h2>
                <div className="bg-gray-100 rounded-lg p-4">
                  <iframe
                    src={`/library/${component.name}/index.html`}
                    className="w-full h-96 border rounded"
                    title={`${component.name} Demo`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link to="/" className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg">
            Back to Gallery
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ComponentDetail