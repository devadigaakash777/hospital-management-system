import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const TestBottomSheet = () => {
  const ref = useRef<BottomSheetModal>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          console.log('OPEN TEST SHEET');
          ref.current?.present();
        }}
        style={{
          padding: 16,
          backgroundColor: 'blue',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white' }}>Open Test BottomSheet</Text>
      </TouchableOpacity>

      <BottomSheetModal ref={ref} snapPoints={['50%']}>
        <View style={{ padding: 20 }}>
          <Text>BottomSheet is WORKING 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default TestBottomSheet;
