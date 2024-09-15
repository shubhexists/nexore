import { Button } from './ui/button';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

export function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-16 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Button>
  );
}
