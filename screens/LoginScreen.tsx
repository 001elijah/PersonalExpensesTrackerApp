import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import {LoginForm} from '../components/LoginForm.tsx';
import {useAuthStateListener} from '../hooks/useAuthStateListener.ts';
import {AuthStackParamList} from '../types/AuthStackParamList.ts';
import {RootStackParamList} from '../types/RootStackParamList.ts';

type LoginScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList>,
    NativeStackNavigationProp<RootStackParamList>
>;

export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    useAuthStateListener(navigation);

    return (
        <LoginForm onNavigate={() => navigation.navigate('RegistrationScreen')}/>
    );
};
