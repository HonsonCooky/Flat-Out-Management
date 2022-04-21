import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BlobBackground extends StatelessWidget {
  final Widget? child;

  BlobBackground({this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: CustomPaint(
        size: MediaQuery.of(context).size,
        painter: _BlobBackgroundPaint(),
        child: child,
      ),
    );
  }
}

class _BlobBackgroundPaint extends CustomPainter {

  Path _bezierPath(double refX, double refY, Size size) {
    Path path = Path();
    path.moveTo(refX, refY);
    path.quadraticBezierTo(refX + (size.width / 14), refY, refX + (size.width / 8), refY - (size.height / 14));
    path.quadraticBezierTo(
        refX + (size.width / 5), refY - (size.height / 5), refX + (size.width / 1.4), refY - (size.height / 4));
    path.quadraticBezierTo(
        refX + (size.width), refY - (size.height / 3.8), refX + (size.width / 0.95), refY - (size.height / 2.5));
    path.lineTo(0,  refY - (size.height / 2.5));
    path.lineTo(0,  refY);
    return path;
  }

  Path _bezierPathInvert(double refX, double refY, Size size) {
    Path path = Path();
    path.moveTo(refX, refY);
    path.quadraticBezierTo(refX + (size.width / 14), refY, refX + (size.width / 8), refY - (size.height / 14));
    path.quadraticBezierTo(
        refX + (size.width / 5), refY - (size.height / 5), refX + (size.width / 1.4), refY - (size.height / 4));
    path.quadraticBezierTo(
        refX + (size.width), refY - (size.height / 3.8), refX + (size.width / 0.95), refY - (size.height / 2.5));
    path.lineTo(size.width,  size.height);
    path.lineTo(0,  size.height);
    return path;
  }
  
  @override
  void paint(Canvas canvas, Size size) {
    var p1 = Paint()
      ..color = Color(0xffdead5c);
    var pShadow1 = Paint()
      ..color = Color(0x44dead5c);
    var p2 = Paint()..color = Color(0xffe94174);
    var pShadow2 = Paint()..color = Color(0x44e94174);

    Path path1 = _bezierPath(0, size.height / 3, size);
    Path pathShadow1 = _bezierPath(10, (size.height / 3) + 10, size);

    Path path2 = _bezierPathInvert(0, size.height, size);
    Path pathShadow2 = _bezierPathInvert(-10, size.height - 10, size);
    
    canvas.drawPath(pathShadow1, pShadow1);
    canvas.drawPath(path1, p1);
    
    canvas.drawPath(pathShadow2, pShadow2);
    canvas.drawPath(path2, p2);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
