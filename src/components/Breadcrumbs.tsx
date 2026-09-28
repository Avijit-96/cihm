import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ label: 'Home', url: '/' }, ...items];

  // Generate BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: item.url ? `${window.location.origin}${item.url}` : window.location.href
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs font-medium text-slate-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
              {isLast || !item.url ? (
                <span className="text-[#2E328D] font-semibold truncate max-w-[240px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-[#00A54F] transition-colors flex items-center gap-1 text-slate-600"
                >
                  {index === 0 && <Home className="w-3 h-3" />}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
