import { Link } from "react-router-dom"
import { logedInNavs } from "../constants"
import Logo from "./Logo"
import { NavItem } from "./NavItem"

function SidebarNav() {
    return (
        <aside className='w-full md:block'>
            <div className='flex flex-col min-h-screen '>
                <div className='flex items-center justify-between w-full p-4'>
                    <Link to='/' className='block basis-1/8'>
                        <Logo />
                    </Link>
                </div>
                <div className=''>
                    {logedInNavs.map((el) => (
                        <NavItem
                            key={crypto.randomUUID()}
                            page={el.page}
                            link={el.link}
                            location={el.location}
                        >
                            {el.icon}
                        </NavItem>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default SidebarNav