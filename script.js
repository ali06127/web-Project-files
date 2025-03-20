function togglePassword(inputId) {
    let input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function handleForgotPassword(event) {
    event.preventDefault();
    document.getElementById('forgot-email-form').classList.add('hidden');
    document.getElementById('forgot-otp-form').classList.remove('hidden');
}
