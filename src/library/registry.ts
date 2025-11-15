export interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  tags: string[];
}

export const componentRegistry: ComponentInfo[] = [
  {
    name: 'Card',
    category: 'Layout',
    description: 'A versatile card component for displaying content.',
    tags: ['layout', 'content', 'responsive']
  },
  {
    name: 'Modal',
    category: 'Overlay',
    description: 'Interactive modal dialog for user interactions.',
    tags: ['modal', 'dialog', 'overlay']
  },
  {
    name: 'Button',
    category: 'Input',
    description: 'Customizable button component with various styles.',
    tags: ['button', 'input', 'interactive']
  },
  {
    name: 'FadeIn',
    category: 'Animation',
    description: 'Smooth fade-in animation component.',
    tags: ['animation', 'transition', 'fade']
  },
  // Add more components as they are created
];