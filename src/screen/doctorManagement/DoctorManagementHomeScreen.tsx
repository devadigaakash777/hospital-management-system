import React, { useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SettingItem } from '../../components';
import { colors } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { DoctorStackParamList } from '../../navigation/DoctorManagementStack';

type StackNav = NativeStackNavigationProp<
  DoctorStackParamList,
  'DoctorManagementHome'
>;

type DrawerNav = DrawerNavigationProp<DrawerParamList>;

export default function DoctorManagementHomeScreen() {
  const navigation = useNavigation<StackNav>();

  const renderHeaderLeft = useCallback(() => {
    const parent = navigation.getParent<DrawerNav>();

    return (
      <Ionicons
        name="menu"
        size={24}
        color={colors.textPrimary}
        onPress={() => parent?.openDrawer()}
        style={styles.menuIcon}
      />
    );
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    });
  }, [navigation, renderHeaderLeft]);

  return (
    <View style={styles.container}>
      <SettingItem
        title="Manage Doctor "
        subtitle="Add, update and manage doctors"
        iconName="user-doctor"
        iconFamily="FontAwesome6"
        onPress={() => navigation.navigate('ManageDoctors')}
      />

      <SettingItem
        title="Block Doctor Availability"
        subtitle="Block specific dates or time slots when a doctor is unavailable (vacation, conference, etc. )"
        iconName="calendar-times"
        iconFamily="FontAwesome6"
        onPress={() => navigation.navigate('BlockAvailability')}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  menuIcon: {
    marginRight: 16,
  },
});
