import 'package:flutter/material.dart';

import '../atoms/unfocus_wrapper.dart';

class BlobBackground extends StatelessWidget {
  final Widget? child;
  final Color? scaffoldColor;
  final Color? topColor;
  final Color? bottomColor;

  BlobBackground({this.child, this.scaffoldColor, this.topColor, this.bottomColor});

  @override
  Widget build(BuildContext context) {
    return UnFocusWrapper(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: scaffoldColor,
        body: CustomPaint(
          size: MediaQuery.of(context).size,
          painter: _BlobBackgroundPaint(topColor: topColor, bottomColor: bottomColor),
          child: Scaffold(
            resizeToAvoidBottomInset: true,
            backgroundColor: Colors.transparent,
            body: Container(
                width: MediaQuery.of(context).size.width, height: MediaQuery.of(context).size.height, child: child),
          ),
        ),
      ),
    );
  }
}

class _BlobBackgroundPaint extends CustomPainter {
  final Color? topColor;
  final Color? bottomColor;

  _BlobBackgroundPaint({this.topColor, this.bottomColor});

  Path _bezierPath(double refX, double refY, Size size) {
    Path path = Path();
    path.moveTo(0, refY);
    path.quadraticBezierTo(refX + (size.width / 14), refY, refX + (size.width / 10), refY - (size.height / 12));
    path.quadraticBezierTo(
        refX + (size.width / 8), refY - (size.height / 4), refX + (size.width / 1.8), refY - (size.height / 3.8));
    path.quadraticBezierTo(
        refX + (size.width), refY - (size.height / 3.6), refX + (size.width / 0.95), refY - (size.height / 2.5));
    path.lineTo(-10, refY - (size.height / 2.5));
    path.lineTo(-10, refY);
    return path;
  }

  Path _bezierPathInvert(double refX, double refY, Size size) {
    Path path = Path();
    path.moveTo(refX + (size.width / 0.95), refY - (size.height / 2.5));
    path.quadraticBezierTo(
        refX + (size.width / 1.1), refY - (size.height / 2.4), refX + (size.width / 1.15), refY - (size.height / 3.5));
    path.quadraticBezierTo(
        refX + (size.width / 1.2), refY - (size.height / 10), refX + (size.width / 4), refY - (size.height / 12));
    path.quadraticBezierTo(refX + (size.width / 10), refY - (size.height / 12), refX, refY);
    path.lineTo(size.width, size.height);
    path.lineTo(size.width, size.height);
    return path;
  }

  @override
  void paint(Canvas canvas, Size size) {
    var p1Color = topColor ?? Color(0xffdead5c);
    var p2Color = bottomColor ?? Color(0xffe94174);

    var p1 = Paint()
      ..shader = LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomRight,
              colors: [p1Color, p1Color.withGreen(p1Color.green - 50).withBlue(p1Color.blue - 50)])
          .createShader(Rect.fromCenter(center: Offset(0, 100), width: size.width, height: size.height / 3));
    var pShadow1 = Paint()
      ..color = p1Color.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 20;

    var p2 = Paint()
      ..shader = LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomRight,
              colors: [p2Color, p2Color.withGreen(p1Color.green - 50).withBlue(p1Color.blue + 100)])
          .createShader(
              Rect.fromCenter(center: Offset(0, size.height + 100), width: size.width, height: size.height / 3));
    var pShadow2 = Paint()
      ..color = p2Color.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 20;

    Path path1 = _bezierPath(0, size.height / 3, size);
    Path path2 = _bezierPathInvert(0, size.height, size);

    canvas.drawPath(path1, pShadow1);
    canvas.drawPath(path1, p1);

    canvas.drawPath(path2, pShadow2);
    canvas.drawPath(path2, p2);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
