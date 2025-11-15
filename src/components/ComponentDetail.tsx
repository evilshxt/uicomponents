import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowLeft } from 'lucide-react'

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [codeFiles, setCodeFiles] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const loadComponent = async () => {
      if (!name) return

      try {
        const response = await fetch(`/library/${name}/manifest.json`)
        if (!response.ok) throw new Error('Component not found')
        const data = await response.json()
        setComponent(data)
        
        // Try to load the HTML file as code
        try {
          const htmlResponse = await fetch(`/library/${name}/index.html`)
          if (htmlResponse.ok) {
            const htmlCode = await htmlResponse.text()
            setCodeFiles({ 'index.html': htmlCode })
          }
        } catch (err) {
          console.warn('Could not load HTML code')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load component')
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [name])

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading component...</p>
        </div>
      </div>
    )
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Component Not Found</h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-6 py-3 rounded-lg font-semibold transition-all">
            <ArrowLeft size={18} />
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/40 border-b border-slate-800/40"
      >
        <div className="mx-6 lg:mx-12 px-6 lg:px-8 mt-4 mb-4 rounded-2xl bg-gradient-to-r from-slate-900/60 to-slate-800/40 border border-slate-700/40">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950">
                V
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Velvron
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Link to="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50">
                Gallery
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Component Detail */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-5xl font-black mb-3">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {component.name}
                  </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl">{component.description}</p>
              </div>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-sm whitespace-nowrap">
                {component.category}
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Author</h3>
              <p className="text-slate-100 font-medium">{component.author}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Languages</h3>
              <div className="flex flex-wrap gap-1">
                {component.languages.map((lang) => (
                  <span key={lang} className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {component.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded border border-cyan-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Dependencies</h3>
              <p className="text-slate-300 text-sm">{component.dependencies.length > 0 ? component.dependencies.join(', ') : 'None'}</p>
            </div>
          </div>

          {/* Live Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Live Demo</h2>
            <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <iframe
                src={`/library/${component.name}/index.html`}
                className="w-full h-96 border-0"
                title={`${component.name} Demo`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </motion.div>

          {/* Code Section */}
          {Object.keys(codeFiles).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold">Component Code</h2>
              {Object.entries(codeFiles).map(([fileName, code], idx) => (
                <div key={fileName} className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-slate-700/50">
                    <span className="font-mono text-sm font-semibold text-cyan-400">{fileName}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(code, idx)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all text-sm font-medium"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Code
                        </>
                      )}
                    </motion.button>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm text-slate-300 font-mono bg-slate-950/50">
                    <code>{code}</code>
                  </pre>
                </div>
              ))}
            </motion.div>
          )}

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all font-semibold"
            >
              <ArrowLeft size={18} />
              Back to Gallery
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

export default ComponentDetail