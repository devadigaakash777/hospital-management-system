// import React, { useMemo, useRef } from 'react';
// import { StyleSheet, View } from 'react-native';
// import {
//   BottomSheetModal,
// } from '@gorhom/bottom-sheet';

// import AppointmentFilterSheet from './AppointmentFilterSheet';
// import { colors } from '../../theme';

// export type AppointmentFilterBottomSheetRef = {
//   open: () => void;
//   close: () => void;
// };

// const AppointmentFilterBottomSheet = React.forwardRef<
//   AppointmentFilterBottomSheetRef
// >((_, ref) => {
//   const bottomSheetRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => ['65%'], []);

//   React.useImperativeHandle(ref, () => ({
//     open: () => {
//       bottomSheetRef.current?.present();
//     },
//     close: () => {
//       bottomSheetRef.current?.dismiss();
//     },
//   }));

//   return (
//     <BottomSheetModal
//       ref={bottomSheetRef}
//       snapPoints={snapPoints}
//       backgroundStyle={styles.background}
//       handleIndicatorStyle={styles.indicator}
//     >
//       <View style={styles.content}>
//         <AppointmentFilterSheet />
//       </View>
//     </BottomSheetModal>
//   );
// });

// export default AppointmentFilterBottomSheet;

// const styles = StyleSheet.create({
//   background: {
//     backgroundColor: colors.background,
//     borderRadius: 16,
//   },
//   indicator: {
//     backgroundColor: '#ccc',
//     width: 40,
//   },
//   content: {
//     flex: 1,
//   },
// });
