import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import {RegistrationForm} from '../components/RegistrationForm.tsx';
import {useAuthStateListener} from '../hooks/useAuthStateListener.ts';
import {AuthStackParamList} from '../types/AuthStackParamList.ts';
import {RootStackParamList} from '../types/RootStackParamList.ts';

type RegistrationScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList>,
    NativeStackNavigationProp<RootStackParamList>
>;

export const RegistrationScreen = () => {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    useAuthStateListener(navigation);

    return (
        <RegistrationForm onNavigate={() => navigation.navigate('LoginScreen')}/>
    );
};
