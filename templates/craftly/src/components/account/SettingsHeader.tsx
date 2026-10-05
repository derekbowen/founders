import React from 'react';

export function SettingsHeader({ title, description }: {title: string;description: string;}) {
  return (
    <div className="mb-8 border-b border-line pb-6">
      <h2 className="text-2xl font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>);

}