'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InvoiceList } from "./invoice-list"
import { InvoiceDetail } from "./invoice-detail"

export function InvoiceModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Xem Hóa Đơn</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedInvoice ? 'Chi Tiết Hóa Đơn' : 'Danh Sách Hóa Đơn'}</DialogTitle>
          </DialogHeader>
          {selectedInvoice ? (
            <InvoiceDetail 
              invoice={selectedInvoice} 
              onBack={() => setSelectedInvoice(null)}
            />
          ) : (
            <InvoiceList onSelectInvoice={setSelectedInvoice} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

interface Invoice {
  id: string
  date: string
  medicalRecordId: string
  totalAmount: number
  services: Array<{
    name: string
    price: number
  }>
}

