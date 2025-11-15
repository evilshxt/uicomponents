import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animate, stagger } from "animejs";
import { Github, Globe } from 'lucide-react'
import ThreeScene from './ThreeScene'

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  tags: string[];
  author: string;
  languages: string[];
  dependencies: string[];
}

// Premium Card Component with advanced styling
const PremiumCard: React.FC<{ component: ComponentInfo; viewMode: 'grid' | 'list'; index: number }> = ({ 
  component, 
  viewMode, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 backdrop-blur-sm ${
        viewMode === 'grid'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-2xl hover:shadow-cyan-500/30'
          : 'bg-gradient-to-r from-slate-800/80 to-slate-900/80 shadow-lg hover:shadow-cyan-500/20 flex items-stretch'
      }`}
      style={{
        border: isHovered ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(71, 85, 105, 0.2)',
      }}
    >
      {/* Glowing border effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 pointer-events-none animate-pulse" />
      )}

      {/* Grid view image */}
      {viewMode === 'grid' && (
        <div className="relative h-40 overflow-hidden bg-slate-900/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80 z-10" />
          <img
            src={`/library/${component.name}/thumbnail.jpg`}
            alt={`${component.name} preview`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)'
            }}
          />
        </div>
      )}

      {/* List view thumbnail */}
      {viewMode === 'list' && (
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-slate-900/50">
          <img
            src={`/library/${component.name}/thumbnail.jpg`}
            alt={component.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}

      {/* Content */}
      <div className={viewMode === 'list' ? 'flex-1 p-5' : 'p-6'}>
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200">
            {component.name}
          </h4>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400 font-medium">
            {component.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {component.description}
        </p>

        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-2 mb-5">
          {component.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2.5 py-1 rounded-full bg-slate-700/40 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="text-xs px-2.5 py-1 text-slate-500 font-medium">
              +{component.tags.length - 3} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/components/${component.name}`}
          className="block w-full text-center py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold rounded-lg transition-all duration-300 text-sm hover:shadow-lg hover:shadow-cyan-500/50 group-hover:scale-105 transform"
        >
          View Component →
        </Link>

        {/* Author info */}
        <p className="text-xs text-slate-500 mt-3">By {component.author}</p>
      </div>
    </motion.div>
  )
}


// Main Home Component
const Home: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const threeContainerRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 12

  // Anime.js SVG animations
  useEffect(() => {
    animate('.floating-shape', {
      translateY: ['-25px', '25px'],
      duration: 4000,
      easing: 'inOutQuad',       // note v4 changed easing names
      delay: stagger(300),
      direction: 'alternate',
      loop: true
    });
  }, []);

  // Load components
  useEffect(() => {
    const loadComponents = async () => {
      try {
        const listResponse = await fetch('/components-list.json')
        if (!listResponse.ok) throw new Error('Failed to load components list')
        const componentNames: string[] = await listResponse.json()

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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  }

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navbar */}
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/40 border-b border-slate-800/40"
      >
        <div className="mx-6 lg:mx-12 px-6 lg:px-8 mt-4 mb-4 rounded-2xl bg-gradient-to-r from-slate-900/60 to-slate-800/40 border border-slate-700/40 transition-all duration-300 hover:border-slate-700/60 hover:bg-gradient-to-r hover:from-slate-900/70 hover:to-slate-800/50">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/50">
                V
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Velvron
              </h1>
            </motion.div>
            <nav className="hidden md:flex space-x-1">
              {['About', 'Contribute'].map((item, i) => (
                <motion.a
                  key={i}
                  href={item === 'Contribute' ? 'https://github.com/evilshxt/uicomponents' : `#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with 3D Background */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative pt-32 pb-40"
      >
        <div ref={threeContainerRef} className="fixed inset-0 -z-10" />
        <ThreeScene containerRef={threeContainerRef} />

        {/* Floating SVG shapes with anime.js */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="floating-shape absolute top-20 left-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="url(#grad1)" strokeWidth="1.5" fill="none" />
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="floating-shape absolute bottom-32 right-16 w-40 h-40 opacity-15" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" stroke="#0ea5e9" strokeWidth="1" fill="none" />
          </svg>
          <svg className="floating-shape absolute top-1/2 right-12 w-48 h-48 opacity-10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#06b6d4" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#0ea5e9" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="15" stroke="#06b6d4" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
              Premium UI Components
            </span>
          </motion.h2>

          <motion.p
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Discover beautifully crafted, production-ready components built with React, Tailwind CSS, and cutting-edge web technologies. Copy, customize, and ship with confidence.
          </motion.p>

          <motion.div
            variants={buttonsVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#components"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg text-lg"
            >
              Explore Components
            </motion.a>
            <motion.a
              href="https://github.com/evilshxt/uicomponents"
              whileHover={{ scale: 1.05, borderColor: 'rgb(6, 182, 212)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-xl transition-all duration-300 text-lg backdrop-blur-sm"
            >
              Contribute
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Components Gallery */}
      <section id="components" className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-5xl font-black mb-3">Component Gallery</h3>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </motion.div>

        {/* Search and Controls */}
        <div className="mb-12 space-y-4 lg:space-y-0 lg:flex lg:justify-between lg:items-end gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
            />
            <svg className="absolute right-4 top-4 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value)
                setPage(1)
              }}
              className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 backdrop-blur-sm font-medium"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <div className="flex rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`px-5 py-3 font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                Grid
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`px-5 py-3 font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                List
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Components Grid/List */}
        <div className={viewMode === 'grid'
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {paginatedComponents.map((component, idx) => (
            <PremiumCard
              key={component.name}
              component={component}
              viewMode={viewMode}
              index={idx}
            />
          ))}
        </div>

        {paginatedComponents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-slate-400">No components found. Try a different search.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-2 bg-slate-800/30 p-2 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700/50 text-slate-300 font-semibold transition-all"
              >
                ← Prev
              </motion.button>

              <div className="flex gap-2 mx-4">
                {Array.from(
                  { length: Math.min(7, totalPages) },
                  (_, i) => {
                    if (totalPages <= 7) return i + 1
                    if (i < 3) return i + 1
                    if (i === 3) return page
                    return null
                  }
                ).filter(Boolean).map((pageNum) => (
                  <motion.button
                    key={pageNum}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPage(pageNum as number)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950'
                        : 'hover:bg-slate-700/50 text-slate-400'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700/50 text-slate-300 font-semibold transition-all"
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-4xl font-black mb-4">About Velvron Labs</h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Velvron Labs is a passionate team founded by <a href="https://elite-wednesday.vercel.app" className="text-cyan-400 hover:text-cyan-300 transition-colors">Wednesday</a>, dedicated to shipping innovative ideas and crafting cutting-edge UI components that empower developers worldwide.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-slate-800/40 mt-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

          <div className="pt-8 border-t border-slate-800/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              &copy; 2024 Velvron Components. Licensed under MIT. Built with ❤️
            </p>
            <div className="flex gap-6">
              <motion.a
                href="https://github.com/evilshxt/uicomponents"
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://velvron-labs.vercel.app"
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home