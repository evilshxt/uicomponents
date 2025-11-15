import React, { Suspense, lazy } from 'react';

interface ComponentViewerProps {
  componentName: string | null;
  onClose: () => void;
}

const ComponentViewer: React.FC<ComponentViewerProps> = ({ componentName, onClose }) => {
  if (!componentName) return null;

  // Lazy load the component
  const LazyComponent = lazy(() => import(`../library/${componentName}`));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{componentName} Component</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <Suspense fallback={<div className="text-center py-8">Loading component...</div>}>
          <LazyComponent />
        </Suspense>
        <div className="mt-4 text-sm text-gray-600">
          <p>This component is loaded dynamically to keep the bundle size small.</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentViewer;