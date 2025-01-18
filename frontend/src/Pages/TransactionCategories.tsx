import instance from "@/API"
import { tableColumn } from "@/commonTypes"
import CategoryForm from "@/Components/CategoryForm"
import { Modal } from "@/Components/Modal"
import Table from "@/Components/Table"
import UpdateModel from "@/Components/UpdateModal"
import { createCategoryI } from "@/shared/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { HashLoader } from "react-spinners"

const columns: tableColumn[] = [{
    title: 'Name',
    key: 'name'
},
{
    title: 'Description',
    key: 'description'
}
]


function TransactionCategories() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [openUpdateModel, setOpenUpdateModel] = useState(false)
    const getAllCategories = async () => {
        setLoading(true)
        await instance.get('/category').then((res) => {
            setCategories(() => res.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const [updatableItemId, setUpdatableItemId] = useState<number | undefined>()
    const [updatableItem, setUpdatableItem] = useState<createCategoryI>({
        name: '',
        description: ''
    })
    const addCreatedCategory = (newCategory: any) => {
        setCategories(() => [...categories, newCategory])
    }
    const updateAction = (id: number) => {
        setUpdatableItemId(() => id)
        const updatableItem = categories.find(el => el.id == id)
        setUpdatableItem(() => ({
            name: updatableItem.name,
            description: updatableItem.description
        }))
        setOpenUpdateModel(true)
    }
    const deleteAction = async (id: number) => {
        await instance.delete(`/category/delete/${id}`).then(() => {
            toast.success('category deleted successfuly !!!')
            getAllCategories()
        }).catch(() => {
            toast.error('Failed. Error deleting account!!!')
        })
        console.log(id);

    }
    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <div>
            <div className='flex justify-between my-3'>
                <p className='p-2 bg-zinc-200 '> Transaction categories <span className='p-3 font-bold'>{loading ? '...' : categories.length}</span></p>
                <Modal
                    openButtonText="Create category"
                    modalTitle="CREATE CATEGORY"
                    modalSubTitle="Fill the form to create an category"
                >
                    <CategoryForm isUpdate={false} item={{ name: '', description: '' }} addCategory={addCreatedCategory} />
                </Modal>
            </div>
            {loading ?
                <div className='w-full h-36 flex justify-center items-center'>
                    <HashLoader color='#000' loading={loading} size={15} />
                </div> :
                <Table
                    columns={columns}
                    data={categories}
                    updateAction={updateAction}
                    deleteAction={deleteAction}
                />
            }

            <UpdateModel
                title='UPDATE CATEGORY'
                subTitle="Fill the form to update this category"
                item={updatableItem}
                isOpen={openUpdateModel && updatableItemId !== undefined} setIsOpen={setOpenUpdateModel} >
                <CategoryForm
                    updateItemId={updatableItemId}
                    isUpdate={true}
                    item={updatableItem}
                    addCategory={addCreatedCategory}
                />
            </UpdateModel>
        </div>
    )
}

export default TransactionCategories