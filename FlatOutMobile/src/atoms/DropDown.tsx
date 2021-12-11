import React, {useContext} from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {ThemeContext} from "../oraganisms/ThemeProvider";

interface dropDownProps extends IOverrideStyle {
  onValueChange: (itemValue: string, itemIndex: number) => void,
  selectedValue: string,
  items: string[]
}

export default function DropDown(props: dropDownProps): JSX.Element {

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    picker: {
      backgroundColor: Theme.palette.base
    }
  })

  return (
    <Picker
      selectedValue={props.selectedValue}
      onValueChange={props.onValueChange}
      style={combineStyles(defaultStyles.picker, props.styleView)}
    >
      {props.items && props.items.map(item => (<Picker.Item label={item} value={item} key={item}/>))}
    </Picker>
  )
}
