document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;
        const timestamp = new Date().toLocaleString('ru-RU');

        console.clear();
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Тема:', formData.topic);
        console.log('Сообщение:', formData.message);
        console.log('Согласие на обработку данных:', formData.agreement);
        console.log('Время отправки:', timestamp);
    });
});
