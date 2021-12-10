import React, {useContext} from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {ThemeContext} from "../oraganisms/ThemeProvider";

interface dropDownProps extends IOverrideStyle {
  onValueChange: (itemValue: string, itemIndex: number) => void,
  selectedValue: string,
  groups: [{ groupName: string }]
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
      {props.groups.map(group => (<Picker.Item label={group.groupName} value={group.groupName}/>))}
    </Picker>
  )
}
