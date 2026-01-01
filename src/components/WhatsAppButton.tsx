import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useBusinessHours } from "@/hooks/useBusinessHours";

interface WhatsAppButtonProps {
  text?: string;
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  showIcon?: boolean;
  showStatus?: boolean;
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
  text, 
  size = "default",
  className = "",
  showIcon = true,
  showStatus = true
}: WhatsAppButtonProps) => {
  const { statusMessage, countdownMessage, buttonVariant, isClosingVeryLate, isClosed } = useBusinessHours();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  // Prioridade: contagem regressiva > status > texto personalizado
  let displayText = text || "Encomendar via WhatsApp";
  if (showStatus) {
    displayText = isClosingVeryLate && countdownMessage ? countdownMessage : statusMessage;
  }

  return (
    <Button
      variant={buttonVariant}
      size={size}
      className={`${className} ${isClosingVeryLate ? 'animate-pulse' : ''}`}
      disabled={isClosed}
      asChild={!isClosed}
    >
      {isClosed ? (
        <span className="flex items-center">
          {showIcon && <MessageCircle className="mr-1" />}
          {displayText}
        </span>
      ) : (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          {showIcon && <MessageCircle className="mr-1" />}
          {displayText}
        </a>
      )}
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
  const { isClosingVeryLate, countdownMessage, isClosed } = useBusinessHours();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  if (isClosed) return null;

  const bgClass = isClosingVeryLate 
    ? "bg-whatsapp-closing hover:bg-whatsapp-closing-hover" 
    : "bg-whatsapp hover:bg-whatsapp-hover";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Countdown badge */}
      {isClosingVeryLate && countdownMessage && (
        <div className="bg-whatsapp-closing text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          ⏰ {countdownMessage}
        </div>
      )}
      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex h-14 w-14 items-center justify-center rounded-full text-accent-foreground shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl md:h-16 md:w-16 ${bgClass} ${isClosingVeryLate ? 'animate-pulse' : ''}`}
        aria-label="Encomendar via WhatsApp"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      </a>
    </div>
  );
};
