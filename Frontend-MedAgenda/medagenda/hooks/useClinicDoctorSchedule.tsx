"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AppointmentSlot } from "../interfaces/appointment";
import { ClinicSchedule } from "../interfaces/clinicSchedule";
import { getClinicDoctorAppointmentsForDay, getClinicScheduleRules } from "../libs/clinicsService";
import { scheduleAppointment } from "../libs/appointmentService";

type MonthOption = { key: string; label: string; date: Date };
type DayOption = { key: string; label: string; weekLabel: string; date: Date };
type SlotStatus = "available" | "booked" | "break" | "past";

export type SlotView = {
  id: string;
  start: Date;
  end: Date;
  label: string;
  status: SlotStatus;
  note?: string;
};

const MONTHS_TO_RENDER = 5;
const MONTH_LABELS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const WEEKDAY_SHORT = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const WEEKDAY_LABELS = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

const pad = (num: number) => num.toString().padStart(2, "0");

const formatDateParam = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseTimeToMinutes = (value?: string | null): number | null => {
  if (value === undefined || value === null) return null;
  const clean = String(value).trim();

  // ISO-like time (e.g., 1970-01-01T08:00:00.000Z)
  if (clean.includes("T") || clean.includes("-")) {
    const d = new Date(clean);
    if (!Number.isNaN(d.getTime())) return d.getUTCHours() * 60 + d.getUTCMinutes();
  }

  const parts = clean.split(":").map((p) => Number(p));
  if (parts.length === 1 && Number.isFinite(parts[0])) return parts[0]; // already minutes
  if (parts.length === 0 || parts.some((p) => Number.isNaN(p))) return null;
  const [hours = 0, minutes = 0, seconds = 0] = parts;
  return hours * 60 + minutes + Math.floor(seconds / 60);
};

const minutesBetween = (base: Date, target: Date) =>
  Math.floor((target.getTime() - base.getTime()) / 60000);

const formatRangeLabel = (startMin: number, endMin: number) => {
  const startLabel = `${pad(Math.floor(startMin / 60))}:${pad(startMin % 60)}`;
  const endLabel = `${pad(Math.floor(endMin / 60))}:${pad(endMin % 60)}`;
  return `${startLabel} - ${endLabel}`;
};

const formatRuleTime = (value?: string | null) => {
  if (!value) return "--";
  const [h = "", m = ""] = value.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const formatRuleDuration = (value?: string | null) => {
  const total = parseTimeToMinutes(value);
  if (total === null) return "--";
  return `${total} min`;
};

const formatDisplayDate = (date: Date) =>
  `${WEEKDAY_LABELS[date.getDay()]}, ${date.getDate()} ${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;

const buildMonths = (): MonthOption[] => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const months: MonthOption[] = [];

  for (let i = 0; i < MONTHS_TO_RENDER; i += 1) {
    const date = new Date(y, m + i, 1);
    const label = `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
    months.push({ key: `${date.getFullYear()}-${date.getMonth()}`, label, date });
  }

  return months;
};

const buildDaysForMonth = (month: MonthOption): DayOption[] => {
  const now = new Date();
  const year = month.date.getFullYear();
  const monthIndex = month.date.getMonth();
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();

  const startingDay = now.getFullYear() === year && now.getMonth() === monthIndex ? now.getDate() : 1;
  const days: DayOption[] = [];

  for (let day = startingDay; day <= lastDay; day += 1) {
    const date = new Date(year, monthIndex, day);
    const weekLabel = WEEKDAY_SHORT[date.getDay()];
    days.push({
      key: formatDateParam(date),
      label: `${day}`,
      weekLabel,
      date,
    });
  }

  return days;
};

const normalizeAppointments = (appointments: AppointmentSlot[], fallbackMinutes: number, dayStart: Date) =>
  appointments
    .map((appt) => {
      const start = new Date(appt.start_date_time);
      const end = appt.end_date_time ? new Date(appt.end_date_time) : null;
      if (Number.isNaN(start.getTime())) return null;
      const endDate =
        end && !Number.isNaN(end.getTime()) ? end : new Date(start.getTime() + fallbackMinutes * 60000);
      return {
        startMin: minutesBetween(dayStart, start),
        endMin: minutesBetween(dayStart, endDate),
      };
    })
    .filter((x): x is { startMin: number; endMin: number } => !!x);

const buildSlots = (
  date: Date,
  rules: ClinicSchedule,
  appointments: AppointmentSlot[],
): SlotView[] => {
  const opening = parseTimeToMinutes(rules.clinic_opening_time);
  const closing = parseTimeToMinutes(rules.clinic_close_time);
  const slotMinutes = parseTimeToMinutes(rules.clinic_average_appointment_time) ?? 30;
  const breakStart = parseTimeToMinutes(rules.clinic_break_time);
  const breakDuration = parseTimeToMinutes(rules.clinic_break_duration);

  if (opening === null || closing === null || slotMinutes <= 0 || opening >= closing) return [];

  const breakEnd = breakStart !== null && breakDuration !== null ? breakStart + breakDuration : null;
  const dateParam = formatDateParam(date);
  const dayStart = new Date(`${dateParam}T00:00:00-05:00`);
  const now = new Date();
  const normalizedAppointments = normalizeAppointments(appointments, slotMinutes, dayStart);

  const slots: SlotView[] = [];
  for (let startMin = opening; startMin + slotMinutes <= closing; startMin += slotMinutes) {
    const endMin = startMin + slotMinutes;
    const startDate = new Date(dayStart.getTime() + startMin * 60000);
    const endDate = new Date(dayStart.getTime() + endMin * 60000);

    const overlapsBreak = breakEnd !== null && breakStart !== null && startMin < breakEnd && endMin > breakStart;
    const overlapsAppointment = normalizedAppointments.some((appt) => startMin < appt.endMin && endMin > appt.startMin);
    const isPast = startDate < now;

    let status: SlotStatus = "available";
    let note: string | undefined;

    if (overlapsAppointment) {
      status = "booked";
      note = "Ya reservado";
    } else if (overlapsBreak) {
      status = "break";
      note = "Horario no disponible (descanso)";
    } else if (isPast) {
      status = "past";
      note = "Hora pasada";
    }

    slots.push({
      id: startDate.toISOString(),
      start: startDate,
      end: endDate,
      label: formatRangeLabel(startMin, endMin),
      status,
      note,
    });
  }

  return slots;
};

export function useClinicDoctorSchedule(clinicId: number, doctorId: number) {
  const [rules, setRules] = useState<ClinicSchedule | null>(null);
  const [rulesError, setRulesError] = useState<string | null>(null);
  const [loadingRules, setLoadingRules] = useState(false);

  const [slots, setSlots] = useState<SlotView[]>([]);
  const [dayError, setDayError] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState<string | null>(null);
  const [scheduling, setScheduling] = useState(false);

  const months = useMemo(() => buildMonths(), []);
  const [selectedMonthKey, setSelectedMonthKey] = useState<string | null>(months[0]?.key ?? null);
  const activeMonth = useMemo(
    () => months.find((m) => m.key === selectedMonthKey) ?? months[0] ?? null,
    [months, selectedMonthKey],
  );

  const days = useMemo(() => (activeMonth ? buildDaysForMonth(activeMonth) : []), [activeMonth]);
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(days[0]?.key ?? null);

  useEffect(() => {
    if (days.length === 0) {
      setSelectedDayKey(null);
      return;
    }
    if (!selectedDayKey || !days.some((d) => d.key === selectedDayKey)) {
      setSelectedDayKey(days[0].key);
    }
  }, [days, selectedDayKey]);

  const selectedDate = useMemo(
    () => days.find((d) => d.key === selectedDayKey)?.date ?? null,
    [days, selectedDayKey],
  );

  const selectedDayLabel = useMemo(
    () => (selectedDate ? formatDisplayDate(selectedDate) : "Elige un dia"),
    [selectedDate],
  );

  const ruleSummary = useMemo(
    () => ({
      opening: formatRuleTime(rules?.clinic_opening_time),
      closing: formatRuleTime(rules?.clinic_close_time),
      breakTime: formatRuleTime(rules?.clinic_break_time),
      breakDuration: formatRuleDuration(rules?.clinic_break_duration),
      slotDuration: formatRuleDuration(rules?.clinic_average_appointment_time),
    }),
    [rules],
  );

  useEffect(() => {
    let active = true;
    const fetchRules = async () => {
      if (!Number.isFinite(clinicId) || !Number.isFinite(doctorId)) {
        setRulesError("Ruta invalida para agendar.");
        return;
      }
      setLoadingRules(true);
      setRulesError(null);
      try {
        const data = await getClinicScheduleRules(clinicId);
        if (!active) return;
        setRules(data);
      } catch (err: any) {
        if (!active) return;
        setRulesError(err?.message ?? "No se pudo cargar el horario de la clinica.");
      } finally {
        if (!active) return;
        setLoadingRules(false);
      }
    };

    fetchRules();
    return () => {
      active = false;
    };
  }, [clinicId, doctorId]);

  const refreshDay = useCallback(
    async (explicitDate?: Date) => {
      if (!rules || !Number.isFinite(clinicId) || !Number.isFinite(doctorId)) return;
      const date = explicitDate ?? selectedDate;
      if (!date) return;

      setLoadingSlots(true);
      setDayError(null);
      setSelectedSlotId(null);

      try {
        const appointments = await getClinicDoctorAppointmentsForDay(
          clinicId,
          doctorId,
          formatDateParam(date),
        );
        setSlots(buildSlots(date, rules, appointments ?? []));
      } catch (err: any) {
        setSlots([]);
        setDayError(err?.message ?? "No se pudo cargar la disponibilidad para este dia.");
      } finally {
        setLoadingSlots(false);
      }
    },
    [clinicId, doctorId, rules, selectedDate],
  );

  useEffect(() => {
    if (rules && selectedDate) {
      refreshDay(selectedDate);
    }
  }, [rules, selectedDate, refreshDay]);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId && s.status === "available") ?? null,
    [slots, selectedSlotId],
  );

  const onSelectMonth = (key: string) => {
    setSelectedMonthKey(key);
    setSelectedSlotId(null);
  };

  const onSelectDay = (key: string) => {
    setSelectedDayKey(key);
    setSelectedSlotId(null);
    setScheduleSuccess(null);
    setScheduleError(null);
  };

  const onSelectSlot = (slotId: string) => {
    const slot = slots.find((s) => s.id === slotId && s.status === "available");
    setSelectedSlotId(slot ? slot.id : null);
    setScheduleSuccess(null);
    setScheduleError(null);
  };

  const schedule = useCallback(async () => {
    if (!selectedSlot || !rules) return;
    setScheduling(true);
    setScheduleError(null);
    setScheduleSuccess(null);
    try {
      await scheduleAppointment({
        clinic_id: clinicId,
        doctor_id: doctorId,
        start_date_time: selectedSlot.start,
        end_date_time: selectedSlot.end,
        appointment_description: note.trim() || undefined,
      });
      setScheduleSuccess("Cita agendada con exito.");
      setNote("");
      await refreshDay(selectedSlot.start);
    } catch (err: any) {
      const msg = err?.message ?? "No se pudo agendar la cita.";
      let friendly = msg;

      if (/409|Conflict/i.test(msg)) {
        friendly = "Ya existe una cita en ese horario para este doctor.";
      }
      if (/This doctor is not available at the specified time range/i.test(msg)) {
        friendly = "El doctor no tiene disponibilidad en ese rango.";
      }
      if (/This clinic is not available at the specified time range/i.test(msg)) {
        friendly = "La clinica no atiende en ese rango.";
      }

      setScheduleError(friendly);
    } finally {
      setScheduling(false);
    }
  }, [clinicId, doctorId, note, refreshDay, rules, selectedSlot]);

  return {
    rules,
    rulesError,
    loadingRules,
    months,
    selectedMonthKey,
    onSelectMonth,
    days,
    selectedDayKey,
    onSelectDay,
    selectedDate,
    slots,
    loadingSlots,
    dayError,
    selectedSlotId,
    onSelectSlot,
    note,
    setNote,
    schedule,
    scheduling,
    canSchedule: !!selectedSlot && !scheduling,
    scheduleError,
    scheduleSuccess,
    refreshDay,
    selectedDayLabel,
    ruleSummary,
  };
}
