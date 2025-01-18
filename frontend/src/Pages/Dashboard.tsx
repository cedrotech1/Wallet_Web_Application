import instance from "@/API"
import { useEffect, useState } from "react"
import { BsCashCoin } from "react-icons/bs"
import { TbPigMoney } from "react-icons/tb"

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState<any[]>([])
    const [accounts, setAccounts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const getAllCategories = async () => {
        setLoading(true)
        await instance.get('/category').then((res) => {
            setCategories(() => res.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const getAllTransactions = async () => {
        setLoading(true)
        await instance.get('/transaction').then((res) => {
            setTransactions(() => res.data.data.map((el: any) => ({
                description: el.description,
                amount: el.amount,
                account: el.account.name,
                subcategory: el.subcategory.name,
                category: el.subcategory.category.name,
                ...el
            }))
            )
        }).finally(() => {
            setLoading(false)
        })
    }
    const getAllAccounts = async () => {
        setLoading(true)
        await instance.get('/Account').then((res) => {
            setAccounts(() => res.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getAllTransactions()
        getAllCategories()
        getAllAccounts()
    }, [])
    return (
        <div>
            <p className='text-3xl font-semibold '>Welcome Back</p>
            <p className='text-sm'>Welcome to dashboard</p>
            <div className='flex gap-4 mt-2'>
                <div className='flex-1 p-2 rounded-[8px] bg-neutral-50'>
                    <p className='py-2'>Expenses</p>
                    <p className='py-2'>12</p>
                    <p className='py-2'>12</p>
                </div>
                <div className='flex-1 p-2 rounded-[8px] bg-teal-50'>
                    <p className='py-2'>Income</p>
                    <p className='py-2'>12</p>
                    <p className='py-2'>12</p>
                </div>
                <div className='flex-1 p-2 rounded-[8px] bg-purple-50'>
                    <p className='py-2'>Budget</p>
                    <p className='py-2'>12</p>
                    <p className='py-2'>12</p>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='w-1/2 rounded-[6px] p-3 '>
                    <p className='my-4 font-bold'>Recent transactions</p>
                    {transactions.map((el) => (
                        <div className='flex gap-3 bg-neutral-200 py-3 my-1 rounded-[6px]'>
                            <div className='p-4  rounded-[4px]'>
                                <BsCashCoin />
                            </div>
                            <div>
                                <p>{el.description}</p>
                                <p>{el.category}</p>
                                <p className={`text-sm rounded-[4px] font-bold px-2 py-[2px] ${el.type == 'Income' ? ' bg-blue-100' : 'bg-red-200'}`}>
                                    {el.type}
                                </p>
                            </div>
                        </div>))}
                </div>
                <div className='w-1/2 rounded-[6px] p-3'>
                    <p className='py-3 my-2 font-bold'>Balance per account</p>
                    <div className='flex flex-wrap gap-3'>
                        {accounts.map((el) => (
                            <div className='w-1/4 p-2 rounded-md  bg-emerald-800 min-h-32'>
                                <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full'>
                                    <TbPigMoney />
                                </div>
                                <p className='py-2 text-white uppercase'>{el.name}</p>
                                <p className='py-2 font-bold text-white'>{el.balance.toLocaleString('fr-FR')}</p>
                            </div>
                        ))}
                    </div>
                    <p className='py-3 my-2 font-bold'>Spending per category </p>
                    <div className='w-1/4 p-2 bg-black rounded-md  min-h-32'>
                        <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full'>
                            <TbPigMoney />
                        </div>
                        <p className='py-2 text-white'>Account Name</p>
                        <p className='py-2 font-bold text-white'>1200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
