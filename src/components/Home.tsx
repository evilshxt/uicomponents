import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  tags: string[];
  author: string;
  languages: string[];
  dependencies: string[];
}

const Home: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const itemsPerPage = 12

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Load component list
        const listResponse = await fetch('/components-list.json')
        if (!listResponse.ok) throw new Error('Failed to load components list')
        const componentNames: string[] = await listResponse.json()

        // Load manifests for each component
        const loadedComponents: ComponentInfo[] = []
        for (const name of componentNames) {
          try {
            const response = await fetch(`/library/${name}/manifest.json`)
            if (response.ok) {
              const manifest = await response.json()
              loadedComponents.push(manifest)
            }
          } catch (error) {
            console.warn(`Failed to load manifest for ${name}`)
          }
        }

        setComponents(loadedComponents)
      } catch (error) {
        console.error('Failed to load components:', error)
      }
    }

    loadComponents()
  }, [])

  const allTags = Array.from(new Set(components.flatMap(c => c.tags)))

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(search.toLowerCase()) ||
                         component.description.toLowerCase().includes(search.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesTag = !selectedTag || component.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage)
  const paginatedComponents = filteredComponents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

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

          {/* Search and Controls */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex-1 max-w-md"
            />
            <div className="flex items-center gap-4">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Components Grid/List */}
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-4"
          }>
            {paginatedComponents.map((component) => (
              <div key={component.name} className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
              }`}>
                {viewMode === 'grid' && (
                  <img
                    src={`/library/${component.name}/thumbnail.jpg`}
                    alt={`${component.name} preview`}
                    className="w-full h-32 object-cover rounded mb-4"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
                <div className={viewMode === 'list' ? 'ml-4 flex-1' : ''}>
                  <h4 className="text-xl font-semibold mb-2">{component.name}</h4>
                  <p className="text-gray-600 mb-4">{component.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {component.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/components/${component.name}`}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors inline-block text-center"
                  >
                    View Component
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 rounded border ${
                      page === pageNum
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
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
    </div>
  )
}

export default Home