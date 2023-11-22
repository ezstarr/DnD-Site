"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const [ mounted, setMounted ] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEfect mounts this component so that it is able to access 
  // the theme/state from the server before running
  useEffect(() => { // currently not mounted
    setMounted(true) // changing mounted state re-renders the component
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('pink')}>Pink Mode</button>
    </div>
  )
}

export default ThemeChanger