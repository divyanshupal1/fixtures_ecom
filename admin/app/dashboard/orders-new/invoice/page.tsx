"use client"
import React from 'react'
import {MyInvoice} from '../components/invoice'
import { PDFViewer } from '@react-pdf/renderer';

const InvoicePage = () => {
    return (
        <PDFViewer className='w-full h-screen'>
            <MyInvoice />
        </PDFViewer>
    )
}

export default InvoicePage