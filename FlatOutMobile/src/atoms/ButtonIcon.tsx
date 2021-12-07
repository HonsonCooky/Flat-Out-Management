import React from "react";
import {View, TouchableOpacity} from "react-native";
import IOverrideStyle from "../utils/IOverrideStyle";
import {Ionicons} from "@expo/vector-icons";

/** ------------------------------------------------------------------------------------------------------------------
 * Interface
 ------------------------------------------------------------------------------------------------------------------*/

interface buttonProps extends IOverrideStyle {
  onPress: () => void
  size: number,
  icon: any
}

export default function ButtonIcon(props: buttonProps): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={props.styleView}>
        <Ionicons
          name={props.icon}
          style={props.styleText}
          size={props.size}/>
      </View>
    </TouchableOpacity>
  )
}