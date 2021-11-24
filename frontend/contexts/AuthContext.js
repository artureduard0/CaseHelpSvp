import { createContext, useState, useEffect } from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import api from '../services/api.js'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const { 'casehelpsvp.token': token } = parseCookies()
    const { 'casehelpsvp.name': name } = parseCookies()

    if (token) {
      setIsAuthenticated(true)
      setUser({ name })
    } else {
      setIsAuthenticated(false)
      Router.push('/')
    }
  }, [])

  async function signIn(email, password) {
    let res = {}
    let err = false

    try {
      res = await api.post('/usuarios/entrar', { email, password })
    } catch (error) {
      if (error.response) return error.response.data.msg
      err = true
    }

    if (!err) {
      const token = res.data.token
      const name = res.data.nome
      setCookie(undefined, 'casehelpsvp.token', token, {
        maxAge: 60 * 30, // 30min
      })

      setCookie(undefined, 'casehelpsvp.name', name, {
        maxAge: 60 * 30, // 30min
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      setUser({ name })
      setIsAuthenticated(true)

      Router.push('/dashboard')
    }
  }

  function signOut() {
    setIsAuthenticated(false)
    destroyCookie(undefined, 'casehelpsvp.token')
    destroyCookie(undefined, 'casehelpsvp.name')
    Router.push('/')
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>
}
