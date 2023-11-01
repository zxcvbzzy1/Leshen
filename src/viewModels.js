export class User {
    constructor(UserID,UseName,UserPassword = null) {
        this.UserID = UserID
        this.UseName =UseName
        this.UserPassword = UserPassword
    }
}

export class Student {
    constructor(StuID,StuName,StuAge,StuGrade,Stusex,StuMajor,StuHomeAddress,StuPhoneNumber,StuDromInfor,ClassID,DromID) {
        this.stuId = StuID
        this.stuName =StuName
        this.stuAge = StuAge
        this.stuGrade=StuGrade
        this.stusex =Stusex
        this.stuMajor=StuMajor
        this.stuHomeAddress=StuHomeAddress
        this.stuPhoneNumber=StuPhoneNumber
        this.stuDromInfor=StuDromInfor
        this.classId=ClassID
        this.dromId=DromID
    }

}

export class Counselor {
    constructor(UniCounselorID,UniCounselorName,UniCounselorAge,UniCounselorAddress,UniCounselorPhoneNum,ClassID) {
        this.uniCounselorId =UniCounselorID
        this.uniCounselorName=UniCounselorName
        this.uniCounselorAge=UniCounselorAge
        this.uniCounselorAddress =UniCounselorAddress
        this.uniCounselorPhoneNum=UniCounselorPhoneNum
        this.classId=ClassID
    }
}
