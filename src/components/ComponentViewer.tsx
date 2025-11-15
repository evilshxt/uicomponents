import React from 'react';

interface ComponentViewerProps {
  componentName: string | null;
  onClose: () => void;
}

const ComponentViewer: React.FC<ComponentViewerProps> = ({ componentName, onClose }) => {
  if (!componentName) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{componentName} Component</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="w-full h-96">
          <iframe
            src={`/library/${componentName}/index.html`}
            className="w-full h-full border rounded"
            title={`${componentName} Demo`}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>This component demo runs in an isolated iframe for safety and compatibility.</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentViewer;