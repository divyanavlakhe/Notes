import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import Home from "../../screen/home";
import Notes from "../../screen/notes";
import { GRAY, Images, THEAME_COLOR, WHITE } from "../../constants";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: THEAME_COLOR,
                tabBarInactiveTintColor: GRAY,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) => {
                    let iconSource;

                    switch (route.name) {
                        case "Home":
                            iconSource = focused ? Images.ic_homeDeactive : Images.ic_homeDeactive;
                            break;
                        case "Notes":
                            iconSource = focused ? Images.ic_notesActive : Images.ic_notesActive;
                            break;
                        default:
                            iconSource = Images.ic_homeDeactive;
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={[
                                styles.icon,
                                { tintColor: focused ? THEAME_COLOR : GRAY },
                            ]}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Notes" component={Notes} />
        </Tab.Navigator>
    );
};

export default memo(BottomTabBar);


const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: WHITE,
        height: 70,
        paddingBottom: 10,
        paddingTop: 7,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});
