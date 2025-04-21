"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emergencyContacts = [
  { label: "Police", number: "9082849370", color: "text-red-500" },
  { label: "Ambulance", number: "9082849370", color: "text-green-500" },
  { label: "Fire Brigade", number: "9082849370", color: "text-orange-500" },
];

export default function EmergencyCallButton() {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCall = (number: string): void => {
    window.location.href = `tel:${number}`;
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className="group flex h-9 items-center gap-2 rounded-full bg-red-500/10 pl-4 pr-5 text-sm font-medium text-red-500 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/20"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        Emergency
      </button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg z-50"
          >
            {emergencyContacts.map((contact) => (
              <button
                key={contact.label}
                onClick={() => handleCall(contact.number)}
                className={`w-full text-left px-4 py-2 text-sm ${contact.color} hover:bg-gray-100`}
              >
                {contact.label}: {contact.number}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
