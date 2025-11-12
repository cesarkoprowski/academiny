import LoginDialog from "./login-dialog";
import RegisterDialog from "./register-dialog";

export function Header() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Academiny"
                width={140}
                height={35}
                className="h-8 w-auto"
              />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <LoginDialog btnLabel="Entrar" />
            <RegisterDialog btnLabel="Cadastrar" />
          </div>
        </div>
      </div>
    </nav>
  );
}
