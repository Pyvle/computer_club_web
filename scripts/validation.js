document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    const fullname = document.getElementById('fullname');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    const agreement = document.getElementById('agreement');

    const textFields = [fullname, phone, email, message];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearAllErrors();

        let isValid = true;

        const fullnameValue = fullname.value.trim();
        const fullnameWords = fullnameValue.split(/\s+/).filter(Boolean);
        if (fullnameValue === '') {
            showError(fullname, 'Введите ФИО');
            isValid = false;
        } else if (fullnameWords.length < 2) {
            showError(fullname, 'Введите минимум имя и фамилию');
            isValid = false;
        }

        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Телефон должен содержать минимум 10 цифр');
            isValid = false;
        }

        const emailValue = email.value.trim();
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        if (topic.value === '') {
            showSelectError(topic, 'Выберите тему обращения');
            isValid = false;
        }

        const messageValue = message.value.trim();
        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(message, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else if (messageValue.length > 500) {
            showError(message, 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }

        if (!agreement.checked) {
            showAgreementError('Подтвердите согласие на обработку персональных данных');
            isValid = false;
        }

        if (!isValid) return;

        const formData = {
            fullname: fullnameValue,
            phone: phoneValue,
            email: emailValue,
            topic: topic.value,
            message: messageValue,
            agreement: agreement.checked ? 'Да' : 'Нет'
        };

        document.dispatchEvent(new CustomEvent('formValid', { detail: formData }));
        alert('Форма успешно отправлена. Данные выведены в консоль.');
        form.reset();
    });

    form.addEventListener('reset', function () {
        window.setTimeout(clearAllErrors, 0);
    });

    textFields.forEach(function (field) {
        field.addEventListener('input', function () {
            clearFieldError(field);
        });
    });

    topic.addEventListener('change', function () {
        clearSelectError(topic);
    });

    agreement.addEventListener('change', clearAgreementError);

    function clearAllErrors() {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(function (element) {
            element.classList.remove('is-danger');
        });

        document.querySelectorAll('.select.is-danger').forEach(function (element) {
            element.classList.remove('is-danger');
        });

        const agreementWrapper = document.getElementById('agreementWrapper');
        if (agreementWrapper) {
            agreementWrapper.classList.remove('has-text-danger');
        }

        document.querySelectorAll('.help.is-danger[data-generated="true"]').forEach(function (element) {
            element.remove();
        });
    }

    function clearFieldError(field) {
        field.classList.remove('is-danger');
        const fieldBlock = field.closest('.field');
        if (!fieldBlock) return;
        fieldBlock.querySelectorAll('.help.is-danger[data-generated="true"]').forEach(function (element) {
            element.remove();
        });
    }

    function clearSelectError(selectField) {
        const selectWrapper = selectField.closest('.select');
        if (selectWrapper) {
            selectWrapper.classList.remove('is-danger');
        }

        const fieldBlock = selectField.closest('.field');
        if (!fieldBlock) return;
        fieldBlock.querySelectorAll('.help.is-danger[data-generated="true"]').forEach(function (element) {
            element.remove();
        });
    }

    function clearAgreementError() {
        const agreementWrapper = document.getElementById('agreementWrapper');
        const agreementField = agreement.closest('.field');

        if (agreementWrapper) {
            agreementWrapper.classList.remove('has-text-danger');
        }

        if (!agreementField) return;
        agreementField.querySelectorAll('.help.is-danger[data-generated="true"]').forEach(function (element) {
            element.remove();
        });
    }

    function showError(field, messageText) {
        field.classList.add('is-danger');
        appendError(field.closest('.field'), messageText);
    }

    function showSelectError(selectField, messageText) {
        const selectWrapper = selectField.closest('.select');
        if (selectWrapper) {
            selectWrapper.classList.add('is-danger');
        }
        appendError(selectField.closest('.field'), messageText);
    }

    function showAgreementError(messageText) {
        const agreementWrapper = document.getElementById('agreementWrapper');
        if (agreementWrapper) {
            agreementWrapper.classList.add('has-text-danger');
        }
        appendError(agreement.closest('.field'), messageText);
    }

    function appendError(fieldBlock, messageText) {
        if (!fieldBlock) return;

        const error = document.createElement('p');
        error.className = 'help is-danger';
        error.dataset.generated = 'true';
        error.textContent = messageText;
        fieldBlock.appendChild(error);
    }
});
