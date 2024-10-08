// بيانات الموظفين (يمكن حفظها في LocalStorage)
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// التعامل مع تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const employee = employees.find(emp => emp.username === username && emp.password === password);

    if (employee) {
        localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
});

// تسجيل موظف جديد
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    employees.push({ username: newUsername, password: newPassword, leaveDays: 0 });
    localStorage.setItem('employees', JSON.stringify(employees));

    document.getElementById('successMsg').style.display = 'block';
});

// التعامل مع لوحة التحكم
document.addEventListener('DOMContentLoaded', function () {
    const loggedInEmployee = JSON.parse(localStorage.getItem('loggedInEmployee'));
    if (loggedInEmployee) {
        document.getElementById('employeeName').textContent = loggedInEmployee.username;
        document.getElementById('leaveDays').textContent = loggedInEmployee.leaveDays;
    } else {
        window.location.href = 'index.html';
    }
});

// تسجيل الخروج
document.getElementById('logoutBtn')?.addEventListener('click', function () {
    localStorage.removeItem('loggedInEmployee');
    window.location.href = 'index.html';
});
