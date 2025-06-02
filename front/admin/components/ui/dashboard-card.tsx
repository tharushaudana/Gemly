import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("transition-all", {
  variants: {
    variant: {
      default: "border-border",
      success: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
      warning: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
      danger: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
      info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

export function DashboardCard({
  className,
  title,
  value,
  description,
  icon,
  footer,
  variant,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn(cardVariants({ variant }), className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
      {footer && <CardFooter className="pt-1">{footer}</CardFooter>}
    </Card>
  );
}