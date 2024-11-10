import { Transaction } from "@prisma/client";
import {
  CarTaxiFrontIcon,
  Film,
  GraduationCap,
  Heart,
  HelpCircle,
  Home,
  ShoppingCart,
  UtensilsCrossedIcon,
  Wrench,
} from "lucide-react";

const CategoryIconStyles: Record<
  Transaction["category"],
  { icon: React.ElementType; color: string }
> = {
  FOOD: { icon: UtensilsCrossedIcon, color: "bg-orange-500 text-orange-900" },
  TRANSPORTATION: {
    icon: CarTaxiFrontIcon,
    color: "bg-blue-500 text-blue-900",
  },
  HOUSING: { icon: Home, color: "bg-green-500 text-green-900" },
  SALARY: { icon: ShoppingCart, color: "bg-purple-500 text-purple-900" },
  OTHER: { icon: HelpCircle, color: "bg-gray-500 text-gray-900" },
  ENTERTAINMENT: { icon: Film, color: "bg-pink-500 text-pink-900" },
  HEALTH: { icon: Heart, color: "bg-red-500 text-red-900" },
  UTILITY: { icon: Wrench, color: "bg-slate-500 text-slate-900" },
  EDUCATION: { icon: GraduationCap, color: "bg-yellow-500 text-yellow-900" },
};

interface TransactionCategoryIconProps {
  category: keyof typeof CategoryIconStyles;
}

const TransactionCategoryIcon: React.FC<TransactionCategoryIconProps> = ({
  category,
}) => {
  const { icon: Icon, color } = CategoryIconStyles[category];
  return (
    <div
      className={`flex min-h-10 min-w-10 items-center justify-center rounded-full ${color}`}
    >
      <Icon size={20} />
    </div>
  );
};

export default TransactionCategoryIcon;
