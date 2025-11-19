'use client'

import { Bell, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from '@/lib/auth'
import { useState } from 'react'
import { EditProfileDialog } from './edit-profile-dialog'
import Image from 'next/image'

export function NavHeader() {
  const { user, logout } = useAuth()
  const [showEditProfile, setShowEditProfile] = useState(false)

  return (
    <>
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/academiny-logo.png" 
                  alt="Academiny" 
                  width={160} 
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-foreground hover:text-primary">
                  Atividades
                </Link>
                <Link href="/progress" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Projetos
                </Link>
                <Link href="/history" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Histórico
                </Link>
                <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Painel Admin
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.nome || 'Usuário'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowEditProfile(true)} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Editar perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair da conta</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <EditProfileDialog 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile}
      />
    </>
  )
}
