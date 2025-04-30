import React, {useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {ShowButton} from './ShowButton.tsx';
import {SubmitAuth} from './SubmitAuth.tsx';
import {ToggleAuth} from './ToggleAuth.tsx';
import backgroundImage from '../assets/images/background-2x.jpg';
import {login} from '../redux/operations/authOperations.ts';
import {selectIsLoading} from '../redux/selectors/loaderSelectors.ts';
import {AppDispatch} from '../redux/store.ts';
import {authStyles} from '../styles/authStyles';
import {AuthFormProps} from '../types/AuthStackParamList.ts';

export const LoginForm = ({onNavigate}: AuthFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectIsLoading);
  const [isUserEmailInFocus, setIsUserEmailInFocus] = useState(false);
  const [isUserPasswordInFocus, setIsUserPasswordInFocus] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const toggleUserEmailFocus = () => setIsUserEmailInFocus(!isUserEmailInFocus);
  const toggleUserPasswordFocus = () =>
    setIsUserPasswordInFocus(!isUserPasswordInFocus);

  const handleSubmitButton = async () => {
    if (!userEmail) {
      Alert.alert('Error', 'Please fill Email');
      return;
    }
    if (!userPassword) {
      Alert.alert('Error', 'Please fill Password');
      return;
    }

    try {
      const result = await dispatch(
        login({
          email: userEmail.trim(),
          password: userPassword,
        }),
      ).unwrap();

      if (!result) {
        Alert.alert('Error', 'Login failed');
      }
    } catch (error) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : 'An unexpected error occurred during login';
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={authStyles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={authStyles.wrapper}>
            <Text style={authStyles.authTitle}>Sign in</Text>
            <View style={authStyles.sectionStyle}>
              <TextInput
                autoCapitalize="none"
                style={
                  isUserEmailInFocus
                    ? authStyles.inputInFocusStyle
                    : authStyles.inputStyle
                }
                onFocus={toggleUserEmailFocus}
                onBlur={toggleUserEmailFocus}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Email address"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                submitBehavior="blurAndSubmit"
              />
            </View>
            <View
              style={[authStyles.sectionStyle, authStyles.sectionStyleLast]}>
              <TextInput
                style={
                  isUserPasswordInFocus
                    ? authStyles.inputInFocusStyle
                    : authStyles.inputStyle
                }
                onFocus={toggleUserPasswordFocus}
                onBlur={toggleUserPasswordFocus}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid="#f000"
                placeholder="Enter password"
                placeholderTextColor="#8b9cb5"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={showPassword}
                submitBehavior={'blurAndSubmit'}
              />
              <ShowButton onPress={toggleShowPassword} />
            </View>
            <SubmitAuth
              text={'Sign in'}
              onSubmit={handleSubmitButton}
              icon={
                loading && (
                  <ActivityIndicator
                    animating={true}
                    color={MD2Colors.red800}
                  />
                )
              }
              disabled={loading}
            />
            <ToggleAuth
              text={"Don't have an account? "}
              prompt={'Sign up'}
              onNavigate={onNavigate}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
