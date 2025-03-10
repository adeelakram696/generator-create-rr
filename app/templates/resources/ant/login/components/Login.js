import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd';
import { withTranslation } from 'react-i18next';
import {
  requiredEmail,
  validEmail,
  requiredPassword,
  validPassword,
} from '../../configs/messages';
import {
  passwordRule,
  validationTrigger,
  // logoAltText,
} from '../../configs/constants';


class LoginComponent extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div id="login-screen" className="login-wrap full-height">
        <Row className="full-height">
          <Col className="form-center full-height">
            <Row>
              <Col className="logo-img">
                {/* <img src={logoDark} width="100" height="100" alt={logoAltText} /> */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item
                    hasFeedback
                  >
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: requiredEmail },
                        { type: 'email', message: validEmail },
                      ],
                      validateTrigger: validationTrigger,
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder={'Email'}
                        autoComplete="email"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                  >
                    {getFieldDecorator('password', {
                      rules: [
                        { required: true, message: requiredPassword },
                        { pattern: passwordRule, message: validPassword },
                      ],
                      validateTrigger: validationTrigger,
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder={'Password'}
                        autoComplete="current-password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(<Checkbox>{'Remember me'}</Checkbox>)}
                    {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">{'Log in'}</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
const formShape = {
  resetFields: PropTypes.func,
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};
LoginComponent.propTypes = {
  form: PropTypes.shape(formShape).isRequired,
};
const WrappedLoginComponent = Form.create({ name: 'normal_login' })(LoginComponent);

export default WrappedLoginComponent;
