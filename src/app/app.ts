import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { StaffComponent } from './features/staff/staff';
import { DepartmentComponent } from './features/department/department';
import { departments as initialDepts, staffs as initialStaffs } from './shared/data';
import { PersistenceService } from './shared/services/persistence.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { Department, Staff } from './shared/models/models';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LucideAngularModule, StaffComponent, DepartmentComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private persistenceService = inject(PersistenceService);

  departments: Department[] = [];
  staffs: Staff[] = [];
  selectedDepartmentId: number | null = null;

  ngOnInit() {
    this.departments = this.persistenceService.loadDepartments() || initialDepts;
    this.staffs = this.persistenceService.loadStaffs() || initialStaffs;
  }

  handleDepartmentsChange(updated: Department[]) {
    this.departments = updated;
    this.persistenceService.saveDepartments(updated);
  }

  handleStaffsChange(updated: Staff[]) {
    this.staffs = updated;
    this.persistenceService.saveStaffs(updated);
  }

  getSelectedDeptName() {
    return this.departments.find(d => d.Id === this.selectedDepartmentId)?.DepartmentName || null;
  }
}
