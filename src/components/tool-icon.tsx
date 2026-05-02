import {
  DollarSign, PartyPopper, Shield, Users, Target, TrendingUp, Lock, Flame,
  Wrench, FlaskConical, Droplet, Zap, Ruler, Umbrella, FileText, CheckSquare,
  QrCode, Calendar, MessageSquare, Sparkles, Star, BarChart3, Volume2, BookOpen,
  Wrench as DefaultIcon,
} from "lucide-react";

const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  party: PartyPopper,
  shield: Shield,
  users: Users,
  target: Target,
  trending: TrendingUp,
  lock: Lock,
  flame: Flame,
  wrench: Wrench,
  flask: FlaskConical,
  droplet: Droplet,
  zap: Zap,
  ruler: Ruler,
  umbrella: Umbrella,
  file: FileText,
  check: CheckSquare,
  qr: QrCode,
  calendar: Calendar,
  message: MessageSquare,
  sparkles: Sparkles,
  star: Star,
  chart: BarChart3,
  volume: Volume2,
  book: BookOpen,
};

export function ToolIcon({ name, className }: { name?: string | null; className?: string }) {
  const Cmp = (name && MAP[name]) || DefaultIcon;
  return <Cmp className={className} />;
}
