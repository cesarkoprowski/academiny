import { Button } from "@/components/ui/button";
import {
  Home,
  FolderOpen,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Academiny"
                width={140}
                height={35}
                className="h-8 w-auto"
              />
            </a>

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700"
              >
                <a href="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Início
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700"
              >
                <a href="/projetos">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Meus Projetos
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e89b3c] rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="/placeholder.svg?height=36&width=36"
                      alt="User"
                    />
                    <AvatarFallback className="bg-[#7dd3c0] text-[#1e3a5f]">
                      JS
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      João Silva
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      joao@email.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/perfil">
                    <User className="mr-2 h-4 w-4" />
                    Meu Perfil
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/projetos">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Meus Projetos
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
