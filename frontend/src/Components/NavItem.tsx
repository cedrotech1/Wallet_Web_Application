import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
interface Props {
  page: string;
  link: string;
  location: string;
  children: ReactNode;
}

export const NavItem = ({ page, link, location, children }: Props) => {
  const { pathname } = useLocation();
  const url = pathname.split('/');

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex  items-center gap-3 p-3 capitalize font-medium ${
          (isActive && url.length === 2) || (isActive && location === url[2])
            ? `text-sky-900 bg-zinc-100 rounded-tr-[6px] rounded-bl-[6px]`
            : ' hover:bg-tab-hover text-white duration-300 ease-in-out delay-50'
        } `
      }
    >
      {children}
      {page}
    </NavLink>
  );
};
