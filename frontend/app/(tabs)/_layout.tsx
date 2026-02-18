// app/(tabs)/_layout.tsx
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: AppColors.black },
                headerTintColor: AppColors.white,
                headerTitleStyle: { color: AppColors.orange, fontWeight: '600' },
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: AppColors.black,
                    borderTopColor: AppColors.darkGrey,
                },
                tabBarActiveTintColor: AppColors.orange,
                tabBarInactiveTintColor: AppColors.grey,
            }}
        >
            <Tabs.Screen
                name="index" // Points to app/(tabs)/index.tsx (Home)
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="workouts" // Points to app/(tabs)/workouts.tsx
                options={{
                    title: 'Workouts',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile" // Points to app/(tabs)/profile.tsx
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}