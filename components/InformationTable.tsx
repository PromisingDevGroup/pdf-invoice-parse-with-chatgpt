import React, { useState, useRef } from 'react'
import { nanoid } from "nanoid"
import { DownloadTableExcel } from 'react-export-table-to-excel';

type Props = {
    data: string[][]
}

const InformationTable = (props: Props) => {
    const [lang, setLang] = useState("English")
    const tableRef = useRef(null);

    //invoice number, provider name, customer name, tax amount, net amount, gross amount, invoice date and due date
    return (
        <div className="relative overflow-x-auto p-12 ">
            <ul
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
                role="tablist"
                data-te-nav-ref>
                <li role="presentation">
                    <a
                        onClick={() => setLang("English")}
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs bg-blue-500 font-medium uppercase leading-tight text-white hover:isolate hover:border-transparent hover:bg-blue-600 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary   hover:cursor-pointer dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        data-te-nav-active
                        role="tab"
                        aria-controls="tabs-home"
                        aria-selected="true"
                    >English</a>
                </li>
                <li role="presentation">
                    <a
                        className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent bg-pink-500 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-white  hover:isolate hover:cursor-pointer hover:border-transparent hover:bg-pink-600 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                        data-te-toggle="pill"
                        role="tab"
                        aria-controls="tabs-profile"
                        aria-selected="false"
                        onClick={() => setLang("Spanish")}
                    >Spanish</a>
                </li>
            </ul>
            

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" ref={tableRef}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Invoice Number" : "Número de factura"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Provider" : "Proveedor"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Customer" : "Cliente"}


                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Tax" : "Impuesto"}

                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Net Amount" : "Importe neto"}

                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Gross Amount" : "Cantidad bruta"}

                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Invoice Date" : "Fecha de la factura"}

                        </th>
                        <th scope="col" className="px-6 py-3">
                            {lang === "English" ? "Due Date" : "Fecha de vencimiento"}
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
            <DownloadTableExcel
                filename={`Invoices Information - ${lang}`}
                sheet="Invoices"
                currentTableRef={tableRef.current}
            >
                <button
                    type="button"
                    className="mx-auto mt-10 inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Save to Excel
                </button>
            </DownloadTableExcel>
        </div>

    )
}

export default InformationTable