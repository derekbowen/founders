// Curated icon map for help-center categories and any other place we look up
// Lucide icons by string name (e.g. category.icon stored in the DB).
//
// IMPORTANT: do NOT `import * as LucideIcons from "lucide-react"` anywhere in
// the client bundle — that defeats tree-shaking and pulls in all ~1500 icons
// (~570KB). Add the icons you actually need to this map instead.
import {
  BookOpen,
  GraduationCap,
  Home,
  Settings,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Mail,
  HelpCircle,
  LifeBuoy,
  Users,
  Wrench,
  Building2,
  TrendingUp,
  Activity,
  AlertTriangle,
  FileText,
  Newspaper,
  Search,
  Bot,
  Database,
  LayoutDashboard,
  Layers,
  Lock,
  PlayCircle,
  Rocket,
  Star,
  Trophy,
  Waves,
  Zap,
  Calendar,
  ClipboardList,
  Cog,
  type LucideIcon,
} from "lucide-react";

export type IconComponent = LucideIcon;

const ICONS: Record<string, IconComponent> = {
  BookOpen,
  GraduationCap,
  Home,
  Settings,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Mail,
  HelpCircle,
  LifeBuoy,
  Users,
  Wrench,
  Building2,
  TrendingUp,
  Activity,
  AlertTriangle,
  FileText,
  Newspaper,
  Search,
  Bot,
  Database,
  LayoutDashboard,
  Layers,
  Lock,
  PlayCircle,
  Rocket,
  Star,
  Trophy,
  Waves,
  Zap,
  Calendar,
  ClipboardList,
  Cog,
};

export function getCategoryIcon(name?: string | null): IconComponent {
  if (!name) return BookOpen;
  return ICONS[name] ?? BookOpen;
}
