import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { ReactNode } from 'react';

interface Props {
  openButtonText: string;
  modalTitle: string;
  modalSubTitle: string;
  children: ReactNode;
}

export function Modal({
  openButtonText,
  modalTitle,
  modalSubTitle,
  children,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-black text-white px-6 py-2 rounded-[4px]">
          {openButtonText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalSubTitle}</DialogDescription>
        </DialogHeader>
        {children}
        {/* <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <button type="button" >
                            Close
                        </button>
                    </DialogClose>
                </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
