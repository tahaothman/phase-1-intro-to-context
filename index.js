// Your code here
// Your code
function createEmployeeRecord(array){
    const recordData ={
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return recordData;

}

function createEmployeeRecords(data){
    return  data.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp){
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    } 

    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    const timeIn = employeeRecord.timeInEvents.find((e)=>e.date === dateStamp);
    const timeOut = employeeRecord.timeOutEvents.find((e)=>e.date === dateStamp);
    const hoursWorkd = (timeOut.hour - timeIn.hour)/100;
    return hoursWorkd;
}

function wagesEarnedOnDate(employeeRecord, date){
    const hours = hoursWorkedOnDate(employeeRecord, date);
    const rate = employeeRecord.payPerHour;
    return hours * rate;
}

function allWagesFor(employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(e => e.date);
    const allWages = datesWorked.reduce((total, date)=> {
        return total + wagesEarnedOnDate(employeeRecord, date);
    },0);
    return allWages;
}

function calculatePayroll(employeeRecord){
    const wages = employeeRecord.map(record => allWagesFor(record));
    return wages.reduce((x,y) => x+y,0)
}