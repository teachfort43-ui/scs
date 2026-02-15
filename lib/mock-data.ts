// ==================== STUDENTS ====================
export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  address: string;
  classId: string;
  className: string;
  section: string;
  rollNo: number;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  bloodGroup: string;
  status: "active" | "inactive" | "transferred";
}

export const students: Student[] = [
  { id: "1", studentId: "STU-2024-001", firstName: "James", lastName: "Wilson", email: "james.w@school.edu", phone: "(555) 101-2001", dateOfBirth: "2010-03-15", gender: "Male", address: "142 Oak Street, Springfield", classId: "c6", className: "Class 6", section: "A", rollNo: 1, admissionDate: "2020-04-01", parentName: "Robert Wilson", parentPhone: "(555) 201-3001", parentEmail: "robert.w@email.com", bloodGroup: "O+", status: "active" },
  { id: "2", studentId: "STU-2024-002", firstName: "Sophia", lastName: "Martinez", email: "sophia.m@school.edu", phone: "(555) 101-2002", dateOfBirth: "2010-07-22", gender: "Female", address: "88 Maple Ave, Springfield", classId: "c6", className: "Class 6", section: "A", rollNo: 2, admissionDate: "2020-04-01", parentName: "Carlos Martinez", parentPhone: "(555) 201-3002", parentEmail: "carlos.m@email.com", bloodGroup: "A+", status: "active" },
  { id: "3", studentId: "STU-2024-003", firstName: "Ethan", lastName: "Brown", email: "ethan.b@school.edu", phone: "(555) 101-2003", dateOfBirth: "2009-11-08", gender: "Male", address: "305 Pine Road, Springfield", classId: "c7", className: "Class 7", section: "B", rollNo: 3, admissionDate: "2019-04-01", parentName: "David Brown", parentPhone: "(555) 201-3003", parentEmail: "david.b@email.com", bloodGroup: "B+", status: "active" },
  { id: "4", studentId: "STU-2024-004", firstName: "Olivia", lastName: "Johnson", email: "olivia.j@school.edu", phone: "(555) 101-2004", dateOfBirth: "2009-05-30", gender: "Female", address: "567 Elm Street, Springfield", classId: "c7", className: "Class 7", section: "A", rollNo: 4, admissionDate: "2019-04-01", parentName: "Michael Johnson", parentPhone: "(555) 201-3004", parentEmail: "michael.j@email.com", bloodGroup: "AB+", status: "active" },
  { id: "5", studentId: "STU-2024-005", firstName: "Liam", lastName: "Davis", email: "liam.d@school.edu", phone: "(555) 101-2005", dateOfBirth: "2008-09-12", gender: "Male", address: "23 Cedar Lane, Springfield", classId: "c8", className: "Class 8", section: "A", rollNo: 5, admissionDate: "2018-04-01", parentName: "Thomas Davis", parentPhone: "(555) 201-3005", parentEmail: "thomas.d@email.com", bloodGroup: "O-", status: "active" },
  { id: "6", studentId: "STU-2024-006", firstName: "Emma", lastName: "Garcia", email: "emma.g@school.edu", phone: "(555) 101-2006", dateOfBirth: "2008-01-25", gender: "Female", address: "789 Birch Blvd, Springfield", classId: "c8", className: "Class 8", section: "B", rollNo: 6, admissionDate: "2018-04-01", parentName: "Jose Garcia", parentPhone: "(555) 201-3006", parentEmail: "jose.g@email.com", bloodGroup: "A-", status: "active" },
  { id: "7", studentId: "STU-2024-007", firstName: "Noah", lastName: "Anderson", email: "noah.a@school.edu", phone: "(555) 101-2007", dateOfBirth: "2007-06-18", gender: "Male", address: "456 Walnut St, Springfield", classId: "c9", className: "Class 9", section: "A", rollNo: 7, admissionDate: "2017-04-01", parentName: "James Anderson", parentPhone: "(555) 201-3007", parentEmail: "james.a@email.com", bloodGroup: "B-", status: "active" },
  { id: "8", studentId: "STU-2024-008", firstName: "Ava", lastName: "Thomas", email: "ava.t@school.edu", phone: "(555) 101-2008", dateOfBirth: "2007-12-03", gender: "Female", address: "321 Spruce Way, Springfield", classId: "c9", className: "Class 9", section: "A", rollNo: 8, admissionDate: "2017-04-01", parentName: "William Thomas", parentPhone: "(555) 201-3008", parentEmail: "william.t@email.com", bloodGroup: "O+", status: "active" },
  { id: "9", studentId: "STU-2024-009", firstName: "Mason", lastName: "Taylor", email: "mason.t@school.edu", phone: "(555) 101-2009", dateOfBirth: "2006-04-27", gender: "Male", address: "654 Ash Drive, Springfield", classId: "c10", className: "Class 10", section: "A", rollNo: 9, admissionDate: "2016-04-01", parentName: "Richard Taylor", parentPhone: "(555) 201-3009", parentEmail: "richard.t@email.com", bloodGroup: "A+", status: "active" },
  { id: "10", studentId: "STU-2024-010", firstName: "Isabella", lastName: "Moore", email: "isabella.m@school.edu", phone: "(555) 101-2010", dateOfBirth: "2006-08-14", gender: "Female", address: "987 Poplar Ct, Springfield", classId: "c10", className: "Class 10", section: "B", rollNo: 10, admissionDate: "2016-04-01", parentName: "Charles Moore", parentPhone: "(555) 201-3010", parentEmail: "charles.m@email.com", bloodGroup: "AB-", status: "active" },
  { id: "11", studentId: "STU-2024-011", firstName: "Lucas", lastName: "Jackson", email: "lucas.j@school.edu", phone: "(555) 101-2011", dateOfBirth: "2005-02-09", gender: "Male", address: "111 Willow Rd, Springfield", classId: "c11", className: "Class 11", section: "A", rollNo: 11, admissionDate: "2015-04-01", parentName: "Daniel Jackson", parentPhone: "(555) 201-3011", parentEmail: "daniel.j@email.com", bloodGroup: "O+", status: "active" },
  { id: "12", studentId: "STU-2024-012", firstName: "Mia", lastName: "White", email: "mia.w@school.edu", phone: "(555) 101-2012", dateOfBirth: "2005-10-21", gender: "Female", address: "222 Cherry Ln, Springfield", classId: "c11", className: "Class 11", section: "B", rollNo: 12, admissionDate: "2015-04-01", parentName: "George White", parentPhone: "(555) 201-3012", parentEmail: "george.w@email.com", bloodGroup: "B+", status: "active" },
  { id: "13", studentId: "STU-2024-013", firstName: "Alexander", lastName: "Harris", email: "alex.h@school.edu", phone: "(555) 101-2013", dateOfBirth: "2004-07-05", gender: "Male", address: "333 Dogwood Dr, Springfield", classId: "c12", className: "Class 12", section: "A", rollNo: 13, admissionDate: "2014-04-01", parentName: "Edward Harris", parentPhone: "(555) 201-3013", parentEmail: "edward.h@email.com", bloodGroup: "A+", status: "active" },
  { id: "14", studentId: "STU-2024-014", firstName: "Charlotte", lastName: "Clark", email: "charlotte.c@school.edu", phone: "(555) 101-2014", dateOfBirth: "2004-03-19", gender: "Female", address: "444 Magnolia St, Springfield", classId: "c12", className: "Class 12", section: "A", rollNo: 14, admissionDate: "2014-04-01", parentName: "Frank Clark", parentPhone: "(555) 201-3014", parentEmail: "frank.c@email.com", bloodGroup: "O-", status: "active" },
  { id: "15", studentId: "STU-2024-015", firstName: "Benjamin", lastName: "Lewis", email: "ben.l@school.edu", phone: "(555) 101-2015", dateOfBirth: "2010-11-28", gender: "Male", address: "555 Sycamore Ave, Springfield", classId: "c6", className: "Class 6", section: "B", rollNo: 15, admissionDate: "2020-04-01", parentName: "Henry Lewis", parentPhone: "(555) 201-3015", parentEmail: "henry.l@email.com", bloodGroup: "AB+", status: "active" },
  { id: "16", studentId: "STU-2024-016", firstName: "Amelia", lastName: "Robinson", email: "amelia.r@school.edu", phone: "(555) 101-2016", dateOfBirth: "2009-08-06", gender: "Female", address: "666 Hickory Pl, Springfield", classId: "c7", className: "Class 7", section: "A", rollNo: 16, admissionDate: "2019-04-01", parentName: "Paul Robinson", parentPhone: "(555) 201-3016", parentEmail: "paul.r@email.com", bloodGroup: "B-", status: "inactive" },
  { id: "17", studentId: "STU-2024-017", firstName: "Daniel", lastName: "Walker", email: "daniel.w@school.edu", phone: "(555) 101-2017", dateOfBirth: "2008-12-17", gender: "Male", address: "777 Redwood Ct, Springfield", classId: "c8", className: "Class 8", section: "A", rollNo: 17, admissionDate: "2018-04-01", parentName: "Kenneth Walker", parentPhone: "(555) 201-3017", parentEmail: "kenneth.w@email.com", bloodGroup: "A-", status: "active" },
  { id: "18", studentId: "STU-2024-018", firstName: "Harper", lastName: "Young", email: "harper.y@school.edu", phone: "(555) 101-2018", dateOfBirth: "2007-04-11", gender: "Female", address: "888 Juniper Way, Springfield", classId: "c9", className: "Class 9", section: "B", rollNo: 18, admissionDate: "2017-04-01", parentName: "Steven Young", parentPhone: "(555) 201-3018", parentEmail: "steven.y@email.com", bloodGroup: "O+", status: "active" },
  { id: "19", studentId: "STU-2024-019", firstName: "Sebastian", lastName: "King", email: "sebastian.k@school.edu", phone: "(555) 101-2019", dateOfBirth: "2006-06-23", gender: "Male", address: "999 Hazel Blvd, Springfield", classId: "c10", className: "Class 10", section: "A", rollNo: 19, admissionDate: "2016-04-01", parentName: "Brian King", parentPhone: "(555) 201-3019", parentEmail: "brian.k@email.com", bloodGroup: "B+", status: "transferred" },
  { id: "20", studentId: "STU-2024-020", firstName: "Evelyn", lastName: "Wright", email: "evelyn.w@school.edu", phone: "(555) 101-2020", dateOfBirth: "2005-09-02", gender: "Female", address: "1010 Aspen Rd, Springfield", classId: "c11", className: "Class 11", section: "A", rollNo: 20, admissionDate: "2015-04-01", parentName: "Mark Wright", parentPhone: "(555) 201-3020", parentEmail: "mark.w@email.com", bloodGroup: "A+", status: "active" },
];

// ==================== TEACHERS ====================
export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  subjects: string[];
  qualification: string;
  joinDate: string;
  status: "active" | "on-leave" | "inactive";
}

export const teachers: Teacher[] = [
  { id: "t1", employeeId: "TCH-001", firstName: "Dr. Sarah", lastName: "Mitchell", email: "sarah.m@school.edu", phone: "(555) 301-4001", department: "Mathematics", designation: "Head of Department", subjects: ["Mathematics", "Statistics"], qualification: "Ph.D. Mathematics", joinDate: "2015-06-15", status: "active" },
  { id: "t2", employeeId: "TCH-002", firstName: "John", lastName: "Campbell", email: "john.c@school.edu", phone: "(555) 301-4002", department: "Science", designation: "Senior Teacher", subjects: ["Physics", "General Science"], qualification: "M.Sc. Physics", joinDate: "2016-08-01", status: "active" },
  { id: "t3", employeeId: "TCH-003", firstName: "Emily", lastName: "Rodriguez", email: "emily.r@school.edu", phone: "(555) 301-4003", department: "English", designation: "Head of Department", subjects: ["English Literature", "Creative Writing"], qualification: "M.A. English", joinDate: "2014-04-10", status: "active" },
  { id: "t4", employeeId: "TCH-004", firstName: "Michael", lastName: "Chen", email: "michael.c@school.edu", phone: "(555) 301-4004", department: "Science", designation: "Teacher", subjects: ["Chemistry", "Biology"], qualification: "M.Sc. Chemistry", joinDate: "2018-07-20", status: "active" },
  { id: "t5", employeeId: "TCH-005", firstName: "Patricia", lastName: "Adams", email: "patricia.a@school.edu", phone: "(555) 301-4005", department: "Social Studies", designation: "Senior Teacher", subjects: ["History", "Geography"], qualification: "M.A. History", joinDate: "2013-03-05", status: "active" },
  { id: "t6", employeeId: "TCH-006", firstName: "David", lastName: "Kim", email: "david.k@school.edu", phone: "(555) 301-4006", department: "Computer Science", designation: "Head of Department", subjects: ["Computer Science", "Information Technology"], qualification: "M.Tech. CS", joinDate: "2017-01-15", status: "active" },
  { id: "t7", employeeId: "TCH-007", firstName: "Jennifer", lastName: "Lee", email: "jennifer.l@school.edu", phone: "(555) 301-4007", department: "Mathematics", designation: "Teacher", subjects: ["Mathematics"], qualification: "M.Sc. Mathematics", joinDate: "2019-06-01", status: "active" },
  { id: "t8", employeeId: "TCH-008", firstName: "Robert", lastName: "Singh", email: "robert.s@school.edu", phone: "(555) 301-4008", department: "Physical Education", designation: "Sports Director", subjects: ["Physical Education", "Health"], qualification: "B.P.Ed.", joinDate: "2016-02-20", status: "active" },
  { id: "t9", employeeId: "TCH-009", firstName: "Maria", lastName: "Thompson", email: "maria.t@school.edu", phone: "(555) 301-4009", department: "Arts", designation: "Teacher", subjects: ["Fine Arts", "Music"], qualification: "M.F.A.", joinDate: "2020-08-15", status: "on-leave" },
  { id: "t10", employeeId: "TCH-010", firstName: "William", lastName: "Patel", email: "william.p@school.edu", phone: "(555) 301-4010", department: "Science", designation: "Teacher", subjects: ["Biology"], qualification: "M.Sc. Biology", joinDate: "2021-01-10", status: "active" },
  { id: "t11", employeeId: "TCH-011", firstName: "Lisa", lastName: "Nguyen", email: "lisa.n@school.edu", phone: "(555) 301-4011", department: "Languages", designation: "Teacher", subjects: ["French", "Spanish"], qualification: "M.A. French", joinDate: "2019-09-01", status: "active" },
  { id: "t12", employeeId: "TCH-012", firstName: "Andrew", lastName: "Baker", email: "andrew.b@school.edu", phone: "(555) 301-4012", department: "English", designation: "Teacher", subjects: ["English", "Drama"], qualification: "M.A. English", joinDate: "2022-04-01", status: "active" },
];

// ==================== CLASSES ====================
export interface SchoolClass {
  id: string;
  name: string;
  sections: string[];
  studentCount: number;
  classTeacher: string;
  room: string;
}

export const classes: SchoolClass[] = [
  { id: "c1", name: "Nursery", sections: ["A"], studentCount: 25, classTeacher: "Maria Thompson", room: "G-01" },
  { id: "c2", name: "LKG", sections: ["A", "B"], studentCount: 45, classTeacher: "Jennifer Lee", room: "G-02" },
  { id: "c3", name: "UKG", sections: ["A", "B"], studentCount: 48, classTeacher: "Lisa Nguyen", room: "G-03" },
  { id: "c4", name: "Class 1", sections: ["A", "B"], studentCount: 52, classTeacher: "Patricia Adams", room: "1-01" },
  { id: "c5", name: "Class 2", sections: ["A", "B"], studentCount: 50, classTeacher: "Andrew Baker", room: "1-02" },
  { id: "c6", name: "Class 6", sections: ["A", "B"], studentCount: 56, classTeacher: "Emily Rodriguez", room: "2-01" },
  { id: "c7", name: "Class 7", sections: ["A", "B"], studentCount: 54, classTeacher: "John Campbell", room: "2-02" },
  { id: "c8", name: "Class 8", sections: ["A", "B"], studentCount: 52, classTeacher: "Michael Chen", room: "2-03" },
  { id: "c9", name: "Class 9", sections: ["A", "B"], studentCount: 50, classTeacher: "Dr. Sarah Mitchell", room: "3-01" },
  { id: "c10", name: "Class 10", sections: ["A", "B"], studentCount: 48, classTeacher: "David Kim", room: "3-02" },
  { id: "c11", name: "Class 11", sections: ["A", "B", "C"], studentCount: 72, classTeacher: "William Patel", room: "3-03" },
  { id: "c12", name: "Class 12", sections: ["A", "B", "C"], studentCount: 68, classTeacher: "Robert Singh", room: "3-04" },
];

// ==================== SUBJECTS ====================
export interface Subject {
  id: string;
  code: string;
  name: string;
  type: "Core" | "Elective";
  department: string;
  classes: string[];
  teacher: string;
  credits: number;
}

export const subjects: Subject[] = [
  { id: "s1", code: "MATH-101", name: "Mathematics", type: "Core", department: "Mathematics", classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"], teacher: "Dr. Sarah Mitchell", credits: 5 },
  { id: "s2", code: "ENG-101", name: "English", type: "Core", department: "English", classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"], teacher: "Emily Rodriguez", credits: 5 },
  { id: "s3", code: "PHY-101", name: "Physics", type: "Core", department: "Science", classes: ["Class 9", "Class 10", "Class 11", "Class 12"], teacher: "John Campbell", credits: 4 },
  { id: "s4", code: "CHE-101", name: "Chemistry", type: "Core", department: "Science", classes: ["Class 9", "Class 10", "Class 11", "Class 12"], teacher: "Michael Chen", credits: 4 },
  { id: "s5", code: "BIO-101", name: "Biology", type: "Core", department: "Science", classes: ["Class 9", "Class 10", "Class 11", "Class 12"], teacher: "William Patel", credits: 4 },
  { id: "s6", code: "HIS-101", name: "History", type: "Core", department: "Social Studies", classes: ["Class 6", "Class 7", "Class 8"], teacher: "Patricia Adams", credits: 3 },
  { id: "s7", code: "GEO-101", name: "Geography", type: "Core", department: "Social Studies", classes: ["Class 6", "Class 7", "Class 8"], teacher: "Patricia Adams", credits: 3 },
  { id: "s8", code: "CS-101", name: "Computer Science", type: "Elective", department: "Computer Science", classes: ["Class 9", "Class 10", "Class 11", "Class 12"], teacher: "David Kim", credits: 3 },
  { id: "s9", code: "ART-101", name: "Fine Arts", type: "Elective", department: "Arts", classes: ["Class 6", "Class 7", "Class 8"], teacher: "Maria Thompson", credits: 2 },
  { id: "s10", code: "FRN-101", name: "French", type: "Elective", department: "Languages", classes: ["Class 6", "Class 7", "Class 8", "Class 9"], teacher: "Lisa Nguyen", credits: 3 },
];

// ==================== ATTENDANCE ====================
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
}

export const attendanceRecords: AttendanceRecord[] = students.flatMap((s) => {
  const statuses: ("present" | "absent" | "late" | "excused")[] = ["present", "absent", "late", "excused"];
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (4 - i));
    const rand = Math.random();
    const status = rand < 0.8 ? "present" : rand < 0.9 ? "late" : rand < 0.95 ? "excused" : "absent";
    return {
      id: `att-${s.id}-${i}`,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      className: s.className,
      section: s.section,
      date: date.toISOString().split("T")[0],
      status,
    };
  });
});

// ==================== GRADES ====================
export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  subject: string;
  term: string;
  classwork: number;
  homework: number;
  midterm: number;
  final: number;
  total: number;
  grade: string;
}

function calcGrade(total: number): string {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B+";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  return "F";
}

export const gradeRecords: GradeRecord[] = students.slice(0, 10).flatMap((s) => {
  return ["Mathematics", "English", "Physics"].map((subject, i) => {
    const classwork = Math.floor(Math.random() * 10) + 15;
    const homework = Math.floor(Math.random() * 10) + 15;
    const midterm = Math.floor(Math.random() * 15) + 20;
    const final = Math.floor(Math.random() * 20) + 25;
    const total = classwork + homework + midterm + final;
    return {
      id: `grade-${s.id}-${i}`,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      className: s.className,
      subject,
      term: "Term 1 (2024-2025)",
      classwork,
      homework,
      midterm,
      final,
      total,
      grade: calcGrade(total),
    };
  });
});

// ==================== FEES ====================
export interface FeeStructure {
  id: string;
  className: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  transportFee: number;
  totalFee: number;
}

export const feeStructures: FeeStructure[] = [
  { id: "fs1", className: "Nursery", tuitionFee: 2000, labFee: 0, libraryFee: 200, sportsFee: 300, transportFee: 500, totalFee: 3000 },
  { id: "fs2", className: "LKG", tuitionFee: 2200, labFee: 0, libraryFee: 200, sportsFee: 300, transportFee: 500, totalFee: 3200 },
  { id: "fs3", className: "UKG", tuitionFee: 2200, labFee: 0, libraryFee: 200, sportsFee: 300, transportFee: 500, totalFee: 3200 },
  { id: "fs4", className: "Class 6", tuitionFee: 3500, labFee: 500, libraryFee: 300, sportsFee: 400, transportFee: 500, totalFee: 5200 },
  { id: "fs5", className: "Class 7", tuitionFee: 3500, labFee: 500, libraryFee: 300, sportsFee: 400, transportFee: 500, totalFee: 5200 },
  { id: "fs6", className: "Class 8", tuitionFee: 3800, labFee: 600, libraryFee: 300, sportsFee: 400, transportFee: 500, totalFee: 5600 },
  { id: "fs7", className: "Class 9", tuitionFee: 4200, labFee: 800, libraryFee: 400, sportsFee: 400, transportFee: 500, totalFee: 6300 },
  { id: "fs8", className: "Class 10", tuitionFee: 4500, labFee: 800, libraryFee: 400, sportsFee: 400, transportFee: 500, totalFee: 6600 },
  { id: "fs9", className: "Class 11", tuitionFee: 5000, labFee: 1000, libraryFee: 500, sportsFee: 400, transportFee: 500, totalFee: 7400 },
  { id: "fs10", className: "Class 12", tuitionFee: 5000, labFee: 1000, libraryFee: 500, sportsFee: 400, transportFee: 500, totalFee: 7400 },
];

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  amount: number;
  paidDate: string;
  method: "Cash" | "Card" | "Bank Transfer" | "Online";
  status: "paid" | "pending" | "overdue";
  receiptNo: string;
}

export const feePayments: FeePayment[] = [
  { id: "fp1", studentId: "1", studentName: "James Wilson", className: "Class 6", amount: 5200, paidDate: "2024-09-05", method: "Online", status: "paid", receiptNo: "REC-2024-001" },
  { id: "fp2", studentId: "2", studentName: "Sophia Martinez", className: "Class 6", amount: 5200, paidDate: "2024-09-03", method: "Bank Transfer", status: "paid", receiptNo: "REC-2024-002" },
  { id: "fp3", studentId: "3", studentName: "Ethan Brown", className: "Class 7", amount: 5200, paidDate: "", method: "Cash", status: "pending", receiptNo: "" },
  { id: "fp4", studentId: "4", studentName: "Olivia Johnson", className: "Class 7", amount: 5200, paidDate: "2024-09-01", method: "Card", status: "paid", receiptNo: "REC-2024-004" },
  { id: "fp5", studentId: "5", studentName: "Liam Davis", className: "Class 8", amount: 5600, paidDate: "", method: "Cash", status: "overdue", receiptNo: "" },
  { id: "fp6", studentId: "6", studentName: "Emma Garcia", className: "Class 8", amount: 5600, paidDate: "2024-09-10", method: "Online", status: "paid", receiptNo: "REC-2024-006" },
  { id: "fp7", studentId: "7", studentName: "Noah Anderson", className: "Class 9", amount: 6300, paidDate: "2024-09-02", method: "Bank Transfer", status: "paid", receiptNo: "REC-2024-007" },
  { id: "fp8", studentId: "8", studentName: "Ava Thomas", className: "Class 9", amount: 6300, paidDate: "", method: "Cash", status: "pending", receiptNo: "" },
  { id: "fp9", studentId: "9", studentName: "Mason Taylor", className: "Class 10", amount: 6600, paidDate: "2024-09-08", method: "Card", status: "paid", receiptNo: "REC-2024-009" },
  { id: "fp10", studentId: "10", studentName: "Isabella Moore", className: "Class 10", amount: 6600, paidDate: "2024-09-12", method: "Online", status: "paid", receiptNo: "REC-2024-010" },
];

// ==================== LIBRARY ====================
export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  status: "available" | "low-stock" | "out-of-stock";
}

export const libraryBooks: LibraryBook[] = [
  { id: "b1", isbn: "978-0-06-112008-4", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", totalCopies: 5, availableCopies: 3, shelfLocation: "A-01", status: "available" },
  { id: "b2", isbn: "978-0-452-28423-4", title: "1984", author: "George Orwell", category: "Fiction", totalCopies: 4, availableCopies: 1, shelfLocation: "A-02", status: "low-stock" },
  { id: "b3", isbn: "978-0-7432-7356-5", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", totalCopies: 3, availableCopies: 2, shelfLocation: "B-01", status: "available" },
  { id: "b4", isbn: "978-0-13-468599-1", title: "The C Programming Language", author: "Kernighan & Ritchie", category: "Technology", totalCopies: 3, availableCopies: 0, shelfLocation: "C-01", status: "out-of-stock" },
  { id: "b5", isbn: "978-0-07-352332-3", title: "Concepts of Physics", author: "H.C. Verma", category: "Science", totalCopies: 8, availableCopies: 5, shelfLocation: "B-02", status: "available" },
  { id: "b6", isbn: "978-0-19-853252-7", title: "Oxford English Dictionary", author: "Oxford Press", category: "Reference", totalCopies: 10, availableCopies: 8, shelfLocation: "D-01", status: "available" },
  { id: "b7", isbn: "978-0-321-12521-7", title: "Domain-Driven Design", author: "Eric Evans", category: "Technology", totalCopies: 2, availableCopies: 1, shelfLocation: "C-02", status: "low-stock" },
  { id: "b8", isbn: "978-0-14-028329-7", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", totalCopies: 6, availableCopies: 4, shelfLocation: "A-03", status: "available" },
  { id: "b9", isbn: "978-0-07-340218-1", title: "Higher Algebra", author: "Hall & Knight", category: "Mathematics", totalCopies: 5, availableCopies: 3, shelfLocation: "B-03", status: "available" },
  { id: "b10", isbn: "978-0-393-97042-5", title: "World History", author: "William Duiker", category: "History", totalCopies: 4, availableCopies: 2, shelfLocation: "D-02", status: "available" },
];

// ==================== TRANSPORT ====================
export interface TransportRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  driver: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: number;
  currentStudents: number;
  stops: string[];
  departureTime: string;
  arrivalTime: string;
}

export const transportRoutes: TransportRoute[] = [
  { id: "tr1", routeNumber: "R-01", routeName: "North Springfield", driver: "Mike Patterson", driverPhone: "(555) 401-5001", vehicleNumber: "BUS-101", vehicleType: "Bus (45 seater)", capacity: 45, currentStudents: 38, stops: ["Oak Street", "Maple Ave", "Pine Road", "Cedar Lane", "School"], departureTime: "7:00 AM", arrivalTime: "7:45 AM" },
  { id: "tr2", routeNumber: "R-02", routeName: "South Springfield", driver: "Tom Richards", driverPhone: "(555) 401-5002", vehicleNumber: "BUS-102", vehicleType: "Bus (45 seater)", capacity: 45, currentStudents: 42, stops: ["Elm Street", "Birch Blvd", "Walnut St", "Spruce Way", "School"], departureTime: "7:00 AM", arrivalTime: "7:50 AM" },
  { id: "tr3", routeNumber: "R-03", routeName: "East Springfield", driver: "Sam Cooper", driverPhone: "(555) 401-5003", vehicleNumber: "VAN-201", vehicleType: "Mini Van (15 seater)", capacity: 15, currentStudents: 12, stops: ["Ash Drive", "Poplar Ct", "Willow Rd", "School"], departureTime: "7:15 AM", arrivalTime: "7:45 AM" },
  { id: "tr4", routeNumber: "R-04", routeName: "West Springfield", driver: "Jake Morrison", driverPhone: "(555) 401-5004", vehicleNumber: "BUS-103", vehicleType: "Bus (45 seater)", capacity: 45, currentStudents: 35, stops: ["Cherry Ln", "Hickory Pl", "Redwood Ct", "Dogwood Dr", "Magnolia St", "School"], departureTime: "6:50 AM", arrivalTime: "7:45 AM" },
];

// ==================== ANNOUNCEMENTS ====================
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetAudience: "All" | "Teachers" | "Students" | "Parents";
  priority: "normal" | "important" | "urgent";
}

export const announcements: Announcement[] = [
  { id: "a1", title: "Annual Sports Day", content: "We are excited to announce that the Annual Sports Day will be held on March 15, 2025. All students are encouraged to participate in various events including track and field, relay races, and team sports. Registration forms are available at the sports department.", author: "Robert Singh", date: "2025-02-01", targetAudience: "All", priority: "important" },
  { id: "a2", title: "Parent-Teacher Meeting", content: "The quarterly parent-teacher meeting is scheduled for February 20, 2025. Parents are requested to attend between 9:00 AM and 1:00 PM. Individual time slots will be shared via email. Please confirm your attendance by February 15.", author: "Dr. Sarah Mitchell", date: "2025-02-05", targetAudience: "Parents", priority: "important" },
  { id: "a3", title: "Science Fair 2025", content: "Calling all young scientists! The annual Science Fair will be held on April 5, 2025. Students from Class 6 to Class 12 can submit their projects. Themes this year include Renewable Energy, AI & Robotics, and Environmental Conservation.", author: "Michael Chen", date: "2025-02-08", targetAudience: "Students", priority: "normal" },
  { id: "a4", title: "Staff Development Workshop", content: "A mandatory professional development workshop on 'Modern Teaching Methodologies' will be conducted on February 22, 2025. The workshop will be led by Dr. Amanda Foster from the National Education Board. All teaching staff must attend.", author: "Emily Rodriguez", date: "2025-02-10", targetAudience: "Teachers", priority: "urgent" },
  { id: "a5", title: "Library New Arrivals", content: "The school library has added 50 new books across Science, Literature, and Technology sections. Students can explore the new collection starting February 12. Special reading hour sessions will be held every Wednesday.", author: "Lisa Nguyen", date: "2025-02-11", targetAudience: "All", priority: "normal" },
];

// ==================== DASHBOARD STATS ====================
export const dashboardStats = {
  totalStudents: 1234,
  totalTeachers: 85,
  totalClasses: 24,
  feeCollectionRate: 85,
  todayAttendance: 94,
  recentActivities: [
    { id: "ra1", text: "James Wilson submitted assignment for Mathematics", time: "10 minutes ago", type: "assignment" },
    { id: "ra2", text: "Fee payment received from Sophia Martinez ($5,200)", time: "25 minutes ago", type: "payment" },
    { id: "ra3", text: "New student Evelyn Wright enrolled in Class 11", time: "1 hour ago", type: "enrollment" },
    { id: "ra4", text: "Dr. Sarah Mitchell posted grades for Class 9 Mathematics", time: "2 hours ago", type: "grade" },
    { id: "ra5", text: "Annual Sports Day announcement published", time: "3 hours ago", type: "announcement" },
  ],
  upcomingEvents: [
    { id: "ue1", title: "Parent-Teacher Meeting", date: "Feb 20, 2025", type: "meeting" },
    { id: "ue2", title: "Annual Sports Day", date: "Mar 15, 2025", type: "event" },
    { id: "ue3", title: "Science Fair 2025", date: "Apr 5, 2025", type: "event" },
  ],
  attendanceData: [
    { day: "Mon", present: 94, absent: 6 },
    { day: "Tue", present: 92, absent: 8 },
    { day: "Wed", present: 96, absent: 4 },
    { day: "Thu", present: 91, absent: 9 },
    { day: "Fri", present: 93, absent: 7 },
  ],
};
