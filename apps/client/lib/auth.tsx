'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, getStudentInfo } from './api'

interface User {
  id: number
  nome: string
  email: string
  cpf?: string
  cursoId?: number
  matricula?: string
  role?: 'aluno' | 'professor' | 'coordenador' | 'admin'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user_data')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, senha: string) => {
    try {
      const response = await loginUser(email, senha)
      
      const authToken = response.token || response.accessToken
      setToken(authToken)
      localStorage.setItem('auth_token', authToken)

      try {
        const userInfo = await getStudentInfo(authToken)
        setUser(userInfo)
        localStorage.setItem('user_data', JSON.stringify(userInfo))
      } catch (error) {
        const basicUser = {
          id: response.userId || response.id,
          nome: response.nome || 'Usuário',
          email: email,
          role: response.role || 'aluno'
        }
        setUser(basicUser as User)
        localStorage.setItem('user_data', JSON.stringify(basicUser))
      }
    } catch (error) {
      console.error('[v0] Login error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    router.push('/login')
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user_data', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
