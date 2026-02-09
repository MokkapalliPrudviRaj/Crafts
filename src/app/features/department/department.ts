import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Department } from '../../shared/models/models';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class DepartmentComponent implements OnInit {
  private toastService = inject(ToastService);

  @Input() departments: Department[] = [];
  @Input() selectedDepartmentId: number | null = null;
  @Output() onSelectDepartment = new EventEmitter<number | null>();
  @Output() onDepartmentsChange = new EventEmitter<Department[]>();

  isAddingNew = false;
  editingId: number | null = null;

  // Objects for forms
  newDepartment: Partial<Department> = { DepartmentCode: '', DepartmentName: '' };
  editingData: Partial<Department> = {};

  ngOnInit() { }

  handleRowClick(dept: Department) {
    if (this.editingId) return; // Don't switch if editing
    this.onSelectDepartment.emit(this.selectedDepartmentId === dept.Id ? null : dept.Id);
  }

  handleEdit(dept: Department, event: Event) {
    event.stopPropagation();
    this.editingId = dept.Id;
    this.editingData = { ...dept };
  }

  handleSave(id: number) {
    if (!this.editingData.DepartmentCode?.trim() || !this.editingData.DepartmentName?.trim()) {
      this.toastService.error('Please enter both Department Code and Name.');
      return;
    }
    const updated = this.departments.map(dept =>
      dept.Id === id ? { ...dept, ...this.editingData, datamodifiedOn: new Date() } : dept
    );
    this.onDepartmentsChange.emit(updated);
    this.editingId = null;
    this.toastService.success('Department updated successfully.');
  }

  handleSaveNew() {
    if (!this.newDepartment.DepartmentCode?.trim() || !this.newDepartment.DepartmentName?.trim()) {
      this.toastService.error('Please enter both Department Code and Name.');
      return;
    }
    const newId = this.departments.length > 0 ? Math.max(...this.departments.map(d => d.Id)) + 1 : 1;
    const dept: Department = {
      Id: newId,
      DepartmentCode: this.newDepartment.DepartmentCode.trim(),
      DepartmentName: this.newDepartment.DepartmentName.trim(),
      dataCreatedOn: new Date(),
      datamodifiedOn: new Date()
    };
    this.onDepartmentsChange.emit([...this.departments, dept]);
    this.isAddingNew = false;
    this.newDepartment = { DepartmentCode: '', DepartmentName: '' };
    this.toastService.success('Department added successfully.');
  }

  handleDelete(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this department?')) {
      const updated = this.departments.filter(d => d.Id !== id);
      this.onDepartmentsChange.emit(updated);
      if (this.selectedDepartmentId === id) {
        this.onSelectDepartment.emit(null);
      }
      this.toastService.success('Department deleted successfully.');
    }
  }
}
