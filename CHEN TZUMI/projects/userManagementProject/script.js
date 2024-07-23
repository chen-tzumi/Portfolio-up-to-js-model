document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    const updateUserTable = () => {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = userTable.insertRow();
            row.insertCell(0).innerText = user.firstName;
            row.insertCell(1).innerText = user.lastName;
            row.insertCell(2).innerText = user.email;
            row.insertCell(3).innerText = user.status;
            const actionsCell = row.insertCell(4);
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                //splice : index of the row and number of elements to delete from this index
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                updateUserTable();
            });
            actionsCell.appendChild(deleteButton);
            
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => {
                const newFirstName = prompt('Enter new first name', user.firstName);
                const newLastName = prompt('Enter new last name', user.lastName);
                if (newFirstName && newLastName) {
                    user.firstName = newFirstName;
                    user.lastName = newLastName;
                    localStorage.setItem('users', JSON.stringify(users));
                    updateUserTable();
                }
            });
            actionsCell.appendChild(editButton);

            const disconnectButton = document.createElement('button');
            disconnectButton.innerText = 'Disconnect';
            disconnectButton.addEventListener('click', () => {
                user.status = 'Disconnected';
                localStorage.setItem('users', JSON.stringify(users));
                updateUserTable();
            });
            actionsCell.appendChild(disconnectButton);
        });
    };

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (users.find(user => user.email === email)) {
            alert('Email already registered.');
            return;
        }

        const user = { firstName, lastName, email, password, status: 'Disconnected' };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        updateUserTable();
        registerForm.reset();
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            user.status = 'Connected';
            localStorage.setItem('users', JSON.stringify(users));
            updateUserTable();
            loginForm.reset();
        } else {
            alert('Invalid email or password.');
        }
    });

    updateUserTable();
});
