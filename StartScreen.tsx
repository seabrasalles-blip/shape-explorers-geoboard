import React from 'react';
import { View, Image } from 'react-native';

const StartScreen = () => {
    return (
        <View className="relative flex-1">
            <Image
                source={require('./path-to-your-owl-image.png')}
                className="absolute bottom-0 left-4 w-80 h-auto drop-shadow-2xl pointer-events-none select-none"
            />
        </View>
    );
};

export default StartScreen;
