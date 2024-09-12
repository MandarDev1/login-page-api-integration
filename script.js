document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');
    let valid = true;

 
    usernameError.textContent = '';
    passwordError.textContent = '';
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    if (successMessage) {
        successMessage.textContent = '';
        successMessage.style.display = 'none';
    }

   
    if (!username || !/^\S+@\S+\.\S+$/.test(username)) {
        usernameError.textContent = 'Please enter a valid email address.';
        usernameError.style.display = 'block';
        valid = false;
    }

    
    if (!password) {
        passwordError.textContent = 'Password cannot be empty.';
        passwordError.style.display = 'block';
        valid = false;
    }

    if (valid) {
        const loginBtn = document.getElementById('loginBtn');
        const spinner = document.getElementById('spinner');
        loginBtn.disabled = true;
        spinner.style.display = 'block';

      
        setTimeout(() => {
         
            spinner.style.display = 'none';
            loginBtn.disabled = false;

       
            let successMsg = document.getElementById('successMessage');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.id = 'successMessage';
                successMsg.style.color = 'green';
                successMsg.style.marginTop = '10px';
                document.querySelector('.login-container').appendChild(successMsg);
            }
            successMsg.textContent = 'Login successful!';
            successMsg.style.display = 'block';
        }, 2000);
    }
});
