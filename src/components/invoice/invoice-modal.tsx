'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import {InvoiceResponse} from "../../services/api/models"
import invoiceService from "@/services/api/paymentService"

interface Invoice 
 {
  id: number
  time: string
  medical_record_id: number
  total_price: number
  service_names: string[]
  service_prices: number[]
}

export function InvoiceModal({ open, onOpenChange }: { open: boolean; onOpenChange: (isOpen: boolean) => void }) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoiceService.getSelfInvoices()
        setInvoices(data)
      } catch (error) {
        console.error('Failed to fetch invoices:', error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchInvoices()
    }
  }, [open])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{selectedInvoice ? 'Chi Tiết Hóa Đơn' : 'Danh Sách Hóa Đơn'}</DialogTitle>
        </DialogHeader>
        {selectedInvoice ? (
          <InvoiceDetail invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />
        ) : (
          <InvoiceList onSelectInvoice={setSelectedInvoice} invoices={invoices} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function InvoiceDetail({ invoice, onBack }: { invoice: Invoice; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p><strong>Ngày:</strong> {new Date(invoice.time).toLocaleDateString('vi-VN')}</p>
          <p><strong>Mã Hồ Sơ Bệnh Án:</strong> {invoice.medical_record_id}</p>
          <p><strong>Tổng Giá:</strong> {invoice.total_price.toLocaleString('vi-VN')} VND</p>
        </div>
        <Button variant="outline" onClick={onBack}>Quay Lại</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dịch Vụ</TableHead>
            <TableHead>Giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.service_names.map((name, index) => (
            <TableRow key={index}>
              <TableCell>{name}</TableCell>
              <TableCell>{invoice.service_prices[index].toLocaleString('vi-VN')} VND</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function InvoiceList({ onSelectInvoice, invoices }: { onSelectInvoice: (invoice: Invoice) => void; invoices: Invoice[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ngày</TableHead>
          <TableHead>Mã Hồ Sơ Bệnh Án</TableHead>
          <TableHead>Tổng Giá</TableHead>
          <TableHead>Hành Động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{new Date(invoice.time).toLocaleDateString('vi-VN')}</TableCell>
            <TableCell>{invoice.medical_record_id}</TableCell>
            <TableCell>{invoice.total_price.toLocaleString('vi-VN')} VND</TableCell>
            <TableCell>
              <Button variant="outline" onClick={() => onSelectInvoice(invoice)}>
                Xem Chi Tiết
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}