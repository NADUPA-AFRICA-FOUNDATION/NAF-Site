// Simple file storage system that works without external dependencies
export interface StoredFile {
  id: string
  name: string
  size: number
  type: string
  data: string // base64 encoded
  uploadedAt: string
}

const STORAGE_KEY = "nadupa-documents"

export function storeFile(file: File): Promise<{ url: string; id: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const storedFile: StoredFile = {
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result as string,
          uploadedAt: new Date().toISOString(),
        }

        // Get existing files
        const existingFiles = getStoredFiles()
        existingFiles[id] = storedFile

        // Store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingFiles))

        resolve({
          url: `/api/files/${id}`,
          id,
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export function getStoredFiles(): Record<string, StoredFile> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function getStoredFile(id: string): StoredFile | null {
  const files = getStoredFiles()
  return files[id] || null
}

export function deleteStoredFile(id: string): boolean {
  try {
    const files = getStoredFiles()
    delete files[id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files))
    return true
  } catch {
    return false
  }
}
