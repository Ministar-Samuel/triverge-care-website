const { performance } = require('perf_hooks');

// Generate mock data
const students = [];
for (let i = 0; i < 100000; i++) {
    students.push({
        status: ['enrolled', 'graduated', 'cancelled'][Math.floor(Math.random() * 3)],
        amount_paid: Math.random() * 1000
    });
}

function oldMethod(students) {
    const start = performance.now();

    const totalStudents = students.length;
    const enrolledCount = students.filter(s => s.status === "enrolled").length;
    const graduatedCount = students.filter(s => s.status === "graduated").length;
    const cancelledCount = students.filter(s => s.status === "cancelled").length;
    const totalRevenue = students.reduce((sum, s) => sum + (s.amount_paid || 0), 0);

    const end = performance.now();
    return end - start;
}

function newMethod(students) {
    const start = performance.now();

    let enrolledCount = 0;
    let graduatedCount = 0;
    let cancelledCount = 0;
    let totalRevenue = 0;

    for (let i = 0; i < students.length; i++) {
        const s = students[i];
        if (s.status === "enrolled") enrolledCount++;
        else if (s.status === "graduated") graduatedCount++;
        else if (s.status === "cancelled") cancelledCount++;
        totalRevenue += (s.amount_paid || 0);
    }
    const totalStudents = students.length;

    const end = performance.now();
    return end - start;
}

// Warmup
for (let i = 0; i < 10; i++) {
    oldMethod(students);
    newMethod(students);
}

let oldTotal = 0;
let newTotal = 0;
const iterations = 100;

for (let i = 0; i < iterations; i++) {
    oldTotal += oldMethod(students);
    newTotal += newMethod(students);
}

console.log(`Old method average: ${oldTotal / iterations} ms`);
console.log(`New method average: ${newTotal / iterations} ms`);
console.log(`Improvement: ${((oldTotal - newTotal) / oldTotal * 100).toFixed(2)}%`);
