import { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

interface ImportMethod {
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ImportMethodsProps {
  importMethods: ImportMethod[];
  setSelectedMethod: (methodName: string) => void;
  setHoveredMethod: (methodName: string | null) => void;
  hoveredMethod: string | null;
}

const ImportMethods: FC<ImportMethodsProps> = ({
  importMethods,
  setSelectedMethod,
  setHoveredMethod,
  hoveredMethod,
}) => {
  return (
    <div className="space-y-4 mt-4">
      {importMethods.map((method) => (
        <motion.div
          key={method.name}
          onClick={() => setSelectedMethod(method.name)}
          className="relative overflow-hidden rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
          <button
            className="relative w-full p-4 bg-gray-800 text-left transition-all duration-300 group hover:bg-opacity-80"
            onMouseEnter={() => setHoveredMethod(method.name)}
            onMouseLeave={() => setHoveredMethod(null)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <method.icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {method.description}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <ArrowRightIcon
                  className={`h-6 w-6 text-white transition-all duration-300 ${
                    hoveredMethod === method.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                />
              </div>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ImportMethods;
