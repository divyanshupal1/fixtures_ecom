"use client"
import React from 'react'
// import {MyInvoice} from '../components/invoice'

import dynamic from 'next/dynamic';

const InvoicePage = () => {

    const InvoiceComponent = dynamic(
        () => import("../components/invoice"),{
            ssr: false
        }
    )

    return (
            <InvoiceComponent />
    )
}

export default InvoicePage