import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { routes } from "@/content/navigation";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ivory pb-20 pt-40">
      <LogoMark className="pointer-events-none absolute -right-20 top-20 h-[36rem] w-auto opacity-[0.04]" />
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-6 text-h1">We couldn&apos;t find that page.</h1>
        <p className="lede mt-6">The page may have moved, or the link may be out of date. These pages may help:</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" arrow>Return Home</Button>
          <Button href={routes.services} variant="outline">Our Services</Button>
          <Button href={routes.contact} variant="outline">Contact Us</Button>
        </div>
        <p className="mt-10 text-sm text-stone-500">Looking for admissions? <Link href={routes.admissions} className="text-navy-800 underline decoration-champagne-400 underline-offset-4">Start here</Link>.</p>
      </div>
    </section>
  );
}
