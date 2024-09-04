// CustomBackButton.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = ({ color = '#094852' }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <FontAwesome6 name="chevron-left" size={24} color={color} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
