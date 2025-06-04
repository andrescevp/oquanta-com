import clsx from 'clsx'
import { Download, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

// Polyfill for Promise.withResolvers
const ensurePromiseWithResolvers = () => {
  if (typeof Promise.withResolvers !== 'function') {
    Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }
}

export function PDFViewer({ pdfUrl, title }: { pdfUrl: string; title?: string }) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [Component, setComponent] = useState<React.FC | null>(null)

  // Only import and initialize react-pdf on the client side
  useEffect(() => {
    let isMounted = true

    const loadPdf = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Add Promise.withResolvers polyfill before importing PDF.js
          ensurePromiseWithResolvers()
          // Dynamically import react-pdf components
          const { Document, Page, pdfjs } = await import('react-pdf')

          // Set the worker source
          pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

          if (isMounted) {
            // Create a component that uses Document and Page
            setComponent(() => {
              const PDFComponent = () => (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => {
                    setNumPages(numPages)
                    setLoading(false)
                  }}
                  onLoadError={() => setLoading(false)}
                  loading={null}
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-lg"
                    scale={1}
                  />
                </Document>
              )
              return PDFComponent
            })
          }
        } catch (error) {
          console.error('Failed to load PDF viewer:', error)
          if (isMounted) setLoading(false)
        }
      }
    }

    loadPdf()

    return () => {
      isMounted = false
    }
  }, [pdfUrl, pageNumber])

  const nextPage = () => {
    if (!numPages) return
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = title || 'document.pdf'
    link.click()
  }

  const openInNewTab = () => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* PDF Viewer Card */}
      <div className="backdrop-blur-sm bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-800/30 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-4 md:p-6">
        {/* Title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
            {title || 'Document Preview'}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={openInNewTab}
              className="flex items-center justify-center py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 ease-in-out"
              aria-label="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-pumpkin-orange to-pumpkin-orange/80 text-white font-medium shadow-lg shadow-pumpkin-orange/20 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
              aria-label="Download PDF"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* PDF Document Viewer */}
        <div className="relative min-h-[400px] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-800/80 z-10">
              <div className="h-8 w-8 border-4 border-pumpkin-orange/30 border-t-pumpkin-orange rounded-full animate-spin"></div>
            </div>
          )}

          {Component && <Component />}

          {!loading && numPages === 0 && (
            <div className="text-center p-6">
              <p className="text-gray-600 dark:text-gray-400">Unable to load PDF</p>
            </div>
          )}
        </div>

        {/* Page Navigation Controls */}
        {numPages && numPages > 1 && (
          <div className="flex items-center justify-center mt-4 space-x-4">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className={clsx(
                'p-2 rounded-xl transition-all duration-200 ease-in-out',
                pageNumber <= 1
                  ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {pageNumber} of {numPages}
            </span>

            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className={clsx(
                'p-2 rounded-xl transition-all duration-200 ease-in-out',
                pageNumber >= numPages
                  ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              )}
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
