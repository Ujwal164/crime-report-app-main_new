"use client";

import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const emergencyNumbers = [
    {
      title: "Police Emergency",
      number: "115",
      description: "For immediate police assistance in case of crime or emergency",
      icon: "🚓"
    },
    {
      title: "Women Helpline",
      number: "1091",
      description: "24/7 helpline for women in distress",
      icon: "👩"
    },
    {
      title: "Child Helpline",
      number: "1098",
      description: "24/7 helpline for children in need of care and protection",
      icon: "👶"
    },
    {
      title: "Cyber Crime",
      number: "1930",
      description: "National Cyber Crime Reporting Portal",
      icon: "💻"
    },
    {
      title: "Ambulance",
      number: "108",
      description: "Emergency medical services",
      icon: "🚑"
    },
    {
      title: "Fire Emergency",
      number: "101",
      description: "Fire and rescue services",
      icon: "🚒"
    }
  ];

  const additionalResources = [
    {
      title: "National Commission for Women",
      number: "011-26942369",
      description: "For women's rights and complaints",
      icon: "👥"
    },
    {
      title: "Anti-Corruption Helpline",
      number: "1800-11-4000",
      description: "Central Vigilance Commission helpline",
      icon: "⚖️"
    },
    {
      title: "Senior Citizen Helpline",
      number: "14567",
      description: "For senior citizens in distress",
      icon: "👴"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Emergency Contacts
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Emergency & Crime Reporting
              <span className="block text-2xl mt-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Important Contact Numbers
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Access important emergency and crime reporting contact numbers. Save these numbers for quick access during emergencies.
            </p>
          </div>

          {/* Emergency Numbers Section */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Emergency Numbers
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {emergencyNumbers.map((number, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80 cursor-pointer"
                  onClick={() => handleCall(number.number)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{number.icon}</div>
                      <h3 className="text-xl font-medium text-white">
                        {number.title}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-sky-400 mb-2">
                      {number.number}
                    </div>
                    <p className="text-sm text-zinc-400">{number.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources Section */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Additional Resources
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {additionalResources.map((resource, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80 cursor-pointer"
                  onClick={() => handleCall(resource.number)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{resource.icon}</div>
                      <h3 className="text-xl font-medium text-white">
                        {resource.title}
                      </h3>
                    </div>
                    <div className="text-2xl font-bold text-sky-400 mb-2">
                      {resource.number}
                    </div>
                    <p className="text-sm text-zinc-400">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="mt-24 mb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Important Notice
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              These numbers are for emergency and crime reporting purposes only. Please use them responsibly and only in genuine emergencies.
              <br />
              For non-emergency situations, please contact your local police station.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 