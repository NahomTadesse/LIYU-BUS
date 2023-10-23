import React, { useRef } from 'react';
import { View, Text, Button, Dimensions, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

export default function Download() {
  const viewShotRef = useRef();

  const captureViewAsImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      CameraRoll.save(uri);
      console.log('Image saved successfully!');

     
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  return (
    <View>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <View
          style={{
            width: Dimensions.get('screen').width / 1.1,
            height: 600,
            backgroundColor: 'yellow',
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Hello Nahom, This is Your Ticket
          </Text>
        </View>
      </ViewShot>
      <Button title="Capture and Share" onPress={captureViewAsImage} />
    </View>
  );
}
