import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Chat Flow.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative hidden lg:block">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center space-y-6 max-w-md text-white">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <h2 className="text-2xl font-bold mb-4">
                Content de vous revoir
              </h2>
              <p className="leading-relaxed">
                Accédez à votre tableau de bord et poursuivez votre aventure avec nous. 
                Nous sommes ravis de vous revoir !
              </p>
            </div>
            <div className="flex justify-center gap-4 text-sm text-white/80">
              <div className="text-center">
                <div className="font-semibold text-white">99.9%</div>
                <div>Disponibilité</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-white">24/7</div>
                <div>Support</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-white">Sécurisé</div>
                <div>Données</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}