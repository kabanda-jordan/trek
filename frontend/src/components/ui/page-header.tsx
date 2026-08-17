import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1.5 sm:mt-2 text-gray-600 text-sm sm:text-base">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
