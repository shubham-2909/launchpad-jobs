import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/logo.png'
import { Button } from './ui/button'
export function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href={`/`} className="flex items-center gap-3">
          <Image src={logo} alt="launchpad-jobs" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight">
            Launchpad jobs
          </span>
        </Link>
        <Button asChild>
          <Link href={`/jobs/new`}>Post a job</Link>
        </Button>
      </nav>
    </header>
  )
}
