import 'package:flutter/material.dart';

class HeaderAnimatedSlide extends StatefulWidget {
  final AnimationController controller;
  final String curPage;
  final List<String> buttonNames;
  final void Function(String) swapPage;

  HeaderAnimatedSlide(
      {required this.controller,
      required this.curPage,
      required this.swapPage,
      required this.buttonNames});

  @override
  State<StatefulWidget> createState() => _HeaderAnimatedSlideState();
}

class _HeaderAnimatedSlideState extends State<HeaderAnimatedSlide> {
  String prevPage = "";
  double prevFrom = 0;
  double prevTo = 0;

  /**
   * Returns a list of TextButton widgets from the buttonNames list.
   */
  List<Widget> _widgetList() {
    return widget.buttonNames
        .map<Widget>((String element) => TextButton(
              onPressed: () {
                FocusManager.instance.primaryFocus?.unfocus();
                if (element == widget.curPage) return;
                prevPage = widget.curPage;
                widget.swapPage(element);
                widget.controller.reset();
                widget.controller.forward();
              },
              style: ButtonStyle(
                  foregroundColor: widget.curPage == element
                      ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4?.color)
                      : MaterialStateProperty.all(Theme.of(context).textTheme.headline5?.color),
                  textStyle: widget.curPage == element
                      ? MaterialStateProperty.all(Theme.of(context).textTheme.headline4)
                      : MaterialStateProperty.all(Theme.of(context).textTheme.headline5)),
              child: Text(element),
            ))
        .toList();
  }

  /**
   * Add | dividers for each page link
   */
  List<Widget> _widgetsWithDividers() {
    List<Widget> ls = _widgetList();
    List<Widget> joined = [];

    for (var i = 0; i < ls.length; i++) {
      joined.add(Center(child: ls[i]));
      if (i != ls.length - 1)
        joined.add(Center(
          child: Text("|", style: Theme.of(context).textTheme.headline5),
        ));
    }

    return joined;
  }

  double pointFrom() {
    double min = MediaQuery.of(context).size.width / 5;
    double max = MediaQuery.of(context).size.width - (min * 2);
    int listSize = (widget.buttonNames.length - 1);
    int indexOf = widget.buttonNames.indexOf(prevPage);

    if (indexOf < 0) indexOf = 0;
    return min + ((max / listSize) * indexOf);
  }

  double pointTo() {
    double min = MediaQuery.of(context).size.width / 5;
    double max = MediaQuery.of(context).size.width - (min * 2);
    int listSize = (widget.buttonNames.length - 1);
    int indexOf = widget.buttonNames.indexOf(widget.curPage);

    if (indexOf < 0) indexOf = 0;
    return min + ((max / listSize) * indexOf);
  }

  @override
  Widget build(BuildContext context) {
    final ScrollController _scrollController = ScrollController();
    // Point animation
    Animation<double> _pointAnimation = Tween<double>(begin: pointFrom(), end: pointTo()).animate(widget.controller)
      ..addListener(() {
        setState(() {});
      });

    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      CustomPaint(
        painter: ShapePainter(value: _pointAnimation.value),
        size: Size(MediaQuery.of(context).size.width, 50),
      ),
      Container(
        height: MediaQuery.of(context).size.height / 10,
        child: Center(
            child: Scrollbar(
          controller: _scrollController,
          scrollbarOrientation: ScrollbarOrientation.bottom,
          child: ListView(
              scrollDirection: Axis.horizontal,
              controller: _scrollController,
              shrinkWrap: true,
              children: _widgetsWithDividers()),
        )),
      ),
    ]);
  }
}

class ShapePainter extends CustomPainter {
  double value;

  ShapePainter({required this.value}) : super();

  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()..color = Color(0xff383e64);

    Path path = Path();
    path.moveTo(0, -1);
    path.lineTo(size.width, -1);
    path.lineTo(size.width, size.height);
    // path.quadraticBezierTo(value, -20, 0, size.height);
    path.lineTo(value, size.height / 3);
    path.lineTo(0, size.height);

    // canvas.drawShadow(path, Colors.black, 5, true);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}
