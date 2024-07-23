export interface FileAndEntry {
  file: File
  entry: FileSystemFileEntry | null
  source: 'dnd' | 'input'
}

export interface UploadFileInfo {
  id: string
  name: string
  batchId?: string | null
  percentage?: number | null
  status: 'pending' | 'uploading' | 'finished' | 'removed' | 'error'
  url?: string | null
  file?: File | null
  thumbnailUrl?: string | null
  type?: string | null
  fullPath?: string | null
}

export type UploadSettledFileInfo = Required<UploadFileInfo>
