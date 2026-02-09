export interface Department {
    Id: number;
    DepartmentCode: string;
    DepartmentName: string;
    dataCreatedOn: Date;
    datamodifiedOn: Date;
}

export interface Staff {
    Id: number;
    StaffCode: string;
    StaffName: string;
    DepartmentName: string;
    dataCreatedOn: Date;
    datamodifiedOn: Date;
    DepartmentId: number; // Foreign key to link to Department
}