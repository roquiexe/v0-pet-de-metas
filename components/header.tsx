'use client'

import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-center h-14 px-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20do%20Pet%20de%20Metas-RrbP2Gm7Mq6ZhBAILOgS9S2poyNJIv.png"
          alt="Pet de Metas"
          width={140}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
      </div>
    </header>
  )
}
