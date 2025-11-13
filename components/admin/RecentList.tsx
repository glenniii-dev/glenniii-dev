"use client";
import React from 'react';

interface HasId {
  id?: number | string;
  slug?: string;
  [key: string]: unknown;
}

interface RecentListProps<T extends HasId> {
  title: string;
  items: T[];
  itemRenderer: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export default function RecentList<T extends HasId>({ 
  title, 
  items, 
  itemRenderer,
  emptyMessage = 'No items to display'
}: RecentListProps<T>) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-4">
        {items.length === 0 ? (
          <li className="text-sm text-gray-500">{emptyMessage}</li>
        ) : (
          items.map((item, index) => {
            const itemId = (item.id ?? item.slug ?? index).toString();
            return (
              <li key={itemId} className="py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition duration-150">
                {itemRenderer(item)}
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
