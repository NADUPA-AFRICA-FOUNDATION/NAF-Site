"use client"

import { useEffect } from "react"

export function PDFLoadingHandler() {
  useEffect(() => {
    // Hide loading overlay after PDF loads
    const timer = setTimeout(() => {
      const loadingElement = document.getElementById("pdf-loading")
      if (loadingElement) {
        loadingElement.style.display = "none"
      }
    }, 3000) // Hide after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return null
}
