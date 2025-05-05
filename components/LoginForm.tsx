import React, {useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  MD2Colors,
  Text,
  TextInput as PaperTextInput,
  Surface,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {Spinner} from './Spinner.tsx';
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
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmitButton = async () => {
    if (!userEmail.trim()) {
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
          <Surface style={authStyles.wrapper}>
            <Text variant="headlineMedium" style={authStyles.authTitle}>
              Sign in
            </Text>
            <PaperTextInput
              mode="outlined"
              label="Email address"
              autoCapitalize="none"
              value={userEmail}
              onChangeText={setUserEmail}
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current?.focus()
              }
              style={authStyles.input}
            />
            <PaperTextInput
              mode="outlined"
              label="Password"
              value={userPassword}
              onChangeText={setUserPassword}
              secureTextEntry={!showPassword}
              ref={passwordInputRef}
              returnKeyType="done"
              right={
                <PaperTextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={toggleShowPassword}
                />
              }
              style={authStyles.input}
            />
            <SubmitAuth
              text={'Sign in'}
              onSubmit={handleSubmitButton}
              icon={
                loading && (
                  <Spinner color={MD2Colors.red800} size={'small'}/>
                )
              }
              disabled={loading}
            />
            <ToggleAuth
              text={"Don't have an account? "}
              prompt={'Sign up'}
              onNavigate={onNavigate}
            />
          </Surface>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
