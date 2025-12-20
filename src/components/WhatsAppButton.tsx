import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";

interface WhatsAppButtonProps {
  text?: string;
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  showIcon?: boolean;
}

// Número real do WhatsApp
const WHATSAPP_NUMBER = "351243046828";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá 👋 Gostava de fazer um pedido.");

// Números de telefone reais
export const PHONE_NUMBER_1 = "243046828";
export const PHONE_NUMBER_2 = "914962991";
export const PHONE_DISPLAY_1 = "243 046 828";
export const PHONE_DISPLAY_2 = "914 962 991";

export const WhatsAppButton = ({ 
  text = "Encomendar via WhatsApp", 
  size = "default",
  className = "",
  showIcon = true
}: WhatsAppButtonProps) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <Button
      variant="whatsapp"
      size={size}
      className={className}
      asChild
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        {showIcon && <MessageCircle className="mr-1" />}
        {text}
      </a>
    </Button>
  );
};

interface PhoneButtonProps {
  text?: string;
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  phoneNumber?: string;
}

export const PhoneButton = ({ 
  text = `Ligar ${PHONE_DISPLAY_1}`, 
  size = "default",
  className = "",
  phoneNumber = PHONE_NUMBER_1
}: PhoneButtonProps) => {
  return (
    <Button
      variant="phone"
      size={size}
      className={className}
      asChild
    >
      <a href={`tel:+351${phoneNumber}`}>
        <Phone className="mr-1" />
        {text}
      </a>
    </Button>
  );
};

export const StickyWhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-accent-foreground shadow-lg transition-all duration-200 hover:scale-110 hover:bg-whatsapp-hover hover:shadow-xl md:h-16 md:w-16"
      aria-label="Encomendar via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
};
