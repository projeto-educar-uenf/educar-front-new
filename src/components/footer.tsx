import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 md:py-6">
        <div className="flex items-center mb-6 md:mb-0">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="/uenf-logo.png"
              alt="UENF Logo"
              width={300}
              height={120}
              className="mr-4"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Mail className="h-4 w-4 mr-2" />
            <Link to="mailto:uenf@uenf.br" className="text-sm underline">
              uenf@uenf.br
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-sm">(22) 2739-7119 - Gerência de Comunicação</span>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Av. Alberto Lamego, 2000 - Parque Califórnia Campos dos Goytacazes - RJ CEP: 28013-602
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
