import 'package:flutter/cupertino.dart';

class HeaderAnimatedSlide extends StatefulWidget {
  final AnimationController controller;

  HeaderAnimatedSlide({required this.controller});

  @override
  State<StatefulWidget> createState() => _HeaderAnimatedSlideState();
}

class _HeaderAnimatedSlideState extends State<HeaderAnimatedSlide> {
  late final Animation<double> _pointAnimation =
      Tween<double>(begin: 90, end: MediaQuery.of(context).size.width - 90).animate(widget.controller)
        ..addListener(() {
          setState(() {});
        });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: ShapePainter(value: _pointAnimation.value),
      size: Size(MediaQuery.of(context).size.width, 50),
    );
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
