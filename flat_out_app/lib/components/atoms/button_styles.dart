import 'package:flutter/material.dart';

ButtonStyle HeaderButtonStyle(
    {required BuildContext context,
    required String curPage,
    required String element,
    required int index,
    required int indexMax}) {
  return ButtonStyle(
    foregroundColor: curPage == element
        ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
        : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
    overlayColor: curPage == element
        ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color?.withAlpha(20))
        : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color?.withAlpha(20)),
    shape: curPage == element
        ? MaterialStateProperty.resolveWith<OutlinedBorder?>(
            (Set<MaterialState> states) => RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft:
                    index == 0 ? Radius.circular(Theme.of(context).textTheme.headline4?.fontSize ?? 10) : Radius.zero,
                bottomLeft:
                    index == 0 ? Radius.circular(Theme.of(context).textTheme.headline4?.fontSize ?? 10) : Radius.zero,
                topRight: index == indexMax
                    ? Radius.circular(Theme.of(context).textTheme.headline4?.fontSize ?? 10)
                    : Radius.zero,
                bottomRight: index == indexMax
                    ? Radius.circular(Theme.of(context).textTheme.headline4?.fontSize ?? 10)
                    : Radius.zero,
              ),
            ),
          )
        : MaterialStateProperty.resolveWith<OutlinedBorder?>(
            (Set<MaterialState> states) => RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft:
                    index == 0 ? Radius.circular(Theme.of(context).textTheme.headline5?.fontSize ?? 10) : Radius.zero,
                bottomLeft:
                    index == 0 ? Radius.circular(Theme.of(context).textTheme.headline5?.fontSize ?? 10) : Radius.zero,
                topRight: index == indexMax
                    ? Radius.circular(Theme.of(context).textTheme.headline5?.fontSize ?? 10)
                    : Radius.zero,
                bottomRight: index == indexMax
                    ? Radius.circular(Theme.of(context).textTheme.headline5?.fontSize ?? 10)
                    : Radius.zero,
              ),
            ),
          ),
    textStyle: curPage == element
        ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4)
        : MaterialStateProperty.all(Theme.of(context).textTheme.headline5),
  );
}
