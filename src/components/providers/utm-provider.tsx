"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface UtmData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

interface UtmContextType {
  utmData: UtmData
  appendUtmParams: (url: string) => string
}

const UtmContext = createContext<UtmContextType>({
  utmData: {},
  appendUtmParams: (url) => url,
})

const STORAGE_KEY = 'miracle_utm_tracking'

export function UtmProvider({ children }: { children: React.ReactNode }) {
  const [utmData, setUtmData] = useState<UtmData>({})

  useEffect(() => {
    try {
      // 1. Check current URL for UTM parameters
      const urlParams = new URLSearchParams(window.location.search)
      const currentUtm: UtmData = {}
      const keys: (keyof UtmData)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

      let hasCurrentUtm = false
      keys.forEach((key) => {
        const val = urlParams.get(key)
        if (val) {
          currentUtm[key] = val
          hasCurrentUtm = true
        }
      })

      if (hasCurrentUtm) {
        // Store in session storage so it persists through user journey
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentUtm))
        setUtmData(currentUtm)
      } else {
        // Fallback to existing session storage
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (saved) {
          setUtmData(JSON.parse(saved))
        }
      }
    } catch {
      // Session storage unavailable or in incognito mode
    }
  }, [])

  const appendUtmParams = (url: string): string => {
    if (!url || Object.keys(utmData).length === 0) return url

    try {
      // Don't modify mailto:, tel:, or anchor links
      if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return url
      }

      const isRelative = url.startsWith('/')
      const fullUrl = isRelative ? `https://miracle.dev${url}` : url
      const parsed = new URL(fullUrl)

      Object.entries(utmData).forEach(([key, val]) => {
        if (val && !parsed.searchParams.has(key)) {
          parsed.searchParams.set(key, val)
        }
      })

      return isRelative ? `${parsed.pathname}${parsed.search}${parsed.hash}` : parsed.toString()
    } catch {
      return url
    }
  }

  return (
    <UtmContext.Provider value={{ utmData, appendUtmParams }}>
      {children}
    </UtmContext.Provider>
  )
}

export function useUtm() {
  return useContext(UtmContext)
}
