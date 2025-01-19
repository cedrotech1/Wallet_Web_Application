import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { ReactNode } from 'react';

interface modalProps {
  isOpen: boolean;
  setIsOpen: (el: boolean) => void;
  title: string;
  subTitle: string;
  item: any;
  children: ReactNode;
}
export default function UpdateModel({
  isOpen,
  setIsOpen,
  title,
  subTitle,
  children,
}: modalProps) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Dialog Component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <p>{subTitle}</p>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
