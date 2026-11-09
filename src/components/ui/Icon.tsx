import {
  Activity, Bandage, Briefcase, Church, ClipboardList, Droplet, Footprints, Hand, HeartHandshake, HeartPulse,
  Home, MessageCircle, Palette, PartyPopper, Pill, Scissors, Shield, Shirt, Sofa, Sparkles, Stethoscope, Sun, Trees,
  Users, Utensils, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  stethoscope: Stethoscope, footprints: Footprints, home: Home, activity: Activity, hand: Hand, message: MessageCircle,
  bandage: Bandage, pill: Pill, "heart-pulse": HeartPulse, scissors: Scissors, droplet: Droplet, utensils: Utensils,
  sun: Sun, sparkles: Sparkles, sparkle: Sparkles, shirt: Shirt, palette: Palette, party: PartyPopper, sofa: Sofa,
  trees: Trees, users: Users, church: Church, heart: HeartHandshake, briefcase: Briefcase, clipboard: ClipboardList,
  shield: Shield,
};

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.4 }: { name: string; className?: string; strokeWidth?: number }) {
  const C = map[name] ?? Sparkles;
  return <C className={className} strokeWidth={strokeWidth} aria-hidden />;
}
