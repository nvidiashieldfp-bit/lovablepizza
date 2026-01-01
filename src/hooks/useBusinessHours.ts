import { useState, useEffect, useMemo } from "react";

// Feriados portugueses fixos (dia/mês)
const FIXED_HOLIDAYS = [
  { day: 1, month: 1, name: "Ano Novo" },
  { day: 25, month: 4, name: "Dia da Liberdade" },
  { day: 1, month: 5, name: "Dia do Trabalhador" },
  { day: 10, month: 6, name: "Dia de Portugal" },
  { day: 15, month: 8, name: "Assunção de Nossa Senhora" },
  { day: 5, month: 10, name: "Implantação da República" },
  { day: 1, month: 11, name: "Todos os Santos" },
  { day: 1, month: 12, name: "Restauração da Independência" },
  { day: 8, month: 12, name: "Imaculada Conceição" },
  { day: 25, month: 12, name: "Natal" },
];

// Feriados móveis - calculados anualmente
function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getMovableHolidays(year: number): { date: Date; name: string }[] {
  const easter = getEasterDate(year);
  
  // Sexta-feira Santa (2 dias antes da Páscoa)
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  
  // Páscoa
  const easterSunday = new Date(easter);
  
  // Corpo de Deus (60 dias após Páscoa)
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(easter.getDate() + 60);
  
  return [
    { date: goodFriday, name: "Sexta-feira Santa" },
    { date: easterSunday, name: "Páscoa" },
    { date: corpusChristi, name: "Corpo de Deus" },
  ];
}

export interface ClosedDay {
  date: Date;
  reason: string;
}

export interface BusinessHoursState {
  isOpen: boolean;
  isClosingSoon: boolean;
  isClosingVeryLate: boolean;
  statusMessage: string;
  buttonVariant: "whatsapp" | "whatsapp-closing";
  currentTime: Date;
  isHoliday: boolean;
  holidayName?: string;
  closedDays: ClosedDay[];
  addClosedDay: (date: Date, reason: string) => void;
  removeClosedDay: (date: Date) => void;
  isDateClosed: (date: Date) => boolean;
}

// Horários de funcionamento: 12:00-15:00 e 19:00-23:30
const LUNCH_OPEN = 12;
const LUNCH_CLOSE = 15;
const DINNER_OPEN = 19;
const DINNER_CLOSE_HOUR = 23;
const DINNER_CLOSE_MINUTES = 30;
const CLOSING_WARNING_MINUTES = 30;

export function useBusinessHours(): BusinessHoursState {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [closedDays, setClosedDays] = useState<ClosedDay[]>(() => {
    const saved = localStorage.getItem("pizzaburguer-closed-days");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((d: { date: string; reason: string }) => ({
        date: new Date(d.date),
        reason: d.reason,
      }));
    }
    return [];
  });

  // Atualizar tempo a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Salvar dias fechados no localStorage
  useEffect(() => {
    localStorage.setItem(
      "pizzaburguer-closed-days",
      JSON.stringify(closedDays.map((d) => ({ date: d.date.toISOString(), reason: d.reason })))
    );
  }, [closedDays]);

  // Calcular feriados do ano atual
  const holidays = useMemo(() => {
    const year = currentTime.getFullYear();
    const fixedDates = FIXED_HOLIDAYS.map((h) => ({
      date: new Date(year, h.month - 1, h.day),
      name: h.name,
    }));
    const movable = getMovableHolidays(year);
    return [...fixedDates, ...movable];
  }, [currentTime.getFullYear()]);

  // Verificar se hoje é feriado
  const todayHoliday = useMemo(() => {
    const today = currentTime;
    return holidays.find(
      (h) =>
        h.date.getDate() === today.getDate() &&
        h.date.getMonth() === today.getMonth()
    );
  }, [currentTime, holidays]);

  const isHoliday = !!todayHoliday;
  const holidayName = todayHoliday?.name;

  // Verificar se uma data está nos dias fechados
  const isDateClosed = (date: Date): boolean => {
    return closedDays.some(
      (d) =>
        d.date.getDate() === date.getDate() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getFullYear() === date.getFullYear()
    );
  };

  // Adicionar dia fechado
  const addClosedDay = (date: Date, reason: string) => {
    if (!isDateClosed(date)) {
      setClosedDays((prev) => [...prev, { date, reason }]);
    }
  };

  // Remover dia fechado
  const removeClosedDay = (date: Date) => {
    setClosedDays((prev) =>
      prev.filter(
        (d) =>
          !(
            d.date.getDate() === date.getDate() &&
            d.date.getMonth() === date.getMonth() &&
            d.date.getFullYear() === date.getFullYear()
          )
      )
    );
  };

  // Calcular estado do horário
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const lunchOpenMinutes = LUNCH_OPEN * 60;
  const lunchCloseMinutes = LUNCH_CLOSE * 60;
  const dinnerOpenMinutes = DINNER_OPEN * 60;
  const dinnerCloseMinutes = DINNER_CLOSE_HOUR * 60 + DINNER_CLOSE_MINUTES; // 23:30 = 1410 min

  // Verificar se está aberto
  const isInLunchHours = totalMinutes >= lunchOpenMinutes && totalMinutes < lunchCloseMinutes;
  const isInDinnerHours = totalMinutes >= dinnerOpenMinutes && totalMinutes < dinnerCloseMinutes;
  const isOpen = isInLunchHours || isInDinnerHours;

  // Verificar se está quase a fechar (últimos 30 minutos)
  const isLunchClosingSoon = totalMinutes >= (lunchCloseMinutes - CLOSING_WARNING_MINUTES) && totalMinutes < lunchCloseMinutes;
  const isDinnerClosingSoon = totalMinutes >= (dinnerCloseMinutes - CLOSING_WARNING_MINUTES) && totalMinutes < dinnerCloseMinutes;
  const isClosingSoon = isLunchClosingSoon || isDinnerClosingSoon;

  // Verificar se está após as 23h (botão laranja)
  const isClosingVeryLate = hours >= 23;

  // Determinar variante do botão
  const buttonVariant: "whatsapp" | "whatsapp-closing" = isClosingVeryLate ? "whatsapp-closing" : "whatsapp";

  // Determinar mensagem de status
  let statusMessage = "Encomendar via WhatsApp";

  if (isDateClosed(currentTime)) {
    const closedInfo = closedDays.find(
      (d) =>
        d.date.getDate() === currentTime.getDate() &&
        d.date.getMonth() === currentTime.getMonth()
    );
    statusMessage = closedInfo?.reason || "Fechado hoje";
  } else if (isHoliday) {
    statusMessage = `🎉 ${holidayName} - Verifique horário`;
  } else if (isClosingVeryLate) {
    statusMessage = "⚠️ Estamos a fechar!";
  } else if (isClosingSoon) {
    const minutesLeft = isLunchClosingSoon 
      ? lunchCloseMinutes - totalMinutes 
      : dinnerCloseMinutes - totalMinutes;
    statusMessage = `⏰ Fechamos em ${minutesLeft} min!`;
  } else if (isOpen) {
    statusMessage = "✅ Estamos abertos!";
  } else if (hours < LUNCH_OPEN) {
    statusMessage = `Abrimos às ${LUNCH_OPEN}h`;
  } else if (hours >= LUNCH_CLOSE && hours < DINNER_OPEN) {
    statusMessage = `Reabrimos às ${DINNER_OPEN}h`;
  } else {
    statusMessage = `Abrimos às ${LUNCH_OPEN}h`;
  }

  return {
    isOpen,
    isClosingSoon,
    isClosingVeryLate,
    statusMessage,
    buttonVariant,
    currentTime,
    isHoliday,
    holidayName,
    closedDays,
    addClosedDay,
    removeClosedDay,
    isDateClosed,
  };
}
