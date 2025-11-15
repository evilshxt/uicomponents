import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  tags: string[];
  author: string;
  languages: string[];
  dependencies: string[];
}

interface PremiumCardProps {
  component: ComponentInfo;
  viewMode: 'grid' | 'list';
  index: number;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ component, viewMode, index }) => {
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

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15 },
    transition: { duration: 0.5 }
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
      layout
    >
      {/* Glowing border effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 pointer-events-none"
        />
      )}

      {/* Grid view image section */}
      {viewMode === 'grid' && (
        <motion.div
          className="relative h-40 overflow-hidden bg-slate-900/50"
          whileHover="hover"
          initial="initial"
          variants={imageVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80 z-20 group-hover:from-slate-900/20 group-hover:via-slate-900/40 transition-all duration-300" />
          
          <motion.img
            src={`/library/${component.name}/thumbnail.jpg`}
            alt={`${component.name} preview`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)'
              }
            }}
            animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay glow on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent z-10"
            />
          )}
        </motion.div>
      )}

      {/* List view thumbnail */}
      {viewMode === 'list' && (
        <motion.div
          className="w-24 h-24 flex-shrink-0 overflow-hidden bg-slate-900/50"
          whileHover="hover"
          initial="initial"
          variants={imageVariants}
        >
          <img
            src={`/library/${component.name}/thumbnail.jpg`}
            alt={component.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </motion.div>
      )}

      {/* Content section */}
      <div className={viewMode === 'list' ? 'flex-1 p-5' : 'p-6'}>
        {/* Header with title and category badge */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <motion.h4
            className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200 flex-1"
            whileHover={{ x: 4 }}
          >
            {component.name}
          </motion.h4>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 font-medium whitespace-nowrap"
          >
            {component.category}
          </motion.span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {component.description}
        </p>

        {/* Tags with improved styling and hover effects */}
        <div className="flex flex-wrap gap-2 mb-5">
          {component.tags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-700/40 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-200 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
          {component.tags.length > 3 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-xs px-2.5 py-1 text-slate-500 font-medium"
            >
              +{component.tags.length - 3} more
            </motion.span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/components/${component.name}`}
          className="block w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 20px -10px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-semibold rounded-lg transition-all duration-300 text-sm"
          >
            View Component →
          </motion.button>
        </Link>

        {/* Author info with subtle styling */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-slate-500 mt-3 font-medium"
        >
          By <span className="text-slate-400">{component.author}</span>
        </motion.p>
      </div>

      {/* Background accent on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none rounded-full blur-3xl"
        />
      )}
    </motion.div>
  )
}

export default PremiumCard