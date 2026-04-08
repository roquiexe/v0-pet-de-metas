'use client'

import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-primary/20 neon-border">
      <div className="flex items-center justify-center h-14 px-4">
        <Image
          src="/images/aura-pet-logo.png"
          alt="Aura Pet"
          width={140}
          height={40}
          className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          priority
        />
      </div>
    </header>
  )
}
