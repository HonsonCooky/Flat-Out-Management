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
        extendBodyBehindAppBar: true,
        backgroundColor: scaffoldColor,
        // appBar: AppBar(
        //   backgroundColor: Color(0x000000),
        //   elevation: 0,
        // ),
        body: CustomPaint(
          size: MediaQuery.of(context).size,
          painter: _BlobBackgroundPaint(topColor: topColor, bottomColor: bottomColor),
          child: Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: child),
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
    var p1 = Paint()..color = topColor ?? Color(0xffdead5c);
    var pShadow1 = Paint()
      ..color = topColor?.withOpacity(0.0625) ?? Color(0x44dead5c)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 20;

    var p2 = Paint()..color = bottomColor ?? Color(0xffe94174);
    var pShadow2 = Paint()
      ..color = bottomColor?.withOpacity(0.0625) ?? Color(0x44e94174)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 20;
    ;

    Path path1 = _bezierPath(0, size.height / 3, size);
    Path path2 = _bezierPathInvert(0, size.height, size);

    canvas.drawPath(path1, p1);
    canvas.drawPath(path1, pShadow1);

    canvas.drawPath(path2, p2);
    canvas.drawPath(path2, pShadow2);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
