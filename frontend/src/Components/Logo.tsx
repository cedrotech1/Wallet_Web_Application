import { IoWalletOutline } from "react-icons/io5"

interface Props {
    color?: string;
}
function Logo({ color }: Props) {
    return (
        <div className={`flex gap-3 items-center ${color ? `text-${color}` : 'text-white'}`}>
            <IoWalletOutline className='w-12 h-12 ' />
            <p className='text-xl font-bold '>I-Wallet</p>
        </div>
    )
}

export default Logo