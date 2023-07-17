import React from 'react'
import { nanoid } from "nanoid"
type Props = {
    data: string[]
}

const InformationTable = (props: Props) => {
    //invoice number, provider name, customer name, tax amount, net amount, gross amount, invoice date and due date
    return (        
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Invoice Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Provider 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Customer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tax
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Net Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gross Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Invoice Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Due Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(item => <tr key={nanoid()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{item[0]}</td>
                        <td className="px-6 py-4">{item[1]}</td>
                        <td className="px-6 py-4">{item[2]}</td>
                        <td className="px-6 py-4">{item[3]}</td>
                        <td className="px-6 py-4">{item[4]}</td>
                        <td className="px-6 py-4">{item[5]}</td>
                        <td className="px-6 py-4">{item[6]}</td>
                        <td className="px-6 py-4">{item[7]}</td>                        
                    </tr>)}
                    
                    
                </tbody>
            </table>
        </div>

    )
}

export default InformationTable