import React from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

interface props {
  currentPage: number
  maxKnownPage: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, maxKnownPage, hasNextPage, onPageChange }: props) => {
  if (currentPage === 1 && !hasNextPage) return null

  const pages = Array.from({ length: maxKnownPage }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg border border-cream flex items-center justify-center text-neutral-500 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <IoChevronBack />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center ${
            page === currentPage ? 'bg-brand-600 text-white' : 'border border-cream text-neutral-600 hover:bg-surface'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="w-9 h-9 rounded-lg border border-cream flex items-center justify-center text-neutral-500 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <IoChevronForward />
      </button>
    </div>
  )
}

export default Pagination
