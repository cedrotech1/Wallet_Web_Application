import { tableColumn } from "../commonTypes"

interface Props {
    columns: tableColumn[];
    data: any[];
    deleteAction: (id: number) => void;
    updateAction: (id: number) => void;
}

function Table({ columns, data }: Props) {
  
    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white ">
            <table className="w-full text-left table-auto min-w-max text-slate-800">
                <thead>
                    <tr className="border-b text-slate-700 border-slate-200 bg-slate-50">
                        {columns.map((el) => <th className="p-4 text-lg"><p className="text-sm font-normal leading-none">{el.title}</p></th>)}
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((dataItem) => <tr className="hover:bg-slate-50">
                        {columns.map((el) => (<td className="p-4 text-sm">
                            <p>
                                {el.key == 'amount' ? dataItem[el.key].toLocaleString('fr-FR') : dataItem[el.key]}
                            </p>
                        </td>))}
                       
                    </tr>)}

                </tbody>
            </table>
        </div>
    )
}

export default Table