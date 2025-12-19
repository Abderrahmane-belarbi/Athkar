export interface AthkarPhrase {
  id: string
  arabic: string
  transliteration: string
  translation: {
    en: string
    fr: string
  }
  count: number
  currentCount?: number
}

export interface Athkar {
  id: string
  title: {
    ar: string
    en: string
    fr: string
  }
  category: string
  phrases: AthkarPhrase[]
  reference?: string
}
