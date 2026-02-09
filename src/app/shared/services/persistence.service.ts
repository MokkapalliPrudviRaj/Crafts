import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {
    private readonly STORAGE_KEY_DEPTS = 'crafts_departments';
    private readonly STORAGE_KEY_STAFFS = 'crafts_staffs';

    saveDepartments(departments: any[]) {
        localStorage.setItem(this.STORAGE_KEY_DEPTS, JSON.stringify(departments));
    }

    loadDepartments(): any[] | null {
        const data = localStorage.getItem(this.STORAGE_KEY_DEPTS);
        return data ? JSON.parse(data) : null;
    }

    saveStaffs(staffs: any[]) {
        localStorage.setItem(this.STORAGE_KEY_STAFFS, JSON.stringify(staffs));
    }

    loadStaffs(): any[] | null {
        const data = localStorage.getItem(this.STORAGE_KEY_STAFFS);
        return data ? JSON.parse(data) : null;
    }
}
