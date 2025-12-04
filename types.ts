import React from 'react';

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  MIDNIGHT = 'midnight',
  NATURE = 'nature',
  SUNSET = 'sunset'
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  backgroundClass: string; // The outer container background
  paperClass: string; // The inner markdown paper background
  textClass: string; // Text color
  accentClass: string; // For borders, blockquotes, etc.
}

export interface AIBrand {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface MarkdownElementProps {
  children: React.ReactNode;
  className?: string;
}