import React, {useContext} from "react";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet, View} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Font from "../styles/Font";

interface dropDownProps extends IOverrideStyle {
  onValueChange: (itemValue: string, itemIndex: number) => void,
  selectedValue: string,
  items: string[]
}

export default function DropDown(props: dropDownProps): JSX.Element {

  const select = "< Select Group >"
  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    picker: {
      backgroundColor: Theme.palette.base
    },
    pickerItem: {
      fontSize: Font.size.SM,
      fontFamily: Font.family(Font.fontFamilies.latoRI)
    }
  })

  return (
    <View>
      <Picker
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
        style={combineStyles(defaultStyles.picker, props.styleView)}
        itemStyle={defaultStyles.pickerItem}
        mode={"dropdown"}
      >
        {props.items && [...props.items, select].map(item => (<Picker.Item
            label={item}
            value={item}
            key={item}
            enabled={item != select}
            style={combineStyles(defaultStyles.pickerItem, props.styleText)}
          />
        ))}
      </Picker>
    </View>
  )
}
