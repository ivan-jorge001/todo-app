import React, { Component } from 'react';
import classnames from 'classnames';
import { ROUTES } from '../routes';

// Components
import Input from '../../components/Input/Input';
import Button from '../../components/Button';

//Utils
import translate from '../..//utils/string-translation';

// Images
import brandIcon from '../../images/GELargeLogo.png';
import brandIconMobile from '../../images/GEShortLogo.png';

// Styles
import './AuthPage.css';

export default class AuthPage extends Component {
  state = {
    login: true,
    loginForm: {
      email: '',
      password: '',
    },
    signUpForm: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  showLogin = () => {
    this.setState({ login: true, signUpForm: {} });
  }

  showSignUp = () => {
    this.setState({ login: false, loginForm: {} });
  }

  login = () => {
    const data = {
      email: this.state.loginForm.email,
      password: this.state.loginForm.password,
    };

    console.log(data);
    this.props.history.push(ROUTES['Home']);
  }

  signup = () => {
    const data = {
      firstName: this.state.signUpForm.firstName,
      lastName: this.state.signUpForm.lastName,
      email: this.state.signUpForm.email,
      password: this.state.signUpForm.password,
    };

    console.log(data);
    this.props.history.push(ROUTES['Home']);
  }

  handleLoginFormChange = (e, inputName, value) => {
    this.setState({ loginForm: { ...this.state.loginForm, [inputName]: value } });
  }

  handleSignUpFormChange = (e, inputName, value) => {
    this.setState({ signUpForm: { ...this.state.signUpForm, [inputName]: value } });
  }

  renderFormDescription(title, subtitle, buttonName, onClick) {
    return (
      <div className="panelText">
        <h1 className="title">{translate(title)}</h1>
        <span className="subtitle">{translate(subtitle)}</span>
        {this.renderFormButton({ label: buttonName, onClick })}
      </div>
    );
  }

  renderFormButton({ label, link, onClick, onLinkClick }) {
    return (
      <div className="buttonContainer">
        {link ? <span className="link" onClick={onLinkClick}>{translate(link)}</span> : <div/>}
        {label ? <Button label={label} onClick={onClick}/> : <div/>}
      </div>
    );
  }

  renderForm(form) {
    return (
      <div className="formContainer">
        <div className="form">
          {form}
        </div>
      </div>
    );
  }

  renderLoginForm() {
    return (
      <div>
        <h1 className="formTitle">{translate('login')}</h1>
        <Input
          label={translate('email')}
          value={this.state.loginForm.email}
          inputName="email"
          onChange={this.handleLoginFormChange}
          id="1"
        />
        <Input
          label={translate('password')}
          value={this.state.loginForm.password}
          inputName="password"
          type="password"
          onChange={this.handleLoginFormChange}
          id="2"
        />
        {this.renderFormButton({
          label: 'login',
          link: 'dont_have_account',
          onClick: this.login,
          onLinkClick: this.showSignUp
        })}
        {this.renderFormButton({ link: 'forgot_password' })}
      </div>
    );
  }

  renderSignUpForm() {
    return (
      <div>
        <h1 className="formTitle">{translate('sign_up')}</h1>
        <Input
          label={translate('first_name')}
          value={this.state.signUpForm.firstName}
          inputName="firstName"
          onChange={this.handleSignUpFormChange}
          id="3"
        />
        <Input
          label={translate('last_name')}
          value={this.state.signUpForm.lastName}
          inputName="lastName"
          onChange={this.handleSignUpFormChange}
          id="3"
        />
        <Input
          label={translate('email')}
          value={this.state.signUpForm.email}
          inputName="email"
          onChange={this.handleSignUpFormChange}
          id="5"
        />
        <Input
          label={translate('password')}
          value={this.state.signUpForm.password}
          inputName="password"
          type="password"
          onChange={this.handleSignUpFormChange}
          id="9"
        />
        <Input
          label={translate('confirm_password')}
          value={this.state.signUpForm.confirmPassword}
          inputName="confirmPassword"
          type="password"
          onChange={this.handleSignUpFormChange}
          id="7"
        />
        {this.renderFormButton({
          label: 'sign_up',
          link: 'have_an_account',
          onClick: this.signup,
          onLinkClick: this.showLogin
        })}
      </div>
    );
  }

  render() {
    const formClassNames = classnames('formBox', { 'left': !this.state.login });

    return (
      <div className="homeContainer">
        <img src={brandIcon} alt="GE digital large logo" className="background is-hidden-mobile" />
        <img src={brandIconMobile} alt="GE digital small logo" className="backgroundMobile is-hidden-tablet" />
        <div className="authOverlay">
          <div className="panel">
            {this.renderFormDescription('dont_have_account', 'description_login_form', 'sign_up', this.showSignUp)}
            {this.renderFormDescription('have_an_account', 'description_login_form', 'login', this.showLogin)}
          </div>
          <div className={formClassNames}>
            {this.state.login ? this.renderForm(this.renderLoginForm()) : this.renderForm(this.renderSignUpForm())}
          </div>
        </div>
      </div>
    );
  }
}
