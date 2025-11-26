import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-16 mb-8">
          <div className="flex-1 flex justify-start">
            <img
              src="/logo.png"
              alt="Academiny"
              width={160}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          <div className="flex-1 flex justify-center gap-6">
            <a
              href="#"
              className="text-gray-300 hover:text-[#7dd3c0] transition-colors"
            >
              Sobre nós
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#7dd3c0] transition-colors"
            >
              Contato
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#7dd3c0] transition-colors"
            >
              Termos de uso
            </a>
          </div>

          <div className="flex-1 flex justify-end gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#7dd3c0] transition-colors flex items-center justify-center"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#7dd3c0] transition-colors flex items-center justify-center"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#7dd3c0] transition-colors flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#7dd3c0] transition-colors flex items-center justify-center"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Academiny. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
