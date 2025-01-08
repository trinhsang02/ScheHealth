import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { createMedicine } from "../../services/api/medicineService"

export const AddMedicineModal = ({ isOpen, onClose, onSave, medicine }: { isOpen: boolean; onClose: () => void; onSave: (data: { name: string; unit: string; description: string }) => void; medicine?: { id: number; name: string; unit: string; description: string } }) => {
    const [name, setName] = React.useState(medicine ? medicine.name : "");
    const [unit, setUnit] = React.useState(medicine ? medicine.unit : "");
    const [description, setDescription] = React.useState(medicine ? medicine.description : "");

    const handleSave = async () => {
        if (name.trim()) {
            if (medicine) {
                await createMedicine({
                    name,
                    unit,
                    description,
                    manufacture_date: " ",
                    expiry_date: " ",
                    side_effects: " ",
                    dosage: " ",
                });
            } else {
                onSave({
                    name,
                    unit,
                    description,
                });
            }
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{medicine ? "Cập nhật thuốc" : "Thêm thuốc mới"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input placeholder="Tên thuốc" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Đơn vị" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    <Input
                        placeholder="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
