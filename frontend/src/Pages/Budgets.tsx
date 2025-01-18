import instance from "@/API"
import { tableColumn } from "@/commonTypes"
import CreateBudget from "@/Components/CreateBudget"
import { Modal } from "@/Components/Modal"
import Table from "@/Components/Table"
import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"

const columns: tableColumn[] = [{
    title: 'Limit',
    key: 'limit'
},
{
    title: 'Current spending',
    key: 'currentSpending'
},
]

function Budgets() {
    const [budget, setBudget] = useState<any>()
    const [loading, setLoading] = useState(false)
    const addBudget = (newBudget: any) => {
        setBudget(() => newBudget)
    }
    const getAllBudgets = async () => {
        setLoading(true)
        await instance.get('/budgets').then((res) => {
            setBudget(() => res.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getAllBudgets()
    }, [])
    return (
        <div>
            <div className='flex justify-between my-3'>
                {/* <p className='p-2 bg-zinc-200 '> Budgets <span className='p-3 font-bold'>{loading ? '...' : budgets.length}</span></p> */}
                <Modal
                    openButtonText="Create budget"
                    modalTitle="CREATE BUDGET"
                    modalSubTitle="Fill the form to create budget"
                >
                    <CreateBudget />
                </Modal>
            </div>
            {loading ?
                <div className='flex items-center justify-center w-full h-36'>
                    <HashLoader color='#000' loading={loading} size={15} />
                </div> :
                <div>
                    <p>
                        Budget Limit: {budget?.limit}
                    </p>
                    <p>
                        Budget Spending: {budget?.currentSpending}
                    </p>
                </div>

            }
        </div>
    )
}

export default Budgets