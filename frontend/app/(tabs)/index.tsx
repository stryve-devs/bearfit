import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../src/constants/colors';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to app</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.black,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppColors.white,
    },
});