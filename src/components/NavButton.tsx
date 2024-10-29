import { Button } from '@/components/ui/button';

interface NavButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function NavButton({ icon, isActive, onClick }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`text-gray-400 hover:text-white hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white' : ''}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
