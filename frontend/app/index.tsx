import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { ActivityIndicator, View, Text } from 'react-native';
import { useEffect } from 'react';

export default function Index() {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        console.log('📱 Index screen - loading:', loading, 'isAuthenticated:', isAuthenticated);
    }, [loading, isAuthenticated]);

    if (loading) {
        console.log('⏳ Showing loading spinner');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#FF6B35" />
                <Text style={{ color: '#FF6B35', marginTop: 20 }}>Loading...</Text>
            </View>
        );
    }

    console.log('🚀 Redirecting to:', isAuthenticated ? '/(tabs)' : '/(auth)/login');
    return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/login'} />;
}