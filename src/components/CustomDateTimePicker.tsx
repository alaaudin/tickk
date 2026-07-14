import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CustomDateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomDateTimePicker({ value, onChange }: CustomDateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse initial value or use current date
  const initialDate = value ? new Date(value) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  
  const [hours, setHours] = useState(value ? initialDate.getHours() % 12 || 12 : 12);
  const [minutes, setMinutes] = useState(value ? initialDate.getMinutes() : 0);
  const [isPM, setIsPM] = useState(value ? initialDate.getHours() >= 12 : true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    updateValue(newDate, hours, minutes, isPM);
  };

  const updateValue = (date: Date | null, h: number, m: number, pm: boolean) => {
    if (!date) return;
    const newDate = new Date(date);
    let hour24 = h;
    if (pm && h !== 12) hour24 += 12;
    if (!pm && h === 12) hour24 = 0;
    
    newDate.setHours(hour24);
    newDate.setMinutes(m);
    
    // Format to YYYY-MM-DDTHH:mm
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hrs = String(newDate.getHours()).padStart(2, '0');
    const mins = String(newDate.getMinutes()).padStart(2, '0');
    
    onChange(`${year}-${month}-${day}T${hrs}:${mins}`);
  };

  const handleTimeChange = (type: 'h' | 'm' | 'ampm', val: number | boolean) => {
    let newH = hours;
    let newM = minutes;
    let newPM = isPM;
    
    if (type === 'h') { newH = val as number; setHours(newH); }
    if (type === 'm') { newM = val as number; setMinutes(newM); }
    if (type === 'ampm') { newPM = val as boolean; setIsPM(newPM); }
    
    updateValue(selectedDate, newH, newM, newPM);
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const formatDisplayValue = () => {
    if (!value) return "Select schedule time";
    const d = new Date(value);
    return d.toLocaleString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true 
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200/50 dark:border-zinc-800/50 rounded-xl px-4 py-2.5 text-sm text-neutral-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-white/50 w-[240px] text-left transition-all hover:bg-white/30 dark:hover:bg-zinc-800/40 shadow-sm"
      >
        <span className="truncate font-medium">{formatDisplayValue()}</span>
        <Calendar className="w-4 h-4 text-neutral-500 dark:text-zinc-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full mt-3 left-0 z-50 p-5 rounded-2xl border border-white/40 dark:border-zinc-700/50 bg-[#0c0c0e]/70 backdrop-blur-md border-white/20 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)] w-[340px] font-outfit"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} className="p-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-neutral-700 dark:text-zinc-300 transition-colors border border-white/20 dark:border-zinc-800/50 shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-[15px] font-bold text-neutral-900 dark:text-zinc-50 tracking-tight">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={nextMonth} className="p-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-neutral-700 dark:text-zinc-300 transition-colors border border-white/20 dark:border-zinc-800/50 shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 mb-5">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 py-1">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth() && selectedDate?.getFullYear() === currentMonth.getFullYear();
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear();
                
                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`h-9 w-9 mx-auto rounded-full text-[13px] font-outfit flex items-center justify-center transition-all duration-200 ${
                      isSelected 
                        ? 'bg-white dark:bg-white dark:bg-white dark:bg-white text-white shadow-lg shadow-white/20 font-bold scale-110' 
                        : isToday
                          ? 'bg-white/50 dark:bg-white/10 text-neutral-900 dark:text-white font-bold hover:bg-white/80 dark:hover:bg-white/20 border border-white/30'
                          : 'text-neutral-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-white/10 font-medium'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Picker */}
            <div className="pt-5 border-t border-neutral-200/40 dark:border-zinc-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-zinc-400">
                <Clock className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 dark:text-zinc-400">Time</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-black/40 p-1.5 rounded-xl border border-white/40 dark:border-white/5">
                <select 
                  value={hours} 
                  onChange={(e) => handleTimeChange('h', parseInt(e.target.value))}
                  className="bg-transparent font-outfit font-semibold rounded-lg flex items-center justify-center text-sm py-1 px-1.5 text-neutral-800 dark:text-zinc-100 focus:outline-none appearance-none text-center hover:bg-white/40 dark:hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {Array.from({length: 12}).map((_, i) => (
                    <option key={i+1} value={i+1} className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white">{String(i+1).padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="text-neutral-400 dark:text-zinc-500 font-bold">:</span>
                <select 
                  value={minutes} 
                  onChange={(e) => handleTimeChange('m', parseInt(e.target.value))}
                  className="bg-transparent font-outfit font-semibold rounded-lg flex items-center justify-center text-sm py-1 px-1.5 text-neutral-800 dark:text-zinc-100 focus:outline-none appearance-none text-center hover:bg-white/40 dark:hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {Array.from({length: 60}).map((_, i) => (
                    <option key={i} value={i} className="bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white">{String(i).padStart(2, '0')}</option>
                  ))}
                </select>
                <div className="flex rounded-lg overflow-hidden bg-neutral-200/50 dark:bg-zinc-800/50 p-0.5 gap-0.5">
                  <button 
                    onClick={() => handleTimeChange('ampm', false)}
                    className={`text-[10px] px-2.5 py-1 font-bold rounded-md transition-all ${!isPM ? 'bg-white dark:bg-zinc-700 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 dark:text-zinc-400 hover:text-neutral-700 dark:hover:text-zinc-200'}`}
                  >
                    AM
                  </button>
                  <button 
                    onClick={() => handleTimeChange('ampm', true)}
                    className={`text-[10px] px-2.5 py-1 font-bold rounded-md transition-all ${isPM ? 'bg-white dark:bg-zinc-700 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 dark:text-zinc-400 hover:text-neutral-700 dark:hover:text-zinc-200'}`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
