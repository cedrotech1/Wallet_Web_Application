import instance from "@/API"
import { tableColumn } from "@/commonTypes"
import CreateTransaction from "@/Components/CreateTransaction"
import { Modal } from "@/Components/Modal"
import Table from "@/Components/Table"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { HashLoader } from "react-spinners"

const columns: tableColumn[] = [{
    title: 'Description',
    key: 'description'
},
{
    title: 'Amount',
    key: 'amount'
},
{
    title: 'Account',
    key: 'account'
},
{
    title: 'Category',
    key: 'category'
}, {
    title: 'Sub category',
    key: 'subcategory'
},
{
    title: 'Account',
    key: 'account'
},
]

function Transactions() {
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState<any[]>([])
    const getAllTransactions = async () => {
        setLoading(true)
        await instance.get('/transaction').then((res) => {
            setTransactions(() => res.data.data.map((el: any) => ({
                id: el.id,
                description: el.description,
                amount: el.amount,
                account: el.account.name,
                subcategory: el.subcategory.name,
                category: el.subcategory.category.name
            }))
            )
        }).finally(() => {
            setLoading(false)
        })
    }
    const addTransaction = (newTransaction: any) => {
        setTransactions(() => [...transactions, newTransaction])
    }
    const updateAction = (id: number) => {
        console.log(id);
    }
    const deleteAction = async (id: number) => {
        await instance.delete(`/transaction/delete/${id}`).then(() => {
            toast.success('Account deleted successfuly !!!')
            getAllTransactions()
        }).catch(() => {
            toast.error('Failed. Error deleting account!!!')
        })
    }
    useEffect(() => {
        getAllTransactions()
    }, [])
    return (
        <div>
            <div className='flex justify-between my-3'>
                <p className='p-2 bg-zinc-200 '> Transactions <span className='p-3 font-bold'>{loading ? '...' : transactions.length}</span></p>
                <Modal
                    openButtonText="Add Transaction"
                    modalTitle="Add new transaction"
                    modalSubTitle=""
                >
                    <CreateTransaction addTransaction={addTransaction} />
                </Modal>
            </div>
            {loading ?
                <div className='flex items-center justify-center w-full h-36'>
                    <HashLoader color='#000' loading={loading} size={15} />
                </div> :
                <Table
                    columns={columns}
                    data={transactions}
                    updateAction={updateAction}
                    deleteAction={deleteAction}
                />
            }


        </div>
    )
}

export default Transactions