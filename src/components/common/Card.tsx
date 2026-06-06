import { cn } from '../../utils/helpers';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-xl',
        hover && 'hover:border-neutral-300 hover:shadow-soft transition-all duration-200 cursor-pointer',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div>
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  iconBg?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({
  title,
  value,
  change,
  icon,
  iconBg = 'bg-primary-50',
  trend,
}: StatCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-success-600'
      : trend === 'down'
      ? 'text-danger-600'
      : 'text-neutral-500';

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={cn('text-sm font-medium', trendColor)}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
                {change}%
              </span>
              <span className="text-sm text-neutral-500 ml-1.5">vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('p-3 rounded-xl', iconBg)}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
