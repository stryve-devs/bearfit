import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AuthTextField from '../../components/auth/AuthTextField';
import PrimaryButton from '../../components/auth/PrimaryButton';
import ValidationRow from '../../components/auth/ValidationRow';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';
import AppleSignInButton from '../../components/auth/AppleSignInButton';
import { AppColors } from '../../constants/colors';
import { authService } from '../../api/services/auth.service';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    // Validation checks
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

    const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    const canSubmit = name && email && isPasswordValid && passwordsMatch;

    const handleRegister = async () => {
        if (!canSubmit) {
            Alert.alert('Error', 'Please complete all requirements');
            return;
        }

        setLoading(true);
        try {
            const emailExists = await authService.checkEmailExists(email);
            if (emailExists) {
                Alert.alert('Error', 'Email already in use');
                setLoading(false);
                return;
            }

            await register({ name, email, password });
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        Alert.alert('Coming Soon', 'Google Sign-In will be available soon!');
    };

    const handleAppleSignIn = () => {
        Alert.alert('Coming Soon', 'Apple Sign-In will be available soon!');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Combined Logo / Title Header */}
                <View style={styles.header}>
                    <Text style={styles.logoText}>
                        <Text style={styles.bear}>BEAR</Text>
                        <Text style={styles.bear}> </Text>
                        <Text style={styles.fit}>FIT</Text>
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.formSection}>
                    {/* Name Field */}
                    <AuthTextField
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />

                    {/* Email Field */}
                    <AuthTextField
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* Password Field */}
                    <AuthTextField
                        label="Password"
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* Password Validation */}
                    {password.length > 0 && (
                        <View style={styles.validationContainer}>
                            <ValidationRow text="At least 8 characters" isValid={hasMinLength} />
                            <ValidationRow text="One uppercase letter" isValid={hasUpperCase} />
                            <ValidationRow text="One lowercase letter" isValid={hasLowerCase} />
                            <ValidationRow text="One number" isValid={hasNumber} />
                            <ValidationRow text="One special character" isValid={hasSpecialChar} />
                        </View>
                    )}

                    {/* Confirm Password Field */}
                    <AuthTextField
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {/* Password Match Validation */}
                    {confirmPassword.length > 0 && (
                        <View style={styles.matchValidation}>
                            <ValidationRow text="Passwords match" isValid={passwordsMatch} />
                        </View>
                    )}

                    {/* Sign Up Button */}
                    <PrimaryButton
                        label="Create Account"
                        onPress={handleRegister}
                        loading={loading}
                        disabled={!canSubmit || loading}
                    />

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Sign In */}
                    <GoogleSignInButton onPress={handleGoogleSignIn} />
                    <View style={styles.socialButtonSpacing} />
                    <AppleSignInButton onPress={handleAppleSignIn} />
                </View>

                {/* Bottom Section - Sign In Link */}
                <TouchableOpacity
                    style={styles.signInContainer}
                    onPress={() => router.back()}
                >
                    <Text style={styles.signInText}>
                        Already have an account? <Text style={styles.signInLink}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.black,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 40,
    },
    logoText: {
        fontFamily: 'Cal Sans',
        fontSize: 32,
        fontWeight: 400,
        letterSpacing: 2,
    },
    bear: {
        color: '#D3D3D3',
    },
    fit: {
        color: '#FF7825',
    },
    formSection: {
        // No flex here
    },
    validationContainer: {
        marginBottom: 16,
        marginTop: -8,
    },
    matchValidation: {
        marginTop: -8,
        marginBottom: 16,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: AppColors.darkGrey,
    },
    dividerText: {
        color: AppColors.grey,
        marginHorizontal: 16,
        fontSize: 13,
    },
    socialButtonSpacing: {
        height: 12,
    },
    signInContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    signInText: {
        color: AppColors.grey,
        fontSize: 14,
    },
    signInLink: {
        color: AppColors.orange,
        fontWeight: '600',
    },
});