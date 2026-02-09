import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Staff } from '../../shared/models/models';
import { EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './staff.html',
})
export class StaffComponent implements OnChanges {
  private toastService = inject(ToastService);

  @Input() staffs: Staff[] = [];
  @Input() selectedDepartmentName: string | null = null;
  @Input() selectedDepartmentId: number | null = null;
  @Output() onStaffsChange = new EventEmitter<Staff[]>();

  filteredStaffs: Staff[] = [];
  searchTerm: string = '';
  sortColumn: keyof Staff = 'StaffName';
  sortDirection: 'asc' | 'desc' = 'asc';

  editingId: number | null = null;
  editingData: Partial<Staff> = {};
  isAddingNew = false;
  newStaff: Partial<Staff> = { StaffCode: '', StaffName: '', DepartmentName: '' };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDepartmentName'] || changes['staffs']) {
      this.filterStaffs();
    }
  }

  filterStaffs() {
    let filtered = this.selectedDepartmentName
      ? this.staffs.filter(s => s.DepartmentName === this.selectedDepartmentName)
      : [];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.StaffCode.toLowerCase().includes(term) ||
        s.StaffName.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredStaffs = filtered;
  }

  toggleSort(column: keyof Staff) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterStaffs();
  }

  handleSaveNew() {
    if (!this.newStaff.StaffCode?.trim() || !this.newStaff.StaffName?.trim()) {
      this.toastService.error('Please enter both Staff Code and Name.');
      return;
    }
    const maxId = Math.max(...this.staffs.map(s => s.Id), 0);
    const newEntry: Staff = {
      Id: maxId + 1,
      StaffCode: this.newStaff.StaffCode.trim(),
      StaffName: this.newStaff.StaffName.trim(),
      DepartmentName: this.selectedDepartmentName || '',
      DepartmentId: this.selectedDepartmentId || 0,
      dataCreatedOn: new Date(),
      datamodifiedOn: new Date()
    };
    this.onStaffsChange.emit([...this.staffs, newEntry]);
    this.isAddingNew = false;
    this.newStaff = { StaffCode: '', StaffName: '', DepartmentName: '' };
    this.toastService.success('Staff member added successfully.');
  }

  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      const updated = this.staffs.filter(s => s.Id !== id);
      this.onStaffsChange.emit(updated);
      this.toastService.success('Staff member deleted successfully.');
    }
  }

  handleEdit(staff: Staff) {
    this.editingId = staff.Id;
    this.editingData = { ...staff };
    this.isAddingNew = false;
  }

  handleSave(id: number) {
    if (!this.editingData.StaffCode?.trim() || !this.editingData.StaffName?.trim()) {
      this.toastService.error('Please enter both Staff Code and Name.');
      return;
    }
    const updated = this.staffs.map(s =>
      s.Id === id ? { ...s, ...this.editingData, datamodifiedOn: new Date() } : s
    );
    this.onStaffsChange.emit(updated);
    this.editingId = null;
    this.toastService.success('Staff member updated successfully.');
  }

  handleCancel() {
    this.editingId = null;
    this.editingData = {};
  }
}
