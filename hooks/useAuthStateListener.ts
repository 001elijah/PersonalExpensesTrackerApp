import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';

import {authStateChanged} from '../services/firebaseAPI';
import {AuthStackParamList} from '../types/AuthStackParamList';
import {RootStackParamList} from '../types/RootStackParamList';

type AuthNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList>,
    NativeStackNavigationProp<RootStackParamList>
>;

export const useAuthStateListener = (navigation: AuthNavigationProp) => {
    useEffect(() => {
        return authStateChanged(user => {
            if (user) {
                navigation.replace('HomeScreen');
            }
        });
    }, [navigation]);
};
