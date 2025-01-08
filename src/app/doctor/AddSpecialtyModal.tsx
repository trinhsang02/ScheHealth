import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export const AddSpecialtyModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: { name: string; count: number }) => void }) => {
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState<number | "">("");

  const handleSave = () => {
    if (name.trim() && count) {
      onSave({ name, count: Number(count) });
      onClose(); 

    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm chuyên khoa mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Tên chuyên khoa" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            placeholder="Số lượng bác sĩ"
            value={count}
            onChange={(e) => setCount(e.target.value === "" ? "" : Number(e.target.value))}
          />
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
