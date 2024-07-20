import Auth from '../../network/auth';
import Utils from '../../utils/utils';

const Login = {
  async init() {
    this.sedangMengirim = false;
    this._initialHandler();
  },

  _initialHandler() {
    const formMasuk = document.querySelector('#formMasuk');
    formMasuk.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.sedangMengirim) return;

        formMasuk.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        this._showSpinner();
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        this._hideSpinner();

        Utils.setelNamaPengguna(response.data.loginResult.name);
        Utils.simpanTokenPengguna(response.data.loginResult.token);
        Utils.tetapkanEmail(formData.email);

        this._goToDashboardPage();
      } catch (error) {
        this._hideSpinner();
        this._showAllert('login', error.response.data.message);
      }
    }
  },

  _showAllert(type, message) {
    const alertPlaceholder = document.getElementById('div-alert');
    alertPlaceholder.innerHTML = `<pembungkus-pemberitahuan type="${type}" message="${message}"></pembungkus-pemberitahuan>`;
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _toggleSpinner(show) {
    this.sedangMengirim = show;
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = show;

    const textButton = document.querySelector('#btn-text-login');
    const spinner = document.querySelector('#spinner');

    if (show) {
      textButton.classList.add('d-none');
      spinner.classList.remove('d-none');
    } else {
      textButton.classList.remove('d-none');
      spinner.classList.add('d-none');
    }
  },

  _showSpinner() {
    this._toggleSpinner(true);
  },

  _hideSpinner() {
    this._toggleSpinner(false);
  },

  _goToDashboardPage() {
    this._showAllert('login-success');

    setTimeout(() => {
      const alertInterval = document.getElementById('alert-interval');

      let timeLeft = 3;
      const intervalId = setInterval(() => {
        if (timeLeft > 0) {
          alertInterval.innerHTML = `${timeLeft} seconds`;
          timeLeft--;
        } else {
          clearInterval(intervalId);
          window.location.href = '/';
        }
      }, 1000);
    }, 0);
  },
};

export default Login;
