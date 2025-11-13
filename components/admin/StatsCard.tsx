"use client";
import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, description, trend }: StatsCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
          {trend && (
            <p className={`text-sm flex items-center gap-1 ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-slate-700/50 rounded-lg text-[#007AFF]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
