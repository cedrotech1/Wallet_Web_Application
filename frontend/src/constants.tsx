import { ReactElement } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiNotepadThin } from 'react-icons/pi';
import { TbReportMoney } from 'react-icons/tb';
import { MdOutlineCategory } from 'react-icons/md';
import { VscGroupByRefType } from 'react-icons/vsc';

export interface navitem {
  page: string;
  link: string;
  icon: ReactElement;
  location: string;
}
export const logedInNavs: navitem[] = [
  {
    page: 'Dashboard',
    link: '',
    icon: <LuLayoutDashboard />,
    location: 'dashbaord',
  },
  {
    page: 'Accounts',
    link: 'accounts',
    icon: <PiNotepadThin />,
    location: 'accounts',
  },
  {
    page: 'Transactions',
    link: 'transactions',
    icon: <BsCashCoin />,
    location: 'transactions',
  },

  {
    page: 'Transaction categories',
    link: 'transactions-categories',
    icon: <MdOutlineCategory />,
    location: 'transactions-categories',
  },
  {
    page: 'Transaction Sub categories',
    link: 'transactions-subcategories',
    icon: <VscGroupByRefType />,
    location: 'transactions-subcategories',
  },
  {
    page: 'Reports',
    link: 'reports',
    icon: <TbReportMoney />,
    location: 'reports',
  },
];
